
export const coordsSchema = {
    type: 'object',
    properties: {
        lat: { type: 'number' },
        lng: { type: 'number' },
    },
    required: ['lat', 'lng'],
    additionalProperties: true,
}

export const segmentSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        color: { type: 'string' },
        owner: { type: 'string' },
        coords: coordsSchema,
        tripId: { type: 'string' },
        planId: { type: 'string' },
        realmId: { type: 'string' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
        startDate: { type: 'string' },
        endDate: { type: 'string' },
        stayBooked: { type: 'boolean' },
        flightBooked: { type: 'boolean' },
        description: { type: 'string' },
    },
    additionalProperties: true,
}

export const planSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        owner: { type: 'string' },
        tripId: { type: 'string' },
        realmId: { type: 'string' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
        segments: { type: 'array', items: segmentSchema },
    },
    additionalProperties: true,
}

export const tripSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        owner: { type: 'string' },
        realmId: { type: 'string' },
        description: { type: 'string' },
        coverImageUrl: { type: 'string' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
        startDate: { type: 'string' },
        endDate: { type: 'string' },
        segments: { type: 'array', items: segmentSchema },
        plans: { type: 'array', items: planSchema },
    },
    additionalProperties: true,
}

export const tripsWithPlansSchema = {
    $id: 'trip-backup.jsonschema',
    type: 'object',
    properties: {
        type: { type: 'string' },
        trips: { type: 'array', items: tripSchema },
    },
    required: ['type', 'trips'],
    additionalProperties: true,
}

export default tripsWithPlansSchema
