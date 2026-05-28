# Design Implementation Plan - Sojourn Slow Travel Companion

This plan outlines the steps to implement the **Functional Minimalist / Corporate Modern** design system into the Sojourn alpha Next.js application, referencing the provided mockup screens in `tasks/stitch_sojourn_slow_travel_companion`.

---

## Proposed Database Schema Update

To support the rich content displayed on the new **Saved Places** dashboard cards, we need to extend the Drizzle database schema.

### `places` Table
We will add the following columns:
- `focus` (text): Specific focus of the destination (e.g., "Arashiyama district and tea ceremonies").
- `quickTip` (text): Quick callout tip for travelers/nomads (e.g., "Vasco da Gama bridge area has the best high-speed fiber").
- `personalNotes` (text): Custom notes (e.g., "Ideal for deep work sprints. Check out co-working spaces").
- `region` (text): Geographical region (e.g., "Europe", "Asia", "Americas", "Africa").
- `travelWindow` (text): Estimated travel dates/months (e.g., "Oct - Nov 2024").
- `isBookmarked` (boolean): Flag to toggle saved/favorite status.

---

## Proposed Changes

### Core Styling & Typography

#### 1. Global CSS Definitions
- File: `apps/web/src/app/globals.css`
- Define custom design tokens under Tailwind CSS v4 `@theme inline`:
  - Surfaces and Containers: `--color-surface` (`#f7f9fb`), `--color-surface-dim` (`#d8dadc`), `--color-surface-container-lowest` (`#ffffff`), `--color-surface-container-low` (`#f2f4f6`), etc.
  - Primaries & Neutrals: Deep navys (`#091426`, `#1e293b`) and architectural slate grays.
  - Mapped typography styles: `--font-headline-md` (Hanken Grotesk), `--font-data-mono` (JetBrains Mono), and `--font-body-base`/`--font-label-caps` (Inter).
  - Clean borders (`--radius-lg: 0.25rem`, `--radius-xl: 0.5rem`) and spacing rhythm tokens.

#### 2. Root Layout Transition
- File: `apps/web/src/app/layout.tsx`
- Load `Hanken Grotesk`, `Inter`, and `JetBrains Mono` through the global stylesheet.
- Restructure the page template into a flex/grid split layout container:
  - Embed the new left-docked `Sidebar` navigation.
  - Nest the main content workspace on the right, capped with the top header bar `Navbar`.

---

### Navigation Components

#### 3. Left Navigation Rail
- File: `apps/web/src/components/Sidebar.tsx`
- Create a global Left Sidebar Navigation Rail component:
  - Header: "Sojourn" brand text with "Slow Travel" label caption.
  - List of tabs: "My Trips" (map icon), "Places" (explore icon), and "Settings" (settings icon).
  - Highlight the active route with primary border accent and background hover states.
  - Footer: Current user's avatar image, name, and membership badge.

#### 4. Top Application Bar
- File: `apps/web/src/components/Navbar/Navbar.tsx`
- Refactor the component to act purely as the sticky **Top Application Bar**:
  - Left Section: Page name (e.g. "Trip Planner" or current Trip title) and view tabs ("Itinerary" / "Trip Map") that toggle `showMap` wire state.
  - Right Section: Buttons for "New Trip" and "Import/Backup", Dark Mode toggle, and standard options dropdown.

---

### Dashboard (My Trips)

#### 5. Trip Card Redesign
- File: `apps/web/src/components/TripCard.tsx`
- Redesign the trip card:
  - Aspect ratio 16:9 cover image with zoom hover transition (`scale-105`).
  - Absolute-positioned status label chip in the top right.
  - Footer details: Trip Title (Headline Grotesk), formatted date range, and a segment count pill.

#### 6. Trips Page
- File: `apps/web/src/app/trips/TripsPage.tsx`
- Update Trips gallery view:
  - Header showing "Ongoing Journeys" and subtitle.
  - Grid holding the dynamic list of Trip Cards and a dashed-border "Plan a New Adventure" action card.
  - Below the grid, add the "Recent Updates" table: lists trip logs, edit timestamps, segment changed name, and status badges ("Confirmed", "Waitlist", "Action Needed").

---

### Trip Details & Itinerary

#### 7. Trip Planning Detail Layout
- File: `apps/web/src/components/TripDetail/TripDetail.tsx`
- Rearrange Itinerary planning layout:
  - Left column features:
    - **Schengen Stay Tracker**: Circular SVG progress gauge showing used/remaining Schengen days.
    - **Weather & Stop Widget**: Weather info for the current city (sunny/cloudy, temperature) and countdown to next segment.
    - **Dense Itinerary Table**: Segment rows with fixed height (40px) displaying City/Country, Dates, segment Days count, cumulative stay count, Booking Icons (flight/train/bed), region check, and status chips.
  - Bottom column / Right column:
    - **Gantt Chart Timeline**: Renders full timeline scheduler.
  - Map View: When `showMap` is true, display a split screen showing the interactive map on the left and a dense segment-cards list sidebar on the right.

#### 8. Gantt Chart Timeline
- File: `apps/web/src/components/GanttChart/GanttChart.tsx`
- Refresh Gantt styling:
  - Clean slate-100 grid lines and minimalist dates header.
  - Today timeline marker: vertical red dashed line with an absolute-positioned "TODAY" label.
  - Task bars: solid color fills matching the accents, with inline labels.

---

### Saved Places (New Screen)

#### 9. Saved Places Dashboard
- File: `apps/web/src/app/places/page.tsx`
- Build the Saved Places screen:
  - Header: "Future Destinations" with "Add Place" button.
  - Search bar input to filter cards by name, note details, or region.
  - Region filter pills ("All", "Europe", "Asia", "Americas").
  - Grid of places cards showing:
    - 16:9 Unsplash cover image with region badge overlays.
    - Title with inline Bookmark button toggle (filled / outline).
    - Focus, Quick Tip box, Personal notes.
    - Footer showing segment count and travel window.
  - "Recently Viewed Segments" log table at the bottom of the page.

#### 10. Update Place API
- File: `apps/web/src/app/api/places/[id]/route.ts`
- Extend the PUT handler to update the new database columns (`focus`, `quickTip`, `personalNotes`, `region`, `travelWindow`, `isBookmarked`) in Drizzle schema.

---

## Verification Plan

### Automated Tests
- Run `pnpm lint` and `pnpm check` to ensure syntax, imports, and style sheets are correct.
- Verify unit tests build via `pnpm test`.

### Manual Verification
- Deploy local dev server via `pnpm dev`.
- Verify visual layout transitions, hover states, Schengen stay progress circle, Gantt chart today red line, and Places filters.
