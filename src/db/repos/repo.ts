import database from '@/db'
import { AnyColumn, desc, eq, inArray, SQLWrapper, TableConfig } from 'drizzle-orm'
import { BaseSQLiteDatabase, SQLiteTable } from 'drizzle-orm/sqlite-core'
import { ID } from '@/types/data'

/**
 * Generic repository with the specified name, plural form, schema, and database connection.
 */
class Repository<
    TSchema extends SQLiteTable<TableConfig> & {
        id: SQLWrapper | AnyColumn
        createdAt: SQLWrapper | AnyColumn
        updatedAt: SQLWrapper | AnyColumn
    },
    TDatabase extends BaseSQLiteDatabase<
        'sync' | 'async',
        unknown,
        Record<string, never>
    > = typeof database,
> {
    
    public name: string
    public plural: string
    public schema: TSchema
    public db: TDatabase
    
    /**
     * @constructor
     * @param {string} name - Single name (e.g. item)
     * @param {string} plural - Plural form (e.g. items)
     * @param {Object} schema - The schema object for the repository (e.g. db.items)
     * @param {Object} db - The database connection or a transaction (default: database)
     * @returns {Repository}
     */
    constructor(name: string, plural: string, schema: TSchema, db: TDatabase | undefined) {
        
        this.name = name
        this.plural = plural
        this.schema = schema
        this.db = (db ?? database) as unknown as TDatabase
        
    }
    
    //region Helpers
    
    // eslint-disable-next-line no-unused-vars
    tx(transaction: TDatabase) {
        
        throw new Error('Method not implemented.')
        
    }
    
    normalizeDateValue(value: Date | string | number) {
        
        if (!value) return null
        if (typeof value === 'string') return value
        if (value instanceof Date) return value.getTime()
        
        if (typeof value === 'number')
            return value < 1e12 ? value * 1000 : value
        
        return value
        
    }
    
    //endregion Helpers
    
    async create(
        data: TSchema['$inferInsert'],
    ): Promise<TSchema['$inferSelect']> {
        
        try {
            
            const [newItem] = await this.db
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
            
            return await this.db
                .select()
                .from(this.schema)
                .orderBy(desc(this.schema.id))
            
        } catch (e) {
            
            console.error(`Error fetching ${this.plural}:`, e)
            throw new Error(`Failed to fetch ${this.plural}`)
            
        }
        
    }
    
    async findAllBy<
        TKey extends keyof TSchema['$inferSelect']
    >(
        key: TKey,
        value: TSchema['$inferSelect'][TKey],
    ) {
        
        try {
            
            const field = this.schema[
                key as keyof typeof this.schema
            ] as AnyColumn
            
            return await this.db
                .select()
                .from(this.schema)
                .where(eq(field, value))
                .orderBy(desc(this.schema.createdAt))
            
        } catch (e) {
            
            console.error(`Error fetching ${this.plural} by ${key.toString()}:`, e)
            throw new Error(`Failed to fetch ${this.plural}`)
            
        }
        
    }
    
    async findOneBy<
        TKey extends keyof TSchema['$inferSelect']
    >(
        key: TKey,
        value: TSchema['$inferSelect'][TKey],
    ) {
        
        try {
            
            const field = this.schema[
                key as keyof typeof this.schema
                ] as AnyColumn
            
            const [item] = await this.db
                .select()
                .from(this.schema)
                .where(eq(field, value))
                .limit(1)
            
            return item || null
            
        } catch (e) {
            
            console.error(`Error fetching name by ${key.toString()} = ${value}:`, e)
            throw new Error(`Failed to fetch ${this.name}`)
            
        }
        
    }
    
    async findOneById(id: ID) {
        
        return await this.findOneBy('id', id as TSchema['$inferSelect']['id'])
        
    }
    
    async updateById(
        id: ID,
        data: Partial<TSchema['$inferInsert']>,
    ): Promise<TSchema['$inferSelect']> {
        
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
    
    async deleteByIds(ids: ID[]) {
        
        try {
            
            await this.db
                .delete(this.schema)
                .where(inArray(this.schema.id, ids))
            
        } catch (e) {
            
            console.error(`Error deleting ${ids.length} ${this.plural}:`, e)
            throw new Error(`Failed to delete ${this.plural}`)
            
        }
        
    }
    
    async deleteById(id: ID) {
        
        return await this.deleteByIds([id])
        
    }
    
}

export default Repository
