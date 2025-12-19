# Implementation Guide: Kinsta Dashboard

> Source: https://www.are.na/block/25241803
> Generated: 2025-12-19T06:43:34.329Z

---

## Sandstone Analytics

## Essence
Clean data visualization through soft contrast and muted tones, creating a calm and approachable experience.

## Key Techniques

### Surface Treatment
- Background: Solid, very light beige/sand color.  Use `background-color: #f7f2ed;` as a base, but be ready to adjust slightly.
- Border:  `border-radius: 12px` on all cards and containers. No borders are visible.
- Depth/Shadow: Subtle shadows to lift cards. `box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);`
- The key is a cohesive, muted feel.  All elements should blend softly.

### Typography System
- Font pairing: Primarily sans-serif. Use a clean, readable sans-serif like Inter or Open Sans.
- Hierarchy:
    - Titles: Larger, slightly bolder weight.
    - Subtitles/Labels: Smaller, medium weight.
    - Body: Regular weight, slightly muted color.
- Distinctive moves:  None.  Keep it simple and readable.
- Text color: Vary text color based on importance.  Darker for titles/labels, lighter (greyish) for body text.

### Color Logic
- Palette: Muted pastel colors with a beige base. The primary accent color should be desaturated and used sparingly.
- Hierarchy: Use color to highlight key data points.
- Accent:  Accents are used for data visualization (charts, graphs) and status indicators (green for active, etc.).
- Background vs. Foreground:  Light background with darker (but not black) foreground elements.  Maintain high readability.

### Layout & Spacing
- Density: Balanced.  Not too dense, but not overly spacious.
- Card/Container: Cards are the primary organizational unit. Content is grouped within these cards.
- Spacing rhythm: 16px padding within cards. 8px spacing between elements inside the card.
- Information chunking: Group related information visually within cards.

### Component Patterns
- Navigation: Simple sidebar navigation with icons.
- Button/CTA: Rounded rectangle buttons with a darker shade of the background color or a muted accent color. Hover states should be slightly darker. `border-radius: 8px`.
- Data presentation: Clean charts and graphs. Use consistent color-coding.
- Icons: Outline icons, consistently sized and colored.
- Signature components: Data cards with subtle shadows and rounded corners.

## Use This When
- Analytics dashboards
- Project management tools
- Monitoring applications
- Situations requiring a calm, trustworthy feel
- Content-heavy interfaces where readability is paramount

## Avoid This When
- High-energy marketing sites
- Games or entertainment apps
- Situations needing a bold, attention-grabbing style
- When visual hierarchy needs to be extremely aggressive

## Adapting to Context

### For a Dashboard
Prioritize clear data visualization. Use color sparingly but effectively to highlight critical metrics. Ensure ample whitespace to avoid visual clutter.

### For a Landing Page
Adapt the muted color palette to be slightly more vibrant. Use larger headlines and more prominent CTAs, but maintain the overall clean aesthetic. Employ the rounded corners and subtle shadows to maintain a consistent brand feel.

### For Mobile vs Web
On mobile, increase spacing and font sizes for better readability. Simplify navigation to fit smaller screens (e.g., bottom navigation bar). Consider using full-width cards for a more immersive experience.

### For Dark Mode
Invert the color scheme, using a dark grey or black background. Adjust the shadow values to be less pronounced, or use subtle glows instead. Ensure text remains highly readable against the dark background. Accent colors may need to be adjusted to maintain visibility.

