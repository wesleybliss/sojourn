# Task: True Offline-First with Turso Sync

## Current Status

✅ **Completed**:
- Migrated from REST API to client-side database queries
- All CRUD operations use browser-side database
- Server-only operations properly disabled when offline
- Using `@libsql/client/web` v0.15.15

❌ **Problem**: Current implementation uses HTTP-only mode - no offline support

## Problem Analysis

`@libsql/client/web` in HTTP-only mode requires internet connectivity. For true offline-first, we need:

1. **Local SQLite database** in browser (OPFS or IndexedDB)
2. **Offline read/write** capability
3. **Automatic sync** when online
4. **Conflict resolution**

## Solution: sqlocal + Custom Sync

**Why sqlocal?**
- True SQLite in browser using sql.js + OPFS
- Works completely offline
- Compatible with Drizzle ORM
- Lightweight and performant
- Can implement custom sync with Turso

## Implementation Plan

### Phase 1: Install and Configure sqlocal

#### Step 1.1: Install Dependencies

```bash
pnpm add sqlocal @sqlocal/drizzle
```

#### Step 1.2: Update clientDb.js

Replace `/home/wes/localhost/trip-planner-basic/src/db/clientDb.js`:

```js
import { SQLocal } from 'sqlocal'

let sqLocal
let isInitialized = false

export const getClientDb = async () => {
    if (sqLocal && isInitialized) return sqLocal.sql
    
    if (typeof window === 'undefined') {
        throw new Error('clientDb must be used in the browser')
    }
    
    // Initialize SQLite in browser using OPFS
    sqLocal = new SQLocal('trip-planner.db')
    
    // Run migrations on first load
    if (!isInitialized) {
        await initializeSchema()
        isInitialized = true
    }
    
    return sqLocal.sql
}

export const executeQuery = async (query, params = []) => {
    const sql = await getClientDb()
    const result = await sql`${query}`
    return {
        rows: result,
        rowsAffected: result.length
    }
}

export const withTransaction = async (fn) => {
    const sql = await getClientDb()
    
    await sql`BEGIN TRANSACTION`
    try {
        const result = await fn(sql)
        await sql`COMMIT`
        return result
    } catch (error) {
        await sql`ROLLBACK`
        throw error
    }
}

const initializeSchema = async () => {
    const sql = await getClientDb()
    
    // Create schema - copy from Drizzle schema
    // This ensures local DB matches server schema
    
    await sql`
        CREATE TABLE IF NOT EXISTS trips (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            start_date TEXT,
            end_date TEXT,
            created_at INTEGER NOT NULL,
            updated_at INTEGER NOT NULL
        )
    `
    
    await sql`
        CREATE TABLE IF NOT EXISTS plans (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            trip_id INTEGER NOT NULL,
            name TEXT NOT NULL,
            position INTEGER NOT NULL DEFAULT 0,
            created_at INTEGER NOT NULL,
            updated_at INTEGER NOT NULL,
            FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE
        )
    `
    
    await sql`
        CREATE TABLE IF NOT EXISTS segments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            plan_id INTEGER NOT NULL,
            place_id INTEGER,
            starts_at TEXT,
            ends_at TEXT,
            notes TEXT,
            created_at INTEGER NOT NULL,
            updated_at INTEGER NOT NULL,
            FOREIGN KEY (plan_id) REFERENCES plans(id) ON DELETE CASCADE,
            FOREIGN KEY (place_id) REFERENCES places(id) ON DELETE SET NULL
        )
    `
    
    await sql`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            latitude REAL,
            longitude REAL,
            created_at INTEGER NOT NULL,
            updated_at INTEGER NOT NULL
        )
    `
    
    await sql`
        CREATE TABLE IF NOT EXISTS userTrips (
            user_id INTEGER NOT NULL,
            trip_id INTEGER NOT NULL,
            role TEXT NOT NULL DEFAULT 'owner',
            created_at INTEGER NOT NULL,
            PRIMARY KEY (user_id, trip_id),
            FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE
        )
    `
    
    console.info('✅ Local database schema initialized')
}

export const syncDb = async () => {
    try {
        console.info('🔄 Starting sync with Turso...')
        
        const response = await fetch('/api/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        })
        
        if (!response.ok) {
            throw new Error(`Sync failed: ${response.statusText}`)
        }
        
        const { data } = await response.json()
        
        // Apply server data to local database
        await applyServerData(data)
        
        console.info('✅ Sync completed successfully')
        return { success: true }
    } catch (error) {
        console.error('❌ Sync failed:', error)
        throw error
    }
}

const applyServerData = async (serverData) => {
    const sql = await getClientDb()
    
    await withTransaction(async () => {
        // Simple sync strategy: replace all local data
        // TODO: Implement smarter merge with conflict resolution
        
        if (serverData.trips) {
            await sql`DELETE FROM trips`
            for (const trip of serverData.trips) {
                await sql`
                    INSERT INTO trips (id, name, start_date, end_date, created_at, updated_at)
                    VALUES (${trip.id}, ${trip.name}, ${trip.startDate}, ${trip.endDate}, 
                            ${trip.createdAt}, ${trip.updatedAt})
                `
            }
        }
        
        if (serverData.plans) {
            await sql`DELETE FROM plans`
            for (const plan of serverData.plans) {
                await sql`
                    INSERT INTO plans (id, trip_id, name, position, created_at, updated_at)
                    VALUES (${plan.id}, ${plan.tripId}, ${plan.name}, ${plan.position},
                            ${plan.createdAt}, ${plan.updatedAt})
                `
            }
        }
        
        if (serverData.segments) {
            await sql`DELETE FROM segments`
            for (const segment of serverData.segments) {
                await sql`
                    INSERT INTO segments (id, plan_id, place_id, starts_at, ends_at, notes, created_at, updated_at)
                    VALUES (${segment.id}, ${segment.planId}, ${segment.placeId}, 
                            ${segment.startsAt}, ${segment.endsAt}, ${segment.notes},
                            ${segment.createdAt}, ${segment.updatedAt})
                `
            }
        }
        
        if (serverData.places) {
            await sql`DELETE FROM places`
            for (const place of serverData.places) {
                await sql`
                    INSERT INTO places (id, name, description, latitude, longitude, created_at, updated_at)
                    VALUES (${place.id}, ${place.name}, ${place.description}, 
                            ${place.latitude}, ${place.longitude},
                            ${place.createdAt}, ${place.updatedAt})
                `
            }
        }
    })
}

export const getTableNames = async () => {
    const sql = await getClientDb()
    const result = await sql`SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name`
    return result.map(row => row.name)
}
```

#### Step 1.3: Update drizzleClient.js

Replace `/home/wes/localhost/trip-planner-basic/src/db/drizzleClient.js`:

```js
import { drizzle } from '@sqlocal/drizzle'
import { SQLocal } from 'sqlocal'
import * as schema from '@/db/schema'

let drizzleDb
let sqLocal

export const getDrizzleDb = async () => {
    if (drizzleDb) return drizzleDb
    
    if (typeof window === 'undefined') {
        throw new Error('getDrizzleDb must be used in the browser')
    }
    
    if (!sqLocal) {
        sqLocal = new SQLocal('trip-planner.db')
    }
    
    drizzleDb = drizzle(sqLocal.driver, { schema })
    
    return drizzleDb
}
```

### Phase 2: Create Sync Endpoint

Create `/home/wes/localhost/trip-planner-basic/src/app/api/sync/route.js`:

```js
import { NextResponse } from 'next/server'
import * as tripsRepo from '@/db/repos/trips'
import * as plansRepo from '@/db/repos/plans'
import * as segmentsRepo from '@/db/repos/segments'
import * as placesRepo from '@/db/repos/places'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function POST(request) {
    try {
        // Verify authentication
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }
        
        const userId = session.user.id
        
        // Get all user's data from server
        const [trips, plans, segments, places] = await Promise.all([
            tripsRepo.findAllForUser(userId),
            plansRepo.findAllForUser(userId),
            segmentsRepo.findAllForUser(userId),
            placesRepo.findAll()
        ])
        
        return NextResponse.json({
            success: true,
            data: {
                trips,
                plans,
                segments,
                places
            }
        })
    } catch (error) {
        console.error('[Sync] Error:', error)
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        )
    }
}
```

### Phase 3: Update Repositories

Update repositories to work with sqlocal. Example for `src/db/repos/trips.js`:

```js
import { getDrizzleDb } from '@/db/drizzleClient'
import { trips, userTrips } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const findAll = async () => {
    const db = await getDrizzleDb()
    return db.select().from(trips).orderBy(trips.createdAt)
}

export const findOneById = async (id) => {
    const db = await getDrizzleDb()
    const result = await db.select().from(trips).where(eq(trips.id, id))
    return result[0] || null
}

export const create = async (data) => {
    const db = await getDrizzleDb()
    const now = Date.now()
    
    const result = await db.insert(trips).values({
        name: data.name,
        startDate: data.startDate,
        endDate: data.endDate,
        createdAt: now,
        updatedAt: now
    }).returning()
    
    return result[0]
}

export const update = async (id, data) => {
    const db = await getDrizzleDb()
    
    const result = await db.update(trips)
        .set({
            ...data,
            updatedAt: Date.now()
        })
        .where(eq(trips.id, id))
        .returning()
    
    return result[0]
}

export const remove = async (id) => {
    const db = await getDrizzleDb()
    await db.delete(trips).where(eq(trips.id, id))
}
```

Repeat for `plans.js`, `segments.js`, and `places.js`.

### Phase 4: Enable Auto-Sync

Update `/home/wes/localhost/trip-planner-basic/src/hooks/useAutoSync.js`:

```js
import { useEffect, useRef } from 'react'
import { useOnlineStatus } from '@/hooks/useOnlineStatus'
import { syncDb } from '@/db/clientDb'
import { toast } from 'sonner'

export const useAutoSync = () => {
    const online = useOnlineStatus()
    const prevOnline = useRef(online)
    const syncInProgress = useRef(false)
    
    useEffect(() => {
        // Sync on mount (initial load)
        if (online && !syncInProgress.current) {
            syncInProgress.current = true
            syncDb()
                .then(() => {
                    console.info('[AutoSync] Initial sync completed')
                })
                .catch(error => {
                    console.error('[AutoSync] Initial sync failed:', error)
                    toast.error('Failed to sync with server')
                })
                .finally(() => {
                    syncInProgress.current = false
                })
        }
    }, [])
    
    useEffect(() => {
        // Sync when coming back online
        if (!prevOnline.current && online && !syncInProgress.current) {
            syncInProgress.current = true
            syncDb()
                .then(() => {
                    console.info('[AutoSync] Reconnect sync completed')
                    toast.success('Back online - data synced')
                })
                .catch(error => {
                    console.error('[AutoSync] Reconnect sync failed:', error)
                    toast.error('Failed to sync after reconnecting')
                })
                .finally(() => {
                    syncInProgress.current = false
                })
        }
        
        prevOnline.current = online
    }, [online])
    
    // Periodic sync every 5 minutes when online
    useEffect(() => {
        if (!online) return
        
        const interval = setInterval(() => {
            if (!syncInProgress.current) {
                syncInProgress.current = true
                syncDb()
                    .catch(error => {
                        console.error('[AutoSync] Periodic sync failed:', error)
                    })
                    .finally(() => {
                        syncInProgress.current = false
                    })
            }
        }, 5 * 60 * 1000) // 5 minutes
        
        return () => clearInterval(interval)
    }, [online])
}
```

### Phase 5: Update React Query Hooks

Update hooks to trigger sync after mutations. Example for `src/lib/queries/trips.js`:

```js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as tripsRepo from '@/db/repos/trips'
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
    const isOnline = useOnlineStatus()
    
    return useMutation({
        mutationFn: tripsRepo.create,
        onSuccess: async () => {
            await qc.invalidateQueries({ queryKey: ['trips'] })
            
            // Sync if online
            if (isOnline) {
                syncDb().catch(err => {
                    console.error('Post-mutation sync failed:', err)
                })
            }
        }
    })
}

export const useUpdateTripMutation = () => {
    const qc = useQueryClient()
    const isOnline = useOnlineStatus()
    
    return useMutation({
        mutationFn: ({ id, data }) => tripsRepo.update(id, data),
        onSuccess: async () => {
            await qc.invalidateQueries({ queryKey: ['trips'] })
            
            if (isOnline) {
                syncDb().catch(err => {
                    console.error('Post-mutation sync failed:', err)
                })
            }
        }
    })
}

export const useDeleteTripMutation = () => {
    const qc = useQueryClient()
    const isOnline = useOnlineStatus()
    
    return useMutation({
        mutationFn: tripsRepo.remove,
        onSuccess: async () => {
            await qc.invalidateQueries({ queryKey: ['trips'] })
            
            if (isOnline) {
                syncDb().catch(err => {
                    console.error('Post-mutation sync failed:', err)
                })
            }
        }
    })
}
```

### Phase 6: Testing

1. **Initial Load Test**:
   - Clear browser data
   - Load app while online
   - Verify initial sync populates local DB
   - Check console for sync success message

2. **Offline Test**:
   - Go offline (DevTools Network tab -> Offline)
   - Create/edit/delete trips, plans, segments
   - Verify changes persist in local DB
   - Reload page offline - verify data persists

3. **Sync Test**:
   - Make offline changes
   - Go back online
   - Verify auto-sync triggers
   - Check that changes appear on other devices

4. **Security Test**:
   ```js
   const tables = await getTableNames()
   console.log(tables)
   // Should NOT include 'users' table
   ```

## Implementation Checklist

- [ ] Install sqlocal and @sqlocal/drizzle
- [ ] Update clientDb.js with sqlocal implementation
- [ ] Update drizzleClient.js to use sqlocal driver
- [ ] Create /api/sync endpoint
- [ ] Update all repositories (trips, plans, segments, places)
- [ ] Update all React Query hooks to trigger sync
- [ ] Test offline create/edit/delete
- [ ] Test auto-sync on reconnect
- [ ] Verify users table not in browser DB
- [ ] Test multi-device sync
- [ ] Add sync button to UI
- [ ] Add offline indicator

## Known Limitations

1. **Sync Strategy**: Current implementation uses simple "replace all" strategy. For production, implement:
   - Change tracking (dirty flag on modified records)
   - Conflict resolution using updated_at timestamps
   - Incremental sync (only changed records)

2. **Schema Migrations**: Manual schema in `initializeSchema()`. For production:
   - Generate schema from Drizzle definitions
   - Version migrations for schema changes

3. **Performance**: Full table replacement on sync. For large datasets:
   - Implement incremental sync
   - Add pagination
   - Use Web Workers for sync operations

4. **Security**: Sync endpoint returns all data. For multi-user:
   - Filter by user permissions
   - Implement row-level security

## Benefits

✅ True offline-first - works completely offline
✅ Automatic sync when online
✅ Data persists across sessions
✅ Fast local queries (no network latency)
✅ Compatible with existing Drizzle schemas
✅ Simple, predictable sync model

## Next Steps

1. Execute Phase 1-3 to get basic offline functionality
2. Test thoroughly offline and online
3. Add UI indicators (offline badge, sync button)
4. Implement smarter sync strategy
5. Add proper error handling and user feedback
