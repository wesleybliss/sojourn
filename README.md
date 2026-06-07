# Sojourn

A comprehensive trip planning application designed to help travelers organize itineraries, visualize schedules, and track important details like Schengen zone days. Built with Next 15, Drizzle ORM, and Tailwind CSS.

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
- **Framework:** Next 15 (App Router), React 19
- **Styling:** Tailwind CSS 4, DaisyUI 5, Radix UI
- **Database:** Drizzle ORM, LibSQL (Turso)
- **State Management:** React Query, SWR
- **Auth:** NextAuth
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
- `src/app`: Next App Router pages and layouts.
- `src/components`: Reusable UI components and feature-specific modules (GanttChart, Maps, etc.).
- `src/db`: Database schema definition (Drizzle) and utilities.
- `src/lib`: Shared helpers, hooks, and business logic.
- `src/store`: Global state management.

## Database Helpers

Start an interactive SQL shell with:

```shell
turso db shell sojourn
```

To see information about the database, including a connection URL, run:

```shell
turso db show sojourn
```

To get an authentication token for the database, run:

```shell
turso db tokens create sojourn
```shell

## TODO

- [ ] Enforce RBAC on all API routes
- [ ] Invite other users to join a trip (UI implementation)
- [ ] Either make places the source of truth, and autocomplete when adding new segments, or find a way to dedupe them, since currently there are many duplicate places.
- [ ] Plans handlers still doing some manual db calls
- [ ] Import country/state/city data from a CSV file (`psql -d your_database -c "\COPY geonames_cities FROM 'cities500.txt' DELIMITER E'\t' NULL '' ENCODING 'UTF8';"`)


```sql
SELECT name, country_code, latitude, longitude, population
FROM geonames_cities
WHERE feature_class = 'P'  -- Only populated places
  AND population > 10000    -- Filter out tiny villages
  AND (
      name ILIKE 'napoli%' 
      OR ascii_name ILIKE 'napoli%'
      OR alternate_names ILIKE '%napoli%'
  )
ORDER BY population DESC
LIMIT 10;
```

Better full-text search on alternate names:

```sql
SELECT name, country_code, population
FROM geonames_cities
WHERE feature_class = 'P'
  AND to_tsvector('simple', alternate_names) @@ to_tsquery('simple', 'napoli')
ORDER BY population DESC
LIMIT 10;
```

With a proximity boost:

```sql
SELECT name, country_code, population,
       CASE 
           WHEN name ILIKE 'napoli' THEN 3
           WHEN name ILIKE 'napoli%' THEN 2
           WHEN alternate_names ILIKE '%napoli%' THEN 1
           ELSE 0
       END AS relevance
FROM geonames_cities
WHERE feature_class = 'P'
  AND (name ILIKE '%napoli%' OR alternate_names ILIKE '%napoli%')
ORDER BY relevance DESC, population DESC
LIMIT 10;

```

```ts
import { like, desc, and, sql } from 'drizzle-orm';

const searchCities = async (searchTerm: string) => {
  const results = await db
    .select({
      name: geonamesCities.name,
      countryCode: geonamesCities.countryCode,
      population: geonamesCities.population,
      latitude: geonamesCities.latitude,
      longitude: geonamesCities.longitude,
    })
    .from(geonamesCities)
    .where(
      and(
        sql`${geonamesCities.featureClass} = 'P'`,
        sql`${geonamesCities.population} > 10000`,
        sql`(
          ${geonamesCities.name} LIKE ${`${searchTerm}%`} OR 
          ${geonamesCities.alternateNames} LIKE ${`%${searchTerm}%`}
        )`
      )
    )
    .orderBy(desc(geonamesCities.population))
    .limit(10);
  
  return results;
};

// Example: Search for "Napoli" will match Naples
const results = await searchCities('Napoli');
// Returns Naples with population 909048

```
