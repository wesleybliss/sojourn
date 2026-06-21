-- Drops redundant BTree indexes that cannot speed up ILIKE '%term%' searches.
-- ILIKE with a leading wildcard requires the GIN trigram indexes (added in
-- 20260618153228_postgres-init). The BTree versions are write amplification
-- without a matching read benefit, so we drop them.

DROP INDEX IF EXISTS "idx_geonames_name";
DROP INDEX IF EXISTS "idx_geonames_ascii_name";
-- idx_geonames_alternate_names was created in a prior migration but is not
-- declared in the current schema (alternate names can exceed btree page size);
-- dropping it is safe and is consistent with the schema.
DROP INDEX IF EXISTS "idx_geonames_alternate_names";

-- Partial composite index for the searchCitiesGIN query:
--   WHERE featureClass IN ('A','P')
--     AND countryCode = $1
--     AND population >= $2
--     AND (name ILIKE '%q%' OR asciiName ILIKE '%q%' OR alternateNames ILIKE '%q%')
--   ORDER BY name <-> q
--   LIMIT 10;
--
-- Partial index skips the featureClass filter at runtime (A,P are the dominant
-- classes). Leading column countryCode is selective when the filter is set
-- (the common case for CreatePlaceDialog, since countryCode is typically
-- constrained by the user's current selection). Population as the second
-- column supports the population >= $2 range filter; with DESC ordering it
-- would also feed ORDER BY population DESC, but we omit DESC for simplicity
-- since LIMIT 10 keeps the sort cost trivial.

CREATE INDEX IF NOT EXISTS "idx_geonames_search_partial"
    ON "geonamesCities" ("countryCode", "population")
    WHERE "featureClass" IN ('A', 'P');
