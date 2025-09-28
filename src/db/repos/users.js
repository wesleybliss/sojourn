import Repository from '@/db/repos/repo'
import * as schemas from '@/db/schema'

export class UsersRepository extends Repository {
    
    constructor() {
        
        super('user', 'users', schemas.users)
        
    }
    
    tx(transaction) {
        
        return new UsersRepository(this.name, this.plural, this.schema, transaction)
        
    }
    
    async findOneByEmail(email) {
        
        return super.findOneBy('email', email)
        
    }
    
}

export default new UsersRepository()
