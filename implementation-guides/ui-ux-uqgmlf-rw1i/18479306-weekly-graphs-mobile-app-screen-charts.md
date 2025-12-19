# Implementation Guide

> **Source:** https://www.are.na/block/18479306
> **Title:** weekly graphs mobile app screen charts
> **Generated:** 2025-12-19T06:48:10.029Z

---

## Solar Data Slice

## Essence
Clean, minimal data presentation that uses color sparingly to highlight key metrics and progress.

## Key Techniques

### Surface Treatment

```css
/* Background */
background: #F5F5DC; /* Beige background */

/* Containers */
border-radius: 24px;
box-shadow: none; /* No shadows */
border: none;

/* The cohesion recipe - what makes elements feel unified */
/* Consistent border radius and a lack of shadows makes elements feel flat and unified. */
```

### Typography System
- Font approach: Geometric sans-serif
- Size scale:
    - h1 (large number): ~36px
    - h2 (titles): ~18px
    - body: ~14px
    - labels: ~12px
- Weight usage: Bold for primary numbers, regular for everything else.
- Distinctive moves: None
- Color treatment: Dark grey (#333) for primary text, lighter grey (#666) for labels.

### Color Logic
- Mode: Light
- Background: #F5F5DC;
- Text: #333 (primary), #666 (secondary)
- Accent: Yellow (#FFDA61) and Orange (#FF8C00) are used to highlight data points and progress.
- The rule: Color is used to draw attention to important data or actions, not for decoration.

### Layout & Spacing
- Density: Balanced
- Grid/spacing unit: 8px base
- Container padding: 24px
- Gap between elements: 16px
- Chunking strategy: Information is grouped into cards with rounded corners, each representing a specific data point or insight.

### Component Patterns
- **Navigation**: Top left corner logo/back icon with "Weekly Information" text. May 2021 date in the top right.
- **Buttons**: Not present, but implied actions would use the accent color for the background and white text.
- **Cards**: White background with rounded corners (border-radius: 24px).
- **Data display**: Large, bold numbers for key metrics. Line charts with accent color fill. Progress bars with accent color fill.
- **Icons**: Simple, geometric icons (e.g., back arrow).

## Use This When
- **Data-driven apps**: Where presenting key metrics clearly is the primary goal.
- **Internal dashboards**: Where a clean, professional look is desired.
- **Mobile apps**: The simple layout and typography work well on smaller screens.
- **Progress tracking**: Excellent for showing progress against goals with clear progress bars and charts.
- **Energy or environment related product**: The color scheme feels natural and organic.

## Avoid This When
- **Marketing websites**: Lacks visual flair for attracting attention.
- **Creative apps**: Too restrained for expressive interfaces.
- **Complex data visualization**: Not suitable for dense or multi-dimensional datasets.
- **Heavy user interaction**: The flat design lacks affordances for complex interactions.

## Adaptation Recipes

### → Dashboard
- Add filtering and sorting controls.
- Use a more complex grid layout to accommodate multiple data sources.
- Introduce interactive charts and graphs.
- Add table components.

### → Landing Page
- Replace data displays with compelling visuals and marketing copy.
- Use a more vibrant color palette.
- Add animations and transitions to draw attention.
- Incorporate strong calls to action.

### → Mobile ↔ Web
- **Mobile**: Stack cards vertically, increase touch target sizes to 44px.
- **Web**: Use a multi-column layout to display more information at once.

### → Invert Color Mode
- Background: Change to a dark gray (#222).
- Text: Invert text colors to white (#fff) and light gray (#ccc).
- Accent colors: Maintain the yellow and orange hues, but slightly desaturate them for better contrast on a dark background.
- Shadow/depth adjustments: Add subtle box-shadows to cards to create depth since the light background is gone.

---

