# Implementation Guide

> **Source:** https://www.are.na/block/40249979
> **Title:** @duncandesi9n
> **Generated:** 2025-12-19T06:49:50.070Z

---

## Aura UI

## Essence
Friendly informational interfaces that blend a skeuomorphic feel with modern rounded surfaces and data visualization.

## Key Techniques

### Surface Treatment

```css
/* Background */
background: #F7F6F2; /* Off-white background */

/* Containers */  
border-radius: 24px;
box-shadow: 0 4px 12px rgba(0,0,0,0.04); /* Soft shadow */
border: none;

/* The cohesion recipe - what makes elements feel unified */
/* Consistent border-radius and shadows create a sense of depth and unity */
```

### Typography System
- Font approach: Geometric sans-serif
- Size scale: h1 (24px), h2 (18px), body (14px), labels (12px) - approximate
- Weight usage: Bold for headings, regular for body, medium for key stats
- Distinctive moves: All-caps for section titles, subtle letter-spacing for emphasis
- Color treatment: Primary (black), secondary (grey), muted (light grey)

### Color Logic
- Mode: Light
- Background: #F7F6F2
- Text: Primary - black, Secondary - #6B7280
- Accent: Yellow-orange used for badges and subtle highlights.
- The rule: Accent color draws attention to key stats and interactive elements, while a limited palette maintains focus on data.

### Layout & Spacing
- Density: Balanced
- Grid/spacing unit: 8px base
- Container padding: 16px
- Gap between elements: 8px between inline elements, 16px between sections
- Chunking strategy: Information is grouped into rounded cards with clear headings and consistent spacing.

### Component Patterns
- **Navigation**: Bottom tab bar with simple line icons.
- **Buttons**: Rounded rectangles with subtle shadow, filled with background color on press.
- **Cards**: Rounded containers with a consistent background color and shadow.
- **Data display**: Key metrics prominently displayed with a large font size and supporting labels. Numerical data points are contained in colored badges.
- **Icons**: Outlined, thin weight, consistent style across UI.

## Use This When
- **Mobile Apps**: For presenting information in a friendly and accessible way.
- **Educational Apps**: When conveying complex data in an engaging manner.
- **Game Companion Apps**: For displaying game statistics and information.
- **User-friendly tools**: When approachability is a key goal.

## Avoid This When
- **Data-dense dashboards**: The rounded style and generous spacing can reduce information density.
- **B2B/Enterprise software**: May appear too playful for serious professional contexts.
- **Dark mode is required**: The light color scheme is core to the aesthetic.

## Adaptation Recipes

### → Dashboard
- Reduce border-radius of cards to 12px.
- Decrease container padding to 12px.
- Use a more muted color palette.
- Add filtering and sorting controls.

### → Landing Page
- Increase the size of headings and body text.
- Use bolder colors for calls to action.
- Incorporate larger images and illustrations.

### → Mobile ↔ Web
- **Mobile**: Stack cards vertically, increase touch target sizes to 44px.
- **Web**: Use a multi-column layout, add hover states to buttons and cards.

### → Invert Color Mode
- Background: Change #F7F6F2 to a dark grey (#121212)
- Text: Invert text colors - primary becomes white, secondary becomes a lighter grey.
- Shadow/depth adjustments: Remove or significantly reduce shadows. Add subtle borders to containers for definition.
- What stays the same: Border-radius, icon style, accent color.

