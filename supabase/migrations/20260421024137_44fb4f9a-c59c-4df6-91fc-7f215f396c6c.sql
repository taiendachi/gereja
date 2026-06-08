-- 1) Roles enum + table + has_role function
CREATE TYPE public.app_role AS ENUM ('admin', 'editor');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins manage all roles"
  ON public.user_roles FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 2) Auto-grant admin to the FIRST user that signs up
CREATE OR REPLACE FUNCTION public.assign_first_admin()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created_assign_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.assign_first_admin();

-- 3) Updated_at helper
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- 4) Warta Jemaat (PDF Google Drive)
CREATE TABLE public.warta_jemaat (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  publish_date DATE NOT NULL DEFAULT CURRENT_DATE,
  excerpt TEXT,
  pdf_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.warta_jemaat ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_warta_updated BEFORE UPDATE ON public.warta_jemaat
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE POLICY "Public can read warta" ON public.warta_jemaat FOR SELECT USING (true);
CREATE POLICY "Admins manage warta" ON public.warta_jemaat FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 5) Keputusan Majelis Jemaat (PDF Google Drive)
CREATE TABLE public.keputusan_majelis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  publish_date DATE NOT NULL DEFAULT CURRENT_DATE,
  excerpt TEXT,
  pdf_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.keputusan_majelis ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_keputusan_updated BEFORE UPDATE ON public.keputusan_majelis
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE POLICY "Public can read keputusan" ON public.keputusan_majelis FOR SELECT USING (true);
CREATE POLICY "Admins manage keputusan" ON public.keputusan_majelis FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 6) Berita kategori (anak_lahir, menikah, dukacita, lain_lain)
CREATE TYPE public.berita_kategori AS ENUM ('anak_lahir', 'menikah', 'dukacita', 'lain_lain');

CREATE TABLE public.berita_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kategori berita_kategori NOT NULL,
  title TEXT NOT NULL,
  publish_date DATE NOT NULL DEFAULT CURRENT_DATE,
  excerpt TEXT,
  body TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.berita_items ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_berita_updated BEFORE UPDATE ON public.berita_items
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE POLICY "Public can read berita" ON public.berita_items FOR SELECT USING (true);
CREATE POLICY "Admins manage berita" ON public.berita_items FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE INDEX berita_kategori_date_idx ON public.berita_items (kategori, publish_date DESC);

-- 7) Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.warta_jemaat;
ALTER PUBLICATION supabase_realtime ADD TABLE public.keputusan_majelis;
ALTER PUBLICATION supabase_realtime ADD TABLE public.berita_items;