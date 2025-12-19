import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as fs from 'fs';
import * as path from 'path';

// ============================================================================
// CONFIGURATION
// ============================================================================

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Test blocks - diverse selection from UI/UX channel
const TEST_BLOCKS = [
  {
    id: 30824434,
    name: 'Dark Mode Budget App',
    description: 'Dark mode fintech mobile app',
    image_url: 'https://images.are.na/eyJidWNrZXQiOiJhcmVuYV9pbWFnZXMiLCJrZXkiOiIzMDgyNDQzNC9vcmlnaW5hbF9kNzQ3ZjUwMDYyMWNjYzJjMDQ0ZDY1NzA2NGY3NDQ1Yy5qcGciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjEyMDAsImhlaWdodCI6MTIwMCwiZml0IjoiaW5zaWRlIiwid2l0aG91dEVubGFyZ2VtZW50Ijp0cnVlfSwid2VicCI6eyJxdWFsaXR5Ijo3NX0sImpwZWciOnsicXVhbGl0eSI6NzV9LCJyb3RhdGUiOm51bGx9fQ==?bc=0',
  },
  {
    id: 24453799,
    name: 'Infomercial Hero Guidance',
    description: 'Landing page hero strategy diagram',
    image_url: 'https://images.are.na/eyJidWNrZXQiOiJhcmVuYV9pbWFnZXMiLCJrZXkiOiIyNDQ1Mzc5OS9vcmlnaW5hbF9kZWRhNzM5NTVlOGJlYWYxNzRkNjQyNmFiMzc2YjdmMy5wbmciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjEyMDAsImhlaWdodCI6MTIwMCwiZml0IjoiaW5zaWRlIiwid2l0aG91dEVubGFyZ2VtZW50Ijp0cnVlfSwid2VicCI6eyJxdWFsaXR5Ijo3NX0sImpwZWciOnsicXVhbGl0eSI6NzV9LCJyb3RhdGUiOm51bGx9fQ==?bc=0',
  },
  {
    id: 25241803,
    name: 'Kinsta Dashboard',
    description: 'Web hosting SaaS dashboard',
    image_url: 'https://images.are.na/eyJidWNrZXQiOiJhcmVuYV9pbWFnZXMiLCJrZXkiOiIyNTI0MTgwMy9vcmlnaW5hbF9jZmZhZjQ0OTQwN2IzMDEwMmEzOWQxODYwY2UwMThlZS5wbmciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjEyMDAsImhlaWdodCI6MTIwMCwiZml0IjoiaW5zaWRlIiwid2l0aG91dEVubGFyZ2VtZW50Ijp0cnVlfSwid2VicCI6eyJxdWFsaXR5Ijo3NX0sImpwZWciOnsicXVhbGl0eSI6NzV9LCJyb3RhdGUiOm51bGx9fQ==?bc=0',
  },
  {
    id: 33818568,
    name: 'Playful 3D Map',
    description: 'Social navigation with 3D illustrations',
    image_url: 'https://images.are.na/eyJidWNrZXQiOiJhcmVuYV9pbWFnZXMiLCJrZXkiOiIzMzgxODU2OC9vcmlnaW5hbF83NzgyMDRjZDNlMDNmODZlZWVmNTZlYWRmZTBiMGYzYy5qcGciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjEyMDAsImhlaWdodCI6MTIwMCwiZml0IjoiaW5zaWRlIiwid2l0aG91dEVubGFyZ2VtZW50Ijp0cnVlfSwid2VicCI6eyJxdWFsaXR5Ijo3NX0sImpwZWciOnsicXVhbGl0eSI6NzV9LCJyb3RhdGUiOm51bGx9fQ==?bc=0',
  },
  {
    id: 30326654,
    name: 'Habit Tracker',
    description: 'Light mode health/productivity mobile app',
    image_url: 'https://images.are.na/eyJidWNrZXQiOiJhcmVuYV9pbWFnZXMiLCJrZXkiOiIzMDMyNjY1NC9vcmlnaW5hbF81MDY0YjVmZDcxMWNiYTVlMTUzYTZmNjM0MjU2MTJjMi5wbmciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjEyMDAsImhlaWdodCI6MTIwMCwiZml0IjoiaW5zaWRlIiwid2l0aG91dEVubGFyZ2VtZW50Ijp0cnVlfSwid2VicCI6eyJxdWFsaXR5Ijo3NX0sImpwZWciOnsicXVhbGl0eSI6NzV9LCJyb3RhdGUiOm51bGx9fQ==?bc=0',
  },
];

// ============================================================================
// IMPLEMENTATION GUIDE PROMPT
// ============================================================================

const IMPLEMENTATION_PROMPT = `You are extracting IMPLEMENTATION KNOWLEDGE from a UI reference.

Your output should be a guide that someone could paste into a system prompt 
and immediately build something in this style - without ever seeing the original image.

=== OUTPUT FORMAT ===

## [NAME]
A memorable 2-4 word handle (e.g., "Material-First Mobile", "Soft Data Dashboard", "Editorial Minimalism")

## Essence
One sentence capturing WHY this works, not just what it looks like. What's the core principle that makes this design effective?

## Key Techniques

### Surface Treatment
How do containers and backgrounds behave? Include actual CSS where useful:
- Background approach (solid, gradient, texture, layered)
- Border treatment (radius values like 8px/12px/16px/full, border styles, border colors)
- Depth/shadow system (specific box-shadow values that create the feel)
- Inner highlights or bevels if present
- The "recipe" that makes elements feel cohesive

### Typography System
- Font pairing approach (serif + sans, all sans, monospace accents, etc.)
- Hierarchy strategy (how headlines vs body vs labels relate in size/weight)
- Any distinctive typographic moves (pill badges, all-caps labels, letter-spacing, etc.)
- Text color treatment (how text color varies by importance)

### Color Logic
- Palette strategy (monochrome, muted with accents, vibrant, dark/light mode)
- How color creates hierarchy or meaning
- Accent usage pattern (where accents appear, how sparingly)
- Background vs foreground color relationship

### Layout & Spacing
- Density level (minimal/balanced/dense) and why it works here
- Card/container organization pattern
- Spacing rhythm (8px grid, generous padding, tight gutters, etc.)
- How information is chunked/grouped

### Component Patterns
Distinctive UI atoms worth stealing:
- Navigation approach (bottom tabs, sidebar, top nav, hamburger)
- Button/CTA styling (shape, fill, hover states)
- Data presentation patterns (if applicable)
- Any signature components that define this style
- Icon style (outlined, filled, custom illustrations)

## Use This When
List 3-5 specific situations where this aesthetic excels:
- Type of product/app (fintech, health, productivity, etc.)
- User context (power users, casual, first-time, etc.)
- Data type (metrics-heavy, content-light, etc.)
- Emotional goal (trust, delight, calm, energy, etc.)

## Avoid This When
List 3-5 situations where this would feel wrong (and why):
- What contexts clash with this approach
- What problems it doesn't solve
- Signs you're forcing it

## Adapting to Context

### For a Dashboard
How would this aesthetic translate to a data-heavy interface?

### For a Landing Page
How would this work for a marketing/conversion context?

### For Mobile vs Web
Key adjustments for different platforms.

### For Dark Mode (if shown in light) / Light Mode (if shown in dark)
How the principles transfer when inverting the color scheme.

---

=== RULES ===

1. Be SPECIFIC. "Clean and modern" is useless. Say exactly what that means:
   - "12px border-radius on all containers"
   - "box-shadow: 0 2px 8px rgba(0,0,0,0.08)"
   - "16px body text with 1.5 line-height"

2. Focus on TRANSFERABLE techniques. Not "use this exact gradient" but "use soft multi-stop gradients that transition between analogous colors"

3. The guide should work INDEPENDENTLY of the image. Someone reading it should be able to implement this style without seeing the original.

4. Include actual CSS values where they matter (border-radius, shadows, spacing, font sizes).

5. The "Use This When" and "Avoid This When" sections are CRITICAL - they make this a tool for decision-making, not just a description.

6. Write as if instructing an AI or developer who will implement this. Be direct and actionable.

7. If there are multiple screens shown, identify the SYSTEM - what's consistent across them that defines the style.

8. Don't describe what you see. Extract what someone needs to KNOW to recreate it.`;

// ============================================================================
// HELPERS
// ============================================================================

async function downloadImage(url: string): Promise<{ base64: string; mimeType: string } | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    if (contentType.includes('gif')) return null;
    
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    
    return { base64, mimeType: contentType.split(';')[0] };
  } catch {
    return null;
  }
}

// ============================================================================
// MAIN
// ============================================================================

async function testPrompt() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('           IMPLEMENTATION GUIDE EXTRACTION TEST                 ');
  console.log('═══════════════════════════════════════════════════════════════\n');

  if (!GEMINI_API_KEY) {
    console.error('❌ Missing GEMINI_API_KEY in .env');
    process.exit(1);
  }

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ 
    model: 'gemini-2.0-flash',
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 4096,
    }
  });

  // Create output directory
  const outputDir = 'implementation-guides/test';
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Process each test block
  for (let i = 0; i < TEST_BLOCKS.length; i++) {
    const block = TEST_BLOCKS[i];
    console.log(`\n[${i + 1}/${TEST_BLOCKS.length}] ${block.name}`);
    console.log(`   ${block.description}`);
    console.log(`   Downloading image...`);

    const imageData = await downloadImage(block.image_url);
    if (!imageData) {
      console.log('   ❌ Failed to download image');
      continue;
    }

    console.log(`   Calling Gemini...`);

    try {
      const result = await model.generateContent([
        { text: IMPLEMENTATION_PROMPT },
        {
          inlineData: {
            mimeType: imageData.mimeType,
            data: imageData.base64,
          },
        },
      ]);

      const response = result.response.text();
      
      // Save output
      const outputPath = path.join(outputDir, `${block.id}-${block.name.toLowerCase().replace(/\s+/g, '-')}.md`);
      
      const fullOutput = `# Implementation Guide: ${block.name}

> Source: https://www.are.na/block/${block.id}
> Generated: ${new Date().toISOString()}

---

${response}
`;
      
      fs.writeFileSync(outputPath, fullOutput);
      console.log(`   ✅ Saved to ${outputPath}`);

      // Print preview
      const lines = response.split('\n').slice(0, 10);
      console.log('\n   Preview:');
      lines.forEach(line => console.log(`   ${line}`));
      console.log('   ...\n');

      // Rate limit
      await new Promise(r => setTimeout(r, 1000));

    } catch (error: any) {
      console.log(`   ❌ Error: ${error.message}`);
    }
  }

  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('                         ✅ COMPLETE                            ');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log(`\nTest outputs saved to: ${outputDir}/`);
  console.log('Review the outputs to evaluate prompt quality.');
}

testPrompt().catch(console.error);

