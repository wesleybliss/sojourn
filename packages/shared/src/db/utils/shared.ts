import dayjs from 'dayjs'
import type { AnyColumn, ColumnBuilderBase, SQL } from 'drizzle-orm'
import { sql } from 'drizzle-orm'
import { timestamp } from 'drizzle-orm/pg-core'
import { AnyPgColumnBuilder } from 'drizzle-orm/pg-core/columns/common'
import { customType } from 'drizzle-orm/sqlite-core'

//region Types

export type PostgresValidColumns<T> = {
    [K in keyof T]:
    K extends 'id'
        ? T[K] extends AnyPgColumnBuilder | false | undefined
            ? T[K]
            : never
        : T[K] extends AnyPgColumnBuilder
            ? T[K]
            : never
}

export type SqliteValidColumns<T> = {
    [K in keyof T]:
    K extends 'id'
        ? T[K] extends ColumnBuilderBase | false | undefined
            ? T[K]
            : never
        : T[K] extends ColumnBuilderBase
            ? T[K]
            : never
}

//endregion Types

//region Helpers

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

export const timestampPostgres = (name: string) =>
    timestamp(name, { withTimezone: true })

export const lower = (value: string | AnyColumn | SQL) =>
    sql`lower(${value})`

export const updateSqliteTimestampTrigger = (tableName: string) => {
    
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

//endregion Helpers
