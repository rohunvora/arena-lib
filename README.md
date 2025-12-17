# Arena Organizer

Tools to organize and declutter your Are.na account.

## What's Here

### 1. Classifier Web App

A mobile-first app for rapidly categorizing your Are.na blocks.

**Live:** https://web-1i01fwfxg-rohun-voras-projects.vercel.app

**Features:**
- 📱 Mobile-optimized for power sessions
- 🔄 Cross-device sync (progress saved in Are.na, not localStorage)
- 🏷️ Filter by type: Images, Links, Text, Media
- 🔍 Tap to expand images or read full text
- ⚡ Instant actions (optimistic UI - no waiting)
- ↩️ Undo last action
- ➕ Create new channels on the fly

**Keyboard Shortcuts:**
| Key | Action |
|-----|--------|
| `1-4` | Classify into category |
| `S` | Skip (deal with later) |
| `D` | Delete |
| `N` | New channel |
| `F` | Cycle type filters |
| `Z` | Undo |
| `Esc` | Close modals |

### 2. Archive Script

One-time script to move blocks from misc channels into a single Archive channel.

```bash
node archive.js
```

### 3. Cleanup Script  

One-time script to empty non-protected channels (blocks stay in Archive).

```bash
node cleanup.js
```

Edit the `PROTECTED_SLUGS` array in the script to specify which channels to keep.

## Project Structure

```
arena-lib/
├── web/                    # Next.js classifier app
│   ├── app/
│   │   ├── page.tsx       # Main UI
│   │   └── api/           # API routes
│   │       ├── blocks/    # Fetch unclassified blocks
│   │       ├── classify/  # Add block to channel
│   │       ├── skip/      # Add to Skipped channel
│   │       ├── delete/    # Remove from all channels
│   │       └── undo/      # Reverse last action
│   └── ...
├── archive.js             # Archive script
├── cleanup.js             # Cleanup script
└── src/                   # Original auto-classifier (deprecated)
```

## Setup

### Environment Variables

Create `.env` in the root:

```
ARENA_TOKEN=your_personal_access_token
ARENA_USER_SLUG=your_username
```

Get your token from: https://dev.are.na/oauth/applications

### Running the Classifier Locally

```bash
cd web
npm install
npm run dev
```

### Deploying to Vercel

```bash
cd web
vercel --prod
```

Add `ARENA_TOKEN` and `ARENA_USER_SLUG` to your Vercel environment variables.

## How It Works

### Classification Flow

1. App fetches all your blocks from Are.na
2. Filters out blocks already in target channels (UI/UX, Writing, Code, Thinking)
3. Shows one block at a time for rapid classification
4. When you classify: block is removed from UI instantly, API call fires in background
5. Skipped blocks go to "Classifier - Skipped" channel
6. Deleted blocks are disconnected from all channels

### Cross-Device Sync

Progress is stored in Are.na itself:
- Classified blocks → in target channels → filtered out
- Skipped blocks → in "Classifier - Skipped" → filtered out
- No localStorage needed → works across devices

## Scripts

### archive.js

Moves blocks from non-protected channels into a single Archive channel.

Protected channels (edit in script):
- Frameworks, UI/UX, Writing, Code
- frank-core, Good channels, scroll stoppers
- Classifier - Skipped

### cleanup.js

Empties non-protected channels by disconnecting all blocks. Blocks remain in Archive for reference.

## License

MIT
