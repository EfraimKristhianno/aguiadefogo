import { Outlet } from "react-router-dom";
import { useState } from "react";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { SidebarMenuContent } from "./SidebarMenuContent";
import { cn } from "@/lib/utils";

export function AppLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background w-full min-w-0 max-w-full overflow-x-hidden">
      <AppSidebar collapsed={sidebarCollapsed} onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent
          side="left"
          className="w-[280px] max-w-[85vw] p-0 bg-sidebar text-sidebar-foreground border-sidebar-border"
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-center px-4 py-4 border-b border-sidebar-border min-h-[64px]">
              <span className="text-sm font-bold text-sidebar-primary tracking-wide">
                ÁGUIA DE FOGO
              </span>
            </div>
            <SidebarMenuContent
              variant="sheet"
              onNavigate={() => setMobileMenuOpen(false)}
            />
            <div className="border-t border-sidebar-border p-2 mt-auto">
              <button
                onClick={() => { window.location.href = "/login"; }}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-sidebar-foreground/60 hover:bg-destructive/20 hover:text-destructive w-full transition-colors"
              >
                Sair
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <div className="md:ml-64 transition-all duration-300 w-full min-w-0 max-w-full overflow-hidden">
        <AppHeader onMenuClick={() => setMobileMenuOpen(true)} />
        <main className="p-4 sm:p-6 w-full min-w-0 max-w-full overflow-x-hidden">
          <div className="w-full min-w-0 max-w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
