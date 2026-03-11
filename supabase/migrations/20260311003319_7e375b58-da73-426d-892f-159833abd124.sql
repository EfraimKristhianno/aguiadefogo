
-- Fix permissive INSERT policies for checklists, ocorrencias, rondas, controle_ponto
-- Replace WITH CHECK (true) with proper role checks

DROP POLICY "Authenticated users can insert checklists" ON public.checklists;
CREATE POLICY "Authenticated users can insert checklists" ON public.checklists FOR INSERT TO authenticated WITH CHECK (
  public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'gestor') OR public.has_role(auth.uid(), 'supervisor') OR public.has_role(auth.uid(), 'funcionario')
);

DROP POLICY "Authenticated users can insert ocorrencias" ON public.ocorrencias;
CREATE POLICY "Authenticated users can insert ocorrencias" ON public.ocorrencias FOR INSERT TO authenticated WITH CHECK (
  public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'gestor') OR public.has_role(auth.uid(), 'supervisor') OR public.has_role(auth.uid(), 'funcionario')
);

DROP POLICY "Authenticated users can insert rondas" ON public.rondas;
CREATE POLICY "Authenticated users can insert rondas" ON public.rondas FOR INSERT TO authenticated WITH CHECK (
  public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'gestor') OR public.has_role(auth.uid(), 'supervisor') OR public.has_role(auth.uid(), 'funcionario')
);

DROP POLICY "Authenticated users can insert controle_ponto" ON public.controle_ponto;
CREATE POLICY "Authenticated users can insert controle_ponto" ON public.controle_ponto FOR INSERT TO authenticated WITH CHECK (
  public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'gestor') OR public.has_role(auth.uid(), 'supervisor') OR public.has_role(auth.uid(), 'funcionario')
);

-- Fix function search path for update_updated_at and handle_new_user
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;
