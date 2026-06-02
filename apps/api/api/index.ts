import 'express-async-errors'

import compression from 'compression'
import cors from 'cors'
import type { NextFunction,Request, Response } from 'express'
import express from 'express'

import { createUser } from '#handlers/auth/createUser'
import { getUser } from '#handlers/auth/getUser'
import { clearAll } from '#handlers/debug/clearAll'
import { uploadBlob } from '#handlers/debug/storage/uploadBlob'
import { createPlace } from '#handlers/places/createPlace'
import { getPlace } from '#handlers/places/getPlace'
import { getPlaces } from '#handlers/places/getPlaces'
import { updatePlace } from '#handlers/places/updatePlace'
import { clonePlan } from '#handlers/plans/clonePlan'
import { deletePlan } from '#handlers/plans/deletePlan'
import { getPlan } from '#handlers/plans/getPlan'
import { updatePlan } from '#handlers/plans/updatePlan'
import { createSegment } from '#handlers/segments/createSegment'
import { deleteSegment } from '#handlers/segments/deleteSegment'
import { getSegments } from '#handlers/segments/getSegments'
import { updateSegment } from '#handlers/segments/updateSegment'
import { backupTrips } from '#handlers/trips/backupTrips'
import { getTrip } from '#handlers/trips/getTrip'
import { getTrips } from '#handlers/trips/getTrips'
import { inviteTripMember } from '#handlers/trips/inviteTripMember'
import { restoreTrips } from '#handlers/trips/restoreTrips'
import { getRandomPhoto } from '#handlers/utils/getRandomPhoto'

const app = express()

app.use(cors({
    origin: [
        'http://localhost:4000',
        'https://sojourn-app.vercel.app',
    ],
    credentials: true,
}))
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('trust proxy', true)

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    
    console.error(err)
    
    res.status(500).json({
        error: 'Internal Server Error',
    })
    
})

app.get('/auth', getUser)
app.post('/auth', createUser)

app.post('/debug/clear-all', clearAll)
app.post('/debug/storage/blob', uploadBlob)

app.get('/trips', getTrips)
app.post('/trips/backup', backupTrips)
app.post('/trips/restore', restoreTrips)
app.post('/trips/:id/invite', inviteTripMember)
app.get('/trips/:id', getTrip)

app.get('/plans/:id', getPlan)
app.put('/plans/:id', updatePlan)
app.post('/plans/:id/clone', clonePlan)
app.delete('/plans/:id', deletePlan)

app.get('/segments', getSegments)
app.post('/segments', createSegment)
app.put('/segments/:id', updateSegment)
app.delete('/segments', deleteSegment) // @todo bad url

app.get('/places', getPlaces)
app.get('/places/:id', getPlace)
app.post('/places', createPlace)
app.put('/places/:id', updatePlace)

app.get('/utils/random-photo', getRandomPhoto)

export default app
