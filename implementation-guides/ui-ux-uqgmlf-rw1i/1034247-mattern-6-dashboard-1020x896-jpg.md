# Implementation Guide

> **Source:** https://www.are.na/block/1034247
> **Title:** mattern-6-dashboard-1020x896.jpg
> **Generated:** 2025-12-19T06:48:18.419Z

---

## London Dashboard

## Essence
Prioritizes information density and at-a-glance readability through clear visual hierarchy and muted color schemes, mimicking a real-time information feed.

## Key Techniques

### Surface Treatment

```css
/* Background */
background: #F0F0F0; /* Light gray background */

/* Containers */
border-radius: 8px;
box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
border: none;

/* The cohesion recipe - what makes elements feel unified */
/* Consistent border-radius and shadow create a card-like appearance across all sections. */
```

### Typography System
- Font approach: Geometric sans-serif (e.g., Open Sans, Montserrat)
- Size scale:
    - h1: 20px
    - h2: 16px
    - body: 12px
    - labels: 10px
- Weight usage: Bold for titles and key metrics, regular for body text.
- Distinctive moves: None.
- Color treatment: Dark gray for primary text, medium gray for secondary text, light gray for muted labels.

### Color Logic
- Mode: Light
- Background: #F0F0F0
- Text: #333333 (primary), #777777 (secondary)
- Accent: Green (for positive trends), Red (for negative trends), sparingly used for emphasis.
- The rule: Color is used to highlight key metrics and alert users to changes, maintaining a largely grayscale palette for data clarity.

### Layout & Spacing
- Density: Balanced
- Grid/spacing unit: 8px base
- Container padding: 8px to 12px
- Gap between elements: 8px
- Chunking strategy: Information is grouped into distinct cards, each dedicated to a specific data point or category.

### Component Patterns
- **Navigation**: None explicitly shown, assumes top-level navigation elsewhere.
- **Buttons**: Not prominent. Assumed to be minimal, flat, with rounded corners (border-radius: 8px) and subtle hover states.
- **Cards**: Defined by background color (#FFFFFF), border-radius (8px), and subtle box-shadow.
- **Data display**: Large, bold numbers for key metrics, smaller labels for context, color-coded arrows for trends.
- **Icons**: Mostly filled, lightweight, and used sparingly to supplement text labels.

## Use This When
- **Real-time data dashboards**: For displaying up-to-the-minute information from various sources.
- **Monitoring systems**: To provide a concise overview of system status and performance.
- **Information-heavy interfaces**: When the primary goal is to present a large amount of data in an organized manner.
- **Environments needing quick comprehension**: Where users need to grasp key information rapidly.

## Avoid This When
- **Marketing or branding**: The muted color scheme is not visually engaging for promotional purposes.
- **Visually driven applications**: Where aesthetic appeal is more important than information density.
- **Creative or artistic platforms**: The structured layout may feel restrictive for creative tasks.
- **UIs needing strong emotional connection**: The utilitarian design lacks warmth and personality.

## Adaptation Recipes

### → Dashboard
- Implement drill-down functionality within cards to explore data in more detail.
- Add interactive charts and graphs to visualize trends over time.

### → Landing Page
- Replace data cards with visually appealing hero sections and feature highlights.
- Introduce brighter accent colors and bolder typography to capture attention.

### → Mobile ↔ Web
- **Mobile**: Stack cards vertically, increase font sizes for readability, and optimize touch targets. Move navigation to a bottom tab bar.
- **Web**: Utilize a multi-column grid layout, incorporate larger charts and graphs, and provide more detailed data summaries.

### → Invert Color Mode
- Invert background to a dark gray (#222222).
- Change primary text to white (#FFFFFF) and secondary text to a lighter gray (#AAAAAA).
- Reduce shadow opacity or remove shadows entirely to maintain clarity.
- Keep accent colors consistent for trend indicators.

