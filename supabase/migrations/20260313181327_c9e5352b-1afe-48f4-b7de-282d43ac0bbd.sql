
-- Allow anon read access to funcionarios (temporary until auth is fully implemented)
CREATE POLICY "Anon can view funcionarios"
ON public.funcionarios FOR SELECT
TO anon
USING (true);

-- Allow anon read access to documentos_funcionario (temporary)
CREATE POLICY "Anon can view documentos"
ON public.documentos_funcionario FOR SELECT
TO anon
USING (true);
