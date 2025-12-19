# Implementation Guide

> **Source:** https://www.are.na/block/41509567
> **Title:** Agrotech Dashboard by Product SAAS for Cansaas on Dribbble
> **Generated:** 2025-12-19T06:48:01.845Z

---

## Data Card Refresh

## Essence
Clean data display focuses on clarity through subtle color gradients and rounded containers, emphasizing the before/after impact.

## Key Techniques

### Surface Treatment
```css
/* Background */
background: #F7F7F7; /* Light gray background */

/* Containers */  
border-radius: 12px;
box-shadow: 0 2px 8px rgba(0,0,0,0.06); /* Subtle shadow */
border: none;

/* The cohesion recipe - unified by consistent border-radius and shadow */
```

### Typography System
- Font approach: Geometric sans-serif
- Size scale: 
  - h1 (large number): 20-24px
  - h2 (metric title): 12px
  - body (max/min values): 10px
  - labels: 10px
- Weight usage: Bold for primary numbers, regular for labels and min/max values.
- Distinctive moves: None
- Color treatment: Primary text is dark gray, secondary labels and min/max values are a lighter gray.

### Color Logic
- Mode: Light
- Background: #F7F7F7
- Text: Primary: #333333, Secondary: #777777
- Accent: Green gradient for positive impact (after), red gradient for negative impact (before). Used in the "Area prediction model" bar and "Soil condition" graph. Blue used for "before" graph.
- The rule: Color indicates positive or negative change, reinforcing the data story.

### Layout & Spacing
- Density: Balanced
- Grid/spacing unit: 8px base
- Container padding: 16px
- Gap between elements: 8px-16px
- Chunking strategy: Each metric (humidity, temperature, etc.) is grouped within a card, using whitespace to separate them.

### Component Patterns
- **Navigation**: N/A
- **Buttons**: The "AI Insights" element is a pill-shaped button with a light background color. border-radius: 9999px;
- **Cards**: Rounded containers with subtle shadows.
- **Data display**: Large numbers with labels above, min/max values displayed to the right of the numbers. Bar graph for "Area prediction model", line graph for "Soil condition".
- **Icons**: Simple, outlined icons for the metric titles.

## Use This When
- **Data reporting**: Clearly showing improvements or changes in metrics.
- **Environmental monitoring**: Displaying sensor data with a focus on impact.
- **User-friendly dashboards**: Presenting complex data in an accessible way.
- **When the user needs to see improvement over time**.

## Avoid This When
- **Information overload**: Too many metrics will clutter the interface.
- **Dark mode is required**: The light background is integral to the aesthetic.
- **Complex interactions**: This style is best for static data display, not interactive exploration.
- **When exact values are more important than trends**

## Adaptation Recipes

### → Dashboard
- Add filtering and sorting options.
- Use a consistent grid layout for multiple cards.
- Implement tooltips for detailed information on hover.

### → Landing Page  
- Use larger typography for key metrics.
- Add supporting visuals to highlight the data.
- Include a clear call to action related to the displayed data.

### → Mobile ↔ Web
- **Mobile:** Stack cards vertically, increase font sizes for readability, move min/max values below the main number.
- **Web:** Display cards in a grid, use tooltips for additional information, allow for expandable sections.

### → Invert Color Mode
- Invert background color to a dark gray (#333333).
- Change primary text color to white.
- Adjust shadow values to be lighter and less prominent. box-shadow: 0 2px 8px rgba(255,255,255,0.06);
- Maintain the green/red color scheme for positive/negative impact.

