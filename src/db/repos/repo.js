import database from '@/db'
import { desc, eq } from 'drizzle-orm'

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
     * @param {Object} db - The database connection or a transaction (default: database)
     * @returns {Repository}
     */
    constructor(name, plural, schema, db = database) {
        
        this.name = name
        this.plural = plural
        this.schema = schema
        this.db = db
        
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
            
            const [newItem] = await this.db
                .insert(this.schema)
                .values(data)
                .returning()
            
            return newItem
            
        } catch (e) {
            
            console.error(`Error creating ${name}:`, e)
            throw new Error(`Failed to create ${name}`)
            
        }
        
    }
    
    async findAll() {
        
        try {
            
            return await this.db
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
            
            return await this.db
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
            
            const [item] = await this.db
                .select()
                .from(this.schema)
                .where(eq(this.schema[key], value))
                .limit(1)
            
            return item || null
            
        } catch (e) {
            
            console.error(`Error fetching name by ${key} = ${value}:`, e)
            throw new Error(`Failed to fetch ${this.name}`)
            
        }
        
    }
    
    async findOneById(id) {
        
        return await this.findOneBy('id', id)
        
    }
    
    async updateById(id, data) {
        
        try {
            
            const [updatedItem] = await this.db
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
            
            await this.db
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
