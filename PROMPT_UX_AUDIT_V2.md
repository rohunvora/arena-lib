# UX Audit Prompt v2

This prompt produces interfaces that are both technically correct AND compositionally sound.

---

## The Complete Prompt

```
I need you to audit and fix this interface. This is a TWO-PHASE audit:
- Phase 1: Compositional review (hierarchy, rhythm, visual weight, spacing relationships)
- Phase 2: Technical foundations (contrast, sizing, spacing values, touch targets)

**IMPORTANT: Do Phase 1 FIRST.** Technical fixes can make compositional problems worse (e.g., "make everything 16px" creates sameness). Fix the composition, then ensure technical compliance.

---

## PHASE 1: COMPOSITIONAL REVIEW (Do This First)

This is where most AI-generated UIs fail. Technical compliance ≠ good design.

### 1.1 Visual Hierarchy - The #1 Issue

**The goal:** A user should be able to scan the page and instantly understand what's most important.

**Audit for "sameness":**
- Do all sections look the same? (BAD)
- Do all cards look the same? (BAD)
- Is there a clear visual "star" on each screen/section? (GOOD)

**The hierarchy must be DRAMATIC, not subtle:**
- Headlines should be 2-3x larger than body text (not 1.2x)
- Primary actions should be visually dominant (color, size, position)

**Fix "sameness" by:**
1. Making headlines significantly larger (not just one step up the scale)
2. Adding contrast in spacing (hero gets 2x the padding of subsections)
3. Varying visual treatments (not every section in an identical card)
4. Using size, color, weight, and space to create clear levels

### 1.2 Hero Section Treatment

**The headline should DOMINATE:**
- Size: 48-72px on desktop, 32-48px on mobile
- Weight: 600-700 (bold/semibold)
- It should be impossible to miss

**Supporting elements should recede:**
- Subheadline: noticeably smaller AND lighter (color or weight)
- Badge/label above headline: small, subtle, doesn't compete
- Hierarchy: Headline > Subhead > Body > Meta

**Breathing room:**
- Hero section: 80-120px vertical padding
- Don't crowd the headline - let it breathe

**On colored/gradient backgrounds:**
- Text should be neutral (white or near-black) for maximum contrast
- Colored text on colored backgrounds is HIGH RISK (even if it "passes" contrast)
- Warm-on-warm especially fails perceptually

### 1.3 Section Rhythm & Spacing Relationships

**The Law of Proximity (Critical):**
Space WITHIN a group must be SMALLER than space BETWEEN groups.

```
Internal padding < Gap between items < Gap between sections
```

| Spacing Type | Ratio | Example |
|--------------|-------|---------|
| Card padding | 1x | 16-20px |
| Gap between cards | 1.5x | 24px |
| Gap between sections | 2-3x | 48-64px |

**Section padding should VARY:**
- Hero: 80-120px vertical padding
- Major sections: 64-80px vertical padding  
- Subsections: 32-48px vertical padding
- Within sections: 16-24px gaps

**Diagnose spacing problems:**
- Feels **disconnected/floating** → REDUCE gaps (they're too big for the content)
- Feels **cramped/cluttered** → INCREASE gaps
- Card padding ≈ gap between cards → Cards don't feel grouped (gap should be larger)

**Content density matters:**
- Sparse content (icon + few words) → tighter spacing
- Dense content (paragraphs, data) → more generous spacing

### 1.4 Button/CTA Hierarchy

**Every screen needs ONE clear primary action:**
- Primary: Filled with accent color, largest, most prominent
- Secondary: Outlined or ghost, clearly subordinate

**If two buttons side by side look equal = FAIL**
One must be obviously primary.

### 1.5 The Squint Test

**Step back and squint at the page:**
- Can you tell what's most important?
- Does your eye have a clear path?
- Is there visual variety or does it all blur together?

If everything blurs into sameness, the hierarchy isn't strong enough.

---

## PHASE 2: TECHNICAL FOUNDATIONS

### 2.1 Contrast & Legibility

Scan ALL text colors. For each, verify:

**On light backgrounds (#FFFFFF, #F9FAFB, cream, off-white):**
- Primary text: Must be #111827 (gray-900) or darker
- Secondary text: Must be #374151 (gray-700) or darker  
- Tertiary text: #4B5563 (gray-600) is the safe minimum for body text
- Borderline: #6B7280 (gray-500) only for non-essential metadata, not body text
- REJECT: #9CA3AF (gray-400) and lighter - fails WCAG AA

**On dark backgrounds (#111827, #1F2937, #000000):**
- Primary: Must be #F9FAFB (gray-50) or lighter
- Secondary: Must be #E5E7EB (gray-200) or lighter

**⚠️ SPECIAL CASE - Colored text on colored/gradient backgrounds:**
This is a HIGH-RISK pattern. Examples:
- Coral/salmon text on peach/warm gradient
- Blue text on blue-tinted background
- Any accent color text on a background that isn't pure white/black

For colored-on-colored: The text should either be:
1. Changed to neutral (black or white) for guaranteed readability
2. Made SIGNIFICANTLY darker/lighter than the background (not just technically passing)
3. Given a subtle text-shadow or background treatment

When in doubt, use neutral text colors. Colored text is decorative; readability is functional.

**Font weights:**
- Body text under 24px: minimum font-weight 400 (never 300/light)
- Display text 24px+: can use 300 if contrast is very high

### 2.2 Typography Scale

Use a consistent scale. All sizes must come from this set (or your design system's equivalent):

```
12px  - xs (captions, badges only)
14px  - sm (secondary UI elements, NOT body text)
16px  - base (body text MINIMUM)
18px  - lg (emphasized body, intro text)
20px  - xl (small headings, card titles)
24px  - 2xl (section subheadings)
30px  - 3xl (section headings)
36-48px - 4xl (page titles, hero headlines)
48-72px - 5xl+ (hero statements, dramatic headlines)
```

**Critical rule: Body text must be 16px minimum.** 
But this doesn't mean make everything 16px. Headlines need to be 2-3x larger (see Phase 1).

**Line heights:**
- Body text: 1.5 to 1.6 (never below 1.5)
- Headlines: 1.1 to 1.3 (tighter is fine for large text)
- UI elements/buttons: 1 to 1.25

**Line length:**
- Readable content: max-width 65ch (~600-700px)
- Never let paragraphs span full viewport on desktop

### 2.3 Spacing (4px Grid)

All spacing values must be multiples of 4px:
✓ 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128
✗ 13, 17, 23, 30, 50, 100 (non-multiples)

**Minimums:**
- Card/container padding: 16px minimum (20-24px preferred)
- Button padding: 12px 20px minimum
- Hero section: 80-120px vertical padding
- Major sections: 64-80px vertical padding
- Subsections: 32-48px vertical padding
- Gap between cards: should be ≥ card padding (typically 24px)

Note: See Phase 1.3 for spacing RELATIONSHIPS (internal vs external).

### 2.4 Touch Targets

**Non-negotiable minimums:**
- All buttons: 44px height minimum (not 40px - Apple HIG is 44pt)
- Icon-only buttons: 44×44px minimum
- Form inputs: 44px height
- Links in navigation: adequate padding for 44px touch area

**Mobile (< 768px):**
- Primary CTAs: 48-52px height, consider full-width
- All interactive elements: 48px touch area

---

## OUTPUT FORMAT

For each issue found:

### PHASE 1 (Compositional)
```
SECTION: [which part of the page]
ISSUE: [what's wrong compositionally]
CURRENT STATE: [describe what it looks like now]
RECOMMENDED FIX: [specific change with values]
WHY: [how this improves hierarchy/rhythm/clarity]
```

### PHASE 2 (Technical)
```
FILE: [filename]
LINE: [line number]
ISSUE: [specific violation]
CURRENT: [current value]
FIX: [exact fix]
```

---

## IMPLEMENTATION ORDER

1. Fix Phase 1 compositional issues FIRST (hierarchy, spacing relationships, rhythm)
2. Then fix Phase 2 technical issues (contrast, minimums, grid values)
3. This order matters because Phase 1 changes affect what Phase 2 values should be

---

## AFTER IMPLEMENTING

Re-check with these questions:
1. [ ] Is there ONE clear focal point on each screen section?
2. [ ] Is the headline dramatically larger than body text (2x+)?
3. [ ] Is there a clear primary CTA that stands out?
4. [ ] Do different sections have visual variety (not all identical cards)?
5. [ ] Does the page have rhythm (varied spacing, not monotonous)?
6. [ ] Is all text on colored/gradient backgrounds using neutral colors OR extremely high contrast?
7. [ ] Would a user instantly know where to look and what to do?
```

---

## Quick Reference: The Mistakes to Avoid

| Mistake | What Happens | Fix |
|---------|--------------|-----|
| "Make everything 16px" | Page becomes monotonous, no hierarchy | 16px is the MINIMUM for body, headlines should be 2-3x larger |
| "Fix contrast by darkening gray" | Technically passes but still feels weak | For emphasis, go much darker than minimum |
| "Same card style everywhere" | Visual boredom, no differentiation | Vary card treatments by content type |
| "Equal-looking buttons" | Unclear what action to take | One button must be obviously primary |
| "Consistent section spacing" | Monotonous rhythm | Hero sections need MORE space, subsections less |
| "Colored text passes contrast" | Warm-on-warm still feels hard to read | Use neutral text on colored backgrounds |

