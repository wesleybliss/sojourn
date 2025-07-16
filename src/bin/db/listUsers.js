import 'dotenv/config'
import turso from '../../db2/index.js'

const main = async () => {
    
    const users = await turso.execute('SELECT * FROM users')
    
    console.table(users)
    
}

main()
    .then(() => process.exit(0))
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
