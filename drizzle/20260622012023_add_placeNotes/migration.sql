CREATE TABLE "placeNotes" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "placeNotes_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"placeId" integer NOT NULL,
	"name" text NOT NULL,
	"content" text NOT NULL
);
--> statement-breakpoint
CREATE INDEX "placeNotes_placeId_updatedAt_idx" ON "placeNotes" ("placeId","updatedAt" DESC NULLS LAST);--> statement-breakpoint
ALTER TABLE "placeNotes" ADD CONSTRAINT "placeNotes_placeId_places_id_fkey" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE CASCADE ON UPDATE CASCADE;