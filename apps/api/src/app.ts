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
app.use('/api/auth', routes.auth)
app.use('/api/debug', routes.debug)
app.use('/api/trips', routes.trips)
app.use('/api/trips/:tripId/plans', routes.plans)
app.use('/api/trips/:tripId/plans/:planId/segments', routes.segments)
app.use('/api/places', routes.places)
app.use('/api/cities', routes.geonamesCities)
app.use('/api/utils', routes.utilities)

export default app
