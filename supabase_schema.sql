-- Activating UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =========================================================================
-- 1. TABLES FOR PORTFOLIOS
-- =========================================================================

-- TATTOO PORTFOLIO
CREATE TABLE IF NOT EXISTS public.portfolio_tattoo (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    image_url TEXT,
    is_starred BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- GRAFFITI PORTFOLIO
CREATE TABLE IF NOT EXISTS public.portfolio_graffiti (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    image_url TEXT,
    is_starred BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- TELAS PORTFOLIO
CREATE TABLE IF NOT EXISTS public.portfolio_telas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    image_url TEXT,
    is_starred BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ILUSTRACOES PORTFOLIO
CREATE TABLE IF NOT EXISTS public.portfolio_ilustracoes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    image_url TEXT,
    is_starred BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =========================================================================
-- 2. TABLE: FAQ ITEMS
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.faq_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =========================================================================
-- 3. TABLE: BIOGRAPHY SETTINGS (SINGLE ROW CONFIGURATION)
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.biography_settings (
    id INT PRIMARY KEY CHECK (id = 1),
    photo1_url TEXT,
    photo2_url TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Initialize default biography row if it doesn't exist
INSERT INTO public.biography_settings (id, photo1_url, photo2_url)
VALUES (1, NULL, NULL)
ON CONFLICT (id) DO NOTHING;


-- =========================================================================
-- TRIGGER FUNCTION: AUTO-UPDATE 'updated_at' TIMESTAMP
-- =========================================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Bind updated_at triggers
CREATE TRIGGER trg_portfolio_tattoo_updated_at
    BEFORE UPDATE ON public.portfolio_tattoo
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER trg_portfolio_graffiti_updated_at
    BEFORE UPDATE ON public.portfolio_graffiti
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER trg_portfolio_telas_updated_at
    BEFORE UPDATE ON public.portfolio_telas
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER trg_portfolio_ilustracoes_updated_at
    BEFORE UPDATE ON public.portfolio_ilustracoes
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER trg_faq_items_updated_at
    BEFORE UPDATE ON public.faq_items
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER trg_biography_settings_updated_at
    BEFORE UPDATE ON public.biography_settings
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();


-- =========================================================================
-- TRIGGER FUNCTIONS: AUTO-MANAGE STARRED ITEMS PER PORTFOLIO
-- =========================================================================

-- Tattoo
CREATE OR REPLACE FUNCTION public.handle_starred_tattoo()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.is_starred = true THEN
        UPDATE public.portfolio_tattoo
        SET is_starred = false
        WHERE id <> NEW.id AND is_starred = true;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_portfolio_tattoo_starred
    BEFORE INSERT OR UPDATE OF is_starred ON public.portfolio_tattoo
    FOR EACH ROW EXECUTE FUNCTION public.handle_starred_tattoo();

-- Graffiti
CREATE OR REPLACE FUNCTION public.handle_starred_graffiti()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.is_starred = true THEN
        UPDATE public.portfolio_graffiti
        SET is_starred = false
        WHERE id <> NEW.id AND is_starred = true;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_portfolio_graffiti_starred
    BEFORE INSERT OR UPDATE OF is_starred ON public.portfolio_graffiti
    FOR EACH ROW EXECUTE FUNCTION public.handle_starred_graffiti();

-- Telas
CREATE OR REPLACE FUNCTION public.handle_starred_telas()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.is_starred = true THEN
        UPDATE public.portfolio_telas
        SET is_starred = false
        WHERE id <> NEW.id AND is_starred = true;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_portfolio_telas_starred
    BEFORE INSERT OR UPDATE OF is_starred ON public.portfolio_telas
    FOR EACH ROW EXECUTE FUNCTION public.handle_starred_telas();

-- Ilustracoes
CREATE OR REPLACE FUNCTION public.handle_starred_ilustracoes()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.is_starred = true THEN
        UPDATE public.portfolio_ilustracoes
        SET is_starred = false
        WHERE id <> NEW.id AND is_starred = true;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_portfolio_ilustracoes_starred
    BEFORE INSERT OR UPDATE OF is_starred ON public.portfolio_ilustracoes
    FOR EACH ROW EXECUTE FUNCTION public.handle_starred_ilustracoes();


-- =========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================

-- Enable RLS on all tables
ALTER TABLE public.portfolio_tattoo ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_graffiti ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_telas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_ilustracoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faq_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.biography_settings ENABLE ROW LEVEL SECURITY;

-- 1. Read Policies (Open to public SELECT)
CREATE POLICY "Allow public read access on tattoo" 
    ON public.portfolio_tattoo FOR SELECT USING (true);

CREATE POLICY "Allow public read access on graffiti" 
    ON public.portfolio_graffiti FOR SELECT USING (true);

CREATE POLICY "Allow public read access on telas" 
    ON public.portfolio_telas FOR SELECT USING (true);

CREATE POLICY "Allow public read access on ilustracoes" 
    ON public.portfolio_ilustracoes FOR SELECT USING (true);

CREATE POLICY "Allow public read access on faq" 
    ON public.faq_items FOR SELECT USING (true);

CREATE POLICY "Allow public read access on biography" 
    ON public.biography_settings FOR SELECT USING (true);

-- 2. Write Policies (Restricted to Authenticated users - Admins)
CREATE POLICY "Allow admin write access on tattoo" 
    ON public.portfolio_tattoo FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow admin write access on graffiti" 
    ON public.portfolio_graffiti FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow admin write access on telas" 
    ON public.portfolio_telas FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow admin write access on ilustracoes" 
    ON public.portfolio_ilustracoes FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow admin write access on faq" 
    ON public.faq_items FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow admin write access on biography" 
    ON public.biography_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);


-- =========================================================================
-- 4. STORAGE CONFIGURATION: PUBLIC BUCKET 'portfolio'
-- =========================================================================

-- Insert bucket config
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio', 'portfolio', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for the bucket
CREATE POLICY "Allow public read access on portfolio bucket" 
    ON storage.objects FOR SELECT USING (bucket_id = 'portfolio');

CREATE POLICY "Allow authenticated upload to portfolio bucket" 
    ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'portfolio');

CREATE POLICY "Allow authenticated update to portfolio bucket" 
    ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'portfolio') WITH CHECK (bucket_id = 'portfolio');

CREATE POLICY "Allow authenticated delete from portfolio bucket" 
    ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'portfolio');
