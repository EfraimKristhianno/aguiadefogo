import { Bell, Menu, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AppHeaderProps {
  onMenuClick?: () => void;
}

export function AppHeader({ onMenuClick }: AppHeaderProps) {
  return (
    <header className="h-14 sm:h-16 border-b border-border bg-card/80 backdrop-blur-sm flex items-center justify-between gap-2 px-4 sm:px-6 sticky top-0 z-40">
      <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden shrink-0"
          onClick={onMenuClick}
          aria-label="Abrir menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="relative flex-1 max-w-md min-w-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground shrink-0" />
          <Input
            placeholder="Buscar..."
            className="pl-10 bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-ring w-full min-w-0"
          />
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center font-bold">
            3
          </span>
        </Button>
        <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-3 border-l border-border">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium truncate max-w-[120px] md:max-w-none">Administrador</p>
            <p className="text-xs text-muted-foreground truncate max-w-[120px] md:max-w-none">admin@aguiadefogo.com</p>
          </div>
          <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-primary flex items-center justify-center shrink-0">
            <User className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
          </div>
        </div>
      </div>
    </header>
  );
}
