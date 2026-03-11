import { useState } from "react";
import { Route } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { toast } from "sonner";

const mockRondas = [
  { id: 1, vigilante: "Carlos Silva", posto: "Posto Central", inicio: "06:00", fim: "06:45", pontos: 8, pontosOk: 8, status: "Completa", date: "10/03/2026" },
  { id: 2, vigilante: "Ana Costa", posto: "Empresa ABC", inicio: "22:00", fim: "22:30", pontos: 6, pontosOk: 6, status: "Completa", date: "10/03/2026" },
  { id: 3, vigilante: "Pedro Lima", posto: "Condomínio Solar", inicio: "14:00", fim: "—", pontos: 10, pontosOk: 4, status: "Em andamento", date: "10/03/2026" },
  { id: 4, vigilante: "João Oliveira", posto: "Shopping Norte", inicio: "06:00", fim: "06:50", pontos: 12, pontosOk: 11, status: "Incompleta", date: "10/03/2026" },
  { id: 5, vigilante: "Maria Santos", posto: "Hospital São Lucas", inicio: "22:00", fim: "22:40", pontos: 8, pontosOk: 8, status: "Completa", date: "09/03/2026" },
];

export default function Rondas() {
  const [open, setOpen] = useState(false);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); toast.success("Ronda registrada com sucesso!"); setOpen(false); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold">Rondas</h1><p className="text-muted-foreground">Acompanhamento de rondas em tempo real</p></div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button className="bg-primary hover:bg-primary/90"><Route className="h-4 w-4 mr-2" />Nova Ronda</Button></DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>Nova Ronda</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Vigilante</Label>
                <Select><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="carlos">Carlos Silva</SelectItem>
                    <SelectItem value="ana">Ana Costa</SelectItem>
                    <SelectItem value="pedro">Pedro Lima</SelectItem>
                    <SelectItem value="joao">João Oliveira</SelectItem>
                    <SelectItem value="maria">Maria Santos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Posto</Label>
                <Select><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="central">Posto Central</SelectItem>
                    <SelectItem value="abc">Empresa ABC</SelectItem>
                    <SelectItem value="solar">Condomínio Solar</SelectItem>
                    <SelectItem value="norte">Shopping Norte</SelectItem>
                    <SelectItem value="hospital">Hospital São Lucas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Data</Label><Input type="date" required /></div>
                <div className="space-y-2"><Label>Horário Início</Label><Input type="time" required /></div>
              </div>
              <div className="space-y-2"><Label>Nº de Pontos de Verificação</Label><Input type="number" placeholder="0" min={1} /></div>
              <div className="space-y-2"><Label>Observações</Label><Textarea placeholder="Observações sobre a ronda..." /></div>
              <DialogFooter><Button type="submit" className="bg-primary hover:bg-primary/90">Iniciar Ronda</Button></DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl p-5 text-center"><p className="text-3xl font-bold text-primary">24</p><p className="text-sm text-muted-foreground">Rondas Hoje</p></motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="glass rounded-xl p-5 text-center"><p className="text-3xl font-bold text-green-600">21</p><p className="text-sm text-muted-foreground">Completas</p></motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-xl p-5 text-center"><p className="text-3xl font-bold text-orange-500">3</p><p className="text-sm text-muted-foreground">Pendentes</p></motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-xl overflow-hidden">
        <div className="table-scroll">
        <table className="w-full">
          <thead><tr className="border-b border-border bg-muted/30">
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Vigilante</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Posto</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Início</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Fim</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Pontos</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Status</th>
          </tr></thead>
          <tbody>
            {mockRondas.map((r) => (
              <tr key={r.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                <td className="py-3 px-4 font-medium text-sm">{r.vigilante}</td>
                <td className="py-3 px-4 text-sm text-muted-foreground">{r.posto}</td>
                <td className="py-3 px-4 text-sm">{r.inicio}</td>
                <td className="py-3 px-4 text-sm">{r.fim}</td>
                <td className="py-3 px-4 text-sm">{r.pontosOk}/{r.pontos}</td>
                <td className="py-3 px-4">
                  <Badge className={r.status === "Completa" ? "bg-green-100 text-green-700 hover:bg-green-100" : r.status === "Em andamento" ? "bg-blue-100 text-blue-700 hover:bg-blue-100" : "bg-orange-100 text-orange-700 hover:bg-orange-100"}>{r.status}</Badge>
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
