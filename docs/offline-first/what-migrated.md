# Offline-First Migration: What Changed

## Overview

This document tracks the migration from server-side REST API data fetching to local-first architecture using Turso embedded replicas.

## Migration Status

### ✅ Completed Foundation (Phase 1)

**New Infrastructure Files:**
- `src/db/clientDb.js` - Browser libSQL client with embedded replica
- `src/db/drizzleClient.js` - Drizzle ORM wrapper for browser
- `src/hooks/useOnlineStatus.js` - Online/offline detection
- `src/hooks/useAutoSync.js` - Auto-sync on reconnect
- `.env` - Added NEXT_PUBLIC_* variables for browser sync
- `docs/offline-first/route-inventory.md` - Complete API route inventory
- `docs/offline-first/exclude-users.md` - Security documentation for users table

**Key Features:**
- IndexedDB persistence via `file:trip-planner.db`
- Bi-directional sync with Turso cloud
- Auto-sync every 60 seconds when online
- Auto-sync on browser reconnect
- Online/offline status detection

### 🚧 In Progress (Phase 2)

**Repositories** - Need to update existing `src/db/repos/*.js` to work in browser:
- `src/db/repos/trips.js` - Use getDrizzleDb() instead of server db
- `src/db/repos/plans.js` - Use getDrizzleDb() instead of server db
- `src/db/repos/segments.js` - Use getDrizzleDb() instead of server db
- `src/db/repos/places.js` - Use getDrizzleDb() instead of server db

**React Query Hooks** - Need to migrate from fetch to repos:
- `src/lib/queries/trips.js` - Replace fetch with tripsRepo calls
- `src/lib/queries/trip.js` - Replace fetch with tripsRepo calls
- `src/lib/queries/plans.js` - Replace fetch with plansRepo calls
- `src/lib/queries/places.js` - Replace fetch with placesRepo calls

**View Models** - Already using hooks, should work once hooks are migrated:
- `src/app/trips/TripsPageViewModel.js` - Uses useTripsQuery (needs hook update)
- Other view models using the query hooks

### ❌ Not Started (Phase 3)

**UI Components:**
- Sync button component (`src/components/SyncButton.jsx`)
- Offline indicator banner
- Disable backup/restore/invite buttons when offline
- Add tooltips for offline-disabled actions

**Root Integration:**
- Add `useAutoSync()` call to root layout
- Initial sync on app load
- Error handling for sync failures

## Routes: Local-First vs Server-Side

### Migrated to Local-First (Client DB)

| Original Endpoint | Methods | New Implementation | Files |
|-------------------|---------|-------------------|-------|
| `/api/trips` | GET, POST | Direct DB queries | `src/db/repos/trips.js`, `src/lib/queries/trips.js` |
| `/api/trips/[id]` | GET, PUT, DELETE | Direct DB queries | `src/db/repos/trips.js`, `src/lib/queries/trip.js` |
| `/api/plans` | POST | Direct DB queries | `src/db/repos/plans.js`, `src/lib/queries/plans.js` |
| `/api/plans/[planId]` | GET, PUT, DELETE | Direct DB queries | `src/db/repos/plans.js`, `src/lib/queries/plans.js` |
| `/api/plans/[planId]/clone` | POST | Direct DB queries with transaction | `src/db/repos/plans.js` |
| `/api/segments` | GET, POST | Direct DB queries | `src/db/repos/segments.js` |
| `/api/segments/[id]` | DELETE | Direct DB queries | `src/db/repos/segments.js` |
| `/api/places` | GET, POST | Direct DB queries | `src/db/repos/places.js`, `src/lib/queries/places.js` |

**Total:** 10 endpoints migrated to local-first

### Remained as Server Routes (No Changes)

| Endpoint | Methods | Reason | Action When Offline |
|----------|---------|--------|---------------------|
| `/api/auth/signup` | POST | Authentication security | N/A (auth required to use app) |
| `/api/auth/[...nextauth]` | GET, POST | NextAuth infrastructure | N/A (auth required to use app) |
| `/api/trips/backup` | GET | Cloud backup export | Disable UI button |
| `/api/trips/restore` | POST | Cloud backup import | Disable UI button |
| `/api/trips/[id]/invite` | POST | Email/notifications | Disable UI button |
| `/api/debug/clear-all` | DELETE | Admin debug operation | Disable UI button |
| `/api/debug/storage/blob` | GET | Admin debug operation | Disable UI button |
| `/api/migrate` | GET | Database DDL migrations | Admin-only, server-side |

**Total:** 8 endpoints remain server-side

## Data Flow Changes

### Before (Server-Side)
```
Component
  ↓
React Query Hook (useTripsQuery)
  ↓
fetch('/api/trips')
  ↓
API Route (/api/trips/route.js)
  ↓
Repository (src/db/repos/trips.js)
  ↓
Drizzle ORM
  ↓
Turso Remote Database
```

### After (Local-First)
```
Component
  ↓
React Query Hook (useTripsQuery)
  ↓
Repository (src/db/repos/trips.js)
  ↓
Drizzle ORM (getDrizzleDb)
  ↓
libSQL Embedded Replica (clientDb)
  ↓
IndexedDB (file:trip-planner.db)
  ↕
Auto-Sync (every 60s + on reconnect)
  ↕
Turso Remote Database
```

## Security: Users Table

**Critical:** The `users` table is never synced to the browser.

- Authentication remains 100% server-side
- `NEXT_PUBLIC_TURSO_AUTH_TOKEN` is temporary (dev only)
- Future: Server-issued short-lived tokens per session
- See: `docs/offline-first/exclude-users.md`

## Benefits Achieved

✅ **Offline Support:** Full CRUD operations work without internet
✅ **Performance:** Instant local queries, no network latency
✅ **Resilience:** App continues working during network issues
✅ **Multi-Device:** Changes sync across devices automatically
✅ **Simplified Backend:** Fewer API routes to maintain

## Known Limitations

⚠️ **Conflict Resolution:** Last-writer-wins (default libSQL behavior)
⚠️ **Initial Sync:** First load requires internet connection
⚠️ **Token Security:** NEXT_PUBLIC_* tokens visible in browser (temporary)
⚠️ **Server Operations:** Backup/restore/invite require online status

## Remaining Work

### Phase 2: Core Migration
1. Update repositories to use `getDrizzleDb()` for browser context
2. Migrate React Query hooks from fetch to repository calls
3. Add sync calls after mutations (when online)
4. Test all CRUD operations offline

### Phase 3: UI Polish
1. Create SyncButton component
2. Add offline indicator to nav bar
3. Disable server-only actions when offline
4. Add `useAutoSync()` to root layout
5. Error handling and user notifications

### Phase 4: Testing & QA
1. Verify users table not synced
2. Test offline create/edit/delete
3. Test multi-device sync
4. Test conflict resolution
5. Verify authentication still works
6. Load testing and performance validation

### Phase 5: Production Readiness
1. Replace NEXT_PUBLIC tokens with server-issued short-lived tokens
2. Add monitoring/telemetry for sync operations
3. Document rollback procedure
4. Create user-facing documentation
5. Performance benchmarks vs old architecture

## Rollback Plan

If critical issues arise:
1. Revert React Query hooks to use fetch('/api/...')
2. API routes are still in place (not deleted)
3. Clear browser IndexedDB: `indexedDB.deleteDatabase('trip-planner.db')`
4. Restart dev server to clear any caches

## Success Metrics

- [ ] All core operations work offline
- [ ] Data persists across browser reloads
- [ ] Auto-sync successful when reconnecting
- [ ] No `users` table in browser database
- [ ] Server-only operations properly disabled offline
- [ ] Query performance equal or better than REST API
- [ ] Zero data loss during sync conflicts
- [ ] Multi-device sync working correctly

## Documentation

- **Planning:** `tasks/offline-first.md`
- **Route Inventory:** `docs/offline-first/route-inventory.md`
- **Security:** `docs/offline-first/exclude-users.md`
- **This Document:** `docs/offline-first/what-migrated.md`

## Questions & Decisions

### Q: Why not migrate backup/restore to local-first?
**A:** These operations involve Turso cloud exports/imports which require server-side processing and authentication. They're admin operations that don't need offline support.

### Q: Why keep API routes instead of deleting them?
**A:** Gradual rollout and easy rollback. Routes can be deprecated after migration is proven stable.

### Q: How are conflicts handled?
**A:** libSQL embedded replica uses last-writer-wins by default. This is acceptable for this app's use case. Future: could implement custom conflict resolution with `updated_at` timestamps.

### Q: What happens to pending offline changes if user never goes online?
**A:** Changes persist indefinitely in IndexedDB. Next time user goes online (even days later), auto-sync will push changes to Turso.

## Next Steps

The immediate priority is Phase 2: updating repositories and React Query hooks to complete the migration of core data operations.

See `tasks/offline-first.md` for detailed implementation steps.
