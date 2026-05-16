import database from '@/db'
import Repository from '@/db/repos/repo'
import * as schemas from '@/db/schema'
import { UserSelect } from '@/types/database'

export interface IUsersRepository extends Repository<typeof schemas.users> {
    
    findOneByEmail(email: string): Promise<UserSelect | null>
    
}

export class UsersRepository extends Repository<typeof schemas.users> implements IUsersRepository {
    
    constructor(db?: typeof database) {
        
        super('user', 'users', schemas.users, db)
        
    }
    
    tx(transaction: typeof database) {
        
        return new UsersRepository(transaction)
        
    }
    
    async findOneByEmail(email: string): Promise<UserSelect | null> {
        
        return super.findOneBy('email', email)
        
    }
    
}

export default new UsersRepository()
