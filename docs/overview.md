# Sojourn: Slow Travel Companion

Sojourn is a tool designed for travelers who embrace the "slow travel" lifestyle—journeys that span multiple locations, continents, and varying lengths of stay, focusing on immersion and flexibility rather than rushed vacations.

## What You Can Do

### Organize Your Journeys
- Create separate trips for each adventure, giving each a unique name and cover image.
- Keep all your travel plans in one place, easily accessible and editable.

### Plan Your Itinerary in Detail
- Break each trip into segments: flights, train rides, hotel stays, tours, and activities.
- Set exact start and end times for every segment to build a realistic schedule.
- Develop multiple plan variations (like "Plan A" and "Plan B") to compare options before deciding.

### Visualize Your Travel Flow
- Use an interactive Gantt chart to see how your segments overlap, their durations, and the sequence of events.
- View your trip stops on a map to understand geographic flow and distances between locations.

### Stay on Top of Important Details
- Mark which flights and accommodations are booked, pending, or tentative.
- Automatically track days spent in the Schengen Zone to help you comply with visa regulations.
- Generate AI-powered summaries of your trip for quick reference or sharing.

### Collaborate (Coming Soon)
- Infrastructure is in place to invite travel companions to view and edit trips together.
- A simplified viewer mode is planned for sharing itineraries with friends and family.

## Who This Is For
Sojourn is ideal for digital nomads, long-term travelers, gap-year adventurers, and anyone who prefers to linger in places, move at their own pace, and deeply experience the destinations they visit. It transforms the complexity of multi-leg, multi-month travel into a clear, manageable, and visual plan.

## Application Design
- Users can sign in & create trips.
- Each trip can have multiple plans.
- Each plan contains multiple segments, which are portions of the overall trip.

Each segment has the following details:
- the city and country
- start and end dates
- a user-assigned color for quick visual reference
- the total days count of that segment
- the total cumulative days count of all segments up to and including that segment
- if the flight has been booked
- if the hotel has been booked
- whether the trip is in the shengen zone
- an indicator of if the segment is pending (flight or hotel not booked yet), planned (flight and hotel booked, but segment date is in the future), or completed (planned & segment dates have passed)

- Users can create, edit, and delete segments, and also reorder them
- Additionally, a Gantt chart is available to visualize the segments and their overlaps
- A dedicated page for "places" where users can add places want to save, along with tips and notes for each place

Sojourn helps you focus on the journey, not just the logistics.
