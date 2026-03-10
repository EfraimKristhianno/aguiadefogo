import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
const shifts = [
  { employee: "Carlos Silva", posto: "Posto Central", shifts: [1, 1, 0, 1, 1, 0, 0] },
  { employee: "Maria Santos", posto: "Condomínio Sol", shifts: [1, 1, 1, 0, 0, 1, 1] },
  { employee: "João Oliveira", posto: "Shopping Norte", shifts: [0, 1, 1, 1, 1, 0, 0] },
  { employee: "Ana Costa", posto: "Empresa ABC", shifts: [1, 0, 0, 1, 1, 1, 0] },
  { employee: "Pedro Lima", posto: "Posto Central", shifts: [0, 0, 1, 1, 1, 1, 0] },
];

export default function Escalas() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Escalas de Trabalho</h1>
          <p className="text-muted-foreground">Gerenciar escalas e turnos</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <CalendarDays className="h-4 w-4 mr-2" />
          Nova Escala
        </Button>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <Button variant="outline" size="icon"><ChevronLeft className="h-4 w-4" /></Button>
        <h3 className="font-semibold">10 - 16 Mar 2026</h3>
        <Button variant="outline" size="icon"><ChevronRight className="h-4 w-4" /></Button>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase w-48">Funcionário</th>
              {days.map((d) => (
                <th key={d} className="py-3 px-3 text-xs font-semibold text-muted-foreground uppercase text-center">{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shifts.map((s) => (
              <tr key={s.employee} className="border-b border-border/50 hover:bg-muted/20">
                <td className="py-3 px-4">
                  <p className="text-sm font-medium">{s.employee}</p>
                  <p className="text-xs text-muted-foreground">{s.posto}</p>
                </td>
                {s.shifts.map((v, i) => (
                  <td key={i} className="py-3 px-3 text-center">
                    <div className={`h-8 w-8 rounded-lg mx-auto flex items-center justify-center text-xs font-bold ${
                      v ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                    }`}>
                      {v ? "✓" : "—"}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
