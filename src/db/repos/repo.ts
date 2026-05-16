import database from '@/db'
import { AnyColumn, desc, eq, inArray, InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { SQLiteTable } from 'drizzle-orm/sqlite-core'
import { ID } from '@/types/data'

type Database = typeof database

type Insert<T extends SQLiteTable> = InferInsertModel<T>
type Select<T extends SQLiteTable> = InferSelectModel<T>

/**
 * Generic repository with the specified name, plural form, schema, and database connection.
 */
class Repository<TSchema extends SQLiteTable> {

    public name: string
    public plural: string
    public schema: TSchema
    public db: Database

    /**
     * @constructor
     * @param {string} name - Single name (e.g. item)
     * @param {string} plural - Plural form (e.g. items)
     * @param {Object} schema - The schema object for the repository (e.g. db.items)
     * @param {Object} db - The database connection or a transaction (default: database)
     * @returns {Repository}
     */
    constructor(name: string, plural: string, schema: TSchema, db?: Database) {

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

    // eslint-disable-next-line no-unused-vars
    tx(transaction: Database): Repository<TSchema> {

        throw new Error('Method not implemented.')

    }

    normalizeDateValue(value: unknown | null | undefined) {

        if (!value) return null
        if (typeof value === 'string') return value
        if (value instanceof Date) return value.getTime()

        if (typeof value === 'number')
            return value < 1e12 ? value * 1000 : value

        return value

    }

    //endregion Helpers

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

    async findAll(): Promise<Select<TSchema>[]> {

        try {

            return await this.db
                .select()
                .from(this.schema)
                .orderBy(desc(this.idColumn)) as Select<TSchema>[]

        } catch (e) {

            console.error(`Error fetching ${this.plural}:`, e)
            throw new Error(`Failed to fetch ${this.plural}`)

        }

    }

    async findAllBy<
        TKey extends keyof Select<TSchema>
    >(
        key: TKey,
        value: Select<TSchema>[TKey],
    ): Promise<Select<TSchema>[]> {

        try {

            const field = (this.schema as unknown as Record<string, AnyColumn>)[key as string]

            return await this.db
                .select()
                .from(this.schema)
                .where(eq(field, value))
                .orderBy(desc(this.createdAtColumn)) as Select<TSchema>[]

        } catch (e) {

            console.error(`Error fetching ${this.plural} by ${String(key)}:`, e)
            throw new Error(`Failed to fetch ${this.plural}`)

        }

    }

    async findOneBy<
        TKey extends keyof Select<TSchema>
    >(
        key: TKey,
        value: Select<TSchema>[TKey],
    ): Promise<Select<TSchema> | null> {

        try {

            const field = (this.schema as unknown as Record<string, AnyColumn>)[key as string]

            const [item] = await this.db
                .select()
                .from(this.schema)
                .where(eq(field, value))
                .limit(1)

            return (item ?? null) as Select<TSchema> | null

        } catch (e) {

            console.error(`Error fetching ${this.name} by ${String(key)} = ${String(value)}:`, e)
            throw new Error(`Failed to fetch ${this.name}`)

        }

    }

    async findOneById(id: ID) {

        return await this.findOneBy(
            'id' as keyof Select<TSchema>,
            id as Select<TSchema>[keyof Select<TSchema>],
        )

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
