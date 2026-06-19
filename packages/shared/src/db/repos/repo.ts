import database from '@repo/shared/db'
import type { Insert, Select, Transaction } from '@repo/shared/types'
import type { ID } from '@shared/types/data.types'
import { BareDatabase } from '@shared/types/database.types'
import type { AnyColumn, ColumnsSelection } from 'drizzle-orm'
import { asc, desc, eq, inArray } from 'drizzle-orm'
import { PgTable } from 'drizzle-orm/pg-core'
import { PgViewBase } from 'drizzle-orm/pg-core/view-base'
import { SQL, type SQLWrapper } from 'drizzle-orm/sql/sql'

/**
 * Generic repository with the specified name, plural form, schema, and database connection.
 */
class Repository<TModel, TSchema extends PgTable> {
    
    public name: string
    public plural: string
    public schema: TSchema
    public db: BareDatabase | Transaction
    
    constructor(name: string, plural: string, schema: TSchema, db?: BareDatabase | Transaction) {
        
        this.name = name
        this.plural = plural
        this.schema = schema
        this.db = db ?? database
        
    }
    
    //region Helpers
    
    private get idColumn() {
        
        return (this.schema as unknown as { id: AnyColumn }).id
        
    }
    
    private get createdAtColumn() {
        
        return (this.schema as unknown as { createdAt: AnyColumn }).createdAt
        
    }
    
    tx(_transaction: Transaction): Repository<TModel, TSchema> {
        
        throw new Error('Method not implemented.')
        
    }
    
    normalizeDateValue(value: Date | string | number | null | undefined): Date {
        
        if (!value) return new Date(0)
        if (typeof value === 'string') return new Date(value)
        if (value instanceof Date) return value
        
        if (typeof value === 'number')
            return new Date(value < 1e12 ? value * 1000 : value)
        
        return value
        
    }
    
    //endregion Helpers
    
    async count(
        source?:
            | PgTable
            | SQL<unknown>
            | SQLWrapper<unknown>
            | PgViewBase<string, boolean, ColumnsSelection>
            | undefined,
        filters?: SQL<unknown>,
    ) {
        
        return this.db.$count(source || this.schema, filters)
        
    }
    
    select() {
        
        // @ts-expect-error drizzle-orm beta generic PgTable issue
        return this.db.select().from(this.schema)
        
    }
    
    async create(
        data: Insert<TSchema>,
    ): Promise<Select<TSchema>> {
        
        try {
            
            const result = await this.db
                .insert(this.schema)
                .values(data as Insert<TSchema>)
                .returning() as Select<TSchema>[]
            
            return result[0]
            
        } catch (e) {
            
            console.error(`Error creating ${this.name}:`, e)
            throw new Error(`Failed to create ${this.name}`)
            
        }
        
    }
    
    async findAll({
        offset,
        limit,
        orderBy,
        orderDirection,
    }: {
        offset?: number
        limit?: number
        orderBy?: AnyColumn | SQLWrapper
        orderDirection?: 'asc' | 'desc'
    } = {
        orderDirection: 'desc',
    }): Promise<Select<TSchema>[]> {
        
        try {
            
            const query = this.db
                .select()
                // @ts-expect-error drizzle-orm beta generic PgTable issue
                .from(this.schema)
            
            if (offset !== undefined)
                query.offset(offset)
            
            if (limit)
                query.limit(limit)
            
            const order = orderDirection === 'asc'
                ? asc(orderBy || this.createdAtColumn)
                : desc(orderBy || this.createdAtColumn)
            
            query.orderBy(order)
            
            return await query as Select<TSchema>[]
            
        } catch (e) {
            
            console.error(`Error fetching ${this.plural}:`, e)
            throw new Error(`Failed to fetch ${this.plural}`)
            
        }
        
    }
    
    async findAllBy<
        TKey extends keyof Select<TSchema>,
    >(
        key: TKey,
        value: Select<TSchema>[TKey],
    ): Promise<Select<TSchema>[]> {
        
        try {
            
            const field = (this.schema as unknown as Record<string, AnyColumn>)[key as string]
            
            return await this.db
                .select()
                // @ts-expect-error drizzle-orm beta generic PgTable issue
                .from(this.schema)
                .where(eq(field, value))
                .orderBy(desc(this.createdAtColumn)) as Select<TSchema>[]
            
        } catch (e) {
            
            console.error(`Error fetching ${this.plural} by ${String(key)}:`, e)
            throw new Error(`Failed to fetch ${this.plural}`)
            
        }
        
    }
    
    async findOneBy<
        TKey extends keyof Select<TSchema>,
    >(
        key: TKey,
        value: Select<TSchema>[TKey],
    ): Promise<Select<TSchema> | null> {
        
        try {
            
            const field = (this.schema as unknown as Record<string, AnyColumn>)[key as string]
            
            const [item] = await this.db
                .select()
                // @ts-expect-error drizzle-orm beta generic PgTable issue
                .from(this.schema)
                .where(eq(field, value))
                .limit(1)
            
            return (item ?? null) as Select<TSchema> | null
            
        } catch (e) {
            
            console.error(`Error fetching ${this.name} by ${String(key)} = ${String(value)}:`, e)
            throw new Error(`Failed to fetch ${this.name}`)
            
        }
        
    }
    
    async findOneById(id: ID): Promise<TModel | null> {
        
        return await this.findOneBy('id', id) as TModel | null
        
    }
    
    async updateById(
        id: ID,
        data: Partial<Insert<TSchema>>,
    ): Promise<Select<TSchema>> {
        
        try {
            
            const result = await this.db
                .update(this.schema)
                .set(data as Partial<Insert<TSchema>>)
                .where(eq(this.idColumn, id))
                .returning() as Select<TSchema>[]
            
            return result[0]
            
        } catch (e) {
            
            console.error(`Error updating ${this.name} by ID ${id}:`, e)
            throw new Error(`Failed to update ${this.name}`)
            
        }
        
    }
    
    async deleteByIds(ids: ID[]) {
        
        try {
            
            await this.db
                .delete(this.schema)
                .where(inArray(this.idColumn, ids))
            
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
