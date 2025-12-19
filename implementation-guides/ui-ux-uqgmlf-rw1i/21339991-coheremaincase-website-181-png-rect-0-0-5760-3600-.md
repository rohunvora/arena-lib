# Implementation Guide

> **Source:** https://www.are.na/block/21339991
> **Title:** coheremaincase-website-181.png?rect=0-0-5760-3600-w=1500-crop=1-q=70-fm=jpg-auto=format-fit=crop-h=938-dpr=2
> **Generated:** 2025-12-19T06:48:34.881Z

---

## Muted Pastel Playground

## Essence
Gentle use of color and soft shapes creates a playful but professional UI, emphasizing content clarity over visual noise.

## Key Techniques

### Surface Treatment
```css
/* Background */
background: #F5F1ED; /* Soft beige/off-white */

/* Containers */  
border-radius: 12px;
box-shadow: 2px 4px 10px rgba(0,0,0,0.04); /* Very subtle */
border: none;

/* The cohesion recipe - what makes elements feel unified */
/* Consistent border radius and subtle shadow tie everything together */
```

### Typography System
- Font approach: Geometric sans-serif, clean and modern.
- Size scale: h1: 24px, h2: 20px, body: 14px, labels: 12px
- Weight usage: Regular for body, Medium/Semi-bold for headings, subtle use of bold for key data points.
- Distinctive moves: None beyond standard usage. Focus on readability.
- Color treatment: Primary text dark grey (#333), secondary light grey (#777), muted labels.

### Color Logic
- Mode: Light
- Background: #F5F1ED
- Text: Primary: #333333, Secondary: #777777
- Accent: Varied pastels (purple, blue, orange, green) used sparingly for highlights, badges, and visual differentiation in tables/charts.
- The rule: Color is used to differentiate elements, not to create strong hierarchy. The layout and typography do that work.

### Layout & Spacing
- Density: Balanced - not too sparse, not too crowded.
- Grid/spacing unit: 8px base.
- Container padding: 16px internal padding on cards.
- Gap between elements: 16px spacing between cards/sections.
- Chunking strategy: Information is grouped into rounded cards with clear titles, using consistent spacing throughout.

### Component Patterns
- **Navigation**: Tab-based navigation with subtle icons (often outlined).
- **Buttons**: Rounded rectangle buttons with a solid background fill, subtle hover effect. `border-radius: 8px`
- **Cards**: Rounded containers with subtle shadows, used to group related information.
- **Data display**: Key metrics displayed with larger font sizes and slight bolding.
- **Icons**: Simple, outlined icons with a consistent stroke weight.

## Use This When
- **Internal tools**: The gentle design is easy on the eyes for long periods of use.
- **Data exploration**: The muted colors don't distract from the data itself.
- **Educational platforms**: The playful feel is inviting and approachable.
- **Applications requiring trust**: The clean design and subtle animations inspire confidence.

## Avoid This When
- **Marketing sites**: Lacks strong visual impact for grabbing attention.
- **High-stakes financial dashboards**: Needs more visual hierarchy and emphasis on critical data.
- **Gaming or entertainment apps**: Too restrained; needs more expressiveness.

## Adaptation Recipes

### → Dashboard
- Add a stronger primary color for key performance indicators (KPIs).
- Use more distinct chart types for data visualization.
- Consider a denser layout for maximum information density.

### → Landing Page
- Introduce larger hero sections with more vibrant imagery.
- Use stronger calls to action with bolder colors.
- Reduce the amount of text and focus on concise messaging.

### → Mobile ↔ Web
- **Mobile**: Stack cards vertically, increase touch target sizes to at least 44px, move navigation to a bottom tab bar.
- **Web**: Utilize a wider layout to display more information at once, consider a sidebar navigation.

### → Invert Color Mode
- Invert background to a dark grey (#222).
- Change primary text to white (#FFF) and secondary to light grey (#AAA).
- Keep the pastel accent colors, but slightly brighten them.
- Remove or soften the box-shadows to maintain a sense of depth.

