import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import JSZip from 'jszip';
import * as fs from 'fs';
import * as path from 'path';

// ============================================================================
// TYPES
// ============================================================================

interface MatchedBlock {
  block: {
    id: number;
    title: string | null;
    arena_url: string;
    image_url: string | null;
    tags: {
      component?: string[];
      style?: string[];
      context?: string[];
      vibe?: string[];
    };
    one_liner: string;
  };
  score: number;
  matchedTags: {
    component: string[];
    style: string[];
    context: string[];
    vibe: string[];
  };
}

interface ExportRequest {
  matches: MatchedBlock[];
  extractedTags: {
    component?: string[];
    style?: string[];
    context?: string[];
    vibe?: string[];
  };
  imageCount: number;
}

interface StyleGuide {
  common: {
    colors: Record<string, string>;
    typography: Record<string, string>;
    spacing: Record<string, string>;
    elevation: Record<string, string>;
    borders: Record<string, string | number>;
    motion: Record<string, string | number | boolean>;
  };
  contexts: Record<string, any>;
}

interface DistinctiveFeature {
  what_stands_out: string;
  specific_values: string[];
  borrow_this: string;
}

// ============================================================================
// PROMPTS
// ============================================================================

const DISTINCTIVE_FEATURES_PROMPT = `You are a design systems expert. Analyze this UI reference image and identify what makes it DISTINCTIVE.

Focus on specific, actionable details that could be replicated:

1. **what_stands_out**: One sentence about the most unique visual element
2. **specific_values**: Extract 3-5 specific CSS-like values you can see:
   - Border radius (estimate in px)
   - Spacing between elements (estimate in px)
   - Shadow treatment (none/subtle/prominent)
   - Any distinctive colors (hex if visible)
   - Typography weight/size relationships
3. **borrow_this**: One specific technique to borrow (e.g., "the way icons are tinted to match accent color")

Output valid JSON only:
{
  "what_stands_out": "...",
  "specific_values": ["radius ~16px", "card gap 12px", "no shadows, depth from borders only"],
  "borrow_this": "..."
}`;

// ============================================================================
// HELPERS
// ============================================================================

async function downloadImage(url: string): Promise<Buffer | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error('Failed to download image:', url, error);
    return null;
  }
}

function getImageExtension(url: string): string {
  const match = url.match(/\.(jpg|jpeg|png|webp|gif)/i);
  return match ? match[1].toLowerCase() : 'png';
}

function sanitizeFilename(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 30);
}

async function analyzeDistinctiveFeatures(
  imageBuffer: Buffer,
  genAI: GoogleGenerativeAI
): Promise<DistinctiveFeature | null> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const base64 = imageBuffer.toString('base64');
    
    const result = await model.generateContent([
      { text: DISTINCTIVE_FEATURES_PROMPT },
      {
        inlineData: {
          mimeType: 'image/jpeg',
          data: base64,
        },
      },
    ]);

    const response = result.response.text();
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;
    
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Failed to analyze image:', error);
    return null;
  }
}

function loadStyleGuide(): StyleGuide | null {
  try {
    const stylePath = path.join(process.cwd(), '..', 'taste-profiles', 'ui-ux-uqgmlf-rw1i', 'style-guide.json');
    if (!fs.existsSync(stylePath)) return null;
    return JSON.parse(fs.readFileSync(stylePath, 'utf-8'));
  } catch {
    return null;
  }
}

function loadAntiRules(): string | null {
  try {
    const rulesPath = path.join(process.cwd(), '..', 'taste-profiles', 'ui-ux-uqgmlf-rw1i', 'anti-rules.md');
    if (!fs.existsSync(rulesPath)) return null;
    return fs.readFileSync(rulesPath, 'utf-8');
  } catch {
    return null;
  }
}

function extractAntiPatterns(antiRulesContent: string): string[] {
  const patterns: string[] = [];
  
  // Extract high-confidence anti-patterns
  const antiPatternRegex = /### ❌ (.+?)\n\*\*Confidence:\*\* high/g;
  let match;
  while ((match = antiPatternRegex.exec(antiRulesContent)) !== null) {
    patterns.push(match[1]);
  }
  
  return patterns;
}

function generateDesignSpec(
  matches: MatchedBlock[],
  extractedTags: ExportRequest['extractedTags'],
  imageCount: number,
  styleGuide: StyleGuide | null,
  antiPatterns: string[],
  distinctiveFeatures: Map<number, DistinctiveFeature>
): string {
  let spec = `# Design Spec for Your Build\n\n`;
  spec += `Generated from ${imageCount} screenshot(s) matched against your Are.na UI/UX references.\n\n`;

  // Tags summary
  const allTags = [
    ...(extractedTags.component || []),
    ...(extractedTags.style || []),
    ...(extractedTags.context || []),
    ...(extractedTags.vibe || []),
  ];
  spec += `**What you're building:** ${allTags.join(', ')}\n\n`;

  spec += `---\n\n`;

  // Extract specific values from style guide
  if (styleGuide) {
    spec += `## Design Tokens (from your taste profile)\n\n`;
    
    // Colors
    spec += `### Colors\n`;
    const colors = styleGuide.common.colors;
    if (colors.background_primary && colors.background_primary !== '#N/A') {
      spec += `- **Background:** ${colors.background_primary}\n`;
    }
    if (colors.background_card && colors.background_card !== '#N/A') {
      spec += `- **Card surface:** ${colors.background_card}\n`;
    }
    if (colors.text_primary && colors.text_primary !== '#N/A') {
      spec += `- **Text primary:** ${colors.text_primary}\n`;
    }
    if (colors.text_secondary && colors.text_secondary !== '#N/A') {
      spec += `- **Text secondary:** ${colors.text_secondary}\n`;
    }
    if (colors.accent_primary && colors.accent_primary !== '#N/A') {
      spec += `- **Accent (CTAs only):** ${colors.accent_primary}\n`;
    }
    spec += `\n`;

    // Typography
    spec += `### Typography\n`;
    const typo = styleGuide.common.typography;
    spec += `- **Font vibe:** ${typo.family_vibe || 'system'}\n`;
    spec += `- **Heading weight:** ${typo.heading_weight || '600'}\n`;
    spec += `- **Body weight:** ${typo.body_weight || '400'}\n`;
    spec += `- **Size hierarchy:** ${typo.size_hierarchy || 'moderate'}\n`;
    spec += `\n`;

    // Spacing & Borders
    spec += `### Spacing & Shape\n`;
    const spacing = styleGuide.common.spacing;
    const borders = styleGuide.common.borders;
    spec += `- **Density:** ${spacing.density || 'balanced'}\n`;
    spec += `- **Card padding:** ${spacing.card_padding || 'medium'}\n`;
    spec += `- **Border radius:** ${borders.radius_px || 12}px (${borders.radius_category || 'rounded'})\n`;
    spec += `- **Border usage:** ${borders.border_usage || 'subtle'}\n`;
    spec += `\n`;

    // Elevation
    spec += `### Elevation\n`;
    const elevation = styleGuide.common.elevation;
    spec += `- **Shadows:** ${elevation.shadow_presence || 'subtle'}\n`;
    spec += `- **Layering:** ${elevation.layering || 'flat'}\n`;
    spec += `\n`;

    // Motion
    spec += `### Motion\n`;
    const motion = styleGuide.common.motion;
    spec += `- **Transitions:** ${motion.duration_ms || 200}ms ${motion.easing || 'ease-out'}\n`;
    spec += `- **Hover effect:** ${motion.hover_effect || 'lift'}\n`;
    spec += `\n`;
  }

  spec += `---\n\n`;

  // Reference images with distinctive features
  spec += `## Attached Reference Images\n\n`;
  spec += `**How to use:** Attach these images to your Cursor/Claude conversation so the AI can actually SEE them.\n\n`;

  matches.forEach((match, i) => {
    const priority = i === 0 ? 'PRIMARY - match this 80%' : i === 1 ? 'SECONDARY - borrow specific elements' : 'TERTIARY - for additional context';
    const filename = `ref-${i + 1}-${sanitizeFilename(match.block.one_liner)}.${getImageExtension(match.block.image_url || '')}`;
    
    spec += `### ${filename}\n`;
    spec += `**Priority:** ${priority}\n`;
    spec += `**What it shows:** ${match.block.one_liner}\n`;
    spec += `**Match score:** ${Math.round(match.score * 10)}% (${[...match.matchedTags.component, ...match.matchedTags.style].join(', ')})\n`;
    
    // Add distinctive features if available
    const features = distinctiveFeatures.get(match.block.id);
    if (features) {
      spec += `\n**What stands out:** ${features.what_stands_out}\n`;
      spec += `**Specific values observed:**\n`;
      features.specific_values.forEach(v => {
        spec += `  - ${v}\n`;
      });
      spec += `**Borrow this:** ${features.borrow_this}\n`;
    }
    
    spec += `\n---\n\n`;
  });

  // Anti-patterns section
  if (antiPatterns.length > 0) {
    spec += `## DO NOT (based on your taste profile)\n\n`;
    antiPatterns.forEach(pattern => {
      spec += `- ❌ ${pattern}\n`;
    });
    spec += `\n`;
  }

  // Usage instructions
  spec += `---\n\n`;
  spec += `## How to Use This Pack\n\n`;
  spec += `1. **Attach all ref-*.{jpg,png} images** to your Cursor/Claude conversation\n`;
  spec += `2. **Paste this spec** as context\n`;
  spec += `3. **Describe what you want** and reference specific images:\n`;
  spec += `   - "Make the cards look like ref-1"\n`;
  spec += `   - "Use the color scheme from ref-2"\n`;
  spec += `   - "Borrow the nav treatment from ref-3"\n`;
  spec += `4. **The AI can now SEE the actual designs** instead of just reading descriptions\n`;

  return spec;
}

// ============================================================================
// API HANDLER
// ============================================================================

export async function POST(request: NextRequest) {
  try {
    const body: ExportRequest = await request.json();
    const { matches, extractedTags, imageCount } = body;

    if (!matches || matches.length === 0) {
      return NextResponse.json({ error: 'No matches provided' }, { status: 400 });
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
      return NextResponse.json({ error: 'GEMINI_API_KEY not configured' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

    // Limit to top 4 references (more is noisy)
    const topMatches = matches.slice(0, 4);

    // Create ZIP
    const zip = new JSZip();

    // Download images and analyze distinctive features in parallel
    const imageDownloads: Promise<{ match: MatchedBlock; buffer: Buffer | null; features: DistinctiveFeature | null }>[] = [];

    for (const match of topMatches) {
      if (match.block.image_url) {
        imageDownloads.push(
          (async () => {
            const buffer = await downloadImage(match.block.image_url!);
            let features: DistinctiveFeature | null = null;
            
            if (buffer) {
              features = await analyzeDistinctiveFeatures(buffer, genAI);
            }
            
            return { match, buffer, features };
          })()
        );
      }
    }

    const downloadResults = await Promise.all(imageDownloads);

    // Add images to ZIP and collect features
    const distinctiveFeatures = new Map<number, DistinctiveFeature>();
    
    downloadResults.forEach((result, i) => {
      if (result.buffer) {
        const ext = getImageExtension(result.match.block.image_url || '');
        const filename = `ref-${i + 1}-${sanitizeFilename(result.match.block.one_liner)}.${ext}`;
        zip.file(filename, result.buffer);
        
        if (result.features) {
          distinctiveFeatures.set(result.match.block.id, result.features);
        }
      }
    });

    // Load style guide and anti-rules
    const styleGuide = loadStyleGuide();
    const antiRulesContent = loadAntiRules();
    const antiPatterns = antiRulesContent ? extractAntiPatterns(antiRulesContent) : [];

    // Generate the design spec
    const spec = generateDesignSpec(
      topMatches,
      extractedTags,
      imageCount,
      styleGuide,
      antiPatterns,
      distinctiveFeatures
    );

    // Add spec to ZIP
    zip.file('DESIGN_SPEC.md', spec);

    // Generate ZIP buffer
    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });

    // Return as downloadable file
    return new NextResponse(zipBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename="reference-pack.zip"',
      },
    });

  } catch (error: any) {
    console.error('Export pack error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

