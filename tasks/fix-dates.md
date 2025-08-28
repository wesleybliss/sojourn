# Problem

The project was previously relying on dates represented as seconds, but after migrating to Turso and Drizzle, dates are now represented as milliseconds.

# Solution

Migrate all components to account for this. Specifically, the GanttChart and SegmentListItem components are known to have issues, but there may be others.

Remember to not change any files in `src/components/ui` since those are managed by Shadcn UI library.
