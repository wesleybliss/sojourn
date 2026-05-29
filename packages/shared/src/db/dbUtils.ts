import dayjs from 'dayjs'
import { sql } from 'drizzle-orm'
import type { AnyColumn, BuildColumns, ColumnBuilderBase, SQL } from 'drizzle-orm'
import {
    customType,
    integer,
    sqliteTable,
} from 'drizzle-orm/sqlite-core'
import type {
    SQLiteTableExtraConfig,
    SQLiteTableExtraConfigValue,
    SQLiteTableWithColumns,
    UpdateDeleteAction,
} from 'drizzle-orm/sqlite-core'

export const timestampSeconds = (name: string) =>
    customType<{ data: Date; driverData: number }>({
        dataType() {
            return 'integer'
        },
        toDriver(value: Date | number | string) {
            if (value instanceof Date) return dayjs(value).unix()
            if (typeof value === 'number') return dayjs.unix(value).unix()
            if (typeof value === 'string') return dayjs(value).unix()
            console.warn('toDriver unexpected input:', value)
            return value as number
        },
        fromDriver(value: number) {
            return dayjs.unix(value).toDate()
        },
    })(name)

// Creates a default timestamp field
export const ts = (name: string) => timestampSeconds(name)
    .default(sql.raw('(unixepoch())')).notNull()

export const timestamps = {
    updatedAt: ts('updatedAt'),
    createdAt: ts('createdAt'),
} as {
    updatedAt: ReturnType<typeof ts> & { $type: Date }
    createdAt: ReturnType<typeof ts> & { $type: Date }
}

const idColumn = () => integer('id').primaryKey({ autoIncrement: true })

type IdColumn = ReturnType<typeof idColumn>

type WithId<
    T extends Record<string, ColumnBuilderBase>,
    THasId extends boolean,
> = THasId extends true
    ? T & { id: IdColumn }
    : T

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
    _name: TTableName,
    _columns: TColumnsMap,
    _extraConfig?: (
        _self: BuildColumns<
            TTableName,
            TColumnsMap,
            'sqlite'
        >,
    ) => SQLiteTableExtraConfig | SQLiteTableExtraConfigValue[],
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
        _self: BuildColumns<
            TTableName,
            WithId<
                Omit<TColumnsMap, 'id'> & typeof timestamps,
                THasId
            >,
            'sqlite'
        >,
    ) => SQLiteTableExtraConfig | SQLiteTableExtraConfigValue[],
) => {
    
    if (!name?.length)
        throw new Error('Table name required')
    
    if (!Object.keys(columns).length)
        throw new Error('Table properties required')
    
    const { id, ...rest } = columns
    
    const finalColumns = {
        ...(id === false ? {} : { id: idColumn() }),
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
