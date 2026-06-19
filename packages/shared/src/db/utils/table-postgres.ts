import { ColumnBuilderBase } from 'drizzle-orm'
import {
    PgBuildColumns,
    PgTableExtraConfigValue,
    PgTableWithColumns,
    timestamp,
    UpdateDeleteAction,
} from 'drizzle-orm/pg-core'
import { integer, pgTable } from 'drizzle-orm/pg-core'
import { AnyPgColumnBuilder, PgBuildExtraConfigColumns } from 'drizzle-orm/pg-core/columns/common'

export const postgresIdColumn = () =>
    integer('id').generatedAlwaysAsIdentity().primaryKey()

export type PostgresIdColumn = ReturnType<typeof postgresIdColumn>

export type WithPostgresId<
    T extends Record<string, ColumnBuilderBase>,
    THasId extends boolean,
> = THasId extends true
    ? T & { id: PostgresIdColumn }
    : T

export const postgresTimestamp = (name: string) =>
    timestamp(name, { withTimezone: true })

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

/**
 * Creates a Postgres table with automatic `id`, `createdAt`, and `updatedAt` columns.
 *
 * Overload 1 — default: adds `id: PostgresIdColumn`, `createdAt`, `updatedAt`.
 * Overload 2 — `id: false`: adds only `createdAt`, `updatedAt` (no auto id).
 */

export function createTablePostgres<
    TTableName extends string,
    TColumnsMap extends Record<string, AnyPgColumnBuilder>,
>(
    name: TTableName,
    columns: TColumnsMap,
    extraConfig?: (
        _self: PgBuildExtraConfigColumns<
            TColumnsMap & { id: PostgresIdColumn } & typeof postgresTimestamps
        >,
    ) => PgTableExtraConfigValue[],
): PgTableWithColumns<{
    name: TTableName
    schema: undefined
    columns: PgBuildColumns<
        TTableName,
        TColumnsMap & { id: PostgresIdColumn } & typeof postgresTimestamps
    >
    dialect: 'pg'
}>

// @ts-expect-error TS2394 — generic overload compatibility
// eslint-disable-next-line no-redeclare
export function createTablePostgres<
    TTableName extends string,
    TColumnsMap extends Record<string, AnyPgColumnBuilder | false>,
>(
    name: TTableName,
    columns: TColumnsMap & { id: false },
    extraConfig?: (
        _self: PgBuildExtraConfigColumns<Record<string, AnyPgColumnBuilder>>,
    ) => PgTableExtraConfigValue[],
): PgTableWithColumns<{
    name: TTableName
    schema: undefined
    columns: PgBuildColumns<
        TTableName,
        {
            [K in keyof TColumnsMap as
            TColumnsMap[K] extends AnyPgColumnBuilder ? K : never
            ]: TColumnsMap[K] & AnyPgColumnBuilder
        } & typeof postgresTimestamps
    >
    dialect: 'pg'
}>

// eslint-disable-next-line no-redeclare
export function createTablePostgres(
    name: string,
    columns: Record<string, AnyPgColumnBuilder | false>,
    extraConfig?: (
        _self: PgBuildExtraConfigColumns<
            Record<string, AnyPgColumnBuilder>
        >,
    ) => PgTableExtraConfigValue[],
) {
    
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
