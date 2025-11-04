# API Route Inventory for Offline-First Migration

## Overview

This document inventories all existing Next.js API routes and categorizes them as either:
- **Migrate to Local-First**: Routes that will be replaced with client-side database queries
- **Keep as Server Routes**: Routes that will remain server-side for security, external integrations, or special operations

## Route Inventory

| Endpoint | Methods | Current Purpose | Migration Decision | Rationale |
|----------|---------|-----------------|-------------------|-----------|
| `/api/auth/signup` | POST | User registration | **Keep Server** | Authentication must remain server-side for security |
| `/api/auth/[...nextauth]` | GET, POST | NextAuth handlers | **Keep Server** | Authentication infrastructure |
| `/api/trips` | GET, POST | List/create trips | **Migrate Local** | Core data CRUD - should work offline |
| `/api/trips/[id]` | GET, PUT, DELETE | Get/update/delete trip | **Migrate Local** | Core data CRUD - should work offline |
| `/api/trips/[id]/invite` | POST | Invite user to trip | **Keep Server** | May involve email/notifications, requires online |
| `/api/trips/backup` | GET | Export trip data backup | **Keep Server** | Special operation - cloud backup export |
| `/api/trips/restore` | POST | Restore trip from backup | **Keep Server** | Special operation - cloud backup import |
| `/api/plans` | POST | Create plan | **Migrate Local** | Core data CRUD - should work offline |
| `/api/plans/[planId]` | GET, PUT, DELETE | Get/update/delete plan | **Migrate Local** | Core data CRUD - should work offline |
| `/api/plans/[planId]/clone` | POST | Clone/duplicate plan | **Migrate Local** | Core data operation with transaction |
| `/api/segments` | GET, POST | List/create segments | **Migrate Local** | Core data CRUD - should work offline |
| `/api/segments/[id]` | DELETE | Delete segment | **Migrate Local** | Core data CRUD - should work offline |
| `/api/places` | GET, POST | Search/create places | **Migrate Local** | Core data - local query preferred |
| `/api/debug/clear-all` | DELETE | Clear all data (debug) | **Keep Server** | Debug utility - admin operation |
| `/api/debug/storage/blob` | GET | Inspect blob storage | **Keep Server** | Debug utility - admin operation |
| `/api/migrate` | GET | Run database migrations | **Keep Server** | DDL operations must be server-side |

## Migration Summary

### Local-First (Client DB) - 10 endpoints
All CRUD operations for core data entities:
- Trips: list, create, get, update, delete
- Plans: create, get, update, delete, clone
- Segments: list, create, delete
- Places: search, create

**Implementation**: These will use `src/db/clientDb.js` with IndexedDB + Turso sync.

### Server Routes (Unchanged) - 6 endpoints
Operations requiring server-side processing:
- Authentication (2): signup, NextAuth
- Special operations (3): backup, restore, invite
- Admin operations (2): debug clear-all, debug blob storage
- Infrastructure (1): migrations

**Implementation**: No changes needed. UI will disable these when offline.

## Data Flow

### Current (Server-Side)
```
Component → fetch('/api/...') → API Route → Database → Response
```

### New (Local-First)
```
Component → React Query Hook → Repository → clientDb → IndexedDB
                                                    ↕
                                            Auto-Sync to Turso
```

### Server Routes (Unchanged)
```
Component → fetch('/api/...') → API Route → Server Logic → Response
(disabled when offline)
```

## Implementation Order

1. **Foundation**: Create `clientDb.js` and `drizzleClient.js`
2. **Read Operations**: Migrate GET endpoints (trips, plans, segments, places)
3. **Write Operations**: Migrate POST/PUT/DELETE endpoints
4. **Complex Operations**: Migrate plan clone (uses transactions)
5. **Offline UI**: Add online/offline detection and disable server-only operations

## Security Considerations

### Users Table Exclusion
The `users` table must NEVER sync to the browser IndexedDB. This will be enforced via:
- Client configuration: `excludeTables: ['users']` if supported by `@libsql/wasm`
- Server-side allowlist: Configure Turso to only replicate non-sensitive tables
- Verification: Check local schema after first sync

### Token Security
- Current approach: `NEXT_PUBLIC_TURSO_AUTH_TOKEN` in browser (temporary)
- Future: Server-issued short-lived replication tokens per user session
- Authentication: Remains server-side with NextAuth

## Files to Create/Modify

### New Files
- `src/db/clientDb.js` - WASM client singleton
- `src/db/drizzleClient.js` - Drizzle wrapper for browser
- `src/hooks/useOnlineStatus.js` - Online/offline detection
- `src/hooks/useAutoSync.js` - Auto-sync on reconnect
- `src/components/SyncButton.jsx` - Manual sync UI
- `docs/offline-first/exclude-users.md` - Users table exclusion documentation
- `docs/offline-first/what-migrated.md` - Migration summary

### Modified Files
- `src/lib/queries/trips.js` - Use repos instead of fetch
- `src/lib/queries/plans.js` - Use repos instead of fetch
- `src/lib/queries/trip.js` - Use repos instead of fetch
- `src/lib/queries/places.js` - Use repos instead of fetch
- `src/db/repos/*.js` - Update to work in browser context
- `.env` - Add NEXT_PUBLIC_* variables
- Components with server-only operations - Add offline detection

### Optional Deprecation
After migration is complete and tested, these API routes can be marked as deprecated or removed:
- `/api/trips` (GET, POST)
- `/api/trips/[id]` (GET, PUT, DELETE)
- `/api/plans` (POST)
- `/api/plans/[planId]` (GET, PUT, DELETE)
- `/api/plans/[planId]/clone` (POST)
- `/api/segments` (GET, POST)
- `/api/segments/[id]` (DELETE)
- `/api/places` (GET, POST)

However, keeping them temporarily allows for gradual rollout and rollback capability.

## Testing Strategy

For each migrated endpoint:
1. Test offline create/read/update/delete
2. Test data persistence across browser reloads
3. Test sync to cloud when online
4. Test multi-device sync
5. Test conflict resolution (last-writer-wins)

For server-only endpoints:
1. Verify UI disables/hides when offline
2. Verify functionality works normally when online
3. Verify appropriate user messaging

## Rollback Plan

If issues arise:
1. Keep API routes in place (not deleted)
2. Revert query hooks to use fetch instead of repos
3. Clear browser IndexedDB: `indexedDB.deleteDatabase('trip-planner')`
4. Investigate and fix issues before re-attempting migration

## Success Criteria

- [ ] All core CRUD operations work offline
- [ ] Data persists in IndexedDB across page reloads
- [ ] Auto-sync occurs when coming back online
- [ ] No `users` table in browser database
- [ ] Server-only operations properly disabled when offline
- [ ] Multi-device sync works correctly
- [ ] Performance equal or better than REST API approach
