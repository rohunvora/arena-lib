# .cursorrules Snippet: UX Foundations

Add this to any project's `.cursorrules` file to enforce good defaults.

---

## Copy This Into .cursorrules

```markdown
## UX FOUNDATIONS (Non-Negotiable)

When generating or modifying UI, these rules are mandatory. Do not deviate.

### CONTRAST & LEGIBILITY

Text colors on light backgrounds (#FFFFFF, #F9FAFB, #FDF8F4):
- Primary text: #111827 (gray-900)
- Secondary text: #374151 (gray-700)
- Tertiary text: #4B5563 (gray-600) - THIS IS THE MINIMUM
- NEVER use #9CA3AF (gray-400) or lighter for readable text
- NEVER use opacity modifiers that reduce text contrast

Text colors on dark backgrounds (#111827, #000000):
- Primary: #F9FAFB (gray-50)
- Secondary: #E5E7EB (gray-200)
- Minimum: #D1D5DB (gray-300)

Font weights:
- Body text (< 24px): minimum font-weight 400
- Only use 300/light on display text 24px+

### TYPOGRAPHY SCALE

Use these sizes. Do not invent arbitrary values:
- text-xs: 12-14px (captions only)
- text-sm: 14-16px (secondary text, buttons)
- text-base: 16-18px (body text - MINIMUM for readable content)
- text-lg: 18-20px (emphasized body)
- text-xl: 20-24px (h4, card titles)
- text-2xl: 24-30px (h3)
- text-3xl: 30-36px (h2)
- text-4xl: 36-48px (h1)
- text-5xl: 48-64px (hero headlines)

Line heights:
- Body text: 1.5-1.6 (NEVER below 1.5)
- Headlines: 1.1-1.3
- Buttons/UI: 1-1.25

Line length:
- Reading content: max-width 65ch (~600-700px)
- Never let body text span full viewport width on desktop

### SPACING (4px Grid)

All spacing values MUST be multiples of 4px:
✓ 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96
✗ 13, 17, 23, 30, 50 (non-multiples)

Minimum values:
- Card/container padding: 16px (prefer 20-24px)
- Button padding: 8px 16px minimum
- Section vertical padding: 48px minimum
- Gap between cards: 16-24px

### TOUCH TARGETS

Minimum interactive element sizes:
- Buttons: 40px height desktop, 48px mobile
- Icon buttons: 44×44px (this is Apple HIG standard)
- Form inputs: 44px height
- Clickable cards: adequate padding for finger tap

Mobile (< 768px):
- Increase all touch targets to 48px
- Full-width CTAs when appropriate

### RESPONSIVE REQUIREMENTS

At 320px viewport width:
- No horizontal scroll
- Touch targets are 48px
- Text is readable without zoom
- Content reflows to single column

### WHEN IN DOUBT

1. More padding is better than less
2. Darker text is better than lighter
3. Bigger touch targets are better than smaller
4. Round spacing to nearest 4px multiple
5. Body text should never be smaller than 16px
```

---

## Tailwind-Specific Version

If the project uses Tailwind:

```markdown
## UX FOUNDATIONS (Tailwind)

### Text Colors (Light Mode)
✓ text-gray-900, text-gray-800, text-gray-700, text-gray-600
✗ text-gray-500 (borderline - avoid for body)
✗ text-gray-400, text-gray-300, text-gray-200 (NEVER for readable text)

### Text Colors (Dark Mode)  
✓ text-gray-50, text-gray-100, text-gray-200, text-gray-300
✗ text-gray-400, text-gray-500 (too low contrast on dark)

### Typography
- Body text: text-base minimum (16px)
- Line height: leading-normal (1.5) or leading-relaxed (1.625)
- Font weight: font-normal (400) minimum for body

### Spacing
- Card padding: p-4 minimum (prefer p-5 or p-6)
- Section padding: py-12 minimum (prefer py-16 or py-20)
- Gaps: gap-4, gap-5, gap-6 (not gap-[13px])
- Button padding: px-4 py-2 minimum

### Sizing
- Buttons: h-10 desktop, h-12 mobile
- Icon buttons: w-11 h-11 (44px)
- Inputs: h-11 (44px)

### Responsive
- Mobile buttons: sm:h-10 → h-12 (taller on mobile)
- Mobile CTAs: w-full when appropriate
- Content max-width: max-w-prose or max-w-3xl
```

---

## Minimal Version (Essential Rules Only)

For quick drops into smaller projects:

```markdown
## UX Foundations

1. Text contrast: Never lighter than gray-600 on white backgrounds
2. Body text: Minimum 16px, line-height 1.5+
3. Spacing: All values multiples of 4px
4. Buttons: Minimum 40px height (48px on mobile)
5. Touch targets: 44×44px minimum for icon buttons
6. Content width: Max 65ch for reading text
```

