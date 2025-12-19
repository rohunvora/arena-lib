# Implementation Guide

> **Source:** https://www.are.na/block/25241803
> **Title:** mykinsta-dashboard-homepage-min.png
> **Generated:** 2025-12-19T06:47:53.572Z

---

## Earthy Analytics

## Essence
Prioritizes clarity and approachability by using a warm, muted color palette and ample whitespace to present complex data in an easily digestible format.

## Key Techniques

### Surface Treatment

```css
/* Background */
background: #FAFAFA;

/* Containers */
border-radius: 12px;
box-shadow: 0 2px 8px rgba(0,0,0,0.06);
border: none;

/* The cohesion recipe - what makes elements feel unified */
/* Consistent border radius and subtle shadows create a soft, unified feel across all elements. */
```

### Typography System
- Font approach: Sans-serif
- Size scale: h1: 24px, h2: 18px, body: 14px, labels: 12px
- Weight usage: Bold for titles and key metrics, regular for body text and labels.
- Distinctive moves: None
- Color treatment: Primary text is dark gray, secondary text is a lighter gray for muted information.

### Color Logic
- Mode: Light
- Background: #FAFAFA
- Text: Primary: #333333, Secondary: #777777
- Accent: Green (for success states), orange/yellow (for progress indicators), blue (for interactive elements). Accent colors used sparingly to highlight key information.
- The rule: Color is used to create hierarchy by highlighting key information and interactive elements.

### Layout & Spacing
- Density: Balanced - not too dense, but not overly sparse.
- Grid/spacing unit: 8px base
- Container padding: 16px
- Gap between elements: 16px
- Chunking strategy: Information is grouped into cards with clear headings and subheadings.

### Component Patterns
- **Navigation**: Left sidebar with simple icons and text labels.
- **Buttons**: Rounded rectangle buttons with a subtle shadow.
- **Cards**: Rounded cards with a white background and a subtle shadow.
- **Data display**: Charts and graphs with clean lines and minimal styling. Key metrics are displayed prominently with clear labels.
- **Icons**: Outlined icons with a medium weight.

## Use This When
- **Web analytics dashboards**: The clear layout and muted color palette make it easy to understand complex data.
- **Internal tools**: The focus on clarity and usability makes it ideal for internal tools.
- **Data visualization**: The clean design and minimal styling allow the data to speak for itself.
- **When approachability is key**: The warm color palette and ample whitespace create a welcoming and approachable feel.

## Avoid This When
- **Marketing websites**: The muted color palette may not be attention-grabbing enough for marketing purposes.
- **Highly interactive applications**: The simple design may not be suitable for complex, interactive applications.
- **When a bold, modern look is desired**: The design is more classic and understated than cutting-edge.

## Adaptation Recipes

### → Dashboard
- Add filtering and sorting options to tables.
- Implement drill-down functionality for charts and graphs.

### → Landing Page
- Use brighter accent colors to draw attention to calls to action.
- Incorporate more imagery and visual elements.

### → Mobile ↔ Web
- **Mobile**: Stack cards vertically, move navigation to a bottom tab bar, increase touch target sizes to 44px.
- **Web**: Utilize a wider layout to accommodate more data, maintain a left sidebar navigation.

### → Invert Color Mode
- Invert background and text colors: background becomes dark gray, text becomes light gray.
- Lighten shadows to maintain a sense of depth.
- Keep accent colors the same to maintain consistency.

