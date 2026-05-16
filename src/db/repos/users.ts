import Repository from '@/db/repos/repo'
import * as schemas from '@/db/schema'

export class UsersRepository extends Repository<typeof schemas.users, typeof db> {
    
    constructor() {
        
        super('user', 'users', schemas.users)
        
    }
    
    tx(transaction: TDatabase) {
        
        return new UsersRepository(this.name, this.plural, this.schema, transaction)
        
    }
    
    async findOneByEmail(email) {
        
        return super.findOneBy('email', email)
        
    }
    
}

export default new UsersRepository()
