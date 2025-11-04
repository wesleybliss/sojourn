import { desc, eq } from 'drizzle-orm'

let defaultDb = null
let dbPromise = null

// Lazy-load the appropriate database
const getDatabase = async () => {
    if (defaultDb) return defaultDb
    
    // Avoid multiple concurrent loads
    if (dbPromise) return dbPromise
    
    dbPromise = (async () => {
        if (typeof window !== 'undefined') {
            // In browser - lazy load client db
            const { getDrizzleDb } = await import('@/db/drizzleClient')
            
            defaultDb = getDrizzleDb()
        } else {
            // In server - lazy load server db
            const serverDb = await import('@/db')
            
            defaultDb = serverDb.default || serverDb.db
        }
        
        return defaultDb
    })()
    
    return dbPromise
}

/**
 * @typedef {Object} Repository
 * @property {string} name - The name of the repository
 * @property {string} plural - The plural form of the name
 * @property {Object} schema - The schema object for the repository
 * @property {Object} methods - The methods for interacting with the repository
 * @property {Function} methods.tx - A function to create a new transaction
 * @property {Function} methods.create - A function to create a new item
 * @property {Function} methods.findAll - A function to get all items
 * @property {Function} methods.findAllBy - A function to get all items by a specific key
 * @property {Function} methods.findOneById - A function to get an item by its ID
 * @property {Function} methods.updateById - A function to update an item by its ID
 * @property {Function} methods.deleteByIds - A function to delete multiple items by their IDs
 * @property {Function} methods.deleteById - A function to delete an item by its ID
 */

/**
 * Generic repository with the specified name, plural form, schema, and database connection.
 */
class Repository {
    
    /**
     * @constructor
     * @param {string} name - Single name (e.g. item)
     * @param {string} plural - Plural form (e.g. items)
     * @param {Object} schema - The schema object for the repository (e.g. db.items)
     * @param {Object} db - The database connection or a transaction (default: auto-detected)
     * @returns {Repository}
     */
    constructor(name, plural, schema, db = null) {
        
        this.name = name
        this.plural = plural
        this.schema = schema
        this._db = db
        this._dbPromise = null
        
    }
    
    // Lazy getter for database
    async getDb() {
        if (this._db) return this._db
        
        if (!this._dbPromise) {
            this._dbPromise = getDatabase()
        }
        
        this._db = await this._dbPromise
        return this._db
    }
    
    // Sync getter for backward compatibility (will throw if not initialized)
    get db() {
        if (this._db) return this._db
        throw new Error('Database not initialized. Call await repo.getDb() first or pass db to constructor.')
    }
    
    //region Helpers
    
    // eslint-disable-next-line no-unused-vars
    tx(transaction) {
        
        throw new Error('Method not implemented.')
        
    }
    
    normalizeDateValue(value) {
        
        if (!value) return null
        if (typeof value === 'string') return value
        if (value instanceof Date) return value.getTime()
        
        if (typeof value === 'number')
            return value < 1e12 ? value * 1000 : value
        
        return value
        
    }
    
    //endregion Helpers
    
    async create(data) {
        
        try {
            const db = await this.getDb()
            const [newItem] = await db
                .insert(this.schema)
                .values(data)
                .returning()
            
            return newItem
            
        } catch (e) {
            
            console.error(`Error creating ${this.name}:`, e)
            throw new Error(`Failed to create ${this.name}`)
            
        }
        
    }
    
    async findAll() {
        
        try {
            const db = await this.getDb()
            
            return await db
                .select()
                .from(this.schema)
                .orderBy(desc(this.schema.id))
            
        } catch (e) {
            
            console.error(`Error fetching ${this.plural}:`, e)
            throw new Error(`Failed to fetch ${this.plural}`)
            
        }
        
    }
    
    async findAllBy(key, value) {
        
        try {
            const db = await this.getDb()
            
            return await db
                .select()
                .from(this.schema)
                .where(eq(this.schema[key], value))
                .orderBy(desc(this.schema.createdAt))
            
        } catch (e) {
            
            console.error(`Error fetching ${this.plural} by ${key}:`, e)
            throw new Error(`Failed to fetch ${this.plural}`)
            
        }
        
    }
    
    async findOneBy(key, value) {
        
        try {
            const db = await this.getDb()
            const [item] = await db
                .select()
                .from(this.schema)
                .where(eq(this.schema[key], value))
                .limit(1)
            
            return item || null
            
        } catch (e) {
            
            console.error(`Error fetching ${this.name} by ${key} = ${value}:`, e)
            throw new Error(`Failed to fetch ${this.name}`)
            
        }
        
    }
    
    async findOneById(id) {
        
        return await this.findOneBy('id', id)
        
    }
    
    async updateById(id, data) {
        
        try {
            const db = await this.getDb()
            const [updatedItem] = await db
                .update(this.schema)
                .set(data)
                .where(eq(this.schema.id, id))
                .returning()
            
            return updatedItem
            
        } catch (e) {
            
            console.error(`Error updating ${this.name} by ID ${id}:`, e)
            throw new Error(`Failed to update ${this.name}`)
            
        }
        
    }
    
    async deleteByIds(ids) {
        
        try {
            const db = await this.getDb()
            
            await db
                .delete(this.schema)
                .where(this.schema.id.in(ids))
            
        } catch (e) {
            
            console.error(`Error deleting ${ids.length} ${this.plural}:`, e)
            throw new Error(`Failed to delete ${this.plural}`)
            
        }
        
    }
    
    async deleteById(id) {
        
        return await this.deleteByIds([id])
        
    }
    
}

export default Repository
