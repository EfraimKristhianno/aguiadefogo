import { useState } from "react";
import { ClipboardCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { toast } from "sonner";

const mockChecklists = [
  { id: 1, employee: "Carlos Silva", posto: "Posto Central", date: "10/03/2026", completed: 8, total: 10, status: "Parcial" },
  { id: 2, employee: "Maria Santos", posto: "Condomínio Sol", date: "10/03/2026", completed: 10, total: 10, status: "Completo" },
  { id: 3, employee: "Ana Costa", posto: "Empresa ABC", date: "10/03/2026", completed: 5, total: 10, status: "Em andamento" },
];

export default function Checklists() {
  const [open, setOpen] = useState(false);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); toast.success("Checklist criado com sucesso!"); setOpen(false); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold">Checklists de Segurança</h1><p className="text-muted-foreground">Acompanhamento de rondas e verificações</p></div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button className="bg-primary hover:bg-primary/90"><ClipboardCheck className="h-4 w-4 mr-2" />Novo Checklist</Button></DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>Novo Checklist</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2"><Label>Título</Label><Input placeholder="Nome do checklist" required /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Funcionário</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="carlos">Carlos Silva</SelectItem>
                      <SelectItem value="maria">Maria Santos</SelectItem>
                      <SelectItem value="ana">Ana Costa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Posto</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="central">Posto Central</SelectItem>
                      <SelectItem value="sol">Condomínio Sol</SelectItem>
                      <SelectItem value="abc">Empresa ABC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2"><Label>Data</Label><Input type="date" required /></div>
              <div className="space-y-2"><Label>Itens do Checklist (um por linha)</Label>
                <Textarea placeholder={"Verificar portões\nTestar alarme\nConferir câmeras\nVerificar iluminação\nTestar comunicação"} rows={5} />
              </div>
              <DialogFooter><Button type="submit" className="bg-primary hover:bg-primary/90">Criar Checklist</Button></DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockChecklists.map((cl, i) => (
          <motion.div key={cl.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass rounded-xl p-5">
            <div className="flex items-start justify-between mb-4">
              <div><h3 className="font-semibold text-sm">{cl.employee}</h3><p className="text-xs text-muted-foreground">{cl.posto} • {cl.date}</p></div>
              <Badge className={cl.status === "Completo" ? "bg-green-100 text-green-700 hover:bg-green-100" : cl.status === "Parcial" ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-100" : "bg-blue-100 text-blue-700 hover:bg-blue-100"}>{cl.status}</Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Progresso</span><span className="font-medium">{cl.completed}/{cl.total}</span></div>
              <div className="w-full bg-muted rounded-full h-2"><div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${(cl.completed / cl.total) * 100}%` }} /></div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
