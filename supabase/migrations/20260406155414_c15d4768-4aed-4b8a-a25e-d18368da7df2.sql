
CREATE TABLE public.town_landmarks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  town_slug TEXT NOT NULL,
  label TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'civic',
  icon TEXT NOT NULL DEFAULT 'landmark',
  x NUMERIC NOT NULL,
  y NUMERIC NOT NULL,
  nest_score INTEGER NOT NULL DEFAULT 5,
  headline TEXT,
  detail TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.town_landmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Town landmarks are publicly readable"
  ON public.town_landmarks
  FOR SELECT
  TO public
  USING (is_active = true);
