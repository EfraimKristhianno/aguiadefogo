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
            <Route path="/" element={<Dashboard />} />
            <Route path="/funcionarios" element={<Funcionarios />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/postos" element={<Postos />} />
            <Route path="/escalas" element={<Escalas />} />
            <Route path="/ponto" element={<ControlePonto />} />
            <Route path="/checklists" element={<Checklists />} />
            <Route path="/ocorrencias" element={<Ocorrencias />} />
            <Route path="/orcamentos" element={<Orcamentos />} />
            <Route path="/financeiro" element={<Financeiro />} />
            <Route path="/folha" element={<FolhaPagamento />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
