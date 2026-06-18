CREATE TABLE IF NOT EXISTS "geonamesCities" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (
        sequence name "geonamesCities_id_seq"
        INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1
    ),
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"name" varchar(200),
	"asciiName" varchar(200),
	"alternateNames" text,
	"latitude" real,
	"longitude" real,
	"featureClass" varchar(1),
	"featureCode" varchar(10),
	"countryCode" varchar(2),
	"population" integer,
	"timezone" varchar(40)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "places" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (
        sequence name "places_id_seq"
        INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1
    ),
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"teamId" integer,
	"geonamesCityId" integer,
	"name" text NOT NULL,
	"coverImageUrl" text,
	"focus" text,
	"quickTip" text,
	"personalNotes" text,
	"region" text,
	"travelWindow" text,
	"isBookmarked" boolean DEFAULT false NOT NULL,
	"coordsLat" real,
	"coordsLng" real
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "plans" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (
        sequence name "plans_id_seq"
        INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1
    ),
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"tripId" integer NOT NULL,
	"name" text NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "segments" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (
        sequence name "segments_id_seq"
        INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1
    ),
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"tripId" integer NOT NULL,
	"planId" integer NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"startDate" timestamp with time zone NOT NULL,
	"endDate" timestamp with time zone NOT NULL,
	"coordsLat" real,
	"coordsLng" real,
	"color" text NOT NULL,
	"flightBooked" boolean DEFAULT false NOT NULL,
	"stayBooked" boolean DEFAULT false NOT NULL,
	"isShengenRegion" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "teams" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (
        sequence name "teams_id_seq"
        INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1
    ),
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "trips" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (
        sequence name "trips_id_seq"
        INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1
    ),
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"teamId" integer NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"coverImageUrl" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "userTeams" (
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"userId" integer,
	"teamId" integer,
	CONSTRAINT "userTeams_pkey" PRIMARY KEY("userId","teamId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (
        sequence name "users_id_seq"
        INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1
    ),
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"email" text NOT NULL,
	"firebaseUid" text,
	"enabled" boolean DEFAULT false,
	"name" text,
	"photoUrl" text
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_geonames_name" ON "geonamesCities" ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_geonames_ascii_name" ON "geonamesCities" ("asciiName");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_geonames_country_code" ON "geonamesCities" ("countryCode");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_geonames_population" ON "geonamesCities" ("population");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_geonames_alternate_names" ON "geonamesCities" ("alternateNames");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_country_population" ON "geonamesCities" ("countryCode","population");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "emailUniqueIndex" ON "users" (lower("email"));--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "firebaseUidUniqueIndex" ON "users" ("firebaseUid");--> statement-breakpoint

DO $$
BEGIN
    ALTER TABLE "places"
        ADD CONSTRAINT "places_teamId_teams_id_fkey"
            FOREIGN KEY ("teamId")
                REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN 
        -- Any constraint already exists, do nothing
        NULL;
END $$;--> statement-breakpoint

DO $$
BEGIN
    ALTER TABLE "places"
        ADD CONSTRAINT "places_geonamesCityId_geonamesCities_id_fkey"
            FOREIGN KEY ("geonamesCityId")
                REFERENCES "geonamesCities"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    EXCEPTION
    WHEN duplicate_object THEN 
        -- Any constraint already exists, do nothing
        NULL;
END $$;--> statement-breakpoint

DO $$
BEGIN
    ALTER TABLE "plans"
        ADD CONSTRAINT "plans_tripId_trips_id_fkey"
            FOREIGN KEY ("tripId")
                REFERENCES "trips"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    EXCEPTION
    WHEN duplicate_object THEN 
        -- Any constraint already exists, do nothing
        NULL;
END $$;--> statement-breakpoint

DO $$
BEGIN
    ALTER TABLE "segments"
        ADD CONSTRAINT "segments_tripId_trips_id_fkey"
            FOREIGN KEY ("tripId")
                REFERENCES "trips"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    EXCEPTION
    WHEN duplicate_object THEN 
        -- Any constraint already exists, do nothing
        NULL;
END $$;--> statement-breakpoint

DO $$
BEGIN
    ALTER TABLE "segments"
        ADD CONSTRAINT "segments_planId_plans_id_fkey"
            FOREIGN KEY ("planId")
                REFERENCES "plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    EXCEPTION
    WHEN duplicate_object THEN 
        -- Any constraint already exists, do nothing
        NULL;
END $$;--> statement-breakpoint

DO $$
BEGIN
    ALTER TABLE "trips"
        ADD CONSTRAINT "trips_teamId_teams_id_fkey"
            FOREIGN KEY ("teamId")
                REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    EXCEPTION
    WHEN duplicate_object THEN 
        -- Any constraint already exists, do nothing
        NULL;
END $$;--> statement-breakpoint

DO $$
BEGIN
    ALTER TABLE "userTeams"
        ADD CONSTRAINT "userTeams_userId_users_id_fkey"
            FOREIGN KEY ("userId")
                REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    EXCEPTION
    WHEN duplicate_object THEN 
        -- Any constraint already exists, do nothing
        NULL;
END $$;--> statement-breakpoint

DO $$
BEGIN
    ALTER TABLE "userTeams"
        ADD CONSTRAINT "userTeams_teamId_teams_id_fkey"
            FOREIGN KEY ("teamId")
                REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN 
        -- Any constraint already exists, do nothing
        NULL;
END $$;
