#!/usr/bin/env bash
# Import the perceptual_model dump into the public schema of the hydroprocess DB.
# Usage: ./import_perceptual.sh /absolute/path/to/perceptual_model_schema_20251203.bk
set -euo pipefail

DB_NAME="${DB_NAME:-hydroprocess}"
DUMP_PATH="${1:-}"

if [[ -z "$DUMP_PATH" ]]; then
  echo "Usage: $0 /path/to/perceptual_model_schema_20251203.bk" >&2
  exit 1
fi
if [[ ! -f "$DUMP_PATH" ]]; then
  echo "Dump file not found: $DUMP_PATH" >&2
  exit 1
fi

PG_CTN="$(docker-compose ps -q postgres)"
if [[ -z "$PG_CTN" ]]; then
  echo "Postgres container not running. Start it first (e.g., make up)." >&2
  exit 1
fi

DEST="/tmp/perceptual_model_schema_20251203.bk"
echo "Copying dump into container..."
docker cp "$DUMP_PATH" "$PG_CTN:$DEST"

echo "Dropping and recreating database $DB_NAME..."
docker-compose exec -T postgres psql -U postgres -c "DROP DATABASE IF EXISTS ${DB_NAME} WITH (FORCE);"
docker-compose exec -T postgres psql -U postgres -c "CREATE DATABASE ${DB_NAME};"
docker-compose exec -T postgres psql -U postgres -d "${DB_NAME}" -c "CREATE EXTENSION IF NOT EXISTS postgis;"

echo "Restoring dump into public schema..."
docker-compose exec -T postgres bash -lc "\
  awk '!/^\\\\restrict/ && !/^\\\\unrestrict/' $DEST \
  | sed -e 's/CREATE SCHEMA perceptual_model;/-- removed schema/' \
        -e 's/ALTER SCHEMA perceptual_model OWNER TO postgres;/-- removed schema owner/' \
        -e '/^SET .*transaction_timeout/d' \
        -e 's/perceptual_model\\./public./g' \
  | psql -U postgres -d ${DB_NAME} -v ON_ERROR_STOP=1 \
"

echo "Ensuring geometry column on locations..."
docker-compose exec -T postgres psql -U postgres -d "${DB_NAME}" -c "\
  CREATE EXTENSION IF NOT EXISTS postgis; \
  ALTER TABLE public.locations ADD COLUMN IF NOT EXISTS pt geometry(Point,4326); \
  CREATE INDEX IF NOT EXISTS idx_locations_pt ON public.locations USING GIST(pt); \
  UPDATE public.locations SET pt = ST_SetSRID(ST_MakePoint(lon, lat),4326) WHERE pt IS NULL AND lon IS NOT NULL AND lat IS NOT NULL; \
"

echo "Ensuring process_taxonomy.process_alt_name_id column..."
docker-compose exec -T postgres psql -U postgres -d "${DB_NAME}" -c "\
  ALTER TABLE public.process_taxonomy ADD COLUMN IF NOT EXISTS process_alt_name_id integer; \
"

echo "Applying foreign keys (idempotent)..."
docker-compose exec -T postgres bash -lc "\
psql -U postgres -d ${DB_NAME} <<'SQL'
DO \$\$
DECLARE
  r RECORD;
BEGIN
  FOR r IN
    SELECT *
    FROM (VALUES
      ('link_process_perceptual_entry_id_fkey',
       'ALTER TABLE public.link_process_perceptual ADD CONSTRAINT link_process_perceptual_entry_id_fkey FOREIGN KEY (entry_id) REFERENCES public.perceptual_model(id)'),
      ('link_process_perceptual_process_id_fkey',
       'ALTER TABLE public.link_process_perceptual ADD CONSTRAINT link_process_perceptual_process_id_fkey FOREIGN KEY (process_id) REFERENCES public.process_taxonomy(id)'),
      ('perceptual_model_citation_id_fkey',
       'ALTER TABLE public.perceptual_model ADD CONSTRAINT perceptual_model_citation_id_fkey FOREIGN KEY (citation_id) REFERENCES public.citations(id)'),
      ('perceptual_model_location_id_fkey',
       'ALTER TABLE public.perceptual_model ADD CONSTRAINT perceptual_model_location_id_fkey FOREIGN KEY (location_id) REFERENCES public.locations(id)'),
      ('perceptual_model_model_type_id_fkey',
       'ALTER TABLE public.perceptual_model ADD CONSTRAINT perceptual_model_model_type_id_fkey FOREIGN KEY (model_type_id) REFERENCES public.model_type(id)'),
      ('perceptual_model_spatialzone_id_fkey',
       'ALTER TABLE public.perceptual_model ADD CONSTRAINT perceptual_model_spatialzone_id_fkey FOREIGN KEY (spatialzone_id) REFERENCES public.spatial_zone_type(id)'),
      ('perceptual_model_temporalzone_id_fkey',
       'ALTER TABLE public.perceptual_model ADD CONSTRAINT perceptual_model_temporalzone_id_fkey FOREIGN KEY (temporalzone_id) REFERENCES public.temporal_zone_type(id)'),
      ('process_alt_names_process_id_fkey',
       'ALTER TABLE public.process_alt_names ADD CONSTRAINT process_alt_names_process_id_fkey FOREIGN KEY (process_id) REFERENCES public.process_taxonomy(id)'),
      ('process_taxonomy_function_id_fkey',
       'ALTER TABLE public.process_taxonomy ADD CONSTRAINT process_taxonomy_function_id_fkey FOREIGN KEY (function_id) REFERENCES public.function_type(id)'),
      ('process_taxonomy_process_alt_name_id_fkey',
       'ALTER TABLE public.process_taxonomy ADD CONSTRAINT process_taxonomy_process_alt_name_id_fkey FOREIGN KEY (process_alt_name_id) REFERENCES public.process_alt_names(id)')
    ) AS t(name, ddl)
  LOOP
    IF NOT EXISTS (
      SELECT 1
      FROM pg_constraint c
      JOIN pg_namespace n ON n.oid = c.connamespace
      WHERE c.conname = r.name
        AND n.nspname = 'public'
    ) THEN
      EXECUTE r.ddl;
    END IF;
  END LOOP;
END
\$\$;
SQL
"

echo "Import complete."
