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
} from "lucide-react";
import logo from "@/assets/logo-aguia-de-fogo.png";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Users, label: "Funcionários", path: "/funcionarios" },
  { icon: Building2, label: "Clientes", path: "/clientes" },
  { icon: Shield, label: "Postos", path: "/postos" },
  { icon: CalendarDays, label: "Escalas", path: "/escalas" },
  { icon: Clock, label: "Controle de Ponto", path: "/ponto" },
  { icon: ClipboardCheck, label: "Checklists", path: "/checklists" },
  { icon: AlertTriangle, label: "Ocorrências", path: "/ocorrencias" },
  { icon: FileText, label: "Orçamentos", path: "/orcamentos" },
  { icon: DollarSign, label: "Financeiro", path: "/financeiro" },
  { icon: Receipt, label: "Folha de Pagamento", path: "/folha" },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-sidebar text-sidebar-foreground flex flex-col z-50 transition-all duration-300 ${
        collapsed ? "w-[72px]" : "w-64"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-border">
        <img src={logo} alt="Águia de Fogo" className="h-10 w-auto object-contain" />
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              }`}
            >
              <item.icon className={`h-5 w-5 flex-shrink-0 ${isActive ? "text-sidebar-primary" : ""}`} />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse + Logout */}
      <div className="border-t border-sidebar-border p-2 space-y-1">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground w-full transition-colors"
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          {!collapsed && <span>Recolher</span>}
        </button>
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground/70 hover:bg-destructive/20 hover:text-destructive w-full transition-colors">
          <LogOut className="h-5 w-5" />
          {!collapsed && <span>Sair</span>}
        </button>
      </div>
    </aside>
  );
}
