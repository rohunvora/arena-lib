# Test Case: spacing-001

## Skill Being Tested
`fix-spacing`

## Problem Type
Cards feeling like floating islands (padding = gap)

## Prompt to Use
```
The cards on this page feel disconnected, like they're floating islands instead of a related group. Can you fix the spacing?
```

## Input File
See `input.tsx`

## Expected Outcome
- Diagnose: padding equals gap (Law of Proximity violation)
- Fix: reduce card padding OR increase gap between cards
- Values should be on 4px grid
- Should vary section spacing (not monotonous)

## What "Good" Looks Like
See `expected.md`
