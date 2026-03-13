
-- Fix overly permissive INSERT on formularios_preenchidos
DROP POLICY IF EXISTS "Authenticated can insert preenchidos" ON public.formularios_preenchidos;
CREATE POLICY "Authenticated can insert preenchidos"
ON public.formularios_preenchidos FOR INSERT TO authenticated
WITH CHECK (
  has_role(auth.uid(), 'admin')
  OR has_role(auth.uid(), 'gestor')
  OR has_role(auth.uid(), 'supervisor')
);
