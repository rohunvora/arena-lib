# Implementation Guide

> **Source:** https://www.are.na/block/23645590
> **Title:** f568rj4xuaa0aim?format=jpg-name=medium
> **Generated:** 2025-12-19T06:48:48.849Z

---

## Pixel Pal Prompts

## Essence
Friendly, pixelated feedback indicators use color and simple iconography to convey status in a non-intrusive way.

## Key Techniques

### Surface Treatment
```css
/* Background */
background: rgba(0,0,0,0); /* transparent background */

/* Containers */  
border-radius: 12px;
box-shadow: none;
border: none;

/* The cohesion recipe - what makes elements feel unified */
/* Light background tints tied to feedback color */
```

### Typography System
- Font approach: Geometric sans
- Size scale:
    - h1: 16px
    - body: 12px
- Weight usage: Regular for body, bold for titles.
- Distinctive moves: None
- Color treatment: Dark gray for titles, slightly muted dark gray for descriptions.

### Color Logic
- Mode: light
- Background: White
- Text: Dark gray, slightly muted
- Accent: Green, blue, red used as background tints on cards.
- The rule: Color indicates status, with green for positive, blue for neutral, and red for negative.

### Layout & Spacing
- Density: minimal
- Grid/spacing unit: 8px base
- Container padding: 12px
- Gap between elements: 8px
- Chunking strategy: Title + description grouped within a colored card.

### Component Patterns
- **Navigation**: N/A
- **Buttons**: N/A
- **Cards**: Rounded rectangles with light background tints.
- **Data display**: N/A
- **Icons**: Pixelated icons matching the status: happy face, neutral face, sad face. Use a small icon indicating the type of feedback (e.g. checkmark, dash, exclamation).

## Use This When
- **Educational apps**: Friendly, non-intrusive feedback for learners.
- **Gamified experiences**: Clear status updates in a playful style.
- **Simple interfaces**: Easily understood indicators without visual clutter.
- **Positive reinforcement**: Encouraging user progress with positive feedback.

## Avoid This When
- **Data-heavy dashboards**: Too simplistic for complex information.
- **Serious contexts**: Tone is too playful for critical warnings.
- **Visually complex interfaces**: Pixelated style can clash with other elements.

## Adaptation Recipes

### → Dashboard
- Replace pixelated icons with more detailed charts for data visualization.
- Use color to highlight key metrics instead of just status.

### → Landing Page
- Replace status messages with compelling calls to action.
- Use color to draw attention to important features.

### → Mobile ↔ Web
- Mobile: Stack cards vertically for easier readability on smaller screens.
- Web: Display cards side-by-side for a wider view.

### → Invert Color Mode
- Use darker shades of green, blue, and red for background tints.
- Use white or light gray for text on dark backgrounds.
- Keep the pixelated icons the same color.

