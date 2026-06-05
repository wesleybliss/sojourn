import Repository from '@repo/shared/db/repos/repo'
import * as schemas from '@repo/shared/db/schema'
import type { Database, User, UserSelect } from '@shared/types/database.types'

export abstract class AUsersRepository extends Repository<User, typeof schemas.users> {
    abstract findOneByEmail(_email: string): Promise<UserSelect | null>
}

export class UsersRepository extends AUsersRepository {
    
    constructor(db?: Database) {
        
        super('user', 'users', schemas.users, db)
        
    }
    
    tx(transaction: Database) {
        
        return new UsersRepository(transaction)
        
    }
    
    async findOneByEmail(email: string): Promise<UserSelect | null> {
        
        return super.findOneBy('email', email)
        
    }
    
}

export default new UsersRepository()
