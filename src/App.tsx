import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Funcionarios from "./pages/Funcionarios";
import Clientes from "./pages/Clientes";
import Postos from "./pages/Postos";
import Escalas from "./pages/Escalas";
import ControlePonto from "./pages/ControlePonto";
import Checklists from "./pages/Checklists";
import Ocorrencias from "./pages/Ocorrencias";
import Orcamentos from "./pages/Orcamentos";
import Financeiro from "./pages/Financeiro";
import FolhaPagamento from "./pages/FolhaPagamento";
import Contratos from "./pages/Contratos";
import Usuarios from "./pages/Usuarios";
import Configuracoes from "./pages/Configuracoes";
import Rondas from "./pages/Rondas";
import Propostas from "./pages/Propostas";
import ContasReceber from "./pages/ContasReceber";
import Faturamento from "./pages/Faturamento";
import FluxoCaixa from "./pages/FluxoCaixa";
import RelatoriosFinanceiros from "./pages/RelatoriosFinanceiros";
import EscalasRH from "./pages/EscalasRH";
import Holerites from "./pages/Holerites";
import AssinaturaHolerite from "./pages/AssinaturaHolerite";
import RelatorioFuncionarios from "./pages/RelatorioFuncionarios";
import RelatorioPonto from "./pages/RelatorioPonto";
import RelatorioEscalas from "./pages/RelatorioEscalas";
import RelatorioOcorrencias from "./pages/RelatorioOcorrencias";
import RelatorioFinanceiro from "./pages/RelatorioFinanceiro";
import RelatorioPostos from "./pages/RelatorioPostos";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<AppLayout />}>
            {/* Administrativo */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/postos" element={<Postos />} />
            <Route path="/contratos" element={<Contratos />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/configuracoes" element={<Configuracoes />} />
            {/* Operacional */}
            <Route path="/escalas" element={<Escalas />} />
            <Route path="/checklists" element={<Checklists />} />
            <Route path="/ocorrencias" element={<Ocorrencias />} />
            <Route path="/rondas" element={<Rondas />} />
            {/* Financeiro */}
            <Route path="/orcamentos" element={<Orcamentos />} />
            <Route path="/propostas" element={<Propostas />} />
            <Route path="/contas-receber" element={<ContasReceber />} />
            <Route path="/faturamento" element={<Faturamento />} />
            <Route path="/fluxo-caixa" element={<FluxoCaixa />} />
            <Route path="/relatorios-financeiros" element={<RelatoriosFinanceiros />} />
            {/* RH */}
            <Route path="/funcionarios" element={<Funcionarios />} />
            <Route path="/ponto" element={<ControlePonto />} />
            <Route path="/escalas-rh" element={<EscalasRH />} />
            <Route path="/folha" element={<FolhaPagamento />} />
            <Route path="/holerites" element={<Holerites />} />
            <Route path="/assinatura-holerite" element={<AssinaturaHolerite />} />
            {/* Relatórios */}
            <Route path="/relatorio-funcionarios" element={<RelatorioFuncionarios />} />
            <Route path="/relatorio-ponto" element={<RelatorioPonto />} />
            <Route path="/relatorio-escalas" element={<RelatorioEscalas />} />
            <Route path="/relatorio-ocorrencias" element={<RelatorioOcorrencias />} />
            <Route path="/relatorio-financeiro" element={<RelatorioFinanceiro />} />
            <Route path="/relatorio-postos" element={<RelatorioPostos />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
