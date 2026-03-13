
-- Storage bucket for employee documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('documentos-funcionarios', 'documentos-funcionarios', false);

-- Table to track document metadata
CREATE TABLE public.documentos_funcionario (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  funcionario_id UUID NOT NULL REFERENCES public.funcionarios(id) ON DELETE CASCADE,
  categoria TEXT NOT NULL, -- holerites, folha_ponto, documentos_pessoais, ficha_registro, recibos_va_vt, avaliacao_desempenho, medida_disciplinar, ficha_epi, comprovantes
  nome_arquivo TEXT NOT NULL,
  arquivo_url TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  mes_referencia TEXT,
  observacoes TEXT,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.documentos_funcionario ENABLE ROW LEVEL SECURITY;

-- Employees can view their own documents
CREATE POLICY "Funcionarios can view own documents"
ON public.documentos_funcionario
FOR SELECT TO authenticated
USING (
  funcionario_id IN (
    SELECT id FROM public.funcionarios WHERE user_id = auth.uid()
  )
  OR has_role(auth.uid(), 'admin')
  OR has_role(auth.uid(), 'gestor')
);

-- Employees can upload their own documents
CREATE POLICY "Funcionarios can insert own documents"
ON public.documentos_funcionario
FOR INSERT TO authenticated
WITH CHECK (
  funcionario_id IN (
    SELECT id FROM public.funcionarios WHERE user_id = auth.uid()
  )
  OR has_role(auth.uid(), 'admin')
  OR has_role(auth.uid(), 'gestor')
);

-- Admins and gestores can update/delete
CREATE POLICY "Admins gestores can update documents"
ON public.documentos_funcionario
FOR UPDATE TO authenticated
USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'gestor'));

CREATE POLICY "Admins gestores can delete documents"
ON public.documentos_funcionario
FOR DELETE TO authenticated
USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'gestor'));

-- Storage policies
CREATE POLICY "Authenticated users can upload documents"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'documentos-funcionarios');

CREATE POLICY "Users can view own documents"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'documentos-funcionarios');

CREATE POLICY "Admins can delete documents"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'documentos-funcionarios' AND (
  has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'gestor')
));

-- Qualidade forms table
CREATE TABLE public.formularios_qualidade (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo TEXT NOT NULL,
  titulo TEXT NOT NULL,
  revisao TEXT DEFAULT 'rev.00',
  categoria TEXT NOT NULL, -- rh, seguranca, administrativo
  campos JSONB DEFAULT '[]'::jsonb,
  status TEXT DEFAULT 'Ativo',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.formularios_qualidade ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can view formularios"
ON public.formularios_qualidade FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Admins gestores can manage formularios"
ON public.formularios_qualidade FOR ALL TO authenticated
USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'gestor'));

-- Preenchimentos (filled forms)
CREATE TABLE public.formularios_preenchidos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  formulario_id UUID REFERENCES public.formularios_qualidade(id) ON DELETE CASCADE,
  funcionario_id UUID REFERENCES public.funcionarios(id),
  preenchido_por UUID REFERENCES auth.users(id),
  dados JSONB NOT NULL DEFAULT '{}'::jsonb,
  status TEXT DEFAULT 'Rascunho',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.formularios_preenchidos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can view preenchidos"
ON public.formularios_preenchidos FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Authenticated can insert preenchidos"
ON public.formularios_preenchidos FOR INSERT TO authenticated
WITH CHECK (true);

CREATE POLICY "Admins gestores can manage preenchidos"
ON public.formularios_preenchidos FOR ALL TO authenticated
USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'gestor'));
