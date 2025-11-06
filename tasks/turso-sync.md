# Turso sync-wasm: Offline-first Implementation Plan

## Problem Statement

The project has `@tursodatabase/sync-wasm` installed but **not actually used anywhere**. Current implementation uses basic `@libsql/client` with `syncMode: 'auto'`, which is NOT true offline-first.

**What we have:**
- Basic remote connection with `@libsql/client`
- Incomplete sync UI components (`SyncButton`, `OfflineSync`)
- Non-existent `syncDb()` function that code tries to import
- Manual REST `/api/sync` endpoint (not using Turso's native sync)

**What we need:**
- True offline-first using `@tursodatabase/sync-wasm`
- Local WASM SQLite database with OPFS persistence
- Bidirectional sync (push/pull) with Turso cloud
- Background sync loops with automatic reconnection
- Observable sync state for UI components

---

## Architecture Overview

### Stack
- **@tursodatabase/sync-wasm** - Local WASM SQLite with OPFS + sync to Turso cloud
- **Drizzle ORM** (libsql driver) - Type-safe queries over sync client
- **Next.js App Router** - React 19 with client/server boundaries
- **TanStack Query** - Cache management with sync-aware invalidation

### Data Flow
```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   UI/React  │ ◄─────► │ Drizzle ORM  │ ◄─────► │ OPFS SQLite │
│  Components │         │  (libsql)    │         │   (local)   │
└─────────────┘         └──────────────┘         └─────────────┘
                                                        │
                                                        │ sync-wasm
                                                        │ push/pull
                                                        ▼
                                                  ┌─────────────┐
                                                  │Turso Cloud  │
                                                  │  Database   │
                                                  └─────────────┘
```

### Sync Loops (Background)
1. **Pull Loop** - Long-polls Turso for remote changes (15s timeout)
2. **Push Loop** - Uploads local changes every 3s if pending operations exist
3. **Checkpoint Loop** - Commits WAL to main DB every 15s

---

## Implementation Steps

### 1. Prerequisites & Cleanup

#### Verify Next.js WASM Support
- ✅ `next.config.mjs` has webpack `asyncWebAssembly` + `topLevelAwait`
- ✅ COOP/COEP headers configured for OPFS/SharedArrayBuffer

#### Environment Variables
Ensure in `.env.local`:
```bash
NEXT_PUBLIC_TURSO_DATABASE_URL="libsql://your-db.turso.io"
NEXT_PUBLIC_TURSO_AUTH_TOKEN="your-token"
```

**Security Note:** Token is embedded client-side by design. Scope to specific DB with least privileges. Rotate as needed.

#### Remove Old Implementation
Files to update:
- `src/db/clientDb.js` - Remove `@libsql/client` usage
- `src/lib/syncDbSafe.js` - Already dynamic imports (keep structure)
- `src/app/api/sync/route.js` - Deprecate or remove REST endpoint

Search for references:
```bash
rg '@libsql/client' --type js
rg 'syncMode.*auto' --type js
```

---

### 2. Core Implementation: `src/db/clientDb.js`

**File:** `src/db/clientDb.js`

Create browser-only sync client with:
- OPFS-backed local SQLite via `@tursodatabase/sync-wasm`
- Background pull/push/checkpoint loops
- Observable sync state for UI
- Client-only guards (`typeof window !== 'undefined'`)

**Exported API:**
```js
getClient()           // → sync-wasm client
getDrizzle()          // → Drizzle ORM instance
syncDb(opts)          // → manual push→pull→checkpoint
startSync()           // → start background loops
stopSync()            // → stop loops
onSyncState(fn)       // → subscribe to state changes
getSyncState()        // → current state snapshot
```

**Sync State Shape:**
```js
{
    phase: 'idle' | 'pulling' | 'pushing' | 'error',
    lastPullAt: timestamp | null,
    lastPushAt: timestamp | null,
    lastCheckpointAt: timestamp | null,
    error: Error | null,
    online: boolean,
    running: boolean
}
```

**Implementation Pattern:**
```js
'use client'

import { connect } from '@tursodatabase/sync-wasm'
import { drizzle } from 'drizzle-orm/libsql'
import * as schema from '@/db/schema'

const OPFS_PATH = 'trip-planner.db'
const LONG_POLL_TIMEOUT_MS = 15000
const PUSH_INTERVAL_MS = 3000
const CHECKPOINT_INTERVAL_MS = 15000
const MAX_BACKOFF_MS = 20000

const isBrowser = typeof window !== 'undefined'

let clientPromise
let drizzleDb

const syncState = {
    phase: 'idle',
    lastPullAt: null,
    lastPushAt: null,
    lastCheckpointAt: null,
    error: null,
    online: true,
    running: false
}

const listeners = new Set()
const emit = () => listeners.forEach(fn => fn({ ...syncState }))

const wait = ms => new Promise(r => setTimeout(r, ms))

const connectClient = async () => {
    if (!isBrowser) throw new Error('sync-wasm can only run in browser')
    if (!process.env.NEXT_PUBLIC_TURSO_DATABASE_URL || !process.env.NEXT_PUBLIC_TURSO_AUTH_TOKEN) {
        throw new Error('Missing NEXT_PUBLIC_TURSO_DATABASE_URL or NEXT_PUBLIC_TURSO_AUTH_TOKEN')
    }
    if (!clientPromise) {
        clientPromise = connect({
            path: OPFS_PATH,
            url: process.env.NEXT_PUBLIC_TURSO_DATABASE_URL,
            authToken: process.env.NEXT_PUBLIC_TURSO_AUTH_TOKEN,
            longPollTimeoutMs: LONG_POLL_TIMEOUT_MS
        }).then(c => {
            drizzleDb = drizzle(c, { schema })
            console.info('[clientDb] ✅ Connected to OPFS + Turso')
            return c
        })
    }
    return clientPromise
}

let loops = { running: false, aborted: false }

const pullLoop = async client => {
    let backoff = 1000
    while (loops.running && !loops.aborted) {
        if (!syncState.online) {
            await wait(Math.min(backoff, MAX_BACKOFF_MS))
            continue
        }
        try {
            syncState.phase = 'pulling'
            emit()
            await client.pull({ longPollTimeoutMs: LONG_POLL_TIMEOUT_MS })
            syncState.lastPullAt = Date.now()
            syncState.phase = 'idle'
            backoff = 1000
            emit()
        } catch (err) {
            console.error('[pullLoop] error:', err)
            syncState.phase = 'error'
            syncState.error = err
            emit()
            await wait(backoff)
            backoff = Math.min(backoff * 2, MAX_BACKOFF_MS)
        }
    }
}

const pushLoop = async client => {
    while (loops.running && !loops.aborted) {
        if (!syncState.online) {
            await wait(PUSH_INTERVAL_MS)
            continue
        }
        try {
            syncState.phase = 'pushing'
            emit()
            await client.push()
            syncState.lastPushAt = Date.now()
            syncState.phase = 'idle'
            emit()
        } catch (err) {
            console.error('[pushLoop] error:', err)
            syncState.phase = 'error'
            syncState.error = err
            emit()
        }
        await wait(PUSH_INTERVAL_MS)
    }
}

const checkpointLoop = async client => {
    while (loops.running && !loops.aborted) {
        try {
            await client.checkpoint()
            syncState.lastCheckpointAt = Date.now()
            emit()
        } catch (err) {
            console.error('[checkpointLoop] error:', err)
        }
        await wait(CHECKPOINT_INTERVAL_MS)
    }
}

export const startSync = async () => {
    const client = await connectClient()
    if (loops.running) return
    loops.running = true
    loops.aborted = false
    syncState.running = true
    
    const setOnline = online => {
        syncState.online = online
        emit()
    }
    window.addEventListener('online', () => setOnline(true))
    window.addEventListener('offline', () => setOnline(false))
    
    pullLoop(client)
    pushLoop(client)
    checkpointLoop(client)
    
    console.info('[clientDb] 🔄 Sync loops started')
}

export const stopSync = () => {
    loops.aborted = true
    loops.running = false
    syncState.running = false
    syncState.phase = 'idle'
    emit()
    console.info('[clientDb] ⏸️  Sync loops stopped')
}

export const syncDb = async () => {
    const client = await connectClient()
    try {
        syncState.phase = 'pushing'
        emit()
        await client.push()
        syncState.lastPushAt = Date.now()
        
        syncState.phase = 'pulling'
        emit()
        await client.pull({ longPollTimeoutMs: 1000 })
        syncState.lastPullAt = Date.now()
        
        await client.checkpoint()
        syncState.lastCheckpointAt = Date.now()
        
        syncState.phase = 'idle'
        emit()
        return { ok: true }
    } catch (error) {
        console.error('[syncDb] error:', error)
        syncState.phase = 'error'
        syncState.error = error
        emit()
        return { ok: false, error }
    }
}

export const getClient = async () => connectClient()
export const getDrizzle = async () => {
    await connectClient()
    return drizzleDb
}

export const onSyncState = fn => {
    listeners.add(fn)
    return () => listeners.delete(fn)
}

export const getSyncState = () => ({ ...syncState })
```

**Key Considerations:**
- Only import this file in client components or via dynamic import
- Optionally: Hook into `client.onChange(e => ...)` for granular TanStack Query invalidation
- OPFS path `trip-planner.db` persists across page reloads

---

### 3. Update `src/lib/syncDbSafe.js`

Keep browser-only guard, forward to new `syncDb()`:

```js
export const syncDbSafe = async () => {
    try {
        if (typeof window === 'undefined') return { ok: false, error: 'Not in browser' }
        const mod = await import('@/db/clientDb')
        return await mod.syncDb()
    } catch (error) {
        console.error('[syncDbSafe] error:', error)
        return { ok: false, error }
    }
}
```

---

### 4. Update `src/db/drizzleClient.js`

Re-export from `clientDb.js` to centralize ownership:

```js
'use client'

import { getDrizzle } from '@/db/clientDb'

let drizzlePromise

export const db = async () => {
    if (!drizzlePromise) drizzlePromise = getDrizzle()
    return drizzlePromise
}

export default db
```

**Migration Note:** If existing code expects sync `db` export, convert call sites to `await db()` or wrap in async repository helpers.

---

### 5. Update Repositories (`src/db/repos/*`)

**Pattern:**
```js
import db from '@/db/drizzleClient'
import { trips } from '@/db/schema'

export const findAll = async () => {
    const drizzle = await db()
    return drizzle.select().from(trips)
}
```

**Files to Update:**
- `src/db/repos/trips.js`
- `src/db/repos/plans.js`
- `src/db/repos/segments.js`
- `src/db/repos/places.js`
- `src/db/repos/users.js`

**Important:** Replace any direct `@libsql/client` usage. Keep server-only DB client separate if needed for API routes (never import `sync-wasm` on server).

---

### 6. UI Integration

#### A. `src/components/SyncButton.jsx`

```js
'use client'

import { useState } from 'react'
import { useOnlineStatus } from '@/hooks/useOnlineStatus'
import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'

export default function SyncButton() {
    const [syncing, setSyncing] = useState(false)
    const online = useOnlineStatus()
    
    const handleSync = async () => {
        if (!online) return
        setSyncing(true)
        try {
            const { syncDbSafe } = await import('@/lib/syncDbSafe')
            const result = await syncDbSafe()
            if (!result.ok) console.error('[SyncButton] Sync failed:', result.error)
        } catch (err) {
            console.error('[SyncButton] Error:', err)
        } finally {
            setSyncing(false)
        }
    }
    
    return (
        <Button
            onClick={handleSync}
            disabled={!online || syncing}
            variant="ghost"
            size="sm"
            title={!online ? 'You are offline' : 'Sync with cloud'}>
            <RefreshCw className={`h-4 w-4 ${syncing ? 'animate-spin' : ''}`} />
            {syncing ? 'Syncing...' : 'Sync'}
        </Button>
    )
}
```

#### B. `src/hooks/useAutoSync.js`

Start background sync + expose state:

```js
import { useEffect, useState } from 'react'

export const useAutoSync = () => {
    const [state, setState] = useState({ phase: 'idle', online: true, running: false })

    useEffect(() => {
        let unsubscribe = () => {}
        let stopped = false
        
        ;(async () => {
            const { startSync, stopSync, onSyncState, getSyncState } = await import('@/db/clientDb')
            await startSync()
            setState(getSyncState())
            unsubscribe = onSyncState(setState)
        })()
        
        return () => {
            unsubscribe()
            ;(async () => {
                if (stopped) return
                stopped = true
                const { stopSync } = await import('@/db/clientDb')
                stopSync()
            })()
        }
    }, [])

    return state
}

export default useAutoSync
```

#### C. `src/components/OfflineSync.jsx`

Wire into layout:

```js
'use client'

import { useAutoSync } from '@/hooks/useAutoSync'

export default function OfflineSync() {
    const state = useAutoSync()
    
    // Optional: render sync status indicator
    // if (state.phase === 'error') return <div>Sync Error: {state.error.message}</div>
    
    return null
}
```

Add to `src/app/layout.jsx`:
```js
import OfflineSync from '@/components/OfflineSync'

export default function RootLayout({ children }) {
    return (
        <html>
            <body>
                <OfflineSync />
                {children}
            </body>
        </html>
    )
}
```

---

### 7. React Query Cache Invalidation

Auto-invalidate queries on sync:

**File:** `src/hooks/useSyncInvalidation.js`

```js
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

export const useSyncInvalidation = () => {
    const queryClient = useQueryClient()
    
    useEffect(() => {
        let unsubscribe = () => {}
        
        ;(async () => {
            const mod = await import('@/db/clientDb')
            unsubscribe = mod.onSyncState(state => {
                if (state.phase === 'idle' && (state.lastPullAt || state.lastPushAt)) {
                    // Invalidate all entity queries after sync completes
                    queryClient.invalidateQueries({ queryKey: ['trips'] })
                    queryClient.invalidateQueries({ queryKey: ['plans'] })
                    queryClient.invalidateQueries({ queryKey: ['segments'] })
                    queryClient.invalidateQueries({ queryKey: ['places'] })
                    queryClient.invalidateQueries({ queryKey: ['users'] })
                    console.log('[useSyncInvalidation] Queries invalidated')
                }
            })
        })()
        
        return () => unsubscribe()
    }, [queryClient])
}
```

Add to root provider:
```js
import { useSyncInvalidation } from '@/hooks/useSyncInvalidation'

export default function QueryProvider({ children }) {
    useSyncInvalidation()
    return <ReactQueryProvider>{children}</ReactQueryProvider>
}
```

---

### 8. Deprecate REST `/api/sync`

**Options:**
1. **Remove entirely** - Sync is now native via sync-wasm
2. **Keep as debug endpoint** - Return server-side stats only

If removing, search for client usage:
```bash
rg '/api/sync' --type js
```

---

## Testing Plan

### Manual Test Matrix

#### 1. Cold Start (Online)
- ✅ App connects to OPFS + Turso
- ✅ Background loops start
- ✅ Console shows pull/push/checkpoint activity
- ✅ DevTools → Application → Storage → OPFS shows `trip-planner.db`

#### 2. Offline Writes
- ❌ DevTools → Network → Offline
- ✅ Create/edit trips/plans/segments
- ✅ Reads are instant (from OPFS)
- ✅ Mutations succeed without errors
- ✅ UI remains responsive

#### 3. Reconnect
- ✅ DevTools → Network → Online
- ✅ Push loop uploads pending changes
- ✅ Pull loop fetches remote changes
- ✅ UI updates reflect synced data

#### 4. Long-Poll Behavior
- ✅ Open two browser tabs
- ✅ Edit data in Tab A
- ✅ Tab B receives changes via pull loop (within 15s)

#### 5. OPFS Persistence
- ✅ Reload page
- ✅ Data persists locally (no flash of empty state)

#### 6. Error Handling
- ❌ Tamper `NEXT_PUBLIC_TURSO_AUTH_TOKEN` in DevTools
- ✅ Sync errors surface in `syncState.error`
- ✅ Fix token → sync recovers

#### 7. React Query Invalidation
- ✅ After sync, `useQuery` hooks refetch
- ✅ UI updates without manual refresh

#### 8. Manual Sync Button
- ✅ Click "Sync" button
- ✅ Spinner shows during push/pull
- ✅ Button disabled when offline

#### 9. Conflict Resolution
- ✅ Edit same record in two tabs offline
- ✅ Go online → last-write-wins (default)
- ✅ No data loss or crashes

---

## Troubleshooting

### SSR/Hydration Errors
**Symptom:** "window is not defined" or WASM import errors during build/SSR

**Fix:**
- Ensure `clientDb.js` has `'use client'` directive
- Use dynamic imports in components: `const mod = await import('@/db/clientDb')`
- Never import sync-wasm in API routes or server components

### OPFS Corruption
**Symptom:** Database reads fail after browser crash

**Fix:**
- DevTools → Application → Storage → Clear site data
- Or programmatically: delete OPFS file and reconnect

### 401 Auth Errors
**Symptom:** `syncState.error` shows "Unauthorized"

**Fix:**
- Verify `NEXT_PUBLIC_TURSO_AUTH_TOKEN` in `.env.local`
- Regenerate token: `turso db tokens create <db-name>`
- Restart dev server to pick up new env vars

### Sync Loops Not Starting
**Symptom:** No pull/push activity in console

**Fix:**
- Verify `useAutoSync()` is called in app layout
- Check `syncState.running === true`
- Ensure no errors in `connectClient()`

### High Memory/CPU Usage
**Symptom:** Browser tab consumes excessive resources

**Fix:**
- Reduce `PUSH_INTERVAL_MS` if too aggressive
- Increase `LONG_POLL_TIMEOUT_MS` to reduce request frequency
- Add rate limiting to sync loops

---

## File Ownership Summary

| File | Purpose | Client/Server |
|------|---------|---------------|
| `src/db/clientDb.js` | Sync client + loops + Drizzle | Client-only |
| `src/db/drizzleClient.js` | Async Drizzle export | Client-only |
| `src/lib/syncDbSafe.js` | Manual sync trigger | Client-only |
| `src/hooks/useAutoSync.js` | Background sync lifecycle | Client-only |
| `src/hooks/useSyncInvalidation.js` | Query cache invalidation | Client-only |
| `src/components/SyncButton.jsx` | Manual sync UI | Client component |
| `src/components/OfflineSync.jsx` | Auto-sync lifecycle | Client component |
| `src/db/repos/*.js` | Repository layer | Client-only (async `await db()`) |
| `src/db/index.js` | Server-only remote client | Server-only (API routes) |

---

## Commands

### Development
```bash
pnpm dev           # Start dev server on :3001
pnpm build         # Production build (verify no SSR errors)
pnpm lint:js       # Lint JS (check 'use client' directives)
pnpm lint:js:fix   # Auto-fix lint issues
```

### Database
```bash
pnpm db:push       # Push schema to Turso (server-side)
pnpm db:studio     # Open Drizzle Studio
```

### Testing
```bash
# No automated tests yet - follow manual matrix above
# Future: Add Playwright/Vitest tests for offline scenarios
```

---

## Future Enhancements

### Short-term
- [ ] Add sync state indicator to Navbar
- [ ] Show last sync time in UI
- [ ] Add retry button on sync errors
- [ ] Log sync metrics (operations/sec, latency)

### Medium-term
- [ ] Granular invalidation via `client.onChange()` events
- [ ] Service worker for background sync when tab not visible
- [ ] Exponential backoff with jitter for pull/push loops
- [ ] User-configurable sync intervals

### Long-term
- [ ] Conflict resolution UI (beyond last-write-wins)
- [ ] Sync history/audit log
- [ ] Selective sync (only sync specific trips/plans)
- [ ] Offline-first authentication (cached credentials)

---

## References

- [Turso Sync Blog Post](https://turso.tech/blog/introducing-databases-anywhere-with-turso-sync)
- [@tursodatabase/sync-wasm Docs](https://docs.turso.tech/sdk/ts/sync)
- [Drizzle ORM libsql](https://orm.drizzle.team/docs/get-started-sqlite#turso)
- [OPFS (Origin Private File System)](https://web.dev/origin-private-file-system/)

---

## Notes

- **Token Security:** `NEXT_PUBLIC_*` vars are exposed to client by design. Scope token to DB with minimal permissions. Rotate regularly.
- **Conflict Resolution:** Default is last-write-wins. For custom logic, hook into sync events and apply transforms before push.
- **Browser Support:** OPFS requires modern browsers (Chrome 86+, Firefox 111+, Safari 15.2+). Fallback to IndexedDB if needed (not implemented).
- **Performance:** WASM SQLite is fast. Expect <10ms reads, <50ms writes for typical queries on OPFS.

---

## Checklist

- [ ] Remove `@libsql/client` from `clientDb.js`
- [ ] Implement `src/db/clientDb.js` with sync-wasm
- [ ] Update `syncDbSafe.js` to call new `syncDb()`
- [ ] Refactor `drizzleClient.js` to async export
- [ ] Update all repos to `await db()`
- [ ] Wire `useAutoSync()` into app layout
- [ ] Add `useSyncInvalidation()` to query provider
- [ ] Test offline writes + reconnect
- [ ] Verify OPFS persistence across reloads
- [ ] Run `pnpm lint:js:fix` and `pnpm build`
- [ ] Remove or deprecate `/api/sync` route
- [ ] Document env vars in README

---

**Status:** Ready for implementation ✅

**Estimated Effort:** 4-6 hours (includes testing)

**Risk Level:** Medium (requires careful SSR/client boundary management)
