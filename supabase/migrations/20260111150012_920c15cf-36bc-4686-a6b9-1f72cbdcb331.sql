-- Create academic_institutions table for colleges, universities, and school districts
CREATE TABLE public.academic_institutions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  town_slug TEXT NOT NULL,
  institution_type TEXT NOT NULL CHECK (institution_type IN ('university', 'college', 'community_college', 'k12_district', 'private_school', 'charter_school')),
  name TEXT NOT NULL,
  short_name TEXT,
  logo_url TEXT,
  ranking_score INTEGER,
  graduation_rate NUMERIC,
  student_teacher_ratio NUMERIC,
  enrollment INTEGER,
  website_url TEXT,
  address TEXT,
  phone TEXT,
  description TEXT,
  highlights JSONB DEFAULT '[]',
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.academic_institutions ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Academic institutions are publicly readable"
ON public.academic_institutions
FOR SELECT
USING (is_active = true);

-- Add civic_category enum type for town_civic_directory if not exists
DO $$ 
BEGIN
  -- Check if category column needs more values (it's already USER-DEFINED)
  -- We'll use text categories: 'tax_assessor', 'code_enforcement', 'town_hall', 'elected_official', 'school_board', 'emergency_services'
END $$;