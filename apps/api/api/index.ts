import compression from 'compression'
import cors from 'cors'
import type { NextFunction, Request, Response } from 'express'
import express from 'express'

import router from '@/routes'

const app = express()

app.use(cors({
    origin: [
        'http://localhost:3001',
        'https://sojourn-app.vercel.app',
    ],
    credentials: true,
}))
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('trust proxy', true)

app.use((req: Request, _res: Response, next: NextFunction) => {
    
    console.log(req.method, req.originalUrl)
    next()
    
})

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    
    console.error(err)
    
    res.status(500).json({
        error: 'Internal Server Error',
    })
    
})

app.use('/api', router)

const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

export default app
