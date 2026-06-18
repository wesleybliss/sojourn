import { BuildColumns, ColumnBuilderBase, sql } from 'drizzle-orm'
import {
    integer,
    sqliteTable,
    SQLiteTableExtraConfig,
    SQLiteTableExtraConfigValue,
    SQLiteTableWithColumns,
    type UpdateDeleteAction,
} from 'drizzle-orm/sqlite-core'

import { SqliteValidColumns, timestampSeconds } from './shared'

export const sqliteIdColumn = () =>
    integer('id').primaryKey({ autoIncrement: true })

export type SqliteIdColumn = ReturnType<typeof sqliteIdColumn>

type WithSqliteId<
    T extends Record<string, ColumnBuilderBase>,
    THasId extends boolean,
> = THasId extends true
    ? T & { id: SqliteIdColumn }
    : T

export const sqliteTimestamp = (name: string) => timestampSeconds(name)
    .default(sql.raw('(unixepoch())')).notNull()

export const sqliteTimestamps = {
    updatedAt: sqliteTimestamp('updatedAt'),
    createdAt: sqliteTimestamp('createdAt'),
} as {
    updatedAt: ReturnType<typeof sqliteTimestamp> & { $type: Date }
    createdAt: ReturnType<typeof sqliteTimestamp> & { $type: Date }
}

export const sqliteOptsCascadeAll: {
    onUpdate: UpdateDeleteAction
    onDelete: UpdateDeleteAction
} = {
    onUpdate: 'cascade',
    onDelete: 'cascade',
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

export const createTableSQLite = <
    TTableName extends string,
    TColumnsMap extends SqliteValidColumns<TColumnsMap> & {
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
            WithSqliteId<
                Omit<TColumnsMap, 'id'> & typeof sqliteTimestamp,
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
        ...(id === false ? {} : { id: sqliteIdColumn() }),
        ...sqliteTimestamp,
        ...rest,
    }
    
    return sqliteTableObject(
        name,
        finalColumns as WithSqliteId<
            Omit<TColumnsMap, 'id'> & typeof sqliteTimestamp,
            THasId
        >,
        extraConfig,
    )
    
}
