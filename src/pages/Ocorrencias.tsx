import { useState } from "react";
import { Plus, AlertTriangle, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { toast } from "sonner";

const mockOcorrencias = [
  { id: 1, type: "Invasão", posto: "Posto Central", description: "Tentativa de acesso não autorizado pela porta lateral.", date: "10/03/2026 03:45", photos: 2, status: "Aberta" },
  { id: 2, type: "Vandalismo", posto: "Condomínio Sol", description: "Vidro da guarita quebrado durante a madrugada.", date: "09/03/2026 22:10", photos: 3, status: "Em análise" },
  { id: 3, type: "Furto", posto: "Shopping Norte", description: "Furto de equipamento na área de carga.", date: "08/03/2026 15:30", photos: 1, status: "Resolvida" },
];

export default function Ocorrencias() {
  const [open, setOpen] = useState(false);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); toast.success("Ocorrência registrada com sucesso!"); setOpen(false); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold">Ocorrências</h1><p className="text-muted-foreground">Registro e acompanhamento de ocorrências</p></div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button className="bg-primary hover:bg-primary/90"><Plus className="h-4 w-4 mr-2" />Nova Ocorrência</Button></DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>Nova Ocorrência</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tipo</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="invasao">Invasão</SelectItem>
                      <SelectItem value="furto">Furto</SelectItem>
                      <SelectItem value="vandalismo">Vandalismo</SelectItem>
                      <SelectItem value="incendio">Incêndio</SelectItem>
                      <SelectItem value="outros">Outros</SelectItem>
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
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2"><Label>Data e Hora</Label><Input type="datetime-local" required /></div>
              <div className="space-y-2"><Label>Descrição</Label><Textarea placeholder="Descreva a ocorrência em detalhes..." rows={4} required /></div>
              <div className="space-y-2"><Label>Vigilante Responsável</Label><Input placeholder="Nome do vigilante" /></div>
              <div className="space-y-2">
                <Label>Prioridade</Label>
                <Select><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="baixa">Baixa</SelectItem>
                    <SelectItem value="media">Média</SelectItem>
                    <SelectItem value="alta">Alta</SelectItem>
                    <SelectItem value="critica">Crítica</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter><Button type="submit" className="bg-primary hover:bg-primary/90">Registrar Ocorrência</Button></DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {mockOcorrencias.map((occ, i) => (
          <motion.div key={occ.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="glass rounded-xl p-5 hover:shadow-xl transition-all">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0"><AlertTriangle className="h-5 w-5 text-destructive" /></div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{occ.type}</h3>
                    <Badge className={occ.status === "Aberta" ? "bg-red-100 text-red-700 hover:bg-red-100" : occ.status === "Em análise" ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-100" : "bg-green-100 text-green-700 hover:bg-green-100"}>{occ.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{occ.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{occ.posto}</span><span>{occ.date}</span><span className="flex items-center gap-1"><Camera className="h-3 w-3" />{occ.photos} fotos</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
