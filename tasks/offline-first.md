# Task: Integrate Turso Local-First Offline Sync in Next Sojourn

## Overview

Migrate the Next trip planner app from server-side REST API data fetching to Turso's local-first offline-sync architecture using `@libsql/wasm`. This enables offline reads/writes with bi-directional sync to Turso cloud, while keeping authentication and special operations server-side.

## Architecture

```
Browser (IndexedDB) ←→ Turso Cloud Database
        ↓
   Local Queries
   (trips, plans, segments, places)

Server API Routes (unchanged):
- Authentication (/api/auth/*)
- Backup/Restore (/api/trips/backup, /api/trips/restore)
- Invites (/api/trips/[id]/invite)
- Debug (/api/debug/*)
- Migrations (/api/migrate)
```

## Migration Scope

### Migrate to Local-First (Client-Side DB)
- **Trips**: All CRUD operations
- **Plans**: All CRUD including clone operation
- **Segments**: All CRUD operations
- **Places**: All operations

### Keep as Server Routes
- **Authentication**: `/api/auth/signup`, `/api/auth/[...nextauth]`
- **Special Operations**: `/api/trips/backup`, `/api/trips/restore`, `/api/trips/[id]/invite`
- **Debug Operations**: `/api/debug/clear-all`, `/api/debug/storage/blob`
- **Migrations**: `/api/migrate`

## Prerequisites

- Node >=18 (current: 22.13.1)
- Existing Turso database (already configured: trip-planner)
- Environment variables already set in `.env`:
  - `TURSO_DATABASE_URL`
  - `TURSO_AUTH_TOKEN`

## Implementation Steps

### 1. Install Dependencies

```bash
pnpm add @libsql/wasm
```

**Note**: `@libsql/client` v0.15.10 is already installed.

### 2. Expose Environment Variables to Browser

Add to `.env` (temporary for development):

```bash
# Temporary: expose for browser sync
# TODO: Replace with server-issued short-lived tokens after OAuth migration
NEXT_PUBLIC_TURSO_DATABASE_URL="libsql://trip-planner-wesleybliss.aws-us-east-1.turso.io"
NEXT_PUBLIC_TURSO_AUTH_TOKEN="<your-token>"
```

**Security Note**: This approach is acceptable for development but should be replaced with server-issued short-lived replication tokens in production.

### 3. Create Local-First Client (`src/db/clientDb`)

Create a singleton WASM client for browser with IndexedDB persistence:

```js
import { createClient } from '@libsql/wasm'

let client

export const getClientDb = () => {
    if (client) return client

    if (typeof window === 'undefined') {
        throw new Error('clientDb must be used in the browser')
    }

    const url = 'idb:///trip-planner'
    const syncUrl = process.env.NEXT_PUBLIC_TURSO_DATABASE_URL
    const authToken = process.env.NEXT_PUBLIC_TURSO_AUTH_TOKEN

    client = createClient({ url, syncUrl, authToken })

    return client
}

export const executeQuery = async (sql, args = []) => {
    const db = getClientDb()
    return db.execute({ sql, args })
}

export const withTransaction = async fn => {
    const db = getClientDb()
    await db.execute('BEGIN')
    try {
        const result = await fn(db)
        await db.execute('COMMIT')
        return result
    } catch (err) {
        await db.execute('ROLLBACK')
        throw err
    }
}

export const syncDb = async options => {
    const db = getClientDb()
    return db.sync(options)
}
```

### 4. Exclude Users Table from Sync (Security)

**Critical**: The `users` table must NEVER sync to the browser.

**Approach 1** (if supported by `@libsql/wasm`):
```js
client = createClient({
    url: 'idb:///trip-planner',
    syncUrl: process.env.NEXT_PUBLIC_TURSO_DATABASE_URL,
    authToken: process.env.NEXT_PUBLIC_TURSO_AUTH_TOKEN,
    excludeTables: ['users']
})
```

**Approach 2** (server-side allowlist):
- Configure Turso database to only replicate allowed tables
- Use publication/replication groups if available

**Verification**:
After first sync, run in browser console:
```js
const res = await executeQuery('select name from sqlite_schema where type = ? order by name', ['table'])
console.log(res.rows.map(r => r.name))
// Should NOT include 'users'
```

### 5. Optional: Drizzle Client for Browser

Since existing repos use Drizzle, create browser Drizzle instance:

```js
// src/db/drizzleClient
import { drizzle } from 'drizzle-orm/libsql'
import * as schema from '@/db/schema'
import { getClientDb } from '@/db/clientDb'

let drizzleDb

export const getDrizzleDb = () => {
    if (drizzleDb) return drizzleDb
    const client = getClientDb()
    drizzleDb = drizzle(client, { schema })
    return drizzleDb
}
```

### 6. Update Repositories for Client-Side

Refactor `src/db/repos/*` to work with client DB. The existing repos use Drizzle, so update them to use `getDrizzleDb()` and support both server and client contexts.

**Key changes**:
- Make repos work in browser context
- Use `getDrizzleDb()` for client-side operations
- Preserve transaction support for complex operations (e.g., plan clone)
- Maintain existing API signatures

### 7. Migrate React Query Hooks

Update `src/lib/queries/*` to use repos instead of REST fetches:

```js
// src/lib/queries/trips
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import tripsRepo from '@/db/repos/trips'
import { syncDb } from '@/db/clientDb'
import { useOnlineStatus } from '@/hooks/useOnlineStatus'

export const useTripsQuery = () => {
    return useQuery({
        queryKey: ['trips'],
        queryFn: () => tripsRepo.findAll()
    })
}

export const useCreateTripMutation = () => {
    const qc = useQueryClient()
    const online = useOnlineStatus()
    return useMutation({
        mutationFn: tripsRepo.create,
        onSuccess: async () => {
            await qc.invalidateQueries({ queryKey: ['trips'] })
            if (online) await syncDb()
        }
    })
}
```

### 8. Add Online/Offline Detection

Create hook for connectivity status:

```js
// src/hooks/useOnlineStatus
import { useEffect, useState } from 'react'

export const useOnlineStatus = () => {
    const [online, setOnline] = useState(
        typeof navigator !== 'undefined' ? navigator.onLine : true
    )

    useEffect(() => {
        const up = () => setOnline(true)
        const down = () => setOnline(false)
        window.addEventListener('online', up)
        window.addEventListener('offline', down)
        return () => {
            window.removeEventListener('online', up)
            window.removeEventListener('offline', down)
        }
    }, [])

    return online
}
```

### 9. Implement Auto-Sync on Reconnect

Create hook to sync when coming back online:

```js
// src/hooks/useAutoSync
import { useEffect, useRef } from 'react'
import { useOnlineStatus } from '@/hooks/useOnlineStatus'
import { syncDb } from '@/db/clientDb'

export const useAutoSync = () => {
    const online = useOnlineStatus()
    const prev = useRef(online)
    
    useEffect(() => {
        if (!prev.current && online) {
            syncDb().catch(err => {
                console.error('Auto-sync failed:', err)
            })
        }
        prev.current = online
    }, [online])
}
```

**Usage**: Call `useAutoSync()` in root layout or main app component.

### 10. Disable Server-Only Operations When Offline

For UI elements calling these endpoints:
- `/api/trips/backup`
- `/api/trips/restore`
- `/api/trips/[id]/invite`
- `/api/debug/*`

Disable or hide when `useOnlineStatus()` returns `false`, with tooltip:
- "This action requires an internet connection"

### 11. Manual Sync UI (Optional)

Add sync button component:

```jsx
// src/components/SyncButtonx
import { useState } from 'react'
import { syncDb } from '@/db/clientDb'
import { useOnlineStatus } from '@/hooks/useOnlineStatus'

export const SyncButton = () => {
    const [syncing, setSyncing] = useState(false)
    const online = useOnlineStatus()

    const handleSync = async () => {
        setSyncing(true)
        try {
            await syncDb()
        } catch (err) {
            console.error('Sync failed:', err)
        } finally {
            setSyncing(false)
        }
    }

    return (
        <button
            onClick={handleSync}
            disabled={!online || syncing}
            title={!online ? 'You are offline' : 'Sync with cloud'}
        >
            {syncing ? 'Syncing...' : 'Sync'}
        </button>
    )
}
```

## Code Style Guidelines

- No semicolons
- 4-space indentation
- Single quotes
- ES7 syntax
- Arrow parens only when needed
- Functional components with hooks
- `x` extension for React components

## Testing Checklist

### Initial Setup
- [ ] Fresh browser profile
- [ ] Open app, wait for initial sync
- [ ] Verify local schema: no `users` table

### Offline Operations
- [ ] Create trip offline → reload → confirm persists
- [ ] Edit plan offline → reload → confirm persists
- [ ] Delete segment offline → reload → confirm persists
- [ ] All offline changes stored in IndexedDB

### Online Sync
- [ ] Go online → auto-sync triggers
- [ ] Verify data appears in Turso (use `turso db shell`)
- [ ] Create on device A → sync → appears on device B

### Conflict Resolution
- [ ] Modify same item on two devices offline
- [ ] Go online on both → observe resolution
- [ ] Document behavior (last-writer-wins expected)

### Server-Only Operations
- [ ] Backup/restore disabled when offline
- [ ] Invite disabled when offline
- [ ] Debug operations disabled when offline
- [ ] All work normally when online

### Authentication
- [ ] NextAuth still works
- [ ] No local reads of `users` table attempted
- [ ] Auth flows unchanged

## Rollout Strategy

1. **Docs first**: Update all documentation (this file + what-migrated.md)
2. **Client DB**: Implement clientDb and verification
3. **Read queries**: Migrate GET operations to local-first
4. **Write mutations**: Migrate POST/PUT/DELETE to local-first
5. **Sync + offline**: Add online/offline detection and auto-sync
6. **UI polish**: Disable offline-incompatible actions, add sync button
7. **QA**: Full testing pass per checklist above
8. **Linting**: Run `pnpm lint:js:fix` and `pnpm lint:css:fix`

## Future Improvements

- [ ] Replace `NEXT_PUBLIC_TURSO_AUTH_TOKEN` with server-issued short-lived tokens
- [ ] Migrate to OAuth provider for authentication
- [ ] Add telemetry/monitoring for sync failures
- [ ] Implement custom conflict resolution strategies
- [ ] Add offline indicator badge in UI
- [ ] Periodic background sync (every 5-10 minutes when online)

## Troubleshooting

### Sync fails with auth error
- Verify `NEXT_PUBLIC_TURSO_AUTH_TOKEN` is set correctly
- Check token hasn't expired
- Regenerate token: `turso db tokens create trip-planner`

### Users table appears in local DB
- **STOP ROLLOUT IMMEDIATELY**
- Implement server-side table filtering/allowlist
- Clear all browser IndexedDB instances
- Verify exclusion before continuing

### Data not persisting across reloads
- Check browser IndexedDB in DevTools
- Verify `idb:///trip-planner` scheme is used
- Check for errors in console during DB initialization

### Conflicts not resolving as expected
- Current strategy is last-writer-wins (default libSQL behavior)
- Consider adding `updated_at` checks in application logic
- Document known edge cases for users

## References

- [Turso Docs](https://docs.turso.tech/)
- [@libsql/wasm](https://github.com/tursodatabase/libsql-client-ts)
- [IndexedDB Spec](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [React Query](https://tanstack.com/query/latest)
