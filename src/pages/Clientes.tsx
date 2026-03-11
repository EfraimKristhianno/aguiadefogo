import { useState } from "react";
import { Plus, Search, Building2, MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { toast } from "sonner";

const mockClients = [
  { id: 1, name: "Condomínio Solar", cnpj: "12.345.678/0001-00", contrato: "Ativo", postos: 3, valor: "R$ 25.000/mês" },
  { id: 2, name: "Shopping Norte", cnpj: "98.765.432/0001-00", contrato: "Ativo", postos: 5, valor: "R$ 45.000/mês" },
  { id: 3, name: "Empresa ABC Ltda", cnpj: "45.678.123/0001-00", contrato: "Vencendo", postos: 2, valor: "R$ 12.000/mês" },
  { id: 4, name: "Hospital São Lucas", cnpj: "11.222.333/0001-00", contrato: "Ativo", postos: 4, valor: "R$ 38.000/mês" },
];

export default function Clientes() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const filtered = mockClients.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Cliente cadastrado com sucesso!");
    setOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Clientes</h1>
          <p className="text-muted-foreground text-sm sm:text-base">Gerenciar clientes e contratos</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90"><Plus className="h-4 w-4 mr-2" />Novo Cliente</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>Novo Cliente</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Razão Social</Label><Input placeholder="Nome da empresa" required /></div>
                <div className="space-y-2"><Label>Nome Fantasia</Label><Input placeholder="Nome fantasia" /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2"><Label>CNPJ</Label><Input placeholder="00.000.000/0000-00" required /></div>
                <div className="space-y-2"><Label>Inscrição Estadual</Label><Input placeholder="Inscrição estadual" /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Telefone</Label><Input placeholder="(00) 00000-0000" /></div>
                <div className="space-y-2"><Label>E-mail</Label><Input type="email" placeholder="contato@empresa.com" /></div>
              </div>
              <div className="space-y-2"><Label>Endereço</Label><Input placeholder="Rua, número, bairro, cidade - UF" /></div>
              <div className="space-y-2"><Label>Responsável</Label><Input placeholder="Nome do responsável" /></div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select defaultValue="ativo">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ativo">Ativo</SelectItem>
                    <SelectItem value="inativo">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter><Button type="submit" className="bg-primary hover:bg-primary/90">Cadastrar Cliente</Button></DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Buscar cliente..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((client, i) => (
          <motion.div key={client.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass rounded-xl p-5 hover:shadow-xl transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center"><Building2 className="h-5 w-5 text-primary" /></div>
                <div><h3 className="font-semibold text-sm">{client.name}</h3><p className="text-xs text-muted-foreground">{client.cnpj}</p></div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem><Eye className="h-4 w-4 mr-2" />Ver</DropdownMenuItem>
                  <DropdownMenuItem><Edit className="h-4 w-4 mr-2" />Editar</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive"><Trash2 className="h-4 w-4 mr-2" />Excluir</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Postos</span><span className="font-medium">{client.postos}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Valor</span><span className="font-semibold">{client.valor}</span></div>
              <div className="flex justify-between text-sm items-center">
                <span className="text-muted-foreground">Contrato</span>
                <Badge className={client.contrato === "Ativo" ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-orange-100 text-orange-700 hover:bg-orange-100"}>{client.contrato}</Badge>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
