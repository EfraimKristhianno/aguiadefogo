import { CalendarDays, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/StatCard";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const mockRelEscalas = [
  { id: 1, posto: "Posto Central", cobertura: "100%", vigilantes: 4, turnosDia: 2, horasSemana: 168, status: "Completa" },
  { id: 2, posto: "Shopping Norte", cobertura: "100%", vigilantes: 6, turnosDia: 3, horasSemana: 252, status: "Completa" },
  { id: 3, posto: "Condomínio Solar", cobertura: "85%", vigilantes: 3, turnosDia: 2, horasSemana: 144, status: "Incompleta" },
  { id: 4, posto: "Hospital São Lucas", cobertura: "100%", vigilantes: 4, turnosDia: 2, horasSemana: 168, status: "Completa" },
  { id: 5, posto: "Empresa ABC", cobertura: "95%", vigilantes: 2, turnosDia: 1, horasSemana: 84, status: "Parcial" },
];

export default function RelatorioEscalas() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Relatório de Escalas</h1>
          <p className="text-muted-foreground">Cobertura e alocação por posto</p>
        </div>
        <Button variant="outline"><Download className="h-4 w-4 mr-2" />Exportar</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Cobertura Geral" value="96%" change="Meta: 100%" changeType="positive" icon={CalendarDays} />
        <StatCard title="Postos Cobertos" value="5/5" change="Todos ativos" changeType="positive" icon={CalendarDays} />
        <StatCard title="Vigilantes Alocados" value={19} change="De 20 disponíveis" changeType="neutral" icon={CalendarDays} />
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Posto</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Cobertura</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Vigilantes</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Turnos/Dia</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Horas/Sem</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockRelEscalas.map((r) => (
              <tr key={r.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                <td className="py-3 px-4 font-medium text-sm">{r.posto}</td>
                <td className="py-3 px-4 text-sm font-semibold">{r.cobertura}</td>
                <td className="py-3 px-4 text-sm">{r.vigilantes}</td>
                <td className="py-3 px-4 text-sm">{r.turnosDia}</td>
                <td className="py-3 px-4 text-sm">{r.horasSemana}h</td>
                <td className="py-3 px-4">
                  <Badge className={
                    r.status === "Completa" ? "bg-green-100 text-green-700 hover:bg-green-100"
                    : r.status === "Parcial" ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                    : "bg-red-100 text-red-700 hover:bg-red-100"
                  }>{r.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
