// Utility to generate and download mock documents
export function downloadMockPDF(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function generateDRE() {
  return `
========================================
   ÁGUIA DE FOGO SEGURANÇA PATRIMONIAL
   DRE - Demonstrativo de Resultado
   Período: Março 2026
========================================

RECEITA OPERACIONAL BRUTA
  Prestação de Serviços ........ R$ 120.000,00
  (-) Deduções ................. R$  (4.200,00)
  
RECEITA OPERACIONAL LÍQUIDA .... R$ 115.800,00

CUSTO DOS SERVIÇOS PRESTADOS
  Pessoal ....................... R$ (52.000,00)
  Encargos ...................... R$ (18.200,00)
  Uniformes e EPIs .............. R$  (3.500,00)
  Total Custos .................. R$ (73.700,00)

LUCRO BRUTO ..................... R$  42.100,00
  Margem Bruta: 36.4%

DESPESAS OPERACIONAIS
  Administrativas ............... R$  (8.500,00)
  Comerciais .................... R$  (3.200,00)
  Financeiras ................... R$  (1.800,00)
  Total Despesas ................ R$ (13.500,00)

RESULTADO OPERACIONAL ........... R$  28.600,00
  Margem Operacional: 24.7%

RESULTADO LÍQUIDO ............... R$  28.600,00
========================================
`;
}

export function generateBalancete() {
  return `
========================================
   ÁGUIA DE FOGO SEGURANÇA PATRIMONIAL
   BALANCETE - Fevereiro 2026
========================================

ATIVO
  Circulante
    Caixa e Bancos ............. R$  45.000,00
    Contas a Receber ........... R$  82.000,00
    Adiantamentos .............. R$   5.500,00
  Total Circulante ............. R$ 132.500,00

  Não Circulante
    Veículos ................... R$  85.000,00
    Equipamentos ............... R$  32.000,00
    (-) Depreciação ............ R$ (18.000,00)
  Total Não Circulante ......... R$  99.000,00

TOTAL ATIVO .................... R$ 231.500,00

PASSIVO
  Circulante
    Fornecedores ............... R$  12.000,00
    Salários a Pagar ........... R$  48.000,00
    Impostos a Recolher ........ R$  15.000,00
  Total Circulante ............. R$  75.000,00

PATRIMÔNIO LÍQUIDO ............. R$ 156.500,00

TOTAL PASSIVO + PL ............. R$ 231.500,00
========================================
`;
}

export function generateFluxoCaixa() {
  return `
========================================
   ÁGUIA DE FOGO SEGURANÇA PATRIMONIAL
   FLUXO DE CAIXA PROJETADO - Q1 2026
========================================

                    Jan        Fev        Mar
Saldo Inicial    32.000     38.500     45.000

ENTRADAS
  Recebimentos   85.000     92.000    120.000
  Total          85.000     92.000    120.000

SAÍDAS
  Folha Pagto   (48.000)   (52.000)   (55.000)
  Encargos      (15.000)   (16.500)   (18.200)
  Administrativo (8.000)    (8.500)    (8.500)
  Equipamentos   (3.500)    (4.000)    (3.000)
  Impostos       (4.000)    (4.500)    (5.000)
  Total         (78.500)   (85.500)   (89.700)

Saldo Final      38.500     45.000     75.300
========================================
`;
}

export function generateInadimplencia() {
  return `
========================================
   ÁGUIA DE FOGO SEGURANÇA PATRIMONIAL
   RELATÓRIO DE INADIMPLÊNCIA
   Data: 28/02/2026
========================================

RESUMO
  Total Faturado ............... R$ 380.000,00
  Total Recebido ............... R$ 356.200,00
  Total Inadimplente ........... R$  23.800,00
  Índice de Inadimplência: 6.3%

DETALHAMENTO

1. Empresa ABC Ltda
   Fatura: FAT-2026-045
   Vencimento: 15/01/2026 (44 dias)
   Valor: R$ 12.000,00
   Status: Em cobrança judicial

2. Condomínio Parque Verde
   Fatura: FAT-2026-052
   Vencimento: 05/02/2026 (23 dias)
   Valor: R$ 8.500,00
   Status: Negociação em andamento

3. Escola Estadual Norte
   Fatura: FAT-2026-058
   Vencimento: 20/02/2026 (8 dias)
   Valor: R$ 3.300,00
   Status: Contato realizado

========================================
`;
}

export function generateCustosPosto() {
  return `
========================================
   ÁGUIA DE FOGO SEGURANÇA PATRIMONIAL
   ANÁLISE DE CUSTOS POR POSTO
   Período: Fevereiro 2026
========================================

POSTO CENTRAL - Condomínio Solar
  Vigilantes: 4
  Salários ............... R$ 8.800,00
  Encargos ............... R$ 3.080,00
  EPIs/Uniformes ......... R$   420,00
  Total .................. R$ 12.300,00
  Receita Contrato ....... R$ 15.000,00
  Margem: 18.0%

TORRE NORTE - Shopping Norte
  Vigilantes: 6
  Salários ............... R$ 13.200,00
  Encargos ............... R$ 4.620,00
  EPIs/Uniformes ......... R$   630,00
  Total .................. R$ 18.450,00
  Receita Contrato ....... R$ 22.000,00
  Margem: 16.1%

PORTARIA A - Empresa ABC
  Vigilantes: 2
  Salários ............... R$ 4.400,00
  Encargos ............... R$ 1.540,00
  EPIs/Uniformes ......... R$   210,00
  Total .................. R$ 6.150,00
  Receita Contrato ....... R$ 7.500,00
  Margem: 18.0%

BLOCO B - Hospital São Lucas
  Vigilantes: 4
  Salários ............... R$ 8.800,00
  Encargos ............... R$ 3.080,00
  EPIs/Uniformes ......... R$   420,00
  Total .................. R$ 12.300,00
  Receita Contrato ....... R$ 16.000,00
  Margem: 23.1%

========================================
  TOTAL GERAL
  Custo: R$ 49.200,00
  Receita: R$ 60.500,00
  Margem Média: 18.7%
========================================
`;
}

export function generateHoleritePDF(nome: string, competencia: string) {
  return `
========================================
   ÁGUIA DE FOGO SEGURANÇA PATRIMONIAL
   HOLERITE / CONTRACHEQUE
========================================
Funcionário: ${nome}
Competência: ${competencia}
Cargo: Vigilante Patrimonial
Admissão: 15/03/2024

PROVENTOS
  Salário Base ............... R$ 2.200,00
  Adicional Noturno .......... R$   220,00
  Hora Extra 50% ............. R$   230,00
  Total Proventos ............ R$ 2.650,00

DESCONTOS
  INSS (9%) .................. R$   238,50
  IRRF ....................... R$     0,00
  Vale Transporte (6%) ....... R$   132,00
  Outros ..................... R$     9,50
  Total Descontos ............ R$   380,00

LÍQUIDO A RECEBER ............ R$ 2.270,00

FGTS do Mês .................. R$   212,00
Base INSS .................... R$ 2.650,00
Base IRRF .................... R$ 2.411,50
========================================
`;
}

export function generateFolhaPagamentoPDF() {
  return `
========================================
   ÁGUIA DE FOGO SEGURANÇA PATRIMONIAL
   FOLHA DE PAGAMENTO - Março 2026
========================================

Nº  Funcionário        Bruto      Desc.     Líquido
--- ------------------ ---------- --------- ----------
01  Carlos Silva       2.650,00     380,00   2.270,00
02  Maria Santos       3.700,00     620,00   3.080,00
03  João Oliveira      2.200,00     380,00   1.820,00
04  Ana Costa          1.950,00     310,00   1.640,00
05  Pedro Lima         2.200,00     380,00   1.820,00

RESUMO
  Total Bruto ................ R$ 12.700,00
  Total Descontos ............ R$  2.070,00
  Total Líquido .............. R$ 10.630,00
  FGTS Total ................. R$  1.016,00
  INSS Patronal .............. R$  2.540,00

========================================
`;
}

export function generateRelatorioPontoPDF() {
  return `
========================================
   ÁGUIA DE FOGO SEGURANÇA PATRIMONIAL
   RELATÓRIO DE PONTO - Março 2026
========================================

Funcionário: Carlos Silva
  Dias Trabalhados: 22 | Atrasos: 1 | Faltas: 0
  Horas Extras: 4h30 | Total: 184h30

Funcionário: Maria Santos
  Dias Trabalhados: 22 | Atrasos: 0 | Faltas: 0
  Horas Extras: 2h00 | Total: 182h00

Funcionário: João Oliveira
  Dias Trabalhados: 20 | Atrasos: 3 | Faltas: 2
  Horas Extras: 0h00 | Total: 160h00

Funcionário: Ana Costa
  Dias Trabalhados: 22 | Atrasos: 0 | Faltas: 0
  Horas Extras: 1h30 | Total: 181h30

Funcionário: Pedro Lima
  Dias Trabalhados: 21 | Atrasos: 2 | Faltas: 1
  Horas Extras: 0h00 | Total: 168h00

RESUMO GERAL
  Dias Úteis: 22 | Atrasos: 6 | Faltas: 3
  Total Horas Extras: 8h00
========================================
`;
}

export function generateRelatorioEscalasPDF() {
  return `
========================================
   ÁGUIA DE FOGO SEGURANÇA PATRIMONIAL
   RELATÓRIO DE ESCALAS - Março 2026
========================================

Cobertura Geral: 96% | Meta: 100%
Postos Cobertos: 5/5 | Vigilantes Alocados: 19/20

Posto Central - Cobertura 100% - 4 vigilantes - 168h/sem
Shopping Norte - Cobertura 100% - 6 vigilantes - 252h/sem
Condomínio Solar - Cobertura 85% - 3 vigilantes - 144h/sem
Hospital São Lucas - Cobertura 100% - 4 vigilantes - 168h/sem
Empresa ABC - Cobertura 95% - 2 vigilantes - 84h/sem

========================================
`;
}

export function generateRelatorioOcorrenciasPDF() {
  return `
========================================
   ÁGUIA DE FOGO SEGURANÇA PATRIMONIAL
   RELATÓRIO DE OCORRÊNCIAS - 2026
========================================

Total: 72 | Resolvidas: 58 (80.6%) | Em Análise: 9 | Abertas: 5

POR TIPO:
  Invasão: 12 | Furto: 8 | Vandalismo: 15
  Incêndio: 3 | Outros: 7

POR MÊS:
  Jan: 18 | Fev: 12 | Mar: 15
  Abr: 9 | Mai: 11 | Jun: 7

========================================
`;
}

export function generateRelatorioPostosPDF() {
  return `
========================================
   ÁGUIA DE FOGO SEGURANÇA PATRIMONIAL
   RELATÓRIO DE POSTOS - Março 2026
========================================

Total de Postos: 5 | Operacionais: 4
Vigilantes Alocados: 18 | Custo Total: R$ 55.500,00

Posto Central - 4 vig. - 5 occ - R$ 12.000 - Operacional
Torre Norte - 6 vig. - 8 occ - R$ 18.000 - Operacional
Portaria A - 2 vig. - 2 occ - R$ 6.000 - Operacional
Bloco B - 4 vig. - 3 occ - R$ 14.000 - Operacional
Guarita - 2 vig. - 1 occ - R$ 5.500 - Manutenção

========================================
`;
}

export function generateRelatorioFuncionariosPDF() {
  return `
========================================
   ÁGUIA DE FOGO SEGURANÇA PATRIMONIAL
   RELATÓRIO DE FUNCIONÁRIOS - Março 2026
========================================

Total: 48 | Ativos: 42 | Turnover: 2.1%
Custo Médio por Funcionário: R$ 2.800,00

POR CARGO:
  Vigilante: 32 | Supervisor: 6
  Porteiro: 8 | Controlador: 2

POR STATUS:
  Ativos: 42 | Férias: 3
  Afastados: 2 | Desligados: 1

========================================
`;
}

export function generateRelatorioFinanceiroPDF() {
  return `
========================================
   ÁGUIA DE FOGO SEGURANÇA PATRIMONIAL
   RELATÓRIO FINANCEIRO - 2026
========================================

Receita Anual: R$ 604.000 (+18% vs 2025)
Despesa Anual: R$ 415.000 (+5%)
Lucro Anual: R$ 189.000 (+42%)
Margem: 31.3% (+5.2pp)

EVOLUÇÃO MENSAL:
  Jan: Rec 85k | Desp 62k | Lucro 23k
  Fev: Rec 92k | Desp 65k | Lucro 27k
  Mar: Rec 120k | Desp 78k | Lucro 42k
  Abr: Rec 95k | Desp 68k | Lucro 27k
  Mai: Rec 102k | Desp 70k | Lucro 32k
  Jun: Rec 110k | Desp 72k | Lucro 38k

========================================
`;
}
