import 'dotenv/config'
import { schemas } from '../../db/index.js'
import turso from '../../db2/index.js'

/**
 * Parses a single Dexie field definition
 * @param {string} fieldDef - Dexie field definition
 * @returns {Object} Parsed field info
 */
const parseDexieField = fieldDef => {
    
    let name = fieldDef
    let type = 'TEXT'
    let isUnique = false
    let references = null
    
    // Handle unique fields
    if (name.startsWith('&')) {
        isUnique = true
        name = name.substring(1)
    }
    
    // Handle foreign keys
    const fkMatch = name.match(/^(.+?)\s*->\s*(\w+)\.id$/)
    
    if (fkMatch) {
        name = fkMatch[1].trim()
        references = { table: fkMatch[2] }
    }
    
    // Handle dot notation
    name = name.replace(/\./g, '_')
    
    // Determine type based on field name
    if (name.includes('Date')) type = 'DATETIME'
    else if (name.includes('Booked') || name.includes('Region')) type = 'BOOLEAN'
    else if (name.includes('lat') || name.includes('lng')) type = 'REAL'
    
    return {
        name,
        type,
        isUnique,
        references,
    }
    
}

/**
 * Migrates a single Dexie schema to Turso SQLite compatible schema
 * @param {Object} dexieSchema - Dexie schema object with table definitions
 * @returns {Object} Turso SQLite compatible schema
 */
export const migrateDexieToTursoSchema = dexieSchema => {
    
    const tursoSchema = {}
    
    for (const [tableName, dexieFields] of Object.entries(dexieSchema)) {
        
        const columns = []
        const indexes = []
        
        // Add base columns
        columns.push('id TEXT PRIMARY KEY')
        columns.push('createdAt DATETIME DEFAULT CURRENT_TIMESTAMP')
        columns.push('updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP')
        
        // Process each field
        for (const fieldDef of dexieFields) {
            
            const { name, type, isUnique, references } = parseDexieField(fieldDef)
            
            columns.push(`${name} ${type}`)
            
            if (isUnique)
                indexes.push(`CREATE UNIQUE INDEX idx_${tableName}_${name} ON ${tableName}(${name})`)
            
            if (references)
                columns.push(`FOREIGN KEY (${name}) REFERENCES ${references.table}(id)`)
            
        }
        
        tursoSchema[tableName] = {
            createTable: `CREATE TABLE ${tableName} (\n  ${columns.join(',\n  ')}\n)`,
            indexes,
        }
        
    }
    
    return tursoSchema
    
}

const main = async () => {
    
    const keys = Object.keys(schemas)
    const name = keys[0]
    const schema = schemas[name]
    const result = migrateDexieToTursoSchema(schema)
    
    console.log('Dexie Schema', schema)
    console.log('Turso Schema', result)
    
    
}

main()
    .then(() => process.exit(0))
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
