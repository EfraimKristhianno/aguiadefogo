import { useState } from "react";
import { Plus, MapPin, Users, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { toast } from "sonner";

const mockPostos = [
  { id: 1, name: "Posto Central", client: "Condomínio Solar", address: "Rua das Flores, 123", guards: 4, status: "Operacional" },
  { id: 2, name: "Torre Norte", client: "Shopping Norte", address: "Av. Principal, 456", guards: 6, status: "Operacional" },
  { id: 3, name: "Portaria A", client: "Empresa ABC", address: "Rua Industrial, 789", guards: 2, status: "Operacional" },
  { id: 4, name: "Bloco B", client: "Hospital São Lucas", address: "Av. Saúde, 321", guards: 3, status: "Manutenção" },
];

export default function Postos() {
  const [open, setOpen] = useState(false);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); toast.success("Posto cadastrado com sucesso!"); setOpen(false); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold">Postos de Segurança</h1><p className="text-muted-foreground">Gerenciar postos e locais de trabalho</p></div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button className="bg-primary hover:bg-primary/90"><Plus className="h-4 w-4 mr-2" />Novo Posto</Button></DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>Novo Posto</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Nome do Posto</Label><Input placeholder="Ex: Posto Central" required /></div>
                <div className="space-y-2">
                  <Label>Cliente</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="solar">Condomínio Solar</SelectItem>
                      <SelectItem value="shopping">Shopping Norte</SelectItem>
                      <SelectItem value="abc">Empresa ABC</SelectItem>
                      <SelectItem value="hospital">Hospital São Lucas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2"><Label>Endereço</Label><Input placeholder="Rua, número, bairro, cidade - UF" required /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Nº de Vigilantes</Label><Input type="number" placeholder="0" min={1} /></div>
                <div className="space-y-2">
                  <Label>Tipo de Serviço</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="patrimonial">Vigilância Patrimonial</SelectItem>
                      <SelectItem value="portaria">Portaria</SelectItem>
                      <SelectItem value="monitoramento">Monitoramento</SelectItem>
                      <SelectItem value="escolta">Escolta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Horário Início</Label><Input type="time" /></div>
                <div className="space-y-2"><Label>Horário Fim</Label><Input type="time" /></div>
              </div>
              <div className="space-y-2"><Label>Observações</Label><Input placeholder="Informações adicionais" /></div>
              <DialogFooter><Button type="submit" className="bg-primary hover:bg-primary/90">Cadastrar Posto</Button></DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockPostos.map((posto, i) => (
          <motion.div key={posto.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass rounded-xl p-5 hover:shadow-xl transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center"><Shield className="h-5 w-5 text-primary" /></div>
                <div><h3 className="font-semibold">{posto.name}</h3><p className="text-xs text-muted-foreground">{posto.client}</p></div>
              </div>
              <Badge className={posto.status === "Operacional" ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-orange-100 text-orange-700 hover:bg-orange-100"}>{posto.status}</Badge>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground"><MapPin className="h-4 w-4" /><span>{posto.address}</span></div>
              <div className="flex items-center gap-2 text-muted-foreground"><Users className="h-4 w-4" /><span>{posto.guards} vigilantes alocados</span></div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
