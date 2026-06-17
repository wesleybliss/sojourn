import { BuildColumns, ColumnBuilderBase } from 'drizzle-orm'
import {
    pgTable,
    PgTableExtraConfig,
    PgTableExtraConfigValue,
    timestamp,
    UpdateDeleteAction,
} from 'drizzle-orm/pg-core'
import { integer } from 'drizzle-orm/pg-core'

import { ValidColumns } from './shared'

export const postgresIdColumn = () => integer('id').generatedAlwaysAsIdentity().primaryKey()

export type IdColumn = ReturnType<typeof postgresIdColumn>

export type WithId<
    T extends Record<string, ColumnBuilderBase>,
    THasId extends boolean,
> = THasId extends true
    ? T & { id: IdColumn }
    : T

export const postgresTimestamps = {
    createdAt: timestamp('createdAt', { withTimezone: true })
        .defaultNow()
        .notNull(),
    
    // updatedAt: no default, you handle updates in your app or via trigger
    updatedAt: timestamp('updatedAt', { withTimezone: true })
        .defaultNow()
        .notNull(),
}

export const postgresOptsCascadeAll: {
    onUpdate: UpdateDeleteAction
    onDelete: UpdateDeleteAction
} = {
    onUpdate: 'cascade',
    onDelete: 'cascade',
}

export const createTablePostgres = <
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
                Omit<TColumnsMap, 'id'> & typeof postgresTimestamps,
                THasId
            >,
            'pg'
        >,
    ) => PgTableExtraConfig | PgTableExtraConfigValue[],
) => {
    
    if (!name?.length)
        throw new Error('Table name required')
    
    if (!Object.keys(columns).length)
        throw new Error('Table properties required')
    
    const { id, ...rest } = columns
    
    const finalColumns = {
        ...(id === false ? {} : { id: postgresIdColumn() }),
        ...postgresTimestamps,
        ...rest,
    }
    
    return pgTable(
        name,
        finalColumns as WithId<
            Omit<TColumnsMap, 'id'> & typeof postgresTimestamps,
            THasId
        >,
        extraConfig,
    )
    
}
