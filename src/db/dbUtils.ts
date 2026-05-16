import { AnyColumn, BuildColumns, ColumnBuilderBase, SQL, sql } from 'drizzle-orm'
import {
    sqliteTable,
    integer,
    customType,
    SQLiteTableWithColumns,
    SQLiteTableExtraConfigValue,
    UpdateDeleteAction,
    SQLiteTableExtraConfig,
} from 'drizzle-orm/sqlite-core'
import dayjs from 'dayjs'

export const timestampSeconds = (name: string) => customType({
    dataType() {
        return 'integer'
    },
    toDriver(value: unknown) {
        
        // console.log('toDriver input:', value, (value instanceof Date) ? 'date' : typeof value)
        const seconds = dayjs(value as number).unix()
        
        if (value instanceof Date) {
            // console.log('toDriver output (Date):', seconds, '->', lendbg(seconds))
            return seconds
        }
        
        if (typeof value === 'number') {
            // console.log('toDriver output (number):', seconds, '->', lendbg(seconds))
            return seconds
        }
        
        if (typeof value === 'string') {
            // console.log('toDriver output (string):', seconds, '->', lendbg(seconds))
            return seconds
        }
        
        console.warn('toDriver unexpected input:', value)
        return value
        
    },
    fromDriver(value: unknown) {
        
        // console.log('fromDriver input:', value, (value instanceof Date) ? 'date' : typeof value)
        const date = dayjs.unix(value as number).toDate()
        
        // console.log('fromDriver output:', date)
        
        return date
        
    },
})(name)

// Creates a default timestamp field
export const ts = (name: string) => timestampSeconds(name)
    .default(sql`(unixepoch())`).notNull()

export const timestamps = {
    updatedAt: ts('updatedAt'),
    createdAt: ts('createdAt'),
    // deletedAt: timestamp(),
}

type WithId<
    T extends Record<string, ColumnBuilderBase>,
    THasId extends boolean,
> = THasId extends true
    ? T & {
    id: ColumnBuilderBase
} : T

type ValidColumns<T> = {
    [K in keyof T]:
    K extends 'id'
        ? T[K] extends ColumnBuilderBase | false | undefined
            ? T[K]
            : never
        : T[K] extends ColumnBuilderBase
            ? T[K]
            : never
}

const sqliteTableObject = sqliteTable as <
    TTableName extends string,
    TColumnsMap extends Record<string, ColumnBuilderBase>,
>(
    name: TTableName,
    columns: TColumnsMap,
    extraConfig?: (
        self: BuildColumns<
            TTableName,
            TColumnsMap,
            'sqlite'
        >
    ) => SQLiteTableExtraConfig | SQLiteTableExtraConfigValue[]
) => SQLiteTableWithColumns<{
    name: TTableName
    schema: undefined
    columns: BuildColumns<TTableName, TColumnsMap, 'sqlite'>
    dialect: 'sqlite'
}>

export const table = <
    TTableName extends string,
    TColumnsMap extends ValidColumns<TColumnsMap> & {
        id?: ColumnBuilderBase | false
    },
    THasId extends boolean = TColumnsMap extends { id: false }
        ? false
        : true,
>(
    name: TTableName,
    columns: TColumnsMap,
    extraConfig?: (
        self: BuildColumns<
            TTableName,
            WithId<
                Omit<TColumnsMap, 'id'> & typeof timestamps,
                THasId
            >,
            'sqlite'
        >
    ) => SQLiteTableExtraConfig | SQLiteTableExtraConfigValue[]
) => {
    
    if (!name?.length)
        throw new Error('Table name required')
    
    if (!Object.keys(columns).length)
        throw new Error('Table properties required')
    
    const fields: Record<string, ColumnBuilderBase> = {}
    
    if (columns.id !== false)
        fields.id = integer('id').primaryKey({ autoIncrement: true })
    
    const { id, ...rest } = columns
    
    const finalColumns = {
        ...(id === false
            ? {}
            : {
                id: integer('id').primaryKey({ autoIncrement: true }),
            }),
        ...timestamps,
        ...rest,
    }
    
    return sqliteTableObject(
        name,
        finalColumns as WithId<
            Omit<TColumnsMap, 'id'> & typeof timestamps,
            THasId
        >,
        extraConfig,
    )
    
}

export const lower = (value: string | AnyColumn | SQL) =>
    sql`lower(${value})`

export const optsCascadeAll: {
    onUpdate: UpdateDeleteAction
    onDelete: UpdateDeleteAction
} = {
    onUpdate: 'cascade',
    onDelete: 'cascade',
}

export const updateTimestampTrigger = (tableName: string) => {
    
    const table = sql.raw(tableName)
    const trigger = sql.raw(`update_${tableName}_timestamp`)
    
    return sql.raw(`
        CREATE TRIGGER ${trigger}
        AFTER UPDATE ON ${table}
        FOR EACH ROW
        BEGIN
            UPDATE ${table}
            SET updatedAt = CURRENT_TIMESTAMP
            WHERE id = OLD.id;
        END;
    `)
    
}
