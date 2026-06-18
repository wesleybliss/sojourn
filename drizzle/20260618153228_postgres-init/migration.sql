-- Enables trigrams & GIN indexes

CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX idx_geonames_name_gin
    ON "geonamesCities"
    USING GIN ("name" gin_trgm_ops);

CREATE INDEX idx_geonames_ascii_name_gin
    ON "geonamesCities"
    USING GIN ("asciiName" gin_trgm_ops);

CREATE INDEX idx_geonames_alternate_names_gin
    ON "geonamesCities"
    USING GIN ("alternateNames" gin_trgm_ops);
