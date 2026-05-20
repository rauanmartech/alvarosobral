-- Script para criação da tabela de Copywriting do site Álvaro no Supabase

-- 1. Criar a tabela 'copy'
CREATE TABLE IF NOT EXISTS public.copy (
    id VARCHAR(100) PRIMARY KEY,
    section VARCHAR(100) NOT NULL,
    element_key VARCHAR(100) NOT NULL,
    label VARCHAR(255) NOT NULL,
    value TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Habilitar Row Level Security (RLS)
ALTER TABLE public.copy ENABLE ROW LEVEL SECURITY;

-- 3. Criar Políticas de Acesso
-- Permitir leitura pública dos textos para exibição dinâmica futura
CREATE POLICY "Permitir leitura pública da copy" ON public.copy
    FOR SELECT USING (true);

-- Permitir controle total para administradores autenticados
CREATE POLICY "Permitir tudo para usuários autenticados" ON public.copy
    FOR ALL TO authenticated USING (true);

-- 4. Função e Trigger para atualização automática da coluna 'updated_at' no UPDATE
CREATE OR REPLACE FUNCTION update_copy_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_copy_updated_at
    BEFORE UPDATE ON public.copy
    FOR EACH ROW
    EXECUTE FUNCTION update_copy_updated_at();
