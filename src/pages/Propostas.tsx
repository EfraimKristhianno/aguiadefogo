import { useState } from "react";
import { Plus, FileSignature } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { toast } from "sonner";

const mockPropostas = [
  { id: 1, client: "Supermercado BigBom", date: "08/03/2026", valor: "R$ 22.000/mês", postos: 3, validade: "08/04/2026", status: "Enviada" },
  { id: 2, client: "Condomínio Jardim", date: "05/03/2026", valor: "R$ 15.000/mês", postos: 2, validade: "05/04/2026", status: "Aprovada" },
  { id: 3, client: "Indústria MetalPro", date: "01/03/2026", valor: "R$ 35.000/mês", postos: 4, validade: "01/04/2026", status: "Em negociação" },
  { id: 4, client: "Faculdade Central", date: "25/02/2026", valor: "R$ 18.000/mês", postos: 2, validade: "25/03/2026", status: "Recusada" },
];

export default function Propostas() {
  const [open, setOpen] = useState(false);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); toast.success("Proposta criada com sucesso!"); setOpen(false); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold">Propostas Comerciais</h1><p className="text-muted-foreground">Gerenciar propostas enviadas a clientes</p></div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button className="bg-primary hover:bg-primary/90"><Plus className="h-4 w-4 mr-2" />Nova Proposta</Button></DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>Nova Proposta</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2"><Label>Cliente</Label><Input placeholder="Nome do cliente" required /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>CNPJ</Label><Input placeholder="00.000.000/0000-00" /></div>
                <div className="space-y-2"><Label>E-mail</Label><Input type="email" placeholder="contato@empresa.com" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Nº de Postos</Label><Input type="number" placeholder="0" min={1} required /></div>
                <div className="space-y-2"><Label>Valor Mensal (R$)</Label><Input placeholder="0,00" required /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Data da Proposta</Label><Input type="date" required /></div>
                <div className="space-y-2"><Label>Validade</Label><Input type="date" required /></div>
              </div>
              <div className="space-y-2">
                <Label>Tipo de Serviço</Label>
                <Select><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="patrimonial">Vigilância Patrimonial</SelectItem>
                    <SelectItem value="portaria">Portaria</SelectItem>
                    <SelectItem value="monitoramento">Monitoramento</SelectItem>
                    <SelectItem value="escolta">Escolta Armada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Detalhes da Proposta</Label><Textarea placeholder="Descreva os serviços e condições..." rows={3} /></div>
              <DialogFooter><Button type="submit" className="bg-primary hover:bg-primary/90">Criar Proposta</Button></DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockPropostas.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass rounded-xl p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center"><FileSignature className="h-5 w-5 text-primary" /></div>
                <div><h3 className="font-semibold text-sm">{p.client}</h3><p className="text-xs text-muted-foreground">Criada em {p.date}</p></div>
              </div>
              <Badge className={p.status === "Aprovada" ? "bg-green-100 text-green-700 hover:bg-green-100" : p.status === "Enviada" ? "bg-blue-100 text-blue-700 hover:bg-blue-100" : p.status === "Em negociação" ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-100" : "bg-red-100 text-red-700 hover:bg-red-100"}>{p.status}</Badge>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Valor</span><span className="font-semibold">{p.valor}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Postos</span><span>{p.postos}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Validade</span><span>{p.validade}</span></div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
