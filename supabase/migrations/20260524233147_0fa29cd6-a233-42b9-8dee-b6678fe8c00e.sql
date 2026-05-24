-- Import Albany County area Google Places businesses (round 2)
-- See /tmp/import.sql for full payload (1633 lines)
-- Inserts ~202 rows then dedupes by external_id keeping the older row

DO $$
DECLARE
  _count int;
BEGIN
  SELECT count(*) INTO _count FROM public.businesses;
  RAISE NOTICE 'Before import: % businesses', _count;
END $$;