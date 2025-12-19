import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ArenaClient } from './arena-client.js';
import * as fs from 'fs';
import * as path from 'path';
import { 
  ExtractedComponent, 
  ComponentIndex, 
  SCHEMA_VERSION,
  isValidComponent 
} from '../schema/component.js';

// ============================================================================
// CONFIGURATION
// ============================================================================

const ARENA_TOKEN = process.env.ARENA_TOKEN;
const ARENA_USER_SLUG = process.env.ARENA_USER_SLUG;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const COMPONENTS_DIR = 'components';
const PROMPT_PATH = 'prompts/screenshot-to-code.md';

// ============================================================================
// PROMPT LOADING
// ============================================================================

function loadPrompt(): string {
  try {
    const content = fs.readFileSync(PROMPT_PATH, 'utf-8');
    // Extract the prompt from markdown (between the ``` markers after ---)
    const parts = content.split('---');
    if (parts.length > 1) {
      const promptSection = parts.slice(1).join('---');
      const match = promptSection.match(/```\n([\s\S]*?)```/);
      if (match) {
        return match[1].trim();
      }
    }
    throw new Error('Could not parse prompt from file');
  } catch (error) {
    console.error('❌ Failed to load prompt from', PROMPT_PATH);
    console.error(error);
    process.exit(1);
  }
}

// ============================================================================
// HELPERS
// ============================================================================

async function downloadImage(url: string): Promise<{ base64: string; mimeType: string } | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    if (contentType.includes('gif')) {
      console.log('      ⚠️ Skipping GIF (unsupported)');
      return null;
    }
    
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    
    return { base64, mimeType: contentType.split(';')[0] };
  } catch (error) {
    return null;
  }
}

function loadExistingComponents(): Set<string> {
  if (!fs.existsSync(COMPONENTS_DIR)) return new Set();
  
  const files = fs.readdirSync(COMPONENTS_DIR);
  const ids = new Set<string>();
  
  for (const file of files) {
    if (file.endsWith('.json') && file !== 'index.json') {
      ids.add(file.replace('.json', ''));
    }
  }
  
  return ids;
}

function saveComponent(component: ExtractedComponent): string {
  if (!fs.existsSync(COMPONENTS_DIR)) {
    fs.mkdirSync(COMPONENTS_DIR, { recursive: true });
  }
  
  const filepath = path.join(COMPONENTS_DIR, `${component.id}.json`);
  fs.writeFileSync(filepath, JSON.stringify(component, null, 2));
  return filepath;
}

function parseExtraction(response: string, blockId: number, imageUrl: string, title: string | null): ExtractedComponent | null {
  try {
    // Try to extract JSON from the response
    let jsonStr = response;
    
    // Handle markdown code blocks
    const jsonMatch = response.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      jsonStr = jsonMatch[1];
    }
    
    // Also try to find raw JSON
    const rawJsonMatch = response.match(/\{[\s\S]*\}/);
    if (rawJsonMatch && !jsonMatch) {
      jsonStr = rawJsonMatch[0];
    }
    
    const parsed = JSON.parse(jsonStr);
    
    // Validate render field exists
    if (!parsed.render || !parsed.render.html || !parsed.render.css) {
      console.error('      ❌ Missing render.html or render.css in response');
      return null;
    }
    
    // Construct v2 component
    const component: ExtractedComponent = {
      id: String(blockId),
      name: parsed.name || 'Untitled',
      description: parsed.description || '',
      screen_type: parsed.screen_type || 'other',
      component_types: parsed.component_types || [],
      aesthetic_family: parsed.aesthetic_family || 'flat-minimal',
      tags: parsed.tags || [],
      render: {
        html: parsed.render.html,
        css: parsed.render.css,
        notes: parsed.render.notes,
      },
      source: {
        arena_id: blockId,
        arena_url: `https://www.are.na/block/${blockId}`,
        image_url: imageUrl,
        title: title,
      },
      extracted_at: new Date().toISOString(),
      extraction_version: SCHEMA_VERSION,
    };
    
    return component;
  } catch (error) {
    console.error('      ❌ Failed to parse JSON:', error);
    return null;
  }
}

function buildIndex(components: ExtractedComponent[]): ComponentIndex {
  const index: ComponentIndex = {
    version: SCHEMA_VERSION,
    generated_at: new Date().toISOString(),
    total_components: components.length,
    by_aesthetic: {},
    by_type: {},
    by_screen: {},
    components: [],
  };
  
  for (const comp of components) {
    index.components.push(comp.id);
    
    // By aesthetic
    if (!index.by_aesthetic[comp.aesthetic_family]) {
      index.by_aesthetic[comp.aesthetic_family] = [];
    }
    index.by_aesthetic[comp.aesthetic_family].push(comp.id);
    
    // By component type
    for (const type of comp.component_types) {
      if (!index.by_type[type]) {
        index.by_type[type] = [];
      }
      index.by_type[type].push(comp.id);
    }
    
    // By screen type
    if (!index.by_screen[comp.screen_type]) {
      index.by_screen[comp.screen_type] = [];
    }
    index.by_screen[comp.screen_type].push(comp.id);
  }
  
  return index;
}

function saveIndex(index: ComponentIndex): void {
  if (!fs.existsSync(COMPONENTS_DIR)) {
    fs.mkdirSync(COMPONENTS_DIR, { recursive: true });
  }
  fs.writeFileSync(path.join(COMPONENTS_DIR, 'index.json'), JSON.stringify(index, null, 2));
}

// ============================================================================
// EXTRACTION
// ============================================================================

async function extractComponent(
  model: any,
  prompt: string,
  blockId: number,
  imageUrl: string,
  title: string | null
): Promise<ExtractedComponent | null> {
  const imageData = await downloadImage(imageUrl);
  if (!imageData) {
    return null;
  }

  try {
    const result = await model.generateContent([
      { text: prompt },
      {
        inlineData: {
          mimeType: imageData.mimeType,
          data: imageData.base64,
        },
      },
    ]);

    const response = result.response.text();
    return parseExtraction(response, blockId, imageUrl, title);
  } catch (error: any) {
    console.error(`      ❌ Gemini error: ${error.message}`);
    return null;
  }
}

// ============================================================================
// COMMANDS
// ============================================================================

async function extractSingle(blockId: number, channelSlug: string) {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('     SCREENSHOT TO CODE EXTRACTION v2 (Single)                  ');
  console.log('═══════════════════════════════════════════════════════════════\n');

  if (!ARENA_TOKEN || !ARENA_USER_SLUG || !GEMINI_API_KEY) {
    console.error('❌ Missing environment variables');
    process.exit(1);
  }

  const prompt = loadPrompt();
  console.log('✅ Loaded prompt from', PROMPT_PATH);

  const client = new ArenaClient(ARENA_TOKEN, ARENA_USER_SLUG);
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  
  // Use Gemini 3 Pro with thinking for best quality
  const model = genAI.getGenerativeModel({ 
    model: 'gemini-3-pro-preview',
    generationConfig: {
      temperature: 0.2,
      maxOutputTokens: 65536,  // Gemini 3 Pro supports up to 65K output
    }
  });
  console.log('🤖 Using Gemini 3 Pro');

  console.log(`\n📦 Fetching block ${blockId}...`);
  
  const blocks = await client.getChannelBlocks(channelSlug);
  const block = blocks.find(b => b.id === blockId);
  
  if (!block) {
    console.error(`❌ Block ${blockId} not found`);
    process.exit(1);
  }

  const imageUrl = block.image?.display?.url || block.image?.thumb?.url;
  if (!imageUrl) {
    console.error('❌ Block has no image');
    process.exit(1);
  }

  console.log(`   Title: ${block.title || '(untitled)'}`);
  console.log('\n🎨 Generating HTML/CSS...');

  const component = await extractComponent(model, prompt, blockId, imageUrl, block.title);
  
  if (!component) {
    console.error('❌ Failed to extract');
    process.exit(1);
  }

  const filepath = saveComponent(component);
  
  console.log(`\n✅ Saved to: ${filepath}`);
  console.log(`   Name: ${component.name}`);
  console.log(`   Aesthetic: ${component.aesthetic_family}`);
  console.log(`   Types: ${component.component_types.join(', ')}`);
  console.log(`   HTML: ${component.render.html.length} chars`);
  console.log(`   CSS: ${component.render.css.length} chars`);
  if (component.render.notes) {
    console.log(`   Notes: ${component.render.notes}`);
  }
}

async function extractChannel(channelSlug: string, options: { force?: boolean; limit?: number } = {}) {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('     SCREENSHOT TO CODE EXTRACTION v2 (Channel)                 ');
  console.log('═══════════════════════════════════════════════════════════════\n');

  if (!ARENA_TOKEN || !ARENA_USER_SLUG || !GEMINI_API_KEY) {
    console.error('❌ Missing environment variables');
    process.exit(1);
  }

  const prompt = loadPrompt();
  console.log('✅ Loaded prompt from', PROMPT_PATH);

  const client = new ArenaClient(ARENA_TOKEN, ARENA_USER_SLUG);
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  
  // Use Gemini 3 Pro with thinking for best quality
  const model = genAI.getGenerativeModel({ 
    model: 'gemini-3-pro-preview',
    generationConfig: {
      temperature: 0.2,
      maxOutputTokens: 65536,  // Gemini 3 Pro supports up to 65K output
    }
  });
  console.log('🤖 Using Gemini 3 Pro');

  console.log(`\n📂 Channel: ${channelSlug}`);
  if (options.force) console.log('⚠️  Force mode: re-extracting all');
  if (options.limit) console.log(`📊 Limit: ${options.limit}`);

  const existingIds = options.force ? new Set<string>() : loadExistingComponents();
  console.log(`   ${existingIds.size} existing components found`);

  console.log('\n📥 Fetching blocks from Are.na...');
  const allBlocks = await client.getChannelBlocks(channelSlug);
  
  const visualBlocks = allBlocks.filter(b => 
    (b.class === 'Image' || b.class === 'Attachment') &&
    (b.image?.display?.url || b.image?.thumb?.url)
  );
  
  console.log(`   ${visualBlocks.length} visual blocks in channel`);

  let toProcess = visualBlocks.filter(b => !existingIds.has(String(b.id)));
  console.log(`   ${toProcess.length} blocks need processing`);

  if (options.limit && toProcess.length > options.limit) {
    toProcess = toProcess.slice(0, options.limit);
  }

  if (toProcess.length === 0) {
    console.log('\n✅ All blocks already extracted!');
    return;
  }

  console.log('\n🚀 Starting extraction...\n');
  
  const extracted: ExtractedComponent[] = [];
  let success = 0;
  let failed = 0;

  for (let i = 0; i < toProcess.length; i++) {
    const block = toProcess[i];
    const imageUrl = block.image?.display?.url || block.image?.thumb?.url;
    
    console.log(`[${i + 1}/${toProcess.length}] ${block.title || '(untitled)'}`);

    if (!imageUrl) {
      console.log('   ⚠️ No image URL');
      failed++;
      continue;
    }

    console.log('   📥 Downloading image...');
    console.log('   🎨 Generating HTML/CSS...');

    const component = await extractComponent(model, prompt, block.id, imageUrl, block.title);
    
    if (component) {
      saveComponent(component);
      extracted.push(component);
      console.log(`   ✅ ${component.name}`);
      console.log(`      HTML: ${component.render.html.length} chars, CSS: ${component.render.css.length} chars`);
      success++;
    } else {
      console.log('   ❌ Failed');
      failed++;
    }

    // Rate limit - be more conservative with the larger model
    if (i < toProcess.length - 1) {
      await new Promise(r => setTimeout(r, 2000));
    }
  }

  // Load all components and rebuild index
  console.log('\n📊 Building index...');
  const allComponents: ExtractedComponent[] = [];
  
  const files = fs.readdirSync(COMPONENTS_DIR).filter(f => f.endsWith('.json') && f !== 'index.json');
  for (const file of files) {
    const data = JSON.parse(fs.readFileSync(path.join(COMPONENTS_DIR, file), 'utf-8'));
    allComponents.push(data);
  }
  
  const index = buildIndex(allComponents);
  saveIndex(index);

  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('                         ✅ COMPLETE                            ');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log(`\n📊 Results:`);
  console.log(`   Success: ${success}`);
  console.log(`   Failed: ${failed}`);
  console.log(`   Total: ${allComponents.length}`);
  console.log(`\n📁 Output: ${COMPONENTS_DIR}/`);
}

// ============================================================================
// CLI
// ============================================================================

function printUsage() {
  console.log(`
Screenshot to Code Extraction v2

Usage:
  npx tsx cli/extract-component.ts --channel=<slug>              Extract all blocks
  npx tsx cli/extract-component.ts --channel=<slug> --block=<id> Extract single block
  npx tsx cli/extract-component.ts --channel=<slug> --force      Re-extract all
  npx tsx cli/extract-component.ts --channel=<slug> --limit=<n>  Limit to N blocks

Examples:
  npx tsx cli/extract-component.ts --channel=ui-ux-uqgmlf-rw1i
  npx tsx cli/extract-component.ts --channel=ui-ux-uqgmlf-rw1i --block=23645590
  npx tsx cli/extract-component.ts --channel=ui-ux-uqgmlf-rw1i --limit=5 --force
`);
}

async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--help')) {
    printUsage();
    process.exit(0);
  }

  const channelArg = args.find(a => a.startsWith('--channel='));
  const blockArg = args.find(a => a.startsWith('--block='));
  const limitArg = args.find(a => a.startsWith('--limit='));
  const force = args.includes('--force');

  if (!channelArg) {
    console.error('❌ Missing --channel');
    printUsage();
    process.exit(1);
  }

  const channelSlug = channelArg.split('=')[1];

  if (blockArg) {
    const blockId = parseInt(blockArg.split('=')[1], 10);
    await extractSingle(blockId, channelSlug);
  } else {
    const limit = limitArg ? parseInt(limitArg.split('=')[1], 10) : undefined;
    await extractChannel(channelSlug, { force, limit });
  }
}

main().catch(console.error);
