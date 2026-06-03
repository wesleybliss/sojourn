import dotenv from 'dotenv'
import path from 'path'

// Needed for Node based apps, since the default only loads VITE_ prefixed vars
dotenv.config({
    path: path.resolve(process.cwd(), '../../.env'),
    debug: false,
})
