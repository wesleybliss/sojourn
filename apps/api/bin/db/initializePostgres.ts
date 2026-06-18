#!/usr/bin/env node

import 'dotenv/config'

import { createClient } from '@libsql/client/http'
import postgresDatabase from '@repo/shared/db/db-postgres'
import cliProgress from 'cli-progress'

const turso = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
})

const pgPool = postgresDatabase.$client

const tableOrder = [
    'users',
    'teams',
    'userTeams',
    'trips',
    'plans',
    'segments',
    // 'geonamesCities',
    'places',
]

// SQLite stores timestamps as unix epoch seconds; Postgres uses timestamptz
const timestampColumns: Record<string, string[]> = {
    users: ['createdAt', 'updatedAt'],
    teams: ['createdAt', 'updatedAt'],
    userTeams: ['createdAt', 'updatedAt'],
    trips: ['createdAt', 'updatedAt'],
    plans: ['createdAt', 'updatedAt'],
    segments: ['createdAt', 'updatedAt', 'startDate', 'endDate'],
    // geonamesCities: ['createdAt', 'updatedAt'],
    places: ['createdAt', 'updatedAt'],
}

// SQLite stores booleans as 0/1 integers; Postgres uses native booleans
const booleanColumns: Record<string, string[]> = {
    users: ['enabled'],
    segments: ['flightBooked', 'stayBooked', 'isShengenRegion'],
    places: ['isBookmarked'],
}

const BATCH_SIZE = 250

const transformRow = (
    row: Record<string, unknown>,
    tableName: string,
): Record<string, unknown> => {
    
    const out: Record<string, unknown> = {}
    const tsCols = timestampColumns[tableName] ?? []
    const boolCols = booleanColumns[tableName] ?? []
    
    for (const [key, value] of Object.entries(row)) {
        if (value === null || value === undefined) {
            out[key] = value
        } else if (tsCols.includes(key) && typeof value === 'number') {
            out[key] = new Date(value * 1000)
        } else if (boolCols.includes(key)) {
            out[key] = value === 1 || value === true
        } else {
            out[key] = value
        }
    }
    
    return out
    
}

const migrateTable = async (
    tableName: string,
    bar: cliProgress.SingleBar,
) => {
    
    const result = await turso.execute(`SELECT * FROM "${tableName}"`)
    const rows = result.rows as Record<string, unknown>[]
    
    bar.update(0, { total: rows.length })
    
    if (rows.length === 0) return
    
    const columns = Object.keys(rows[0])
    const colList = columns.map(c => `"${c}"`).join(', ')
    
    for (let i = 0; i < rows.length; i += BATCH_SIZE) {
        
        const batch = rows.slice(i, i + BATCH_SIZE)
        const transformedBatch = batch.map(row => transformRow(row, tableName))
        
        const valueClauses: string[] = []
        const flatValues: unknown[] = []
        let paramIdx = 1
        
        for (const row of transformedBatch) {
            const placeholders = columns.map(() => `$${paramIdx++}`)
            valueClauses.push(`(${placeholders.join(', ')})`)
            for (const col of columns) {
                flatValues.push(row[col])
            }
        }
        
        const valuesClause = valueClauses.join(', ')
        const query = `INSERT INTO "${tableName}" (${colList}) ` +
            `OVERRIDING SYSTEM VALUE VALUES ${valuesClause} ON CONFLICT DO NOTHING`
        
        await pgPool.query(query, flatValues)
        
        bar.update(Math.min(i + BATCH_SIZE, rows.length))
        
    }
    
}

const main = async () => {
    
    await pgPool.query('SELECT now()')
    console.log('Connected to Postgres')
    
    await turso.execute('SELECT 1')
    console.log('Connected to SQLite')
    
    const multibar = new cliProgress.MultiBar(
        {
            format: '  {bar} | {table} | {value}/{total} rows',
            hideCursor: true,
            barCompleteChar: '\u2588',
            barIncompleteChar: '\u2591',
        },
        cliProgress.Presets.shades_classic,
    )
    
    for (const tableName of tableOrder) {
        const bar = multibar.create(100, 0, { table: tableName.padEnd(15), total: 0 })
        await migrateTable(tableName, bar)
        bar.update(100)
    }
    
    multibar.stop()
    
    console.log('\nMigration complete!')
    
}

main()
    .then(() => process.exit(0))
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
