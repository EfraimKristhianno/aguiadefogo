import { useState } from "react";
import { Plus, Search, MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { toast } from "sonner";

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
  const [open, setOpen] = useState(false);
  const filtered = mockUsers.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()));
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); toast.success("Usuário cadastrado com sucesso!"); setOpen(false); };

  return (
    <div className="space-y-4 sm:space-y-6 w-full min-w-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div><h1 className="text-xl sm:text-2xl font-bold">Usuários do Sistema</h1><p className="text-muted-foreground text-sm sm:text-base">Gerenciar acessos e permissões</p></div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button className="bg-primary hover:bg-primary/90"><Plus className="h-4 w-4 mr-2" />Novo Usuário</Button></DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>Novo Usuário</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2"><Label>Nome Completo</Label><Input placeholder="Nome do usuário" required /></div>
              <div className="space-y-2"><Label>E-mail</Label><Input type="email" placeholder="usuario@aguiadefogo.com.br" required /></div>
              <div className="space-y-2"><Label>Senha</Label><Input type="password" placeholder="Mínimo 6 caracteres" required /></div>
              <div className="space-y-2">
                <Label>Perfil de Acesso</Label>
                <Select><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="gestor">Gestor</SelectItem>
                    <SelectItem value="supervisor">Supervisor</SelectItem>
                    <SelectItem value="funcionario">Funcionário</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Telefone</Label><Input placeholder="(00) 00000-0000" /></div>
              <DialogFooter><Button type="submit" className="bg-primary hover:bg-primary/90">Cadastrar Usuário</Button></DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Buscar usuário..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-xl overflow-hidden">
        <div className="table-scroll">
        <table className="w-full">
          <thead><tr className="border-b border-border bg-muted/30">
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Nome</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">E-mail</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Perfil</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Último Acesso</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Status</th>
            <th className="text-right py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Ações</th>
          </tr></thead>
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
        </div>
      </motion.div>
    </div>
  );
}
