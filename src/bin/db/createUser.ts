import 'dotenv/config'
import path from 'node:path'
import db from '@/db/index'
import * as schemas from '@/db/schema'
import { hashPassword } from '@/utils'

const args = process.argv.slice(2)
const [email, password] = args

const script = path.basename(process.argv[0])
const usage = `USAGE: ${script} <email> <password>`

const main = async () => {
    
    if (!email?.length || !email.includes('@'))
        throw new Error('Invalid email')
    
    if (password?.length < 8)
        throw new Error('Invalid password')
    
    const data = {
        email,
        password: await hashPassword(password),
    }
    
    const user = await db
        .insert(schemas.users)
        .values(data)
    
    console.table(data)
    console.table(user)
    
}

main()
    .then(() => process.exit(0))
    .catch(e => {
        console.log({ args, email, password })
        console.log(usage)
        console.error(e)
        process.exit(1)
    })
