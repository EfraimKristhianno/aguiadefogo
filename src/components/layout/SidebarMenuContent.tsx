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
  FolderOpen,
  CheckSquare,
  ChevronDown,
  Settings,
  FileSignature,
  MapPin,
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

import * as React from "react";
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
      { icon: FolderOpen, label: "Documentos Funcionários", path: "/documentos-funcionario" },
      { icon: Clock, label: "Controle de Ponto", path: "/ponto" },
      { icon: CalendarDays, label: "Escalas", path: "/escalas-rh" },
      { icon: Receipt, label: "Folha de Pagamento", path: "/folha" },
      { icon: ScrollText, label: "Holerites", path: "/holerites" },
      { icon: PenTool, label: "Assinatura Digital", path: "/assinatura-holerite" },
    ],
  },
  {
    title: "Qualidade",
    icon: CheckSquare,
    items: [
      { icon: FileText, label: "Formulários RH", path: "/qualidade" },
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

interface SidebarMenuContentProps {
  collapsed?: boolean;
  openGroups?: Set<string>;
  onToggleGroup?: (title: string) => void;
  onNavigate?: () => void;
  variant?: "sidebar" | "sheet";
}

export function SidebarMenuContent({
  collapsed = false,
  openGroups: controlledOpenGroups,
  onToggleGroup,
  onNavigate,
  variant = "sidebar",
}: SidebarMenuContentProps) {
  const location = useLocation();
  const [internalOpen, setInternalOpen] = React.useState<Set<string>>(() => {
    const s = new Set<string>();
    menuGroups.forEach((g) => {
      if (g.items.some((i) => i.path === location.pathname)) s.add(g.title);
    });
    if (s.size === 0) s.add("Administrativo");
    return s;
  });

  const openGroups = controlledOpenGroups ?? internalOpen;
  const setOpenGroups = onToggleGroup
    ? (title: string) => onToggleGroup(title)
    : (title: string) =>
        setInternalOpen((prev) => {
          const next = new Set(prev);
          if (next.has(title)) next.delete(title);
          else next.add(title);
          return next;
        });

  const handleNavClick = () => {
    onNavigate?.();
  };

  const isSidebar = variant === "sidebar";
  const isSheet = variant === "sheet";

  return (
    <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-1 scrollbar-thin">
      {menuGroups.map((group) => {
        const isOpen = openGroups.has(group.title);
        const hasActive = group.items.some((i) => i.path === location.pathname);

        return (
          <div key={group.title}>
            <button
              onClick={() => !collapsed && setOpenGroups(group.title)}
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
                      onClick={handleNavClick}
                      className={cn(
                        "flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm transition-all duration-200",
                        isActive
                          ? "text-sidebar-primary font-medium"
                          : "text-sidebar-foreground/60 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                      )}
                    >
                      <item.icon
                        className={cn(
                          "h-4 w-4 flex-shrink-0",
                          isActive && "text-sidebar-primary"
                        )}
                      />
                      <span className="truncate">{item.label}</span>
                    </NavLink>
                  );
                })}
              </div>
            </div>

            {collapsed && isSidebar && (
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
  );
}
