import { sql } from 'drizzle-orm'
import {
    sqliteTable,
    integer,
} from 'drizzle-orm/sqlite-core'

// Creates a default timestamp field
export const ts = name => integer(name, { mode: 'timestamp' })
    .default(sql`(unixepoch())`).notNull()

export const timestamps = {
    updatedAt: ts('updatedAt'),
    createdAt: ts('createdAt'),
    // deletedAt: timestamp(),
}

export const table = (name, props) => {
    
    if (!name?.length)
        throw new Error('Table name required')
    
    if (!Object.keys(props).length)
        throw new Error('Table properties required')
    
    const fields = {}
    
    if (props?.id === false)
        delete props.id
    else
        fields.id = integer('id').primaryKey({ autoIncrement: true })
    
    return sqliteTable(name, {
        ...fields,
        ...timestamps,
        ...props,
    })
    
}

export const lower = text => sql`lower(${text})`

export const optsCascadeAll = {
    onUpdate: 'cascade',
    onDelete: 'cascade',
}
