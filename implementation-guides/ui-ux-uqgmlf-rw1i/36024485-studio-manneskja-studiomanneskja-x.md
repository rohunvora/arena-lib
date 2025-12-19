# Implementation Guide

> **Source:** https://www.are.na/block/36024485
> **Title:** STUDIO MANNESKJA(@StudioManneskja) / X
> **Generated:** 2025-12-19T06:46:17.868Z

---

## Ethereal Gradient Mobile

## Essence
Soft gradients and rounded cards create a calming, approachable interface, ideal for services that want to feel modern and friendly.

## Key Techniques

### Surface Treatment

```css
/* Background */
background: linear-gradient(to bottom, #E6F0FF, #FFF0F5); /* Light, airy gradient */

/* Containers */
border-radius: 24px;
box-shadow: 0 4px 16px rgba(0,0,0,0.04);
border: none; /* Or a very subtle 1px solid rgba(0,0,0,0.08) */

/* The cohesion recipe - what makes elements feel unified */
/* Shared border-radius and subtle shadow across all cards */
```

### Typography System
- Font approach: Geometric sans-serif
- Size scale:
    - h1: 24px
    - h2: 20px
    - body: 16px
    - labels: 14px
- Weight usage: Bold for headings, regular for body, medium for labels.
- Distinctive moves: None apparent.
- Color treatment: Primary text is near-black (#222), secondary is a muted gray (#666).

### Color Logic
- Mode: Light
- Background: Gradient from light blue to light pink.
- Text: Dark gray for primary, medium gray for secondary/muted.
- Accent: Black for main CTA button.
- The rule: Color is primarily used for subtle background gradients, with text colors providing hierarchy.

### Layout & Spacing
- Density: Balanced
- Grid/spacing unit: 8px base.
- Container padding: 24px internal padding on cards.
- Gap between elements: 16px spacing between cards.
- Chunking strategy: Content is grouped into rounded cards, separating sections.

### Component Patterns
- **Navigation**: Back button only, no other navigation visible.
- **Buttons**: Rounded rectangle, filled with black, white text. `border-radius: 9999px;`
- **Cards**: Rounded rectangles with subtle shadows, containing related information.
- **Data display**: Price and subscription details are prominently displayed using larger font sizes and bold weight.
- **Icons**: Simple checkmark icons.

## Use This When
- **Subscription services**: The soft, approachable aesthetic is ideal for encouraging sign-ups.
- **AI-powered tools**: Modern and friendly feel aligns well with innovative technologies.
- **Mobile-first products**: The layout is optimized for smaller screens and touch interaction.
- **Calm and trustworthy interfaces**: The subtle gradients and rounded corners create a sense of calm.

## Avoid This When
- **Data-heavy dashboards**: The visual style is not optimized for displaying large amounts of data.
- **Complex enterprise applications**: The simplicity may not be suitable for complex workflows.
- **Dark or serious themes**: The light and airy aesthetic clashes with darker themes.

## Adaptation Recipes

### → Dashboard
- Replace the gradient background with a solid light gray or white.
- Use a more structured grid layout for data tables and charts.
- Add more visual contrast to distinguish different data elements.

### → Landing Page
- Emphasize the hero section with a bolder gradient and larger typography.
- Add more prominent call-to-action buttons with clear value propositions.
- Include customer testimonials and social proof to build trust.

### → Mobile ↔ Web
- **Mobile**: Stack cards vertically, increase touch target sizes to 44px, move navigation to bottom tab bar if needed.
- **Web**: Use a wider layout with multiple columns, increase font sizes for readability on larger screens.

### → Invert Color Mode
- Invert the background gradient to a dark blue or purple.
- Change text colors to light gray or white.
- Maintain the subtle shadows on cards, but adjust the color to be lighter. The key is to make them look *recessed* instead of raised.

