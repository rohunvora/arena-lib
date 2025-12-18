/**
 * Reference Matcher API
 * 
 * Takes a WIP screenshot, extracts semantic tags, and finds matching references
 * from the indexed Are.na library.
 * 
 * Flow:
 * 1. Receive base64 image from client
 * 2. Call Gemini to extract tags (component/style/context/vibe)
 * 3. Score all indexed blocks by tag overlap
 * 4. Generate human-readable explanations for top matches
 * 5. Return matches with explanations
 */

import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import * as fs from 'fs';
import * as path from 'path';

// ============================================================================
// TYPES
// ============================================================================

interface BlockIndex {
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
  indexed_at: string;
}

interface ChannelIndex {
  channel_slug: string;
  channel_title: string;
  indexed_at: string;
  blocks: BlockIndex[];
}

interface MatchResult {
  block: BlockIndex;
  score: number;
  matchedTags: {
    component: string[];
    style: string[];
    context: string[];
    vibe: string[];
  };
  relevanceNote: string;  // Human-readable explanation
}

// ============================================================================
// TAG EXTRACTION PROMPT (same taxonomy as indexer)
// ============================================================================

const TAG_PROMPT = `You are a design librarian. Analyze this UI/UX screenshot and output tags.

## Tag Categories

### component (what UI elements are shown)
Options: hero, navbar, footer, sidebar, cards, dashboard, metrics, charts, form, modal, toast, button, cta, pricing, testimonials, feature-grid, bento, gallery, profile, settings, onboarding, empty-state, error-state, loading, search, filters, table, list, timeline, calendar, map

### style (visual treatment)
Options: dark-mode, light-mode, glassmorphism, neumorphism, brutalist, minimal, maximal, rounded, sharp, gradient, flat, 3d, illustrated, photographic, geometric, organic, high-contrast, muted, neon, pastel, monochrome, duotone

### context (where would this be used)
Options: landing-page, saas, mobile-app, desktop-app, marketing, e-commerce, fintech, health, productivity, social, media, developer-tools, b2b, b2c, enterprise, startup, portfolio, blog, docs

### vibe (emotional quality)
Options: playful, serious, premium, budget, trustworthy, edgy, calm, energetic, friendly, professional, futuristic, retro, warm, cold, confident, humble, bold, subtle

## Rules
- Output 2-5 tags per category (only what clearly applies)
- Skip categories if uncertain
- Be specific over generic
- Output valid JSON only

## Output Format
{
  "component": ["..."],
  "style": ["..."],
  "context": ["..."],
  "vibe": ["..."],
  "one_liner": "One sentence describing what this is"
}`;

// ============================================================================
// MATCHING LOGIC
// ============================================================================

const WEIGHTS = {
  component: 3,    // Most important for relevance
  context: 2,      // Where it's used matters
  style: 1.5,      // Visual treatment
  vibe: 1,         // Emotional quality
};

function calculateMatchScore(
  queryTags: BlockIndex['tags'],
  blockTags: BlockIndex['tags']
): { score: number; matched: { component: string[]; style: string[]; context: string[]; vibe: string[] } } {
  let totalScore = 0;
  const matched = {
    component: [] as string[],
    style: [] as string[],
    context: [] as string[],
    vibe: [] as string[],
  };

  // For each category
  for (const category of ['component', 'style', 'context', 'vibe'] as const) {
    const querySet = new Set(queryTags[category] || []);
    const blockSet = blockTags[category] || [];
    
    for (const tag of blockSet) {
      if (querySet.has(tag)) {
        totalScore += WEIGHTS[category];
        matched[category].push(tag);
      }
    }
  }

  return { score: totalScore, matched };
}

// ============================================================================
// HUMAN-READABLE EXPLANATION GENERATION
// ============================================================================

const EXPLANATION_PROMPT = `You are helping a designer understand why a reference image matches their work-in-progress.

Given:
- What they're building: "{queryDescription}"
- Reference description: "{matchDescription}"
- Overlapping qualities: {matchedTags}

Write ONE short sentence (max 12 words) explaining why this reference is relevant.

Rules:
- Be specific about what's similar (layout, spacing, visual treatment, etc.)
- Avoid generic phrases like "similar design" or "matches well"
- Focus on actionable visual qualities they could borrow
- Don't mention the tag names directly, describe what they mean visually

Examples of good explanations:
- "Clean card layout with generous whitespace and thin borders"
- "Same metrics-heavy dashboard with subtle grid structure"
- "Matching dark theme with high-contrast accent colors"

Output ONLY the explanation sentence, nothing else.`;

async function generateHumanExplanations(
  model: GenerativeModel,
  queryOneLiner: string,
  matches: Array<{ block: BlockIndex; matchedTags: { component: string[]; style: string[]; context: string[]; vibe: string[] } }>
): Promise<Map<number, string>> {
  const explanations = new Map<number, string>();
  
  // Generate explanations in parallel for speed
  const explanationPromises = matches.map(async (match) => {
    const matchedTagsList = [
      ...match.matchedTags.component,
      ...match.matchedTags.style,
      ...match.matchedTags.context,
      ...match.matchedTags.vibe,
    ];
    
    const prompt = EXPLANATION_PROMPT
      .replace('{queryDescription}', queryOneLiner)
      .replace('{matchDescription}', match.block.one_liner)
      .replace('{matchedTags}', matchedTagsList.join(', '));
    
    try {
      const result = await model.generateContent(prompt);
      const explanation = result.response.text().trim();
      // Clean up any quotes or extra formatting
      const cleaned = explanation.replace(/^["']|["']$/g, '').trim();
      return { id: match.block.id, explanation: cleaned };
    } catch (error) {
      // Fallback to a simple description based on matched tags
      const fallback = matchedTagsList.length > 0 
        ? `Similar ${matchedTagsList.slice(0, 3).join(', ')} approach`
        : 'Related visual reference';
      return { id: match.block.id, explanation: fallback };
    }
  });
  
  const results = await Promise.all(explanationPromises);
  results.forEach(({ id, explanation }) => {
    explanations.set(id, explanation);
  });
  
  return explanations;
}

// ============================================================================
// API HANDLER
// ============================================================================

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json();
    
    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
      return NextResponse.json({ error: 'GEMINI_API_KEY not configured' }, { status: 500 });
    }

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    // Extract base64 data and mime type
    const dataUrlParts = image.match(/^data:(.+);base64,(.+)$/);
    if (!dataUrlParts) {
      return NextResponse.json({ error: 'Invalid image format' }, { status: 400 });
    }
    const [, mimeType, base64Data] = dataUrlParts;

    // Call Gemini to extract tags
    const result = await model.generateContent([
      { text: TAG_PROMPT },
      {
        inlineData: {
          mimeType,
          data: base64Data,
        },
      },
    ]);

    const response = result.response.text();
    
    // Parse JSON from response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ error: 'Failed to extract tags' }, { status: 500 });
    }

    const extractedTags = JSON.parse(jsonMatch[0]) as {
      component?: string[];
      style?: string[];
      context?: string[];
      vibe?: string[];
      one_liner?: string;
    };

    // Load the index
    // In production (Vercel): look in web/data/
    // In development: look in taste-profiles/ (parent directory)
    const prodIndexPath = path.join(process.cwd(), 'data', 'index.json');
    const devIndexPath = path.join(process.cwd(), '..', 'taste-profiles', 'ui-ux-uqgmlf-rw1i', 'index.json');
    const indexPath = fs.existsSync(prodIndexPath) ? prodIndexPath : devIndexPath;
    
    if (!fs.existsSync(indexPath)) {
      return NextResponse.json({ 
        error: 'Index not found. Run: npm run index-blocks -- --channel=ui-ux-uqgmlf-rw1i' 
      }, { status: 500 });
    }

    const index: ChannelIndex = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));

    // Score all blocks
    const scoredMatches: Array<{
      block: BlockIndex;
      score: number;
      matchedTags: { component: string[]; style: string[]; context: string[]; vibe: string[] };
    }> = [];
    
    for (const block of index.blocks) {
      const { score, matched } = calculateMatchScore(extractedTags, block.tags);
      
      if (score > 0) {
        scoredMatches.push({
          block,
          score,
          matchedTags: matched,
        });
      }
    }

    // Sort by score descending
    scoredMatches.sort((a, b) => b.score - a.score);

    // Take top 6 for explanation generation
    const topScoredMatches = scoredMatches.slice(0, 6);

    // Generate human-readable explanations for top matches
    const explanations = await generateHumanExplanations(
      model,
      extractedTags.one_liner || 'UI design',
      topScoredMatches
    );

    // Build final results with explanations
    const topMatches: MatchResult[] = topScoredMatches.map(match => ({
      block: match.block,
      score: match.score,
      matchedTags: match.matchedTags,
      relevanceNote: explanations.get(match.block.id) || 'Related visual reference',
    }));

    return NextResponse.json({
      extractedTags,
      oneLiner: extractedTags.one_liner,
      matches: topMatches,
      totalIndexed: index.blocks.length,
    });

  } catch (error: any) {
    console.error('Match error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

