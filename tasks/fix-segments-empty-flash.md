# Trip segments flash / empty state plan (state management review)

**Status: IMPLEMENTED**

## Problem
After mutations like renaming a segment, the Trip page briefly flashes and shows “You have no segments yet.” A manual refresh then shows the correct segments. This strongly suggests a client state synchronization issue (transient or stuck) rather than a server data issue.

## Current state (what the code does today)
The Trip UI is driven by multiple state sources:
- Server data via React Query:
    - `useTripQuery(tripId)` fetches `/api/trips/[id]?withDetails=true` and returns `data`.
    - Mutations (`useUpdateSegment`, `useAddSegment`, etc) invalidate `['trip', tripId]`.
- Global client state via `@forminator/react-wire` selectors:
    - `store.trips` is populated by `useTripsQuery()` (called from `AccountMenu.jsx`, so it runs on most pages).
    - `store.currentTripId` is set in `useTripQuery`.
    - `store.currentTrip`, `store.currentPlans`, `store.currentPlan`, `store.currentSegments` are derived selectors based on `store.trips` + ids.
- The Trip screens (`TripDetail.jsx`, `TripEditor.jsx`, `Navbar.jsx`) read `segments` from the wire selectors, not from the React Query `trip` result.

The empty state message is rendered when `vm.trip` is truthy but `vm.segments?.length <= 0`.

## Most likely root causes
### 1) Incorrect wire-store update logic for trip details
In `src/lib/storeUtils.js`, `updateItemArray` is implemented as:
- It maps the current array.
- For the matching element, it calls `deepmerge(prev, item)`.

Because `prev` is the entire array (not the element being updated), this can corrupt the trip element shape or fail to actually replace the summary trip with the detailed trip. When that happens, `store.currentTrip?.plans` can become missing/empty, which makes `store.currentSegments` become `[]`, triggering the “no segments” UI.

Files:
- `src/lib/storeUtils.js:37`
- `src/lib/queries/trip.js:7-40`
- `src/components/TripEditor/TripEditor.jsx:38-50`
- `src/components/TripDetail/TripDetail.jsx:37-53`

### 2) Two sources of truth for the same entity (trip/plans/segments)
Even with React Query’s `keepPreviousData: true`, the UI depends on the wire-derived `segments`. So a refetch can keep React Query data stable while the wire selectors momentarily compute `[]` (or get stuck at `[]`). That makes transient UI states more likely.

### 3) Over-invalidation / duplicate invalidation
Some mutations invalidate `['trip', tripId]` inside the mutation hook and then the view model invalidates again in `onSuccess` (e.g. `useUpdateSegment` invalidates, and `useTripEditorViewModel.updateSegment` invalidates too). This can increase the number of fetches and the number of intermediate recomputations.

### 4) UI empty-state condition conflates “not loaded / temporarily unavailable” with “truly empty”
`store.currentSegments` returns `[]` when `currentPlan` is null or when plans aren’t present yet. The UI treats `[]` as “you have no segments” even if it’s just a momentary store mismatch.

## Proposed changes
This is intentionally phased so you can stop after Phase 1 if the flashing disappears.

### Phase 0: Reproduce + instrument (small, low-risk)
Goal: confirm whether the wire store becomes inconsistent after a segment rename.
- Add temporary debug logging around:
    - React Query trip refetch lifecycle (`isFetching` for `useTripQuery`).
    - The shape of `store.currentTrip`, `store.currentPlans`, and `store.currentSegments` before/after `updateItemArray` runs.
- Confirm whether the store ends up holding a “summary trip” (no `plans`) after rename.

### Phase 1: Fix wire-store update correctness (high impact)
Goal: make `store.trips` reliably hold the detailed trip (with plans/segments) after any refetch.
- Fix `updateItemArray` in `src/lib/storeUtils.js` to merge/replace the matched element, not the whole array.
    - The minimal safe behavior: replace the element with `item`.
    - If merge is desired: `deepmerge(existingElement, item)`.
    - Also handle “not found”: append the item (so the trip page doesn’t depend on having visited `/trips` first).
- Add a small unit test for `updateItemArray` to lock in behavior.

Expected result: after rename + refetch, `store.currentTrip.plans` remains present and `store.currentSegments` does not drop to `[]`.

### Phase 2: Remove the split brain for Trip data (structural fix)
Goal: make the Trip page use a single source of truth for trip/plans/segments.

Two viable options:
- Option A (recommended): React Query is the source of truth for trip details.
    - Derive `currentPlan` and `segments` directly from the React Query `trip` result and the route `planId`.
    - Use the wire store only for UI preferences (theme, showMap, edit mode, filters), not for entity data.
- Option B: Wire store is the source of truth.
    - Stop returning `trip` from React Query (or keep it only for fetch) and update the store via a consistent reducer-like API.
    - This is harder to keep correct because you’re effectively reimplementing cache behavior.

If Option A is chosen:
- `useTripEditorViewModel` should compute:
    - `plans` from `trip.plans`
    - `currentPlan` from `planId`
    - `segments` from `currentPlan.segments`
- Keep `keepPreviousData` so segments remain visible during background refetch.

### Phase 3: Make mutations not cause UI flicker (UX + correctness)
Goal: rename/update should feel instant and never show empty state.
- Add optimistic updates for segment rename/date changes:
    - Use `useMutation({ onMutate })` to `queryClient.setQueryData(['trip', tripId], ...)` updating the target segment in-place.
    - On error, rollback.
    - On settled, invalidate to reconcile with the server.
- Remove duplicate invalidations (keep invalidation in one place).

### Phase 4: Improve empty/loading state semantics
Goal: only show “You have no segments yet” when you truly know there are zero segments.
- Gate the empty state behind an explicit “loaded” condition:
    - Prefer `tripQuery.isLoading || tripQuery.isFetching` to show a subtle loading state.
    - Show empty state only when `currentPlan` is known and `segments.length === 0`.
- Alternatively, change selectors so “unknown” is `null` (not `[]`) and update UI accordingly.

### Phase 5: Cleanup consistency issues discovered during review
These aren’t the reported bug, but they can contribute to state inconsistency:
- `useTripEditorViewModel.addSegment` builds a payload without `tripId` even though the API requires it (`src/components/TripEditor/useTripEditorViewModel.js:114-132` vs `src/app/api/segments/route.js:17-49`).
- Standardize on React Query (there’s also an SWR hook `src/hooks/useTrips.js`).
- Reduce side effects inside React Query `queryFn` (ideally move store updates to `onSuccess` or remove them if Phase 2 Option A is adopted).

## Acceptance criteria
- After renaming a segment (and other segment edits), the page does not flash “You have no segments yet.”
- Segments remain visible during background refetch.
- A hard refresh is never required to see updated segments.
- Trip/plan/segment state has one clear source of truth, documented in code.

## Files to change (if you proceed)
- `src/lib/storeUtils.js` (fix `updateItemArray`)
- `src/lib/queries/trip.js` (avoid side-effectful store updates in `queryFn`, or remove if switching sources)
- `src/components/TripEditor/useTripEditorViewModel.js` (derive segments from query data or fix store sync; remove duplicate invalidations)
- `src/components/TripDetail/TripDetail.jsx`, `src/components/TripEditor/TripEditor.jsx` (loading/empty gating)
- `src/components/AccountMenu.jsx` (be mindful that this populates `store.trips`)
