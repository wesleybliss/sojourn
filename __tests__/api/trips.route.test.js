import { GET } from '@/app/api/trips/route'
import * as server from '@/lib/api/serverFunctions'

describe('/api/trips route', () => {
    it('returns status 200 and data on success', async () => {
        const fakeData = [{ id: 1 }, { id: 2 }]
        jest.spyOn(server, 'getTrips').mockResolvedValue({ success: true, data: fakeData })
        const res = await GET()
        expect(res.status).toBe(200)
        const json = await res.json()
        expect(json).toEqual(fakeData)
    })

    it('returns status 500 on error', async () => {
        jest.spyOn(server, 'getTrips').mockResolvedValue({ success: false, error: 'oops' })
        const res = await GET()
        expect(res.status).toBe(500)
        const json = await res.json()
        expect(json).toEqual({ error: 'oops' })
    })
})
