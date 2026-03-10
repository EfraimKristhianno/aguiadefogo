import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Building2,
  Shield,
  CalendarDays,
  Clock,
  ClipboardCheck,
  AlertTriangle,
  FileText,
  DollarSign,
  Receipt,
  ChevronLeft,
  ChevronRight,
  LogOut,
  ChevronDown,
  Settings,
  FileSignature,
  MapPin,
  Eye,
  Wallet,
  TrendingUp,
  BarChart3,
  UserCheck,
  FileBarChart,
  Handshake,
  CreditCard,
  Banknote,
  ScrollText,
  PenTool,
  Route,
  Activity,
} from "lucide-react";

import { cn } from "@/lib/utils";

interface MenuItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

interface MenuGroup {
  title: string;
  icon: React.ElementType;
  items: MenuItem[];
}

const menuGroups: MenuGroup[] = [
  {
    title: "Administrativo",
    icon: LayoutDashboard,
    items: [
      { icon: LayoutDashboard, label: "Dashboard", path: "/" },
      { icon: Building2, label: "Clientes", path: "/clientes" },
      { icon: Shield, label: "Postos de Serviço", path: "/postos" },
      { icon: Handshake, label: "Contratos", path: "/contratos" },
      { icon: UserCheck, label: "Usuários do Sistema", path: "/usuarios" },
      { icon: Settings, label: "Configurações", path: "/configuracoes" },
    ],
  },
  {
    title: "Operacional",
    icon: Activity,
    items: [
      { icon: CalendarDays, label: "Escalas de Serviço", path: "/escalas" },
      { icon: ClipboardCheck, label: "Checklists de Segurança", path: "/checklists" },
      { icon: AlertTriangle, label: "Ocorrências", path: "/ocorrencias" },
      { icon: Route, label: "Rondas", path: "/rondas" },
      { icon: Eye, label: "Monitoramento", path: "/monitoramento" },
    ],
  },
  {
    title: "Financeiro",
    icon: DollarSign,
    items: [
      { icon: FileText, label: "Orçamentos", path: "/orcamentos" },
      { icon: FileSignature, label: "Propostas Comerciais", path: "/propostas" },
      { icon: CreditCard, label: "Contas a Receber", path: "/contas-receber" },
      { icon: Banknote, label: "Faturamento", path: "/faturamento" },
      { icon: TrendingUp, label: "Fluxo de Caixa", path: "/fluxo-caixa" },
      { icon: BarChart3, label: "Relatórios Financeiros", path: "/relatorios-financeiros" },
    ],
  },
  {
    title: "RH",
    icon: Users,
    items: [
      { icon: Users, label: "Funcionários", path: "/funcionarios" },
      { icon: Clock, label: "Controle de Ponto", path: "/ponto" },
      { icon: CalendarDays, label: "Escalas", path: "/escalas-rh" },
      { icon: Receipt, label: "Folha de Pagamento", path: "/folha" },
      { icon: ScrollText, label: "Holerites", path: "/holerites" },
      { icon: PenTool, label: "Assinatura Digital", path: "/assinatura-holerite" },
    ],
  },
  {
    title: "Relatórios",
    icon: FileBarChart,
    items: [
      { icon: Users, label: "Rel. Funcionários", path: "/relatorio-funcionarios" },
      { icon: Clock, label: "Rel. Controle de Ponto", path: "/relatorio-ponto" },
      { icon: CalendarDays, label: "Rel. Escalas", path: "/relatorio-escalas" },
      { icon: AlertTriangle, label: "Rel. Ocorrências", path: "/relatorio-ocorrencias" },
      { icon: DollarSign, label: "Rel. Financeiro", path: "/relatorio-financeiro" },
      { icon: Shield, label: "Rel. Postos", path: "/relatorio-postos" },
    ],
  },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  // Auto-open groups that contain the active route
  const getInitialOpen = () => {
    const openSet = new Set<string>();
    menuGroups.forEach((group) => {
      if (group.items.some((item) => item.path === location.pathname)) {
        openSet.add(group.title);
      }
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
        "fixed left-0 top-0 h-screen bg-sidebar text-sidebar-foreground flex flex-col z-50 transition-all duration-300 border-r border-sidebar-border",
        collapsed ? "w-[68px]" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-center px-4 py-4 border-b border-sidebar-border min-h-[64px]">
        {!collapsed ? (
          <span className="text-sm font-bold text-sidebar-primary tracking-wide">
            ÁGUIA DE FOGO
          </span>
        ) : (
          <span className="text-xs font-bold text-sidebar-primary">AF</span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-1 scrollbar-thin">
        {menuGroups.map((group) => {
          const isOpen = openGroups.has(group.title);
          const hasActive = group.items.some((i) => i.path === location.pathname);

          return (
            <div key={group.title}>
              {/* Group header */}
              <button
                onClick={() => !collapsed && toggleGroup(group.title)}
                className={cn(
                  "flex items-center w-full px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors duration-200",
                  hasActive
                    ? "text-sidebar-primary"
                    : "text-sidebar-foreground/50 hover:text-sidebar-foreground/80"
                )}
                title={collapsed ? group.title : undefined}
              >
                <group.icon className="h-4 w-4 flex-shrink-0" />
                {!collapsed && (
                  <>
                    <span className="ml-3 flex-1 text-left">{group.title}</span>
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-200",
                        isOpen && "rotate-180"
                      )}
                    />
                  </>
                )}
              </button>

              {/* Group items */}
              <div
                className={cn(
                  "overflow-hidden transition-all duration-200",
                  !collapsed && isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <div className="mt-0.5 ml-2 border-l border-sidebar-border/50 pl-2 space-y-0.5">
                  {group.items.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        className={cn(
                          "flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm transition-all duration-200 group",
                          isActive
                            ? "text-sidebar-primary font-medium"
                            : "text-sidebar-foreground/60 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                        )}
                      >
                        <item.icon className={cn("h-4 w-4 flex-shrink-0", isActive && "text-sidebar-primary")} />
                        <span className="truncate">{item.label}</span>
                      </NavLink>
                    );
                  })}
                </div>
              </div>

              {/* Collapsed: show items as icon-only on hover via tooltip-like behavior */}
              {collapsed && (
                <div className="space-y-0.5 mt-0.5">
                  {group.items.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        title={item.label}
                        className={cn(
                          "flex items-center justify-center py-2 rounded-md transition-all duration-200",
                          isActive
                            ? "text-sidebar-primary"
                            : "text-sidebar-foreground/50 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                      </NavLink>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
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
