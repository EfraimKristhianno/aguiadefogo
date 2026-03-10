import { Plus, Search, Shield, MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";

const mockUsers = [
  { id: 1, name: "Admin Sistema", email: "admin@aguiadefogo.com.br", role: "admin", lastAccess: "10/03/2026 08:30", status: "Ativo" },
  { id: 2, name: "Roberto Gestor", email: "roberto@aguiadefogo.com.br", role: "gestor", lastAccess: "10/03/2026 07:15", status: "Ativo" },
  { id: 3, name: "Fernanda Supervisora", email: "fernanda@aguiadefogo.com.br", role: "supervisor", lastAccess: "09/03/2026 22:00", status: "Ativo" },
  { id: 4, name: "Carlos Silva", email: "carlos@aguiadefogo.com.br", role: "funcionario", lastAccess: "10/03/2026 06:00", status: "Ativo" },
  { id: 5, name: "Maria Santos", email: "maria@aguiadefogo.com.br", role: "funcionario", lastAccess: "08/03/2026 14:00", status: "Inativo" },
];

const roleLabels: Record<string, string> = { admin: "Administrador", gestor: "Gestor", supervisor: "Supervisor", funcionario: "Funcionário" };
const roleColors: Record<string, string> = { admin: "bg-red-100 text-red-700", gestor: "bg-blue-100 text-blue-700", supervisor: "bg-purple-100 text-purple-700", funcionario: "bg-gray-100 text-gray-700" };

export default function Usuarios() {
  const [search, setSearch] = useState("");
  const filtered = mockUsers.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Usuários do Sistema</h1>
          <p className="text-muted-foreground">Gerenciar acessos e permissões</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90"><Plus className="h-4 w-4 mr-2" />Novo Usuário</Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Buscar usuário..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Nome</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">E-mail</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Perfil</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Último Acesso</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Status</th>
              <th className="text-right py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                <td className="py-3 px-4 font-medium text-sm">{u.name}</td>
                <td className="py-3 px-4 text-sm text-muted-foreground">{u.email}</td>
                <td className="py-3 px-4"><Badge className={`${roleColors[u.role]} hover:${roleColors[u.role]}`}>{roleLabels[u.role]}</Badge></td>
                <td className="py-3 px-4 text-sm text-muted-foreground">{u.lastAccess}</td>
                <td className="py-3 px-4"><Badge className={u.status === "Ativo" ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-red-100 text-red-700 hover:bg-red-100"}>{u.status}</Badge></td>
                <td className="py-3 px-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem><Eye className="h-4 w-4 mr-2" />Ver</DropdownMenuItem>
                      <DropdownMenuItem><Edit className="h-4 w-4 mr-2" />Editar</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive"><Trash2 className="h-4 w-4 mr-2" />Excluir</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
