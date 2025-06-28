
/**
 * Creates an object where keys are table names and values are arrays
 * of normalized field names for that table.
 *
 * @param {Object.<string, string[]>} schemas An object where keys are table names
 *   and values are arrays of schema field definitions (e.g., ['&name', 'tripId -> trips.id']).
 * @returns {Object.<string, string[]>} An object with table names as keys and
 *   arrays of normalized field names as values.
 */
export const deriveTableFields = schemas => {
    
    const tableFields = {}
    
    for (const tableName in schemas) {
        
        if (Object.prototype.hasOwnProperty.call(schemas, tableName)) {
            
            const fieldDefinitions = schemas[tableName]
            const normalizedFields = []
            
            for (const fieldDef of fieldDefinitions) {
                
                let fieldName = fieldDef
                
                // 1. Remove '&' for unique keys
                if (fieldName.startsWith('&'))
                    fieldName = fieldName.substring(1)
                
                // 2. Handle '-> table.id' for foreign keys
                // This regex matches " -> " followed by any characters until the end of the string.
                const relationMatch = fieldName.match(/ -> .*$/)
                
                if (relationMatch)
                    fieldName = fieldName.substring(0, relationMatch.index).trim()
                
                // 3. Handle dot notation (e.g., 'coords.lat' -> 'coords.lat')
                // No change needed for the *field name itself* if you want to keep 'coords.lat'
                // as the field name. If you only want 'coords', you'd need another step.
                // Based on your example, 'coords.lat' should remain 'coords.lat'.
                
                normalizedFields.push(fieldName)
                
            }
            
            tableFields[tableName] = normalizedFields
            
        }
        
    }
    
    return tableFields
    
}

export const getPlainRecord = (record, schemaFields) => {
    
    const fields = [
        'id',
        'createdAt',
        'updatedAt',
        ...schemaFields,
    ]
    
    return Object.keys(record).reduce((acc, it) => {
        
        if (fields.includes(it))
            acc[it] = record[it]
        
        return acc
        
    }, {})
    
}

export const cloneRecord = (record, schemaFields, omitId = true) => {
    
    const data = getPlainRecord(record, schemaFields)
    
    if (omitId)
        delete data.id
    
    return data
    
}
