
class Repository {
    
    constructor(table) {
        
        this.table = table
        
    }
    
    async create(data) {
        
        const id = data.id || crypto.randomUUID() // Use provided ID or generate
        const now = new Date().toISOString()
        const record = {
            ...data,
            id,
            createdAt: now,
            updatedAt: now,
        }
        
        return await this.table.add(record)
        
    }
    
    async getById(id) {
        
        return this.table.get(id)
        
    }
    
    async getAll() {
        
        return this.table.toArray()
        
    }
    
    async findWhere(conditions) {
        
        return this.table.where(conditions).toArray()
        
    }
    
    async update(id, data) {
        
        const now = new Date().toISOString()
        const updates = { ...data, updatedAt: now }
        const affected = await this.table.update(id, updates)
        
        return affected > 0 ? this.getById(id) : null
        
    }
    
    async delete(id) {
        
        const record = await this.getById(id)
        
        if (record) {
            await this.table.delete(id)
            return true
        }
        
        return false
        
    }
    
    async deleteQuiet(id) {
        
        try {
            
            return await this.delete(id)
            
        } catch (e) {
            
            // NOOP
            
        }
        
    }
    
    async exists(id) {
        
        return !!(await this.getById(id))
        
    }
    
    async count() {
        
        return this.table.count()
        
    }
    
    async bulkCreate(records) {
        
        const now = new Date().toISOString()
        const formatted = records.map(record => ({
            ...record,
            id: record.id || crypto.randomUUID(),
            createdAt: now,
            updatedAt: now,
        }))
        
        await this.table.bulkAdd(formatted)
        
        return formatted
        
    }
    
    async clear() {
        
        await this.table.clear()
        
        return true
        
    }
    
    async paginate({ limit = 10, offset = 0 }) {
        
        return this.table.offset(offset).limit(limit).toArray()
        
    }
    
}

export default Repository
