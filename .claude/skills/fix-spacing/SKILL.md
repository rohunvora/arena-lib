---
name: fix-spacing
description: Fix spacing issues when the page feels cramped, cluttered, floating, or disconnected. Use when elements feel squeezed together, cards feel like isolated islands, everything is the same distance apart, or the page has no visual rhythm.
---

# Fix Spacing Issues

## When This Activates

User describes spacing problems like:
- "This feels cramped" / "too tight"
- "Elements are floating" / "disconnected"
- "Everything looks the same distance apart"
- "Cards feel like islands"
- "No visual rhythm"

## Instructions

### Step 1: Diagnose the Problem

First, identify which symptom they're experiencing:

| Symptom | Cause |
|---------|-------|
| Floating/disconnected | Gaps too large for content density |
| Cramped/cluttered | Gaps too small |
| Everything blurs together | Internal spacing ≈ external spacing |
| Monotonous | Same spacing everywhere |

### Step 2: Check the Law of Proximity

**This is the #1 spacing rule.** Space WITHIN a group must be SMALLER than space BETWEEN groups.

```
Card padding < Gap between cards < Gap between sections
```

Look for violations:
- Card padding equals gap between cards (makes cards feel like islands)
- Section gaps equal within-section gaps (everything blurs)

### Step 3: Apply the Fix

Use these exact values:

**Cards/Components:**
- Card padding: 16-20px
- Gap between cards: 24px (must be > padding)

**Sections:**
- Hero: 80-120px vertical padding
- Major sections: 64-80px
- Subsections: 32-48px
- Content within: 16-24px gaps

**The 4px Grid:**
All values must be multiples of 4: 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96
Never use: 13, 17, 23, 50, 75

### Step 4: Vary the Rhythm

Don't use the same spacing everywhere. Create rhythm:

**Bad:** Every section has 48px padding
**Good:** Hero (100px) → Features (64px) → Testimonials (48px) → CTA (80px)

### Step 5: Match Content Density

- Dense content (paragraphs, tables) → more generous spacing
- Sparse content (icon + label) → tighter spacing

A card with just an icon and two words doesn't need 80px padding.

## Output Format

When reporting fixes:

```
WHERE: [section/component]
CURRENT: [current spacing values]
FIX: [new spacing values]
```

## Verification

After fixing, confirm:
1. Related items feel grouped (not floating)
2. Page has rhythm (not monotonous)
3. Clear separation between major sections

## Reference

For CSS variables and exact values, see [reference.md](reference.md).
