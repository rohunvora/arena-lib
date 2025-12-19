# UX Audit Prompt v2

This prompt produces interfaces that are both technically correct AND compositionally sound.

---

## The Complete Prompt

```
I need you to audit and fix this interface. This is a TWO-PHASE audit:
- Phase 1: Technical foundations (contrast, sizing, spacing, touch targets)
- Phase 2: Compositional review (hierarchy, rhythm, visual weight)

Both phases are equally important. A page can pass all technical checks and still feel wrong.

---

## PHASE 1: TECHNICAL FOUNDATIONS

### 1.1 Contrast & Legibility

Scan ALL text colors. For each, verify:

**On light backgrounds (#FFFFFF, #F9FAFB, cream, off-white):**
- Primary text: Must be #111827 (gray-900) or darker
- Secondary text: Must be #374151 (gray-700) or darker  
- Tertiary/muted: Must be #4B5563 (gray-600) MINIMUM - never lighter
- REJECT: gray-400 (#9CA3AF), gray-500 (#6B7280 is borderline)

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

### 1.2 Typography Scale

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
But this doesn't mean make everything 16px. See Phase 2.

**Line heights:**
- Body text: 1.5 to 1.6 (never below 1.5)
- Headlines: 1.1 to 1.3 (tighter is fine for large text)
- UI elements/buttons: 1 to 1.25

**Line length:**
- Readable content: max-width 65ch (~600-700px)
- Never let paragraphs span full viewport on desktop

### 1.3 Spacing (4px Grid)

All spacing values must be multiples of 4px:
✓ 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128
✗ 13, 17, 23, 30, 50, 100 (non-multiples)

**Minimums:**
- Card/container padding: 16px minimum (20-24px preferred)
- Button padding: 12px 20px minimum (not 8px 16px - that's too tight)
- Section vertical padding: 64px minimum for major sections, 32-48px for subsections
- Gap between cards: 16-24px

### 1.4 Touch Targets

**Non-negotiable minimums:**
- All buttons: 44px height minimum (not 40px - Apple HIG is 44pt)
- Icon-only buttons: 44×44px minimum
- Form inputs: 44px height
- Links in navigation: adequate padding for 44px touch area

**Mobile (< 768px):**
- Primary CTAs: 48-52px height, consider full-width
- All interactive elements: 48px touch area

---

## PHASE 2: COMPOSITIONAL REVIEW

This is where the first audit failed. Technical compliance ≠ good design.

### 2.1 Visual Hierarchy - The #1 Issue

**The goal:** A user should be able to scan the page and instantly understand what's most important, second most important, etc.

**Audit for "sameness":**
Look at the page as a whole. Ask:
- Do all sections look the same? (BAD)
- Do all cards look the same? (BAD)
- Is there a clear visual "star" on each screen/section? (GOOD)
- Can you tell what's primary vs secondary vs tertiary? (GOOD)

**The hierarchy must be DRAMATIC, not subtle:**
- Headlines should be 2-3x larger than body text (not 1.2x)
- Primary actions should be visually dominant (color, size, position)
- Important sections should have more visual weight than supporting sections

**Fix "sameness" by:**
1. Making headlines significantly larger (not just one step up)
2. Adding more contrast in spacing (hero gets 2x the padding of subsections)
3. Varying visual treatments (not every section in an identical card)
4. Using size, color, weight, and space to create clear levels

### 2.2 Hero Section Treatment

The hero/above-the-fold area needs special attention:

**The headline should DOMINATE:**
- Size: 48-72px on desktop, 32-48px on mobile
- Weight: 600-700 (bold/semibold)
- It should be impossible to miss

**Supporting elements should recede:**
- Subheadline/description: noticeably smaller and lighter than headline
- Badge/label above headline: small, subtle, doesn't compete
- There should be clear visual hierarchy: Headline > Subhead > Body > Meta

**Breathing room:**
- Hero section needs generous vertical padding (80-120px)
- Don't crowd the headline - let it breathe

**Colored/gradient backgrounds:**
If using a gradient or colored background in the hero:
- Text should be neutral (white or dark) for maximum contrast
- If using colored text, it must be VERY high contrast
- Consider: would this be instantly readable at a glance? On a phone in sunlight?

### 2.3 Section Rhythm

**Not all sections are equal:**
- Major sections: 80-120px vertical padding
- Subsections: 48-64px vertical padding
- Within-section spacing: 24-32px

**Create intentional "beats":**
The page should have a rhythm: BIG pause, content, medium pause, content, BIG pause, content.
Not: same pause, content, same pause, content (monotonous).

**Visual section breaks:**
Consider how sections are differentiated:
- Background color changes
- Full-width dividers
- Significant spacing changes
- Visual elements (shapes, illustrations)

Not every section should be "content in a card on the same background."

### 2.4 Button/CTA Hierarchy

**Every screen needs a clear primary action:**
- ONE button should be obviously primary (filled, colored, larger)
- Secondary actions should be visually subordinate (outlined, ghost, smaller)

**If you have two buttons side by side:**
- Primary: Filled with accent color, prominent
- Secondary: Outlined or ghost, doesn't compete

**Audit for:**
- Are there two buttons that look equal? (FIX: differentiate them)
- Is it clear what the user should do? (The primary CTA should be obvious)
- On mobile, is the primary CTA easily tappable? (Consider full-width)

### 2.5 Card Differentiation

**Not all cards should look identical:**
If you have multiple card types (feature cards, testimonial cards, pricing cards, etc.), they should have subtle visual differences:
- Different padding
- Different border treatment
- Different background tint
- Different content layout

**Within a card grid:**
Cards of the same TYPE should be consistent.
But different TYPES of content should have different card styles.

### 2.6 The "Squint Test"

**Final check - step back and squint at the page:**
- Can you tell what's most important?
- Does your eye have a clear path?
- Is there visual variety or does it all blur together?
- Are there "moments" that catch attention?

If everything blurs into sameness, the hierarchy isn't strong enough.

---

## OUTPUT FORMAT

For each issue found:

### PHASE 1 (Technical)
```
FILE: [filename]
LINE: [line number]
ISSUE: [specific violation]
CURRENT: [current value]
FIX: [exact fix]
```

### PHASE 2 (Compositional)
```
SECTION: [which part of the page]
ISSUE: [what's wrong compositionally]
CURRENT STATE: [describe what it looks like now]
RECOMMENDED FIX: [specific change with values]
WHY: [how this improves hierarchy/rhythm/clarity]
```

---

## IMPLEMENTATION ORDER

1. Fix Phase 2 compositional issues FIRST (hierarchy, sizing relationships)
2. Then fix Phase 1 technical issues
3. This order matters because Phase 2 changes may affect Phase 1 values

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

