import plansRepo from '@repo/shared/db/repos/plans';
import tripsRepo from '@repo/shared/db/repos/trips';
import { Plan, Segment, Trip } from '@repo/shared/types';
import { apiResponse } from '@repo/shared/utils/api';
import { AuthContext, isUserTripMember, withAuth } from '@repo/shared/utils/auth';
import tripsWithPlansSchema from '@repo/shared/utils/json-schemas/trip-backup.jsonschema';
import Ajv from 'ajv';
import dayjs from 'dayjs';
const ajvDebug = true;
const dateToString = (date, name = '') => {
    const val = dayjs(date).format();
    if (name)
        console.log('dateToString', name, date, val);
    return val;
};
const transformSegment = (seg) => ({
    id: String(seg.id),
    name: seg.name,
    color: seg.color,
    coords: {
        lat: seg.coordsLat === null ? null : Number(seg.coordsLat),
        lng: seg.coordsLng === null ? null : Number(seg.coordsLng),
    },
    tripId: String(seg.tripId),
    planId: seg.planId ? String(seg.planId) : undefined,
    createdAt: dateToString(seg.createdAt, 'seg/createdAt'),
    updatedAt: dateToString(seg.updatedAt, 'seg/updatedAt'),
    startDate: dateToString(seg.startDate, 'seg/startDate'),
    endDate: dateToString(seg.endDate, 'seg/endDate'),
    stayBooked: Boolean(seg.stayBooked),
    flightBooked: Boolean(seg.flightBooked),
    description: seg.description || '',
});
const transformPlan = (plan) => ({
    id: plan.id ? String(plan.id) : undefined,
    name: plan.name,
    tripId: plan.tripId ? String(plan.tripId) : undefined,
    createdAt: dateToString(plan.createdAt, 'plan/createdAt'),
    updatedAt: dateToString(plan.updatedAt, 'plan/updatedAt'),
    segments: Array.isArray(plan.segments) ? plan.segments.map(transformSegment) : [],
});
const transformTrip = (trip) => ({
    id: String(trip.id),
    createdAt: dateToString(trip.createdAt, 'trip/createdAt'),
    updatedAt: dateToString(trip.updatedAt, 'trip/updatedAt'),
    name: trip.name,
    description: trip.description || '',
    coverImageUrl: trip.coverImageUrl || null,
    plans: Array.isArray(trip.plans) ? trip.plans.map(transformPlan) : [],
    segments: Array.isArray(trip.segments) ? trip.segments.map(transformSegment) : [],
});
export const backupTrips = withAuth(async (req, res, context) => {
    try {
        const { userId } = context;
        const body = req.body;
        const ajvProps = ajvDebug ? { allErrors: true, verbose: true } : {};
        const ajv = new Ajv(ajvProps);
        const validate = ajv.compile(tripsWithPlansSchema);
        let trips = [];
        if (body?.type === 'single') {
            const tripId = parseInt(body.tripId, 10);
            if (!tripId)
                return apiResponse.invalidParams(res, 'tripId required for single backup');
            const isMember = await isUserTripMember(context, tripId);
            if (!isMember)
                return apiResponse.forbidden(res);
            const trip = await tripsRepo.findOneWithDetails(Number(tripId), plansRepo);
            if (!trip)
                return apiResponse.notFound(res, 'Trip not found');
            trips = [transformTrip(trip)];
        }
        else {
            // multiple
            const requestedIds = Array.isArray(body?.tripIds)
                ? body.tripIds.map((id) => Number(id))
                : null;
            const userTrips = await tripsRepo.findAllByUserId(userId);
            const filtered = requestedIds
                ? userTrips.filter(t => requestedIds.includes(Number(t.id)))
                : userTrips;
            const detailsPromises = filtered.map(t => (tripsRepo.findOneWithDetails(Number(t.id), plansRepo)));
            const details = await Promise.all(detailsPromises);
            trips = details.filter(Boolean).map(t => transformTrip(t));
        }
        const data = { type: 'multiple', trips };
        const valid = validate(data);
        const currentYear = new Date().getFullYear().toString();
        if (!valid || !data.trips[0].plans[0].segments[0].startDate.startsWith(currentYear))
            return apiResponse.fail(res, 'Validation failed', 400, {
                data: {
                    details: validate.errors,
                },
            });
        const fileName = `trips-backup-${new Date().toISOString().replace(/[:.]/g, '-')}on`;
        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
        return res.json(data);
    }
    catch (e) {
        console.error('Error creating backup:', e);
        return apiResponse.internalServerError(res);
    }
});
//# sourceMappingURL=backupTrips.js.map