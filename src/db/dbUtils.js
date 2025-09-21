import { sql } from 'drizzle-orm'
import { sqliteTable, integer, customType } from 'drizzle-orm/sqlite-core'
import dayjs from 'dayjs'

export const timestampSeconds = name => customType({
    dataType() {
        return 'integer'
    },
    toDriver(value) {
        
        // console.log('toDriver input:', value, (value instanceof Date) ? 'date' : typeof value)
        const seconds = dayjs(value).unix()
        
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
    fromDriver(value) {
        
        // console.log('fromDriver input:', value, (value instanceof Date) ? 'date' : typeof value)
        const date = dayjs.unix(value).toDate()
        
        // console.log('fromDriver output:', date)
        
        return date
        
    },
})(name)

// Creates a default timestamp field
export const ts = name => timestampSeconds(name)
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

const lendbg = v => `lendbg: ${'1767502800'.length} vs ${v.toString().length}`
