import { ColumnBuilderBase } from 'drizzle-orm'
import {
    PgTableExtraConfigValue,
    timestamp,
    UpdateDeleteAction,
} from 'drizzle-orm/pg-core'
import { integer, pgTable } from 'drizzle-orm/pg-core'
import {
    AnyPgColumnBuilder,
    PgBuildExtraConfigColumns,
} from 'drizzle-orm/pg-core/columns/common'

export const timestampPostgres = (name: string) =>
    timestamp(name, { withTimezone: true })

export const postgresIdColumn = () => integer('id').generatedAlwaysAsIdentity().primaryKey()

export type PostgresIdColumn = ReturnType<typeof postgresIdColumn>

export type WithPostgresId<
    T extends Record<string, ColumnBuilderBase>,
    THasId extends boolean,
> = THasId extends true
    ? T & { id: PostgresIdColumn }
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
    TColumnsMap extends Record<string, AnyPgColumnBuilder | false | undefined> & {
        id?: AnyPgColumnBuilder | false
    },
>(
    name: TTableName,
    columns: TColumnsMap,
    extraConfig?: (
        _self: PgBuildExtraConfigColumns<
            Record<string, AnyPgColumnBuilder>
        >,
    ) => PgTableExtraConfigValue[],
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
        finalColumns as Record<string, AnyPgColumnBuilder>,
        extraConfig,
    )
    
}
