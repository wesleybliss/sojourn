import compression from 'compression'
import cors from 'cors'
import express from 'express'

import * as middleware from '@/middleware'
import * as routes from '@/routes'

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

app.use(middleware.logger)
app.use(middleware.globalErrorHandler)

app.set('trust proxy', true)

app.use('/api', routes.public)
app.use('/api', routes.protected)

export default app
