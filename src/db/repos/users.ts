import database from '@/db'
import Repository from '@/db/repos/repo'
import * as schemas from '@/db/schema'

export class UsersRepository extends Repository<typeof schemas.users> {
    
    constructor(db?: typeof database) {
        
        super('user', 'users', schemas.users, db)
        
    }
    
    tx(transaction: typeof database) {
        
        return new UsersRepository(transaction)
        
    }
    
    async findOneByEmail(email: string) {
        
        return super.findOneBy('email', email)
        
    }
    
}

export default new UsersRepository()
