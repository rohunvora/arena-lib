# arena-cli

CLI tools for [Are.na](https://are.na): export blocks, enrich with vision AI, generate browsable views.

## Quick Start

```bash
# 1. Setup environment
cp .env.example .env
# Add: ARENA_TOKEN, ARENA_USER_SLUG, GEMINI_API_KEY

# 2. Export blocks from your channels
npx ts-node cli/export-blocks.ts

# 3. Enrich with vision AI
npx ts-node cli/enrich-blocks.ts

# 4. Generate browsable view
node cli/gen-view.cjs --open
```

## CLI Commands

### export-blocks.ts

Export blocks from your Are.na channels incrementally.

```bash
npx ts-node cli/export-blocks.ts              # All channels
npx ts-node cli/export-blocks.ts --channel=X  # Specific channel
npx ts-node cli/export-blocks.ts --images     # Download images locally
```

**Output:** `arena-export/blocks/{id}.json`

**Features:**
- Incremental: only fetches new blocks on subsequent runs
- Tracks watermarks for efficient updates
- Saves after each page (resilient to interruption)

---

### enrich-blocks.ts

Analyze block images with Gemini Vision AI to generate metadata.

```bash
npx ts-node cli/enrich-blocks.ts              # All image blocks
npx ts-node cli/enrich-blocks.ts --channel=X  # Specific channel
npx ts-node cli/enrich-blocks.ts --dry-run    # Preview without saving
npx ts-node cli/enrich-blocks.ts --force      # Re-enrich already processed
```

**Adds to each block:**
```json
{
  "vision": {
    "suggested_title": "Dark Trading Dashboard",
    "description": "Crypto dashboard with real-time charts",
    "tags": ["dashboard", "dark-mode", "trading"],
    "ui_patterns": ["metric-cards", "time-series-chart"]
  }
}
```

---

### gen-view.cjs

Generate an HTML gallery to browse your enriched blocks.

```bash
node cli/gen-view.cjs          # Generate view.html
node cli/gen-view.cjs --open   # Generate and open in browser
```

**Output:** `arena-export/view.html`

**Features:**
- Search by title, tags, patterns
- Filter by UI pattern or tag
- Lightbox for image zoom
- Dark mode support

---

### gen-search-view.cjs

Visual search results with selection mode for validating matches.

```bash
# Ad-hoc search
node cli/gen-search-view.cjs "dashboard,metric-cards" --open

# Multiple pattern groups
node cli/gen-search-view.cjs "avatar" "progress-bar" --open

# From config file with selection mode
node cli/gen-search-view.cjs --config=searches.json --select --open
```

**Config file format:**
```json
[
  { "name": "Dashboards", "patterns": ["dashboard", "metric-cards"] },
  { "name": "Progress", "patterns": ["progress-bar", "progress-percentage"] }
]
```

**Selection mode (`--select`):**
- Checkboxes on each card
- Click image to zoom (lightbox)
- Copy-able JSON output grouped by category

**Output format:**
```json
{
  "_context": "Gap references selected from Are.na",
  "selections": {
    "Dashboards": [{ "id": 123, "title": "Dark Trading Dashboard" }]
  }
}
```

---

## Block Schema

```json
{
  "id": 12345,
  "title": "original-filename.png",
  "class": "Image",
  "image_url": "https://...",
  "channels": ["ui-ux-abc"],
  "connected_at": "2024-01-15T10:30:00.000Z",
  "vision": {
    "suggested_title": "Dark Trading Dashboard",
    "description": "Crypto dashboard with real-time charts",
    "tags": ["dashboard", "dark-mode", "trading"],
    "ui_patterns": ["metric-cards", "time-series-chart"]
  }
}
```

---

## Environment Variables

```bash
ARENA_TOKEN=        # Get from dev.are.na/oauth/applications
ARENA_USER_SLUG=    # Your Are.na username
GEMINI_API_KEY=     # For vision AI enrichment
ARENA_EXPORT_DIR=   # Optional: custom export path (default: ./arena-export)
```

---

## Searching Blocks

### Using grep

```bash
# Search by UI pattern
grep -l "inline-stats" arena-export/blocks/*.json

# Search by tag
grep -l '"dashboard"' arena-export/blocks/*.json

# Search with context
grep -B2 -A2 "leaderboard" arena-export/blocks/*.json
```

### Using visual search

```bash
# Generate visual results for pattern matching
node cli/gen-search-view.cjs "pattern1,pattern2" --select --open
```

---

## Other CLI Tools

| Script | Purpose |
|--------|---------|
| `extract-component.ts` | Extract design tokens from blocks |
| `extract-styles.ts` | Extract CSS styles from components |
| `index-blocks.ts` | Index blocks with AI-generated tags |
| `classifier.ts` | Classify blocks by visual patterns |
| `taste-profile.ts` | Generate taste profiles from channels |

---

## UX Prompts

This repo includes prompts for UX auditing and fixing:

| Prompt | Purpose |
|--------|---------|
| `prompts/audit/UX_AUDIT.md` | Full two-phase UX audit |
| `prompts/fix/FIX_*.md` | Symptom-based repair prompts |
| `prompts/strategy/*.md` | Higher-level UX thinking |

See `docs/UX_FOUNDATIONS.md` for complete UX reference.

---

## Web App

The repo also includes a Next.js web app for visual exploration:

```bash
cd site && npm install && npm run dev
```

**Features:**
- Reference Matcher: drop a screenshot → get relevant references
- Block Classifier: Tinder-style swipe interface
- Component Gallery: live-rendered design system

---

## License

MIT
