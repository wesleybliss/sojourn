import { fileURLToPath } from 'node:url'

import * as dotenv from 'dotenv'
import { defineConfig } from 'drizzle-kit'

dotenv.config({
    path: fileURLToPath(new URL('../../.env', import.meta.url)),
    quiet: true,
})

export default defineConfig({
    out: './drizzle',
    schema: './src/db/schema',
    dialect: 'turso',
    dbCredentials: {
        url: process.env.TURSO_DATABASE_URL!,
        authToken: process.env.TURSO_AUTH_TOKEN!,
    },
})
