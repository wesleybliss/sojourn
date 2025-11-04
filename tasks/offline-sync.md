# Task

Use latest Turso libraries to enable true offline-first with sync.

# Resources

Use `@tursodatabase/database-wasm` and `@tursodatabase/sync-wasm` libraries.

**Example Client-side hook (e.g., in a useTurso hook under /app or client components):**

```javascript
'use client'
import { connect } from '@tursodatabase/sync-wasm'
import { useEffect, useState } from 'react'

export default function useTurso(dbName, authToken) {
  const [db, setDb] = useState(null)

  useEffect(() => {
    async function init() {
      const localDb = await connect({
        path: `${dbName}.db`,  // Virtual FS in browser
        url: `libsql://${dbName}-yourorg.aws-us-east-1.turso.io`,
        authToken,
        longPollTimeoutMs: 5000  // For pull sync
      })
      setDb(localDb)

      // Background sync loop
      const pull = async () => {
        try {
          if (await localDb.pull()) updateUI()  // Refresh your UI
        } catch (e) { console.log('Pull failed, retrying') }
        setTimeout(pull, 5000)
      }
      const push = async () => {
        try {
          if ((await localDb.stats()).operations > 0) await localDb.push()
        } catch (e) { console.log('Push failed') }
        setTimeout(push, 1000)
      }
      const checkpoint = async () => {
        try {
          if ((await localDb.stats()).mainWal > 100000) await localDb.checkpoint()
        } catch (e) {}
        setTimeout(checkpoint, 5000)
      }
      pull(); push(); checkpoint()
    }
    init()
  }, [])

  return db
}
```

- Writes: await db.execute('INSERT INTO todos (text) VALUES (?)', ['Buy milk'])—happens locally, super fast.
- Sync: Auto-pushes/pulls in background. Conflicts? Defaults to last-push-wins; hook in a transform fn for custom logic like merging.
- Server-side (for initial sync or auth): Use regular @libsql/client in API routes to bootstrap data.

# Turso documentation

Refer to [https://turso.tech/blog/introducing-databases-anywhere-with-turso-sync](https://turso.tech/blog/introducing-databases-anywhere-with-turso-sync).
