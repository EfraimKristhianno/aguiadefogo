import { useState } from "react";
import { useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { SidebarMenuContent } from "./SidebarMenuContent";

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const getInitialOpen = () => {
    const openSet = new Set<string>();
    const groups = [
      { title: "Administrativo", items: [{ path: "/" }, { path: "/clientes" }, { path: "/postos" }, { path: "/contratos" }, { path: "/usuarios" }, { path: "/configuracoes" }] },
      { title: "Operacional", items: [{ path: "/escalas" }, { path: "/checklists" }, { path: "/ocorrencias" }, { path: "/rondas" }, { path: "/monitoramento" }] },
      { title: "Financeiro", items: [{ path: "/orcamentos" }, { path: "/propostas" }, { path: "/contas-receber" }, { path: "/faturamento" }, { path: "/fluxo-caixa" }, { path: "/relatorios-financeiros" }] },
      { title: "RH", items: [{ path: "/funcionarios" }, { path: "/ponto" }, { path: "/escalas-rh" }, { path: "/folha" }, { path: "/holerites" }, { path: "/assinatura-holerite" }] },
      { title: "Relatórios", items: [{ path: "/relatorio-funcionarios" }, { path: "/relatorio-ponto" }, { path: "/relatorio-escalas" }, { path: "/relatorio-ocorrencias" }, { path: "/relatorio-financeiro" }, { path: "/relatorio-postos" }] },
    ];
    groups.forEach((g) => {
      if (g.items.some((i) => i.path === location.pathname)) openSet.add(g.title);
    });
    if (openSet.size === 0) openSet.add("Administrativo");
    return openSet;
  };

  const [openGroups, setOpenGroups] = useState<Set<string>>(getInitialOpen);

  const toggleGroup = (title: string) => {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
  };

  return (
    <aside
      className={cn(
        "hidden md:flex fixed left-0 top-0 h-screen bg-sidebar text-sidebar-foreground flex-col z-50 transition-all duration-300 border-r border-sidebar-border",
        collapsed ? "w-[68px]" : "w-64"
      )}
    >
      <div className="flex items-center justify-center px-4 py-4 border-b border-sidebar-border min-h-[64px]">
        {!collapsed ? (
          <span className="text-sm font-bold text-sidebar-primary tracking-wide">
            ÁGUIA DE FOGO
          </span>
        ) : (
          <span className="text-xs font-bold text-sidebar-primary">AF</span>
        )}
      </div>

      <SidebarMenuContent
        collapsed={collapsed}
        openGroups={openGroups}
        onToggleGroup={toggleGroup}
        variant="sidebar"
      />

      <div className="border-t border-sidebar-border p-2 space-y-1">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground w-full transition-colors"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          {!collapsed && <span>Recolher</span>}
        </button>
        <button
          onClick={() => { window.location.href = "/login"; }}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-sidebar-foreground/60 hover:bg-destructive/20 hover:text-destructive w-full transition-colors"
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && <span>Sair</span>}
        </button>
      </div>
    </aside>
  );
}
