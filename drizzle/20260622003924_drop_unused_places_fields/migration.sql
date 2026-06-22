DROP INDEX IF EXISTS "idx_geonames_name";--> statement-breakpoint
DROP INDEX IF EXISTS "idx_geonames_ascii_name";--> statement-breakpoint
DROP INDEX IF EXISTS "idx_geonames_alternate_names";--> statement-breakpoint
ALTER TABLE "geonamesCities" ADD COLUMN "geonameId" integer;--> statement-breakpoint
ALTER TABLE "places" DROP COLUMN "region";--> statement-breakpoint
ALTER TABLE "places" DROP COLUMN "travelWindow";--> statement-breakpoint
ALTER TABLE "places" DROP COLUMN "coordsLat";--> statement-breakpoint
ALTER TABLE "places" DROP COLUMN "coordsLng";--> statement-breakpoint
ALTER TABLE "geonamesCities" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "geonamesCities" ALTER COLUMN "asciiName" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "geonamesCities" ALTER COLUMN "latitude" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "geonamesCities" ALTER COLUMN "longitude" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "geonamesCities" ALTER COLUMN "featureClass" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "geonamesCities" ALTER COLUMN "population" SET DATA TYPE bigint USING "population"::bigint;--> statement-breakpoint
ALTER TABLE "geonamesCities" ALTER COLUMN "population" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "places" ALTER COLUMN "teamId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "places" ALTER COLUMN "geonamesCityId" SET NOT NULL;--> statement-breakpoint
CREATE INDEX "idx_geonames_search_partial" ON "geonamesCities" ("countryCode","population") WHERE "featureClass" IN ('A', 'P');--> statement-breakpoint
CREATE UNIQUE INDEX "places_teamId_geonamesCityId_idx" ON "places" ("teamId","geonamesCityId");
