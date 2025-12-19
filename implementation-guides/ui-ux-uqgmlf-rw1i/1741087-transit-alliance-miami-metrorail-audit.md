# Implementation Guide

> **Source:** https://www.are.na/block/1741087
> **Title:** Transit Alliance Miami Metrorail Audit
> **Generated:** 2025-12-19T06:48:42.327Z

---

## Transit Status Dots

## Essence
Visualizes real-time data using a dot matrix, where color indicates status and density communicates quantity.

## Key Techniques

### Surface Treatment

```css
/* Background */
background: #f0f0f0; /* Light gray background */

/* Containers */
border-radius: 0px; /* No rounded corners */
box-shadow: none; /* No shadows */
border: none;

/* The cohesion recipe - what makes elements feel unified */
/* Consistent use of circular indicators and simple typography */
```

### Typography System
- Font approach: Geometric Sans
- Size scale:
  - h1: 16px
  - h2: 14px
  - body: 12px
  - labels: 10px
- Weight usage: Regular for most text, bold for headings.
- Distinctive moves: None.
- Color treatment: Primary black, secondary grey.

### Color Logic
- Mode: Light
- Background: #f0f0f0
- Text:
  - Primary: #000000
  - Secondary: #808080
- Accent:
  - Green: #008000 (Indicates good status)
  - Yellow: #FFFF00 (Indicates medium status)
  - Orange: #FFA500 (Indicates poor status)
  - Black: #000000 (Indicates no status/ghost train)
  - Grey: #A9A9A9 (Indicates unavailable)
- The rule: Color indicates the status of the trains.

### Layout & Spacing
- Density: Balanced
- Grid/spacing unit: 8px base
- Container padding: 0px
- Gap between elements: 8px between labels and dot matrices, 16px between sections (dates).
- Chunking strategy: Group by date, then by direction (northbound/southbound).

### Component Patterns
- **Navigation**: None apparent.
- **Buttons**: Simple text links styled as buttons.
- **Cards**: Not applicable.
- **Data display**: Dot matrix, with each dot representing a train or a unit of time. Number displayed next to dot matrix.
- **Icons**: None.

## Use This When
- **Real-time status visualization**: When you need to show the status of multiple items at a glance.
- **Simple data**: When the data is binary or categorical (e.g., good/bad).
- **Minimalist dashboards**: When you want to avoid clutter and focus on essential information.
- **Data that trends over time**: Displaying the current status compared to historical trends.

## Avoid This When
- **Complex data relationships**: When you need to show relationships between data points.
- **Detailed data analysis**: When users need to drill down into individual data points.
- **Visually appealing interfaces are required**: This is very functional, not beautiful.
- **When colorblind users are primary**: Color is the only differentiator.

## Adaptation Recipes

### → Dashboard
- Add interactive elements to filter and sort data.
- Include tooltips to show detailed information on hover.
- Add trend lines to visualize changes over time.

### → Landing Page
- Use larger, more visually appealing dots.
- Add animations to draw attention to key data points.
- Include call-to-action buttons to encourage users to take action.

### → Mobile ↔ Web
- **Mobile**: Stack sections vertically for better readability. Reduce font sizes.
- **Web**: Display multiple sections side-by-side.

### → Invert Color Mode
- Invert background color to a dark gray or black.
- Change text colors to white or light gray.
- Maintain accent colors for consistency, but adjust brightness/saturation for readability against the dark background.

