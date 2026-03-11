
-- Enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'gestor', 'supervisor', 'funcionario');

-- Enum for status fields
CREATE TYPE public.status_contrato AS ENUM ('Vigente', 'Vencendo', 'Encerrado', 'Suspenso');
CREATE TYPE public.status_funcionario AS ENUM ('Ativo', 'Férias', 'Afastado', 'Desligado');
CREATE TYPE public.status_ocorrencia AS ENUM ('Aberta', 'Em análise', 'Resolvida', 'Arquivada');
CREATE TYPE public.status_ronda AS ENUM ('Completa', 'Incompleta', 'Em andamento');
CREATE TYPE public.status_checklist AS ENUM ('Completo', 'Parcial', 'Em andamento');
CREATE TYPE public.status_orcamento AS ENUM ('Pendente', 'Aprovado', 'Recusado');
CREATE TYPE public.status_proposta AS ENUM ('Enviada', 'Aprovada', 'Em negociação', 'Recusada');
CREATE TYPE public.status_conta AS ENUM ('A vencer', 'Vencido', 'Pago');

-- Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

-- User roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function for role check
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Admins can view all roles" ON public.user_roles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- Clientes
CREATE TABLE public.clientes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  razao_social TEXT NOT NULL,
  nome_fantasia TEXT,
  cnpj TEXT NOT NULL UNIQUE,
  inscricao_estadual TEXT,
  email TEXT,
  telefone TEXT,
  endereco TEXT,
  contato_responsavel TEXT,
  status TEXT NOT NULL DEFAULT 'Ativo',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view clientes" ON public.clientes FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins and gestores can insert clientes" ON public.clientes FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'gestor'));
CREATE POLICY "Admins and gestores can update clientes" ON public.clientes FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'gestor'));
CREATE POLICY "Admins can delete clientes" ON public.clientes FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Postos
CREATE TABLE public.postos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  cliente_id UUID REFERENCES public.clientes(id) ON DELETE SET NULL,
  endereco TEXT,
  num_vigilantes INTEGER DEFAULT 0,
  tipo_servico TEXT,
  status TEXT NOT NULL DEFAULT 'Operacional',
  observacoes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.postos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view postos" ON public.postos FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins and gestores can insert postos" ON public.postos FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'gestor'));
CREATE POLICY "Admins and gestores can update postos" ON public.postos FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'gestor'));
CREATE POLICY "Admins can delete postos" ON public.postos FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Contratos
CREATE TABLE public.contratos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  numero TEXT NOT NULL UNIQUE,
  cliente_id UUID REFERENCES public.clientes(id) ON DELETE SET NULL,
  data_inicio DATE NOT NULL,
  data_fim DATE NOT NULL,
  valor_mensal NUMERIC(12,2) NOT NULL DEFAULT 0,
  num_postos INTEGER DEFAULT 0,
  descricao TEXT,
  status status_contrato NOT NULL DEFAULT 'Vigente',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.contratos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view contratos" ON public.contratos FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins and gestores can manage contratos" ON public.contratos FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'gestor'));

-- Funcionarios
CREATE TABLE public.funcionarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  nome TEXT NOT NULL,
  cpf TEXT NOT NULL UNIQUE,
  rg TEXT,
  data_nascimento DATE,
  telefone TEXT,
  email TEXT,
  endereco TEXT,
  cargo TEXT NOT NULL DEFAULT 'Vigilante',
  posto_id UUID REFERENCES public.postos(id) ON DELETE SET NULL,
  data_admissao DATE,
  salario NUMERIC(10,2) DEFAULT 0,
  status status_funcionario NOT NULL DEFAULT 'Ativo',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.funcionarios ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view funcionarios" ON public.funcionarios FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins and gestores can manage funcionarios" ON public.funcionarios FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'gestor'));

-- Escalas
CREATE TABLE public.escalas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  funcionario_id UUID REFERENCES public.funcionarios(id) ON DELETE CASCADE NOT NULL,
  posto_id UUID REFERENCES public.postos(id) ON DELETE CASCADE NOT NULL,
  turno TEXT NOT NULL DEFAULT 'Diurno',
  data_inicio DATE NOT NULL,
  data_fim DATE NOT NULL,
  dias_semana JSONB DEFAULT '[]',
  observacoes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.escalas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view escalas" ON public.escalas FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins gestores supervisores can manage escalas" ON public.escalas FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'gestor') OR public.has_role(auth.uid(), 'supervisor'));

-- Checklists
CREATE TABLE public.checklists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo TEXT NOT NULL,
  funcionario_id UUID REFERENCES public.funcionarios(id) ON DELETE SET NULL,
  posto_id UUID REFERENCES public.postos(id) ON DELETE SET NULL,
  data DATE NOT NULL DEFAULT CURRENT_DATE,
  itens_total INTEGER DEFAULT 0,
  itens_completos INTEGER DEFAULT 0,
  observacoes TEXT,
  status status_checklist NOT NULL DEFAULT 'Em andamento',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.checklists ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view checklists" ON public.checklists FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert checklists" ON public.checklists FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admins gestores supervisores can update checklists" ON public.checklists FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'gestor') OR public.has_role(auth.uid(), 'supervisor'));

-- Ocorrencias
CREATE TABLE public.ocorrencias (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tipo TEXT NOT NULL,
  posto_id UUID REFERENCES public.postos(id) ON DELETE SET NULL,
  funcionario_id UUID REFERENCES public.funcionarios(id) ON DELETE SET NULL,
  descricao TEXT NOT NULL,
  data_hora TIMESTAMPTZ NOT NULL DEFAULT now(),
  fotos TEXT[] DEFAULT '{}',
  status status_ocorrencia NOT NULL DEFAULT 'Aberta',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.ocorrencias ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view ocorrencias" ON public.ocorrencias FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert ocorrencias" ON public.ocorrencias FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admins gestores supervisores can update ocorrencias" ON public.ocorrencias FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'gestor') OR public.has_role(auth.uid(), 'supervisor'));

-- Rondas
CREATE TABLE public.rondas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  funcionario_id UUID REFERENCES public.funcionarios(id) ON DELETE SET NULL,
  posto_id UUID REFERENCES public.postos(id) ON DELETE SET NULL,
  data DATE NOT NULL DEFAULT CURRENT_DATE,
  hora_inicio TIME NOT NULL,
  hora_fim TIME,
  pontos_total INTEGER DEFAULT 0,
  pontos_verificados INTEGER DEFAULT 0,
  observacoes TEXT,
  status status_ronda NOT NULL DEFAULT 'Em andamento',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.rondas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view rondas" ON public.rondas FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert rondas" ON public.rondas FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admins gestores supervisores can update rondas" ON public.rondas FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'gestor') OR public.has_role(auth.uid(), 'supervisor'));

-- Orcamentos
CREATE TABLE public.orcamentos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_nome TEXT NOT NULL,
  cnpj TEXT,
  contato TEXT,
  num_postos INTEGER DEFAULT 0,
  num_vigilantes INTEGER DEFAULT 0,
  tipo_servico TEXT,
  valor_mensal NUMERIC(12,2) DEFAULT 0,
  descricao TEXT,
  status status_orcamento NOT NULL DEFAULT 'Pendente',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.orcamentos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view orcamentos" ON public.orcamentos FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins and gestores can manage orcamentos" ON public.orcamentos FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'gestor'));

-- Propostas
CREATE TABLE public.propostas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_nome TEXT NOT NULL,
  cnpj TEXT,
  email TEXT,
  num_postos INTEGER DEFAULT 0,
  valor_mensal NUMERIC(12,2) DEFAULT 0,
  data_proposta DATE NOT NULL DEFAULT CURRENT_DATE,
  validade DATE,
  tipo_servico TEXT,
  descricao TEXT,
  status status_proposta NOT NULL DEFAULT 'Enviada',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.propostas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view propostas" ON public.propostas FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins and gestores can manage propostas" ON public.propostas FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'gestor'));

-- Contas a Receber
CREATE TABLE public.contas_receber (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id UUID REFERENCES public.clientes(id) ON DELETE SET NULL,
  numero_nf TEXT,
  valor NUMERIC(12,2) NOT NULL DEFAULT 0,
  data_vencimento DATE NOT NULL,
  data_pagamento DATE,
  status status_conta NOT NULL DEFAULT 'A vencer',
  observacoes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.contas_receber ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view contas_receber" ON public.contas_receber FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins and gestores can manage contas_receber" ON public.contas_receber FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'gestor'));

-- Controle de Ponto
CREATE TABLE public.controle_ponto (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  funcionario_id UUID REFERENCES public.funcionarios(id) ON DELETE CASCADE NOT NULL,
  data DATE NOT NULL DEFAULT CURRENT_DATE,
  entrada TIMESTAMPTZ,
  saida TIMESTAMPTZ,
  horas_trabalhadas NUMERIC(5,2),
  horas_extras NUMERIC(5,2) DEFAULT 0,
  observacoes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.controle_ponto ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view controle_ponto" ON public.controle_ponto FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert controle_ponto" ON public.controle_ponto FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admins gestores can update controle_ponto" ON public.controle_ponto FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'gestor'));

-- Folha de Pagamento
CREATE TABLE public.folha_pagamento (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  funcionario_id UUID REFERENCES public.funcionarios(id) ON DELETE CASCADE NOT NULL,
  mes_referencia TEXT NOT NULL,
  salario_base NUMERIC(10,2) NOT NULL DEFAULT 0,
  horas_extras_valor NUMERIC(10,2) DEFAULT 0,
  descontos NUMERIC(10,2) DEFAULT 0,
  salario_liquido NUMERIC(10,2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'Pendente',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.folha_pagamento ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view folha_pagamento" ON public.folha_pagamento FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins and gestores can manage folha_pagamento" ON public.folha_pagamento FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'gestor'));

-- Holerites
CREATE TABLE public.holerites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  funcionario_id UUID REFERENCES public.funcionarios(id) ON DELETE CASCADE NOT NULL,
  folha_id UUID REFERENCES public.folha_pagamento(id) ON DELETE SET NULL,
  mes_referencia TEXT NOT NULL,
  arquivo_url TEXT,
  assinado BOOLEAN DEFAULT FALSE,
  data_assinatura TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.holerites ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view holerites" ON public.holerites FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins and gestores can manage holerites" ON public.holerites FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'gestor'));

-- Trigger to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email), NEW.email);
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_clientes_updated_at BEFORE UPDATE ON public.clientes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_postos_updated_at BEFORE UPDATE ON public.postos FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_contratos_updated_at BEFORE UPDATE ON public.contratos FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_funcionarios_updated_at BEFORE UPDATE ON public.funcionarios FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_escalas_updated_at BEFORE UPDATE ON public.escalas FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_ocorrencias_updated_at BEFORE UPDATE ON public.ocorrencias FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_orcamentos_updated_at BEFORE UPDATE ON public.orcamentos FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_propostas_updated_at BEFORE UPDATE ON public.propostas FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_contas_receber_updated_at BEFORE UPDATE ON public.contas_receber FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
