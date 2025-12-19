import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ArenaClient } from './arena-client.js';
import * as fs from 'fs';
import * as path from 'path';

// ============================================================================
// CONFIGURATION
// ============================================================================

const ARENA_TOKEN = process.env.ARENA_TOKEN;
const ARENA_USER_SLUG = process.env.ARENA_USER_SLUG;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const OUTPUT_DIR = 'implementation-guides';

// ============================================================================
// PROMPT TYPES
// ============================================================================

type PromptType = 'ui-ux' | 'framework';

// ============================================================================
// PROMPTS
// ============================================================================

const FRAMEWORK_PROMPT = `You are extracting IMPLEMENTATION KNOWLEDGE from a framework, mental model, or thinking tool.

Your output should be a guide that someone could paste into a system prompt 
and immediately APPLY this framework to their work - without seeing the original.

Think like a cognitive toolkit builder: what are the RULES that make this framework useful?

=== OUTPUT FORMAT ===

## [NAME]
A memorable 2-4 word handle (e.g., "Headline-First Strategy", "Leverage Point Mapping", "Inversion Protocol")

## Essence
One sentence capturing the CORE INSIGHT of this framework. What's the mental shift it enables?

## The Framework

### Core Structure
What is the actual framework? Describe it precisely:
- If it's a 2x2 matrix: what are the axes?
- If it's a process: what are the steps?
- If it's a lens: what does it focus attention on?
- If it's a checklist: what are the items?

### Key Questions
The questions you ask yourself when applying this framework:
1. [Question that initiates the framework]
2. [Question that deepens analysis]
3. [Question that leads to action]

### The Process
Step-by-step application:
1. **Start with**: [first action]
2. **Then**: [second action]
3. **Finally**: [output/decision]

## Use This When
Be specific about situations where this framework EXCELS:
- [Decision type + why]
- [Problem type + why]
- [Context + why]

## Avoid This When
Be specific about situations where this framework FAILS or misleads:
- [Situation + why it breaks]
- [Situation + why it breaks]
- [Common misapplication]

## Common Mistakes
How people typically misuse this framework:
- **Mistake**: [what they do wrong]
  **Fix**: [how to do it right]
- **Mistake**: [what they do wrong]
  **Fix**: [how to do it right]

## Adaptation Recipes

### → For Quick Decisions (< 5 min)
Compressed version of the framework for time-pressure:
- [Simplified step 1]
- [Simplified step 2]

### → For Deep Analysis (1+ hour)
Expanded version for thorough application:
- [Additional consideration 1]
- [Additional consideration 2]

### → For Team Settings
How to use this framework collaboratively:
- [Facilitation tip]
- [Common team pitfall to avoid]

### → Combined With Other Frameworks
Frameworks that pair well with this one:
- [Complementary framework + why]
- [Framework to use before/after + why]

## System Prompt Snippet
A ready-to-paste instruction for an AI assistant:

\\\`\\\`\\\`
When I ask you to apply [FRAMEWORK NAME], follow this process:
1. [First step]
2. [Second step]
3. [Output format]

Key questions to address:
- [Question 1]
- [Question 2]

Avoid: [Common mistake to watch for]
\\\`\\\`\\\`

---

=== CRITICAL RULES ===

1. **ACTIONABLE > DESCRIPTIVE**. Don't explain what the framework IS - explain how to USE it. "Ask yourself X" not "The framework suggests X".

2. **QUESTIONS ARE POWER**. The key questions section is often the most valuable. Get these right.

3. **PROCESS MUST BE CONCRETE**. Vague steps like "analyze the situation" are useless. Say exactly what to do.

4. **USE/AVOID ARE CRITICAL**. Frameworks aren't universal. Be opinionated about when they work and when they mislead.

5. **MISTAKES SECTION MATTERS**. Most frameworks fail in predictable ways. Call these out explicitly.

6. **SYSTEM PROMPT SNIPPET**. This should be directly pasteable into an AI assistant's instructions.

7. **EXTRACT THE INSIGHT, NOT THE FORMAT**. If it's a diagram, extract the thinking it enables, not the visual layout.`;

const UI_UX_PROMPT = `You are extracting IMPLEMENTATION KNOWLEDGE from a UI reference.

Your output should be a guide that someone could paste into a system prompt 
and immediately build something in this style - without ever seeing the original image.

Think like a design system architect: what are the RULES that make this work?

=== OUTPUT FORMAT ===

## [NAME]
A memorable 2-4 word handle (e.g., "Material-First Mobile", "Soft Data Dashboard", "Editorial Minimalism")

## Essence
One sentence capturing WHY this works, not just what it looks like. What's the core design principle?

## Key Techniques

### Surface Treatment
How do containers and backgrounds behave? BE SPECIFIC with CSS:

\`\`\`css
/* Background */
background: [exact approach - solid color, gradient, texture];

/* Containers */  
border-radius: [exact value like 12px, 16px, 24px, or 9999px for pills];
box-shadow: [exact shadow values];
border: [if present];

/* The cohesion recipe - what makes elements feel unified */
\`\`\`

### Typography System
- Font approach: [serif + sans, all geometric sans, humanist, etc.]
- Size scale: [approximate sizes for h1/h2/body/labels]
- Weight usage: [when bold vs regular vs light]
- Distinctive moves: [pill badges, all-caps labels, letter-spacing tricks]
- Color treatment: [how text color varies - primary/secondary/muted values]

### Color Logic
- Mode: [light/dark]
- Background: [specific color or approach]
- Text: [primary and secondary colors]
- Accent: [color and WHERE it appears - buttons only? highlights? badges?]
- The rule: [one sentence on how color creates hierarchy]

### Layout & Spacing
- Density: [minimal/balanced/dense] - why it works here
- Grid/spacing unit: [8px, 16px base, etc.]
- Container padding: [internal spacing]
- Gap between elements: [spacing between cards/sections]
- Chunking strategy: [how information is grouped]

### Component Patterns
Steal these specific patterns:
- **Navigation**: [exact approach - bottom tabs with X style icons, sidebar, etc.]
- **Buttons**: [shape, fill approach, specific radius]
- **Cards**: [if present - how they're constructed]
- **Data display**: [how metrics/numbers are shown]
- **Icons**: [outlined/filled, weight, any distinctive treatment]

## Use This When
Be specific about contexts where this EXCELS:
- [Product type + why]
- [User type + why]  
- [Data characteristics + why]
- [Emotional goal + why]

## Avoid This When
Be specific about contexts where this FAILS:
- [Situation + why it breaks]
- [Situation + why it breaks]
- [Situation + why it breaks]

## Adaptation Recipes

### → Dashboard
Specific changes to make this work for data-heavy interfaces:
- [Concrete adjustment 1]
- [Concrete adjustment 2]

### → Landing Page  
Specific changes for marketing/conversion:
- [Concrete adjustment 1]
- [Concrete adjustment 2]

### → Mobile ↔ Web
Platform-specific adjustments:
- [Mobile: specific change]
- [Web: specific change]

### → Invert Color Mode
If this is light mode, how to make it dark (or vice versa):
- [Specific color inversions]
- [Shadow/depth adjustments]
- [What stays the same]

---

=== CRITICAL RULES ===

1. **CSS VALUES ARE REQUIRED** for surface treatment. Don't say "rounded corners" - say "border-radius: 16px". Don't say "subtle shadow" - say "box-shadow: 0 2px 8px rgba(0,0,0,0.06)".

2. **TRANSFERABLE > SPECIFIC**. Extract the SYSTEM, not the specifics. "Accent color only on primary CTAs and active states" is better than "use #3B82F6".

3. **INDEPENDENCE TEST**: Could someone implement this style without seeing the image? If not, add more detail.

4. **USE/AVOID ARE CRITICAL**. These turn a description into a decision tool. Be opinionated.

5. **ADAPTATION = RECIPES**. Don't say "adjust for mobile". Say "increase touch targets to 44px, stack cards vertically, move nav to bottom".

6. **IDENTIFY THE SYSTEM**. If multiple screens shown, what's CONSISTENT? That's the design language.

7. **ACTIONABLE VOICE**. Write as instructions to a developer. "Use X" not "The design uses X".`;

// ============================================================================
// TYPES
// ============================================================================

interface BlockInfo {
  id: number;
  title: string | null;
  arena_url: string;
  image_url: string;
}

interface ExtractionResult {
  block: BlockInfo;
  guide: string;
  extracted_at: string;
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

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 50);
}

function loadExistingGuides(channelSlug: string): Set<number> {
  const dir = path.join(OUTPUT_DIR, channelSlug);
  if (!fs.existsSync(dir)) return new Set();
  
  const files = fs.readdirSync(dir);
  const ids = new Set<number>();
  
  for (const file of files) {
    const match = file.match(/^(\d+)-/);
    if (match) {
      ids.add(parseInt(match[1], 10));
    }
  }
  
  return ids;
}

function saveGuide(channelSlug: string, block: BlockInfo, guide: string): string {
  const dir = path.join(OUTPUT_DIR, channelSlug);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  const titleSlug = block.title ? slugify(block.title) : 'untitled';
  const filename = `${block.id}-${titleSlug}.md`;
  const filepath = path.join(dir, filename);
  
  const content = `# Implementation Guide

> **Source:** ${block.arena_url}
> **Title:** ${block.title || '(untitled)'}
> **Generated:** ${new Date().toISOString()}

---

${guide}
`;
  
  fs.writeFileSync(filepath, content);
  return filepath;
}

// ============================================================================
// EXTRACTION
// ============================================================================

async function extractFromBlock(
  model: any,
  block: BlockInfo,
  prompt: string
): Promise<string | null> {
  const imageData = await downloadImage(block.image_url);
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

    return result.response.text();
  } catch (error: any) {
    console.error(`      ❌ Gemini error: ${error.message}`);
    return null;
  }
}

// ============================================================================
// MAIN COMMANDS
// ============================================================================

async function extractSingle(blockId: number, channelSlug: string, promptType: PromptType = 'ui-ux') {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('          IMPLEMENTATION GUIDE EXTRACTION (Single)              ');
  console.log('═══════════════════════════════════════════════════════════════\n');

  if (!ARENA_TOKEN || !ARENA_USER_SLUG || !GEMINI_API_KEY) {
    console.error('❌ Missing environment variables (ARENA_TOKEN, ARENA_USER_SLUG, GEMINI_API_KEY)');
    process.exit(1);
  }

  const client = new ArenaClient(ARENA_TOKEN, ARENA_USER_SLUG);
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ 
    model: 'gemini-2.0-flash',
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 4096,
    }
  });

  const prompt = getPrompt(promptType);
  console.log(`📦 Fetching block ${blockId}...`);
  console.log(`📝 Using prompt type: ${promptType}`);
  
  // Fetch all blocks from channel to find the one we want
  const blocks = await client.getChannelBlocks(channelSlug);
  const block = blocks.find(b => b.id === blockId);
  
  if (!block) {
    console.error(`❌ Block ${blockId} not found in channel ${channelSlug}`);
    process.exit(1);
  }

  const imageUrl = block.image?.display?.url || block.image?.thumb?.url;
  if (!imageUrl) {
    console.error('❌ Block has no image');
    process.exit(1);
  }

  const blockInfo: BlockInfo = {
    id: block.id,
    title: block.title,
    arena_url: `https://www.are.na/block/${block.id}`,
    image_url: imageUrl,
  };

  console.log(`   Title: ${block.title || '(untitled)'}`);
  console.log(`   URL: ${blockInfo.arena_url}`);
  console.log('\n🤖 Extracting implementation guide...');

  const guide = await extractFromBlock(model, blockInfo, prompt);
  
  if (!guide) {
    console.error('❌ Failed to extract guide');
    process.exit(1);
  }

  const filepath = saveGuide(channelSlug, blockInfo, guide);
  
  console.log(`\n✅ Saved to: ${filepath}`);
  console.log('\n═══════════════════════════════════════════════════════════════');
}

async function extractChannel(channelSlug: string, options: { force?: boolean; limit?: number; promptType?: PromptType } = {}) {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('          IMPLEMENTATION GUIDE EXTRACTION (Channel)             ');
  console.log('═══════════════════════════════════════════════════════════════\n');

  if (!ARENA_TOKEN || !ARENA_USER_SLUG || !GEMINI_API_KEY) {
    console.error('❌ Missing environment variables (ARENA_TOKEN, ARENA_USER_SLUG, GEMINI_API_KEY)');
    process.exit(1);
  }

  const client = new ArenaClient(ARENA_TOKEN, ARENA_USER_SLUG);
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ 
    model: 'gemini-2.0-flash',
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 4096,
    }
  });

  const promptType = options.promptType || detectPromptType(channelSlug);
  const prompt = getPrompt(promptType);

  console.log(`📂 Channel: ${channelSlug}`);
  console.log(`📝 Prompt type: ${promptType}`);
  if (options.force) console.log('⚠️  Force mode: re-extracting all blocks');
  if (options.limit) console.log(`📊 Limit: ${options.limit} blocks`);

  // Load existing guides
  const existingIds = options.force ? new Set<number>() : loadExistingGuides(channelSlug);
  console.log(`   ${existingIds.size} existing guides found`);

  // Fetch blocks
  console.log('\n📥 Fetching blocks from Are.na...');
  const allBlocks = await client.getChannelBlocks(channelSlug);
  
  // Filter to visual blocks only
  const visualBlocks = allBlocks.filter(b => 
    (b.class === 'Image' || b.class === 'Attachment') &&
    (b.image?.display?.url || b.image?.thumb?.url)
  );
  
  console.log(`   ${visualBlocks.length} visual blocks in channel`);

  // Filter out already processed
  let toProcess = visualBlocks.filter(b => !existingIds.has(b.id));
  console.log(`   ${toProcess.length} blocks need processing`);

  // Apply limit
  if (options.limit && toProcess.length > options.limit) {
    toProcess = toProcess.slice(0, options.limit);
    console.log(`   Processing first ${options.limit} blocks`);
  }

  if (toProcess.length === 0) {
    console.log('\n✅ All blocks already have implementation guides!');
    return;
  }

  // Process each block
  console.log('\n🚀 Starting extraction...\n');
  
  let success = 0;
  let failed = 0;

  for (let i = 0; i < toProcess.length; i++) {
    const block = toProcess[i];
    const imageUrl = block.image?.display?.url || block.image?.thumb?.url;
    
    console.log(`[${i + 1}/${toProcess.length}] ${block.title || '(untitled)'}`);
    console.log(`   ID: ${block.id}`);

    if (!imageUrl) {
      console.log('   ⚠️ No image URL, skipping');
      failed++;
      continue;
    }

    const blockInfo: BlockInfo = {
      id: block.id,
      title: block.title,
      arena_url: `https://www.are.na/block/${block.id}`,
      image_url: imageUrl,
    };

    console.log('   Downloading image...');
    console.log('   Calling Gemini...');

    const guide = await extractFromBlock(model, blockInfo, prompt);
    
    if (guide) {
      const filepath = saveGuide(channelSlug, blockInfo, guide);
      console.log(`   ✅ Saved: ${path.basename(filepath)}`);
      success++;
    } else {
      console.log('   ❌ Failed to extract');
      failed++;
    }

    // Rate limit - be nice to Gemini
    if (i < toProcess.length - 1) {
      await new Promise(r => setTimeout(r, 1500));
    }
  }

  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('                         ✅ COMPLETE                            ');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log(`\n📊 Results:`);
  console.log(`   Success: ${success}`);
  console.log(`   Failed: ${failed}`);
  console.log(`   Total guides: ${existingIds.size + success}`);
  console.log(`\n📁 Output: ${OUTPUT_DIR}/${channelSlug}/`);
}

// ============================================================================
// CLI
// ============================================================================

// ============================================================================
// PROMPT SELECTION
// ============================================================================

function detectPromptType(channelSlug: string): PromptType {
  const slug = channelSlug.toLowerCase();
  if (slug.includes('ui') || slug.includes('ux') || slug.includes('design')) {
    return 'ui-ux';
  }
  if (slug.includes('framework') || slug.includes('strategy') || slug.includes('thinking')) {
    return 'framework';
  }
  // Default to ui-ux for visual content
  return 'ui-ux';
}

function getPrompt(type: PromptType): string {
  switch (type) {
    case 'framework':
      return FRAMEWORK_PROMPT;
    case 'ui-ux':
    default:
      return UI_UX_PROMPT;
  }
}

function printUsage() {
  console.log(`
Usage:
  npx tsx cli/extract-implementation.ts --channel=<slug>              Extract all blocks in channel
  npx tsx cli/extract-implementation.ts --channel=<slug> --block=<id> Extract single block
  npx tsx cli/extract-implementation.ts --channel=<slug> --force      Re-extract all (overwrite)
  npx tsx cli/extract-implementation.ts --channel=<slug> --limit=<n>  Process only first N blocks
  npx tsx cli/extract-implementation.ts --channel=<slug> --type=<type> Specify prompt type

Options:
  --channel=<slug>  Channel slug (required)
  --block=<id>      Single block ID to extract
  --force           Re-extract even if guide exists
  --limit=<n>       Limit number of blocks to process
  --type=<type>     Prompt type: 'ui-ux' or 'framework' (auto-detected if not specified)

Examples:
  npx tsx cli/extract-implementation.ts --channel=ui-ux-uqgmlf-rw1i
  npx tsx cli/extract-implementation.ts --channel=frameworks-r-dqkw8yxcm --type=framework
  npx tsx cli/extract-implementation.ts --channel=ui-ux-uqgmlf-rw1i --block=30824434
  npx tsx cli/extract-implementation.ts --channel=ui-ux-uqgmlf-rw1i --limit=5
`);
}

async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    printUsage();
    process.exit(0);
  }

  const channelArg = args.find(a => a.startsWith('--channel='));
  const blockArg = args.find(a => a.startsWith('--block='));
  const limitArg = args.find(a => a.startsWith('--limit='));
  const typeArg = args.find(a => a.startsWith('--type='));
  const force = args.includes('--force');

  if (!channelArg) {
    console.error('❌ Missing --channel argument');
    printUsage();
    process.exit(1);
  }

  const channelSlug = channelArg.split('=')[1];
  
  // Determine prompt type
  let promptType: PromptType;
  if (typeArg) {
    const typeValue = typeArg.split('=')[1] as PromptType;
    if (typeValue !== 'ui-ux' && typeValue !== 'framework') {
      console.error('❌ Invalid --type. Must be "ui-ux" or "framework"');
      process.exit(1);
    }
    promptType = typeValue;
  } else {
    promptType = detectPromptType(channelSlug);
  }

  if (blockArg) {
    const blockId = parseInt(blockArg.split('=')[1], 10);
    if (isNaN(blockId)) {
      console.error('❌ Invalid block ID');
      process.exit(1);
    }
    await extractSingle(blockId, channelSlug, promptType);
  } else {
    const limit = limitArg ? parseInt(limitArg.split('=')[1], 10) : undefined;
    await extractChannel(channelSlug, { force, limit, promptType });
  }
}

main().catch(console.error);

