import { useState } from "react";
import { Plus, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { toast } from "sonner";

const mockOrcamentos = [
  { id: 1, client: "Novo Condomínio XYZ", date: "08/03/2026", postos: 3, valor: "R$ 18.000/mês", status: "Pendente" },
  { id: 2, client: "Empresa Tech", date: "05/03/2026", postos: 2, valor: "R$ 10.000/mês", status: "Aprovado" },
  { id: 3, client: "Escola Municipal", date: "01/03/2026", postos: 1, valor: "R$ 5.500/mês", status: "Recusado" },
];

export default function Orcamentos() {
  const [open, setOpen] = useState(false);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); toast.success("Orçamento criado com sucesso!"); setOpen(false); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold">Orçamentos</h1><p className="text-muted-foreground">Propostas para novos clientes</p></div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button className="bg-primary hover:bg-primary/90"><Plus className="h-4 w-4 mr-2" />Novo Orçamento</Button></DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>Novo Orçamento</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2"><Label>Cliente / Prospect</Label><Input placeholder="Nome do cliente" required /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>CNPJ</Label><Input placeholder="00.000.000/0000-00" /></div>
                <div className="space-y-2"><Label>Contato</Label><Input placeholder="Nome do responsável" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Nº de Postos</Label><Input type="number" placeholder="0" min={1} required /></div>
                <div className="space-y-2"><Label>Nº de Vigilantes</Label><Input type="number" placeholder="0" min={1} /></div>
              </div>
              <div className="space-y-2">
                <Label>Tipo de Serviço</Label>
                <Select><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="patrimonial">Vigilância Patrimonial</SelectItem>
                    <SelectItem value="portaria">Portaria</SelectItem>
                    <SelectItem value="monitoramento">Monitoramento</SelectItem>
                    <SelectItem value="misto">Serviço Misto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Valor Mensal (R$)</Label><Input placeholder="0,00" required /></div>
                <div className="space-y-2"><Label>Validade do Orçamento</Label><Input type="date" /></div>
              </div>
              <div className="space-y-2"><Label>Descrição dos Serviços</Label><Textarea placeholder="Detalhe os serviços oferecidos..." rows={3} /></div>
              <DialogFooter><Button type="submit" className="bg-primary hover:bg-primary/90">Criar Orçamento</Button></DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockOrcamentos.map((orc, i) => (
          <motion.div key={orc.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass rounded-xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-lg bg-secondary/20 flex items-center justify-center"><FileText className="h-5 w-5 text-secondary-foreground" /></div>
              <div><h3 className="font-semibold text-sm">{orc.client}</h3><p className="text-xs text-muted-foreground">{orc.date}</p></div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Postos</span><span>{orc.postos}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Valor</span><span className="font-semibold">{orc.valor}</span></div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Status</span>
                <Badge className={orc.status === "Aprovado" ? "bg-green-100 text-green-700 hover:bg-green-100" : orc.status === "Pendente" ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-100" : "bg-red-100 text-red-700 hover:bg-red-100"}>{orc.status}</Badge>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
