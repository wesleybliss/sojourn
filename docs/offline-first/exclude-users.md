# Excluding Users Table from Browser Sync

## Security Requirement

The `users` table contains sensitive authentication data (emails, password hashes) and must **NEVER** be synced to the browser's local database. This is a critical security requirement.

## Approach

### Current Implementation

**libSQL embedded replicas sync the entire database by default.** The `@libsql/client` package (v0.15.10) does not currently expose client-side table filtering options like `excludeTables` or `includeTables` in the `createClient` configuration.

### Solution: Server-Side Table Filtering

Since client-side filtering is not available, we rely on Turso's server-side access controls:

1. **Database-Level Permissions**: Turso databases can be configured with role-based access control (RBAC)
2. **Token Scoping**: The `TURSO_AUTH_TOKEN` can be scoped to specific tables or operations
3. **Replication Groups**: Turso supports limiting which tables are replicated to specific clients

### Recommended Action

**Create a read-only, scoped token that excludes the `users` table:**

```bash
# This would be the ideal command (verify with Turso docs)
turso db tokens create trip-planner --read-only --exclude-tables users
```

If Turso doesn't support table-level token scoping yet, alternative approaches:

1. **Separate Database**: Move the `users` table to a separate Turso database that is never synced to browsers
2. **Database Views**: Create views that exclude sensitive columns and sync only those views
3. **Application-Level Filtering**: Ensure all client-side queries never reference the `users` table

### Current Temporary Approach

For development, we proceed with the full token but:
1. Never query the `users` table from client code
2. Keep authentication entirely server-side
3. Verify after first sync that the `users` table is not present locally

## Verification Steps

### 1. Initial Sync Test

After the first browser sync, run this in the browser console:

```js
import { getTableNames } from '@/db/clientDb'

const tables = await getTableNames()
console.log('Local tables:', tables)

// Expected output (users should NOT be in this list):
// ['trips', 'plans', 'segments', 'places', 'userTrips', ...other tables]
```

### 2. Alternative Verification

```js
import { executeQuery } from '@/db/clientDb'

const result = await executeQuery(
    'SELECT name FROM sqlite_schema WHERE type = ? AND name = ?',
    ['table', 'users']
)

if (result.rows.length > 0) {
    console.error('❌ SECURITY ISSUE: users table found in local DB!')
} else {
    console.log('✅ users table correctly excluded from sync')
}
```

### 3. Automated Test

Add to your test suite:

```js
// tests/offline-first/security.test.js
import { getTableNames } from '@/db/clientDb'

test('users table must not be synced to browser', async () => {
    const tables = await getTableNames()
    expect(tables).not.toContain('users')
})
```

## Rollout Blocker

**If the `users` table appears in the local database:**

1. **STOP ROLLOUT IMMEDIATELY**
2. Clear all browser data: `indexedDB.deleteDatabase('trip-planner.db')`
3. Investigate Turso token scoping options
4. Implement server-side table filtering before continuing
5. Re-verify exclusion

## Code-Level Protection

Even if we can't prevent sync at the protocol level, we protect at the application level:

### 1. Never Import User Schema in Client Code

```js
// src/db/schema.js - Mark user-related schemas
export const users = /* ... */ // NEVER import this in browser code
```

### 2. Runtime Check in clientDb.js

```js
// Add to getClientDb():
const tables = await getTableNames()
if (tables.includes('users')) {
    throw new Error('Security violation: users table detected in local DB')
}
```

### 3. Authentication Stays Server-Side

- All auth routes remain in `/api/auth/*`
- NextAuth configuration is server-only
- No client-side user lookups

## Future Improvements

1. **Short-Lived Tokens**: Implement server endpoint that issues scoped, time-limited sync tokens per user session
2. **Table-Level Permissions**: Work with Turso to implement table-level access controls
3. **Encryption**: If sensitive data must be synced, encrypt it before storage
4. **OAuth Migration**: Move to OAuth provider (eliminates need for local user table entirely)

## Testing Checklist

- [ ] Verify `users` table not present after first sync
- [ ] Confirm authentication still works (server-side)
- [ ] Test all CRUD operations work without `users` table
- [ ] Verify no client code attempts to query `users` table
- [ ] Document what happens if user tries to access `/api/auth` endpoints offline

## Documentation Links

- [Turso Token Scoping](https://docs.turso.tech/reference/tokens)
- [libSQL Embedded Replicas](https://docs.turso.tech/features/embedded-replicas)
- [Database Access Control](https://docs.turso.tech/reference/access-control)

## Notes

- This is a **temporary development approach**
- Production deployment requires proper token scoping or database separation
- Monitor Turso release notes for client-side table filtering support
- Consider migrating to OAuth to eliminate local user storage entirely
