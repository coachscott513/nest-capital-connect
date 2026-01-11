-- Add 10 Greene & Schoharie County towns with "Smart Professional" descriptions
-- Using existing town_market_data table structure

INSERT INTO public.town_market_data (town_slug, town_name, region_category, hero_landmark, source_url, nest_score, is_active)
VALUES 
-- Greene County (5 towns)
('catskill', 'Catskill', 'Greene County', 'https://www.townofcatskillny.gov/', 'https://www.townofcatskillny.gov/assessor', 7, true),
('windham', 'Windham', 'Greene County', 'https://www.townofwindhamny.com/', 'https://www.townofwindhamny.com/assessor', 8, true),
('hunter', 'Hunter', 'Greene County', 'https://townofhuntergov.com/', 'https://townofhuntergov.com/assessor', 7, true),
('coxsackie', 'Coxsackie', 'Greene County', 'https://coxsackie.org/', 'https://coxsackie.org/assessor-office/', 6, true),
('athens', 'Athens', 'Greene County', 'https://www.townofathensny.com/', 'https://www.townofathensny.com/assessor', 6, true),

-- Schoharie County (5 towns)
('cobleskill', 'Cobleskill', 'Schoharie County', 'https://www.townofcobleskill.com/', 'https://www.townofcobleskill.com/assessor', 7, true),
('schoharie', 'Schoharie', 'Schoharie County', 'https://www.townofschoharie.com/', 'https://www.townofschoharie.com/assessor', 6, true),
('middleburgh', 'Middleburgh', 'Schoharie County', 'https://www.townofmiddleburgh.org/', 'https://www.townofmiddleburgh.org/assessor', 5, true),
('sharon-springs', 'Sharon Springs', 'Schoharie County', 'https://www.sharonspringsny.org/', 'https://www.sharonspringsny.org/assessor', 7, true),
('esperance', 'Esperance', 'Schoharie County', 'https://www.townofesperance.org/', 'https://www.townofesperance.org/assessor', 5, true)
ON CONFLICT (town_slug) DO UPDATE SET
  town_name = EXCLUDED.town_name,
  region_category = EXCLUDED.region_category,
  hero_landmark = EXCLUDED.hero_landmark,
  source_url = EXCLUDED.source_url,
  nest_score = EXCLUDED.nest_score,
  is_active = EXCLUDED.is_active,
  updated_at = now();

-- Add unique constraint on town_slug if not exists (for upsert to work)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'town_market_data_town_slug_key'
  ) THEN
    ALTER TABLE public.town_market_data ADD CONSTRAINT town_market_data_town_slug_key UNIQUE (town_slug);
  END IF;
END $$;