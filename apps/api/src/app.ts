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

app.use('/api', routes.unauthenticated)
app.use('/api', routes.auth)
app.use('/api', routes.debug)
app.use('/api', routes.trips)
app.use('/api', routes.plans)
app.use('/api', routes.segments)
app.use('/api', routes.places)
app.use('/api', routes.utilities)

export default app
