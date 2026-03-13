
-- Criar funcionário Carlos Silva
INSERT INTO funcionarios (id, nome, cpf, cargo, salario, status)
VALUES ('f1a2b3c4-d5e6-7890-abcd-ef1234567890', 'Carlos Silva', '123.456.789-00', 'Vigilante', 2200, 'Ativo');

-- Inserir documentos fictícios
INSERT INTO documentos_funcionario (funcionario_id, categoria, nome_arquivo, arquivo_url, storage_path, mes_referencia) VALUES
('f1a2b3c4-d5e6-7890-abcd-ef1234567890', 'holerites', 'Holerite_Jan_2026.pdf', 'https://exemplo.com/holerite_jan.pdf', 'f1a2b3c4/holerites/holerite_jan_2026.pdf', '2026-01'),
('f1a2b3c4-d5e6-7890-abcd-ef1234567890', 'holerites', 'Holerite_Fev_2026.pdf', 'https://exemplo.com/holerite_fev.pdf', 'f1a2b3c4/holerites/holerite_fev_2026.pdf', '2026-02'),
('f1a2b3c4-d5e6-7890-abcd-ef1234567890', 'holerites', 'Holerite_Mar_2026.pdf', 'https://exemplo.com/holerite_mar.pdf', 'f1a2b3c4/holerites/holerite_mar_2026.pdf', '2026-03'),
('f1a2b3c4-d5e6-7890-abcd-ef1234567890', 'comprovantes_holerite', 'Comprovante_Holerite_Jan_2026.pdf', 'https://exemplo.com/comp_hol_jan.pdf', 'f1a2b3c4/comprovantes_holerite/comp_jan_2026.pdf', '2026-01'),
('f1a2b3c4-d5e6-7890-abcd-ef1234567890', 'comprovantes_holerite', 'Comprovante_Holerite_Fev_2026.pdf', 'https://exemplo.com/comp_hol_fev.pdf', 'f1a2b3c4/comprovantes_holerite/comp_fev_2026.pdf', '2026-02'),
('f1a2b3c4-d5e6-7890-abcd-ef1234567890', 'folha_ponto', 'Folha_Ponto_Jan_2026.pdf', 'https://exemplo.com/fp_jan.pdf', 'f1a2b3c4/folha_ponto/fp_jan_2026.pdf', '2026-01'),
('f1a2b3c4-d5e6-7890-abcd-ef1234567890', 'folha_ponto', 'Folha_Ponto_Fev_2026.pdf', 'https://exemplo.com/fp_fev.pdf', 'f1a2b3c4/folha_ponto/fp_fev_2026.pdf', '2026-02'),
('f1a2b3c4-d5e6-7890-abcd-ef1234567890', 'folha_ponto', 'Folha_Ponto_Mar_2026.pdf', 'https://exemplo.com/fp_mar.pdf', 'f1a2b3c4/folha_ponto/fp_mar_2026.pdf', '2026-03'),
('f1a2b3c4-d5e6-7890-abcd-ef1234567890', 'documentos_pessoais', 'RG_Carlos_Silva.pdf', 'https://exemplo.com/rg.pdf', 'f1a2b3c4/documentos_pessoais/rg.pdf', NULL),
('f1a2b3c4-d5e6-7890-abcd-ef1234567890', 'documentos_pessoais', 'CPF_Carlos_Silva.pdf', 'https://exemplo.com/cpf.pdf', 'f1a2b3c4/documentos_pessoais/cpf.pdf', NULL),
('f1a2b3c4-d5e6-7890-abcd-ef1234567890', 'documentos_pessoais', 'Comprovante_Residencia.pdf', 'https://exemplo.com/comp_res.pdf', 'f1a2b3c4/documentos_pessoais/comp_residencia.pdf', NULL),
('f1a2b3c4-d5e6-7890-abcd-ef1234567890', 'documentos_pessoais', 'Certidao_Nascimento.pdf', 'https://exemplo.com/certidao.pdf', 'f1a2b3c4/documentos_pessoais/certidao.pdf', NULL),
('f1a2b3c4-d5e6-7890-abcd-ef1234567890', 'ficha_registro', 'Ficha_Registro_Carlos_Silva.pdf', 'https://exemplo.com/ficha_reg.pdf', 'f1a2b3c4/ficha_registro/ficha_registro.pdf', NULL),
('f1a2b3c4-d5e6-7890-abcd-ef1234567890', 'recibos_va_vt', 'Recibo_VA_Jan_2026.pdf', 'https://exemplo.com/va_jan.pdf', 'f1a2b3c4/recibos_va_vt/va_jan_2026.pdf', '2026-01'),
('f1a2b3c4-d5e6-7890-abcd-ef1234567890', 'recibos_va_vt', 'Recibo_VT_Jan_2026.pdf', 'https://exemplo.com/vt_jan.pdf', 'f1a2b3c4/recibos_va_vt/vt_jan_2026.pdf', '2026-01'),
('f1a2b3c4-d5e6-7890-abcd-ef1234567890', 'recibos_va_vt', 'Recibo_VA_Fev_2026.pdf', 'https://exemplo.com/va_fev.pdf', 'f1a2b3c4/recibos_va_vt/va_fev_2026.pdf', '2026-02'),
('f1a2b3c4-d5e6-7890-abcd-ef1234567890', 'recibos_va_vt', 'Recibo_VT_Fev_2026.pdf', 'https://exemplo.com/vt_fev.pdf', 'f1a2b3c4/recibos_va_vt/vt_fev_2026.pdf', '2026-02'),
('f1a2b3c4-d5e6-7890-abcd-ef1234567890', 'comprovantes', 'Comprovante_Deposito_Jan_2026.pdf', 'https://exemplo.com/dep_jan.pdf', 'f1a2b3c4/comprovantes/dep_jan_2026.pdf', '2026-01'),
('f1a2b3c4-d5e6-7890-abcd-ef1234567890', 'comprovantes', 'Comprovante_Deposito_Fev_2026.pdf', 'https://exemplo.com/dep_fev.pdf', 'f1a2b3c4/comprovantes/dep_fev_2026.pdf', '2026-02'),
('f1a2b3c4-d5e6-7890-abcd-ef1234567890', 'avaliacao_desempenho', 'Avaliacao_Desempenho_2025_S2.pdf', 'https://exemplo.com/aval_2025s2.pdf', 'f1a2b3c4/avaliacao_desempenho/aval_2025_s2.pdf', NULL),
('f1a2b3c4-d5e6-7890-abcd-ef1234567890', 'avaliacao_desempenho', 'Avaliacao_Desempenho_2026_S1.pdf', 'https://exemplo.com/aval_2026s1.pdf', 'f1a2b3c4/avaliacao_desempenho/aval_2026_s1.pdf', NULL),
('f1a2b3c4-d5e6-7890-abcd-ef1234567890', 'medida_disciplinar', 'Advertencia_Verbal_15Jan2026.pdf', 'https://exemplo.com/adv_verbal.pdf', 'f1a2b3c4/medida_disciplinar/adv_verbal_jan2026.pdf', NULL),
('f1a2b3c4-d5e6-7890-abcd-ef1234567890', 'ficha_epi', 'Ficha_EPI_Entrega_Jan2026.pdf', 'https://exemplo.com/epi_jan.pdf', 'f1a2b3c4/ficha_epi/epi_entrega_jan2026.pdf', NULL),
('f1a2b3c4-d5e6-7890-abcd-ef1234567890', 'ficha_epi', 'Ficha_EPI_Devolucao_Mar2026.pdf', 'https://exemplo.com/epi_dev.pdf', 'f1a2b3c4/ficha_epi/epi_devolucao_mar2026.pdf', NULL),
('f1a2b3c4-d5e6-7890-abcd-ef1234567890', 'admissionais', 'ASO_Admissional.pdf', 'https://exemplo.com/aso_adm.pdf', 'f1a2b3c4/admissionais/aso_admissional.pdf', NULL),
('f1a2b3c4-d5e6-7890-abcd-ef1234567890', 'admissionais', 'Contrato_Trabalho.pdf', 'https://exemplo.com/contrato.pdf', 'f1a2b3c4/admissionais/contrato_trabalho.pdf', NULL),
('f1a2b3c4-d5e6-7890-abcd-ef1234567890', 'admissionais', 'Declaracao_Dependentes.pdf', 'https://exemplo.com/dec_dep.pdf', 'f1a2b3c4/admissionais/declaracao_dependentes.pdf', NULL);
