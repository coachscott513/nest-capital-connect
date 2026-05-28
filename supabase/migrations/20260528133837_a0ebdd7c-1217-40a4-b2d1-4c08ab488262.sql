-- ============= USER ROLES (admin gating) =============
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'user');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- ============= MEDIA STORIES =============
CREATE TABLE IF NOT EXISTS public.media_stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  headline text NOT NULL,
  summary text,
  category text NOT NULL,
  town text,
  source_name text NOT NULL,
  source_short_name text,
  source_article_url text,
  video_embed_url text,
  has_video boolean NOT NULL DEFAULT false,
  featured boolean NOT NULL DEFAULT false,
  approved boolean NOT NULL DEFAULT false,
  priority_score integer NOT NULL DEFAULT 0,
  published_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.media_stories TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.media_stories TO authenticated;
GRANT ALL ON public.media_stories TO service_role;

ALTER TABLE public.media_stories ENABLE ROW LEVEL SECURITY;

-- Public: only approved stories visible
DROP POLICY IF EXISTS "Approved media stories are public" ON public.media_stories;
CREATE POLICY "Approved media stories are public"
  ON public.media_stories FOR SELECT
  TO anon, authenticated
  USING (approved = true);

-- Admins: full access
DROP POLICY IF EXISTS "Admins can read all media stories" ON public.media_stories;
CREATE POLICY "Admins can read all media stories"
  ON public.media_stories FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can insert media stories" ON public.media_stories;
CREATE POLICY "Admins can insert media stories"
  ON public.media_stories FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can update media stories" ON public.media_stories;
CREATE POLICY "Admins can update media stories"
  ON public.media_stories FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can delete media stories" ON public.media_stories;
CREATE POLICY "Admins can delete media stories"
  ON public.media_stories FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX IF NOT EXISTS idx_media_stories_approved_published
  ON public.media_stories (approved, featured DESC, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_media_stories_source
  ON public.media_stories (source_name);

DROP TRIGGER IF EXISTS trg_media_stories_updated_at ON public.media_stories;
CREATE TRIGGER trg_media_stories_updated_at
  BEFORE UPDATE ON public.media_stories
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
