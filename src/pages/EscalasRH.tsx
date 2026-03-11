import { CalendarDays, ChevronLeft, ChevronRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const escalasRH = [
  { id: 1, funcionario: "Carlos Silva", tipo: "12x36", folgas: "Qua, Dom", horasMes: 180, banco: "+8h", status: "Regular" },
  { id: 2, funcionario: "Maria Santos", tipo: "6x1", folgas: "Dom", horasMes: 220, banco: "+12h", status: "Hora extra" },
  { id: 3, funcionario: "João Oliveira", tipo: "12x36", folgas: "Ter, Sáb", horasMes: 180, banco: "0h", status: "Regular" },
  { id: 4, funcionario: "Ana Costa", tipo: "5x2", folgas: "Sáb, Dom", horasMes: 176, banco: "-4h", status: "Devendo" },
  { id: 5, funcionario: "Pedro Lima", tipo: "12x36", folgas: "Seg, Sex", horasMes: 180, banco: "+2h", status: "Regular" },
  { id: 6, funcionario: "Luciana Ferreira", tipo: "6x1", folgas: "Seg", horasMes: 200, banco: "+6h", status: "Regular" },
];

export default function EscalasRH() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Escalas - RH</h1>
          <p className="text-muted-foreground">Controle de escalas e banco de horas</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90"><CalendarDays className="h-4 w-4 mr-2" />Configurar Escala</Button>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-xl overflow-hidden">
        <div className="table-scroll">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Funcionário</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Tipo</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Folgas</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Horas/Mês</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Banco</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Status</th>
            </tr>
          </thead>
          <tbody>
            {escalasRH.map((e) => (
              <tr key={e.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                <td className="py-3 px-4 font-medium text-sm">{e.funcionario}</td>
                <td className="py-3 px-4 text-sm">{e.tipo}</td>
                <td className="py-3 px-4 text-sm text-muted-foreground">{e.folgas}</td>
                <td className="py-3 px-4 text-sm">{e.horasMes}h</td>
                <td className="py-3 px-4 text-sm font-medium">{e.banco}</td>
                <td className="py-3 px-4">
                  <Badge className={
                    e.status === "Regular" ? "bg-green-100 text-green-700 hover:bg-green-100"
                    : e.status === "Hora extra" ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                    : "bg-red-100 text-red-700 hover:bg-red-100"
                  }>{e.status}</Badge>
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
