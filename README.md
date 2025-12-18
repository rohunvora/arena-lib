# Arena Reference Library

A system for building and querying a personal reference library backed by Are.na.

## What This Is

Two tools:

1. **Reference Matcher** (`/match`) - Drop a screenshot of your WIP, get relevant references from your indexed Are.na library
2. **Block Classifier** (`/`) - Tinder-like interface for organizing Are.na blocks into channels

The core idea: you curate references in Are.na over time. This system makes them searchable and retrievable when you need them.

## How It Works

```
Your Are.na Library
       │
       ▼
┌──────────────────┐
│  Index Blocks    │  npm run index-blocks
│  (one-time)      │  Tags each block with component/style/context/vibe
└──────────────────┘
       │
       ▼
┌──────────────────┐
│ Reference Matcher│  /match
│                  │  1. Extract tags from your WIP screenshot
│                  │  2. Find blocks with matching tags
│                  │  3. Generate human-readable explanations
│                  │  4. Output: images + minimal prompt for Claude
└──────────────────┘
```

The key insight: **Claude interprets the actual images directly**. This tool's job is finding the right references from your library. Claude's job is visual interpretation.

## Setup

### 1. Environment Variables

Create `.env` in root:

```
ARENA_TOKEN=your_arena_token
ARENA_USER_SLUG=your_username
GEMINI_API_KEY=your_gemini_key
```

Get your Are.na token: https://dev.are.na/oauth/applications

### 2. Index Your Channel

```bash
npm install
npm run build
npm run index-blocks -- --channel=your-channel-slug
```

This creates `taste-profiles/[channel-slug]/index.json` with tagged blocks.

### 3. Run the Web App

```bash
cd web
npm install
npm run dev
```

- `/match` - Reference Matcher
- `/` - Block Classifier

## Tag Taxonomy

Each indexed block gets tagged with:

| Category | What it captures | Examples |
|----------|------------------|----------|
| `component` | UI elements present | dashboard, cards, hero, pricing |
| `style` | Visual treatment | dark-mode, minimal, rounded, gradient |
| `context` | Where it would be used | saas, mobile-app, landing-page |
| `vibe` | Emotional quality | premium, playful, professional |

See [TAGS.md](./TAGS.md) for the full taxonomy.

## Reference Matcher Usage

1. Drop a screenshot of what you're building
2. See matched references with explanations like "Clean card layout with thin borders"
3. Click to select which refs to include
4. Double-click to mark one as primary
5. Download images (ref-1.jpg, ref-2.jpg...)
6. Copy the minimal prompt
7. In Cursor: paste prompt + attach the images

The prompt looks like:

```
I'm building a dashboard with metrics. Here are references from my collection:

1. [attach ref-1.jpg] - Clean card layout with thin borders (PRIMARY)
2. [attach ref-2.jpg] - Similar metrics styling

Match the aesthetic of #1. Use the others as supporting context.
```

## CLI Tools

```bash
# Index blocks for matching
npm run index-blocks -- --channel=ui-ux-abc123

# Extract anti-patterns (what you don't like)
npm run anti-patterns -- --channel=ui-ux-abc123

# Extract visual styles
npm run extract-styles -- --channel=ui-ux-abc123
```

## Project Structure

```
arena-lib/
├── web/                          # Next.js web app
│   ├── app/
│   │   ├── page.tsx              # Block Classifier
│   │   ├── match/page.tsx        # Reference Matcher
│   │   └── api/
│   │       ├── match/route.ts    # Tag extraction + matching
│   │       └── export-pack/      # Image download
├── src/
│   ├── index-blocks.ts           # Index blocks with tags
│   ├── anti-patterns.ts          # Extract anti-patterns
│   └── arena-client.ts           # Are.na API wrapper
├── taste-profiles/               # Generated indexes (gitignored)
│   └── [channel-slug]/
│       └── index.json
└── TAGS.md                       # Tag taxonomy
```

## License

MIT
