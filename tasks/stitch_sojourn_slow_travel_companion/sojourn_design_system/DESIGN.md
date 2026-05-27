---
name: Sojourn Design System
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#45474c'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#75777d'
  outline-variant: '#c5c6cd'
  surface-tint: '#545f73'
  primary: '#091426'
  on-primary: '#ffffff'
  primary-container: '#1e293b'
  on-primary-container: '#8590a6'
  inverse-primary: '#bcc7de'
  secondary: '#515f74'
  on-secondary: '#ffffff'
  secondary-container: '#d5e3fd'
  on-secondary-container: '#57657b'
  tertiary: '#0b1426'
  on-tertiary: '#ffffff'
  tertiary-container: '#20283c'
  on-tertiary-container: '#888fa7'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e3fb'
  primary-fixed-dim: '#bcc7de'
  on-primary-fixed: '#111c2d'
  on-primary-fixed-variant: '#3c475a'
  secondary-fixed: '#d5e3fd'
  secondary-fixed-dim: '#b9c7e0'
  on-secondary-fixed: '#0d1c2f'
  on-secondary-fixed-variant: '#3a485c'
  tertiary-fixed: '#dae2fd'
  tertiary-fixed-dim: '#bec6e0'
  on-tertiary-fixed: '#131b2e'
  on-tertiary-fixed-variant: '#3f465c'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-base:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-caps:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  data-mono:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '450'
    lineHeight: 16px
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 32px
  container-max: 1280px
---

## Brand & Style

The brand personality is **Functional Minimalist**. It is designed for the "slow traveler"—individuals who value precision, deep planning, and clarity over decorative flair. The system strikes a balance between a high-utility tool and a sophisticated travel journal.

The aesthetic draws from **Corporate Modern** and **Information Design** movements. It prioritizes high information density, utilizing a structured grid and subtle tonal layering to manage complex datasets like multi-month itineraries and Gantt charts. The emotional response should be one of "calm control"—the UI disappears to let the itinerary take center stage.

## Colors

The palette is rooted in **Slate Grays** and **Deep Navys** to provide a professional, architectural foundation. 

- **Primary & Neutrals:** We use a range of Slates (from 50 to 900) for backgrounds, borders, and text. This creates a low-fatigue environment for long planning sessions.
- **Accents:** Vibrant but controlled colors are used strictly for data categorization (e.g., segment types or transport modes) and status indicators. 
- **Surface Strategy:** The system uses a "paper-on-stone" approach—pure white or very light gray surfaces (`#F8FAFC`) sit atop slightly darker backgrounds to define workspace boundaries without heavy shadows.

## Typography

Typography is the primary tool for hierarchy. We use a tri-font system:
1. **Hanken Grotesk** for headings: A sharp, contemporary sans-serif that feels engineered and precise.
2. **Inter** for UI and body text: Highly legible at small sizes with a neutral tone.
3. **JetBrains Mono** for data points: Used in Gantt chart dates, segment counts, and coordinate-style data to reinforce the "planning tool" feel.

**Scale and Density:** Font sizes lean smaller (13px/14px for body) to accommodate the high density required for travel segments and timeline views.

## Layout & Spacing

This design system employs a **Fixed Grid** for content areas and a **Fluid Layout** for data-heavy views.

- **Grid:** A 12-column grid is used for the "Trip Gallery" view. For the "Itinerary Planner," a split-pane approach is used: a flexible table/list on the left and a scrollable Gantt chart on the right.
- **Rhythm:** A 4px base unit drives all spacing. 
- **Density:** Padding is intentionally tight (8px–12px within cards and table rows) to maximize the "at-a-glance" information density.
- **Breakpoints:** 
  - Mobile (<768px): Single column, horizontal scroll for Gantt charts.
  - Tablet (768px–1024px): 2-column cards, condensed table view.
  - Desktop (>1024px): Full dashboard with persistent sidebar navigation.

## Elevation & Depth

Elevation is communicated through **Tonal Layers** and **Low-Contrast Outlines** rather than heavy shadows.

- **Level 0 (Background):** Slate 50 or 100.
- **Level 1 (Cards/Panels):** White surface with a 1px border (Slate 200).
- **Level 2 (Popovers/Menus):** White surface with a very subtle, diffused shadow (Blur 12px, 5% opacity) to provide separation without breaking the minimalist aesthetic.
- **Interactive States:** Hovering over a list item or card should trigger a slight background tint change (Slate 50) rather than a vertical lift.

## Shapes

To maintain the "functional minimalist" look, the design system uses a restricted roundedness scale.

- **Standard Elements:** 4px (`0.25rem`) radius for buttons, input fields, and small UI elements.
- **Large Containers:** 8px (`0.5rem`) radius for trip cards and modal containers.
- **Gantt Bars:** 2px radius or sharp edges to ensure bars align perfectly with the background grid lines, maintaining visual precision.

## Components

### Trip Cards
- Aspect ratio for images: 16:9 or 3:2.
- Text content is left-aligned with `headline-md`.
- Footer contains a small `label-caps` for the segment count and date range.

### Dense Data Tables (Segments)
- Row height: 40px fixed.
- Use `data-mono` for dates and durations.
- Checkboxes should be minimal (16px) with a Slate 900 active state.
- Icons within rows are 18px, using a consistent line weight (1.5px).

### Gantt Chart
- Grid lines: 1px Slate 100.
- Current date marker: 1px dashed line in Primary color.
- Segment bars: Solid fill colors from the accent palette. Text inside bars uses `label-caps` in white if contrast allows, otherwise primary text color.

### Buttons & Inputs
- **Primary Button:** Slate 900 background, white text, 4px radius. No gradient.
- **Secondary/Ghost:** Slate 200 border, transparent background.
- **Input Fields:** 1px border (Slate 300), focusing to 2px Primary border. Label is always visible using `label-caps` above the field.

### Status Chips
- Small, rectangular with 2px radius. 
- Subtle background tint (10% opacity of the accent color) with full-strength color for the text.