# Trip Planner

A comprehensive trip planning application designed to help travelers organize itineraries, visualize schedules, and track important details like Schengen zone days. Built with Next.js 15, Drizzle ORM, and Tailwind CSS.

## Key Features

### 🌍 Trip Management
*   **Multi-Trip Organization:** Create and manage distinct trips with custom details and cover images.
*   **Collaborative Planning:** Shared trip access allowing multiple users to view and edit itineraries (infrastructure ready).
*   **Import Capabilities:** Tools to import trip data from external sources.

### 📅 Advanced Itinerary Planning
*   **Segments & Activities:** Break down trips into detailed segments (flights, stays, activities) with precise start/end times.
*   **Multiple Plans:** Create and compare different plan variations (e.g., "Plan A" vs. "Plan B") within a single trip.
*   **Visual Gantt Chart:** Interactive timeline view to visualize overlap, duration, and sequencing of trip segments.
*   **Map Integration:** Visualize segment locations on an interactive map (Leaflet/MapLibre).

### ✅ Tracking & Utilities
*   **Booking Status:** Track booked status for flights and accommodations per segment.
*   **Schengen Zone Calculator:** Automatically calculates and tracks days spent in the Schengen region to ensure visa compliance.
*   **AI Summary:** Intelligent summarization of trip details.

## Tech Stack
- **Framework:** Next.js 15 (App Router), React 19
- **Styling:** Tailwind CSS 4, DaisyUI 5, Radix UI
- **Database:** Drizzle ORM, LibSQL (Turso)
- **State Management:** React Query, SWR
- **Auth:** NextAuth.js
- **Testing:** Jest

## Getting Started

1.  **Install dependencies:**
    ```bash
    pnpm install
    ```

2.  **Run development server:**
    ```bash
    pnpm dev
    ```
    Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

3.  **Build for production:**
    ```bash
    pnpm build
    ```

## Development Commands

- `pnpm lint`: Lint code (JS & CSS).
- `pnpm lint:fix`: Fix linting errors.
- `pnpm test`: Run tests.
- `pnpm db:studio`: Open Drizzle Studio to inspect the database.

## Project Structure
- `src/app`: Next.js App Router pages and layouts.
- `src/components`: Reusable UI components and feature-specific modules (GanttChart, Maps, etc.).
- `src/db`: Database schema definition (Drizzle) and utilities.
- `src/lib`: Shared helpers, hooks, and business logic.
- `src/store`: Global state management.

## TODO

- [ ] Invite other users to join a trip (UI implementation)
- [ ] Simplified trip viewer, similar to TripIt
