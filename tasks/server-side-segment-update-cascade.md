# Task

This project helps manage trip planning. Each trip has multiple plans, which can be thought of as versions of the trip. Each plan has multiple segments, which include the location (e.g. "Madrid, Spain"), the start date, and the end date, among other data.

Segments are sorted by their start and end dates, and typically start on the previous segment's end date. For example, I may fly to Madrid, Spain on January 1st, 2020, stay for 4 days, and then fly to London, England on January 5th, 2020 and stay until January 10th, 2020.

On the frontend, I have an option to "cascade" segment updates. Note that this is a cascade in a user sense - not a database cascade. For example, if I update the start date of a segment, I want the end date to be updated as well, along with all following segments' dates.

I have an old file at `backups/TripViewModelOld.js` that had an `updateSegment` method that would cascade updates. You can use this as a reference. Keep in mind, this old file worked with the client-side Dexie database, and is no longer relevant. The updated project now uses Turso with Drizzle ORM.

# Steps

1. Implement a similar cascade update method in the `src/app/api/segments/[id]/route.js` API route, if `cascadeEnabled` is `true`.
2. Make sure to do it in a transaction.
3. Ask for clarity if needed.
