# Implementation Guide

> **Source:** https://www.are.na/block/36691612
> **Title:** trips-tab-us.jpg?w=790
> **Generated:** 2025-12-19T06:46:33.567Z

---

## Airy Timeline Mobile

## Essence
Clean and minimal design that emphasizes a timeline of events with rounded cards and subtle shadows, creating a sense of depth and organization.

## Key Techniques

### Surface Treatment
```css
/* Background */
background: #F7F7F7;

/* Containers */  
border-radius: 16px;
box-shadow: 0 2px 8px rgba(0,0,0,0.06);
border: none; /* Or very light gray if needed */

/* The cohesion recipe - what makes elements feel unified */
/* Consistent border-radius and shadow across cards create visual harmony.  */
```

### Typography System
- Font approach: Primarily sans-serif, clean and readable.
- Size scale: h1 (24px), h2 (20px), body (16px), labels (12px).
- Weight usage: Bold for titles/headings, regular for body text and labels.
- Distinctive moves: Use of small, all-caps labels for secondary information.
- Color treatment: Primary text black, secondary text gray (#717171).

### Color Logic
- Mode: light
- Background: #F7F7F7
- Text: Black (#000000) and gray (#717171)
- Accent: Pink (#E2175A) for selected date and bottom navigation icon.
- The rule: Accent color is used sparingly to highlight key actions and information, creating a focal point without overwhelming the user.

### Layout & Spacing
- Density: Balanced - not too dense, but not overly spacious.
- Grid/spacing unit: 8px base.
- Container padding: 16px internal padding.
- Gap between elements: 16px spacing between cards/sections.
- Chunking strategy: Information is grouped into clear, distinct cards, separated by spacing and subtle shadows, forming a timeline.

### Component Patterns
- **Navigation**: Bottom tab navigation with outlined icons. Active tab is filled with the accent color.
- **Buttons**: Rounded rectangle with a light gray background and black text. border-radius: 9999px (pill shape).
- **Cards**: White background with rounded corners (border-radius: 16px) and subtle shadows.
- **Data display**: Events are displayed in a timeline format, with dates on the left and event details on the right.
- **Icons**: Outlined icons with a thin stroke weight.

## Use This When
- **Travel apps**: For displaying itineraries and travel plans.
- **Event planning apps**: For showcasing a schedule of events.
- **Productivity apps**: For visualizing tasks and deadlines in a timeline.
- **When you want to communicate a clear sequence of events**: The timeline layout is naturally suited for this purpose.

## Avoid This When
- **Data-heavy dashboards**: The minimal style may not be suitable for displaying large amounts of data.
- **Complex workflows**: The simple layout may not be sufficient for complex user flows.
- **Dark mode is a primary requirement**: The light background may not be ideal for dark mode.

## Adaptation Recipes

### → Dashboard
- Replace cards with more compact data tables.
- Add more visual cues, such as charts and graphs.
- Increase the density of information displayed.

### → Landing Page
- Use larger typography and more prominent imagery.
- Add a clear call to action (CTA) button.
- Focus on showcasing key features and benefits.

### → Mobile ↔ Web
- **Mobile**: Stack cards vertically, increase touch target sizes, move navigation to the bottom.
- **Web**: Use a wider layout, display more information at once, add more advanced filtering options.

### → Invert Color Mode
- Invert the background and text colors: background to #222222, text to white.
- Reduce the shadow opacity or remove shadows entirely.
- Keep the accent color consistent.

