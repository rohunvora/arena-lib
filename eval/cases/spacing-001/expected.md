# Expected Good Fix

## Diagnosis Should Identify
1. Card padding (24px) = gap between cards (24px) → violates Law of Proximity
2. Cards feel like islands because internal = external spacing
3. Section spacing could be more varied

## Correct Fix Options

### Option A: Reduce card padding
```tsx
// Before: p-6 (24px) with gap-6 (24px) - EQUAL
// After: p-5 (20px) with gap-6 (24px) - internal < external

<div className="grid grid-cols-3 gap-6">
  <div className="p-5 bg-white rounded-lg shadow">
```

### Option B: Increase gap
```tsx
// Before: p-6 (24px) with gap-6 (24px) - EQUAL
// After: p-6 (24px) with gap-8 (32px) - internal < external

<div className="grid grid-cols-3 gap-8">
  <div className="p-6 bg-white rounded-lg shadow">
```

### Bonus: Vary section spacing
```tsx
// Consider this is a features section after a hero
// Could use py-16 (64px) for a major section
<section className="py-16 px-6">
```

## Values Must Be
- On 4px grid (multiples of 4)
- Specific, not vague ("add more padding")

## Should NOT Do
- Use arbitrary values like p-[22px]
- Make padding > gap (inverts the relationship)
- Ignore the underlying principle (just change random values)
