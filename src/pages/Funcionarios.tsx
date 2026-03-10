import { useState } from "react";
import { Plus, Search, Filter, MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { toast } from "sonner";

const mockEmployees = [
  { id: 1, name: "Carlos Silva", cpf: "123.456.789-00", cargo: "Vigilante", posto: "Posto Central", status: "Ativo", salario: "R$ 2.200,00" },
  { id: 2, name: "Maria Santos", cpf: "987.654.321-00", cargo: "Supervisora", posto: "Condomínio Sol", status: "Ativo", salario: "R$ 3.500,00" },
  { id: 3, name: "João Oliveira", cpf: "456.789.123-00", cargo: "Vigilante", posto: "Shopping Norte", status: "Férias", salario: "R$ 2.200,00" },
  { id: 4, name: "Ana Costa", cpf: "321.654.987-00", cargo: "Porteira", posto: "Empresa ABC", status: "Ativo", salario: "R$ 1.800,00" },
  { id: 5, name: "Pedro Lima", cpf: "654.321.987-00", cargo: "Vigilante", posto: "Posto Central", status: "Afastado", salario: "R$ 2.200,00" },
];

export default function Funcionarios() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const filtered = mockEmployees.filter((e) => e.name.toLowerCase().includes(search.toLowerCase()));
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); toast.success("Funcionário cadastrado com sucesso!"); setOpen(false); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold">Funcionários</h1><p className="text-muted-foreground">Gerenciar equipe de segurança</p></div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button className="bg-primary hover:bg-primary/90"><Plus className="h-4 w-4 mr-2" />Novo Funcionário</Button></DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>Novo Funcionário</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Nome Completo</Label><Input placeholder="Nome do funcionário" required /></div>
                <div className="space-y-2"><Label>CPF</Label><Input placeholder="000.000.000-00" required /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>RG</Label><Input placeholder="00.000.000-0" /></div>
                <div className="space-y-2"><Label>Data de Nascimento</Label><Input type="date" required /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Telefone</Label><Input placeholder="(00) 00000-0000" /></div>
                <div className="space-y-2"><Label>E-mail</Label><Input type="email" placeholder="email@exemplo.com" /></div>
              </div>
              <div className="space-y-2"><Label>Endereço</Label><Input placeholder="Rua, número, bairro, cidade - UF" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Cargo</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vigilante">Vigilante</SelectItem>
                      <SelectItem value="supervisor">Supervisor(a)</SelectItem>
                      <SelectItem value="porteiro">Porteiro(a)</SelectItem>
                      <SelectItem value="controlador">Controlador(a)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Posto</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="central">Posto Central</SelectItem>
                      <SelectItem value="sol">Condomínio Sol</SelectItem>
                      <SelectItem value="norte">Shopping Norte</SelectItem>
                      <SelectItem value="abc">Empresa ABC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Salário (R$)</Label><Input placeholder="0,00" required /></div>
                <div className="space-y-2"><Label>Data de Admissão</Label><Input type="date" required /></div>
              </div>
              <div className="space-y-2"><Label>Nº CTPS</Label><Input placeholder="Carteira de trabalho" /></div>
              <DialogFooter><Button type="submit" className="bg-primary hover:bg-primary/90">Cadastrar Funcionário</Button></DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar funcionário..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Button variant="outline"><Filter className="h-4 w-4 mr-2" />Filtros</Button>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-xl overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b border-border bg-muted/30">
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Nome</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">CPF</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Cargo</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Posto</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Salário</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Status</th>
            <th className="text-right py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Ações</th>
          </tr></thead>
          <tbody>
            {filtered.map((emp) => (
              <tr key={emp.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">{emp.name.charAt(0)}</div>
                    <span className="font-medium text-sm">{emp.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-muted-foreground">{emp.cpf}</td>
                <td className="py-3 px-4 text-sm">{emp.cargo}</td>
                <td className="py-3 px-4 text-sm text-muted-foreground">{emp.posto}</td>
                <td className="py-3 px-4 text-sm font-medium">{emp.salario}</td>
                <td className="py-3 px-4">
                  <Badge className={emp.status === "Ativo" ? "bg-green-100 text-green-700 hover:bg-green-100" : emp.status === "Férias" ? "bg-blue-100 text-blue-700 hover:bg-blue-100" : "bg-orange-100 text-orange-700 hover:bg-orange-100"}>{emp.status}</Badge>
                </td>
                <td className="py-3 px-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem><Eye className="h-4 w-4 mr-2" />Visualizar</DropdownMenuItem>
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
