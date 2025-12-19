# Prompt: UX Foundations Audit & Fix

Copy this prompt to give your Cursor agent for any project.

---

## The Prompt

```
I need you to audit and fix this interface for fundamental UX issues. Follow the UX_FOUNDATIONS.md spec. Work through these in priority order:

## 1. CONTRAST AUDIT (Do First)
Scan all CSS/Tailwind for text colors. Flag and fix:
- Any text using gray-400, gray-300, gray-200 or lighter on light backgrounds
- Any text using opacity modifiers that reduce contrast
- Any font-weight under 400 on text smaller than 24px
- Text over images/gradients without sufficient contrast

Safe minimums:
- Body text on white: #4B5563 (gray-600) or darker
- Prefer #374151 (gray-700) for secondary, #111827 (gray-900) for primary

## 2. TYPOGRAPHY AUDIT
Check all font sizes. Flag and fix:
- Body text smaller than 16px (1rem)
- Line heights below 1.5 for body text
- Arbitrary/inconsistent heading sizes
- Missing hierarchy (everything same size)

Apply the fluid type scale from UX_FOUNDATIONS.md or ensure sizes follow a consistent ratio.

## 3. SPACING AUDIT  
Check all padding, margin, and gap values. Flag and fix:
- Non-multiple-of-4 values (13px, 17px, 23px, etc.)
- Card padding under 16px
- Section vertical padding under 48px
- Cramped button padding (needs min 8px 16px)

Normalize to 4px grid: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96

## 4. TOUCH TARGETS AUDIT
Check all interactive elements. Flag and fix:
- Buttons shorter than 40px (48px on mobile)
- Icon buttons smaller than 44x44px
- Form inputs shorter than 44px
- Clickable elements without adequate touch area

## 5. RESPONSIVE CHECK
Verify at 320px width:
- No horizontal overflow
- Touch targets increase to 48px
- Text remains readable
- CTAs are full-width or adequately sized

## Output Format
For each violation found:
1. File and line number
2. Current value
3. What's wrong
4. The fix

Then implement all fixes.
```

---

## Quick Version (For Smaller Fixes)

```
Quick UX audit - check and fix:
1. Contrast: No text lighter than gray-600 (#4B5563) on white
2. Typography: Body text minimum 16px, line-height 1.5+
3. Spacing: All values multiples of 4px, cards min 16px padding
4. Buttons: Minimum 40px height (48px mobile), 44px for icon buttons
```

---

## For Specific Issues

### Just Contrast
```
Audit all text colors in this project. Find any text that:
- Uses gray-400 or lighter on white/light backgrounds
- Has opacity applied that reduces readability
- Uses font-weight 300 or lighter on small text

Fix each to meet 4.5:1 contrast ratio minimum. Body text should be gray-700 (#374151) or darker.
```

### Just Typography
```
Audit typography in this project:
- Find all font-size declarations
- Flag anything under 16px for body text
- Check line-heights (body needs 1.5+)
- Ensure heading hierarchy follows a scale (not arbitrary sizes)

Implement the fluid type scale from UX_FOUNDATIONS.md.
```

### Just Spacing
```
Audit spacing in this project:
- Find all padding, margin, gap, and spacing values
- Flag non-multiples of 4 (13px, 17px, 23px, etc.)
- Check card padding (minimum 16px)
- Check section vertical padding (minimum 48px)

Normalize all to 4px grid.
```

### Just Touch Targets
```
Audit interactive elements:
- All buttons must be minimum 40px height
- Icon-only buttons must be 44x44px minimum
- Form inputs must be 44px height
- Add mobile media query to increase to 48px on touch devices

Fix any violations.
```

---

## After the Audit

Once fixes are applied, verify:
```
Check these are now correct:
1. [ ] Open dev tools, find darkest gray text - should be #374151 or darker
2. [ ] Inspect body text - should be 16px+ with line-height 1.5+
3. [ ] Check card padding - should be 16-24px
4. [ ] Click a button, check height in dev tools - should be 40px+
5. [ ] Resize to 320px width - no horizontal scroll, buttons 48px
```

