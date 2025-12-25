# Spacing Reference Values

## CSS Variables Template

```css
:root {
  /* Card/component spacing */
  --space-card-padding: 1.25rem;     /* 20px */
  --space-card-gap: 1.5rem;          /* 24px */

  /* Section spacing */
  --space-section-hero: 6rem;        /* 96px */
  --space-section-major: 4rem;       /* 64px */
  --space-section-minor: 2rem;       /* 32px */

  /* Content spacing */
  --space-content-gap: 1rem;         /* 16px */
  --space-paragraph-gap: 1.5rem;     /* 24px */

  /* Button/form spacing */
  --space-button-padding: 0.75rem 1.25rem;  /* 12px 20px */
  --space-input-padding: 0.75rem 1rem;      /* 12px 16px */
}
```

## Tailwind Equivalents

| Purpose | Value | Tailwind |
|---------|-------|----------|
| Card padding | 20px | `p-5` |
| Card gap | 24px | `gap-6` |
| Hero padding | 96px | `py-24` |
| Major section | 64px | `py-16` |
| Minor section | 32px | `py-8` |
| Content gap | 16px | `gap-4` |

## The 4px Grid

Valid values:
```
4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 56, 64, 72, 80, 96
```

In Tailwind spacing scale:
```
1=4px, 2=8px, 3=12px, 4=16px, 5=20px, 6=24px, 8=32px, 10=40px, 12=48px, 16=64px, 20=80px, 24=96px
```

## Quick Diagnosis

| If you see... | The problem is... | Fix with... |
|---------------|-------------------|-------------|
| `p-6 gap-6` on cards | padding = gap | `p-5 gap-6` |
| `py-12` on all sections | monotonous | vary: `py-24`, `py-16`, `py-8` |
| `gap-2` between cards | too tight | `gap-6` minimum |
| `p-8` on sparse card | too much for content | `p-4` or `p-5` |
