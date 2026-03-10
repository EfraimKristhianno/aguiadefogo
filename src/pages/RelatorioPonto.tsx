import { Clock, Download, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/StatCard";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { downloadMockPDF, generateRelatorioPontoPDF } from "@/lib/download-utils";

const mockRelatorioPonto = [
  { id: 1, funcionario: "Carlos Silva", diasTrabalhados: 22, atrasos: 1, faltas: 0, horasExtras: "4h30", totalHoras: "184h30" },
  { id: 2, funcionario: "Maria Santos", diasTrabalhados: 22, atrasos: 0, faltas: 0, horasExtras: "2h00", totalHoras: "182h00" },
  { id: 3, funcionario: "João Oliveira", diasTrabalhados: 20, atrasos: 3, faltas: 2, horasExtras: "0h", totalHoras: "160h00" },
  { id: 4, funcionario: "Ana Costa", diasTrabalhados: 22, atrasos: 0, faltas: 0, horasExtras: "1h30", totalHoras: "181h30" },
  { id: 5, funcionario: "Pedro Lima", diasTrabalhados: 21, atrasos: 2, faltas: 1, horasExtras: "0h", totalHoras: "168h00" },
];

export default function RelatorioPonto() {
  const handleExport = () => {
    downloadMockPDF("Relatorio_Ponto_Mar_2026.txt", generateRelatorioPontoPDF());
    toast.success("Relatório de ponto exportado!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold">Relatório de Controle de Ponto</h1><p className="text-muted-foreground">Março 2026</p></div>
        <Button variant="outline" onClick={handleExport}><Download className="h-4 w-4 mr-2" />Exportar</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Dias Úteis" value={22} icon={Clock} />
        <StatCard title="Atrasos" value={6} change="Total no mês" changeType="negative" icon={AlertTriangle} />
        <StatCard title="Faltas" value={3} change="3 funcionários" changeType="negative" icon={AlertTriangle} />
        <StatCard title="Horas Extras" value="8h" change="Total acumulado" changeType="neutral" icon={Clock} />
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-xl overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b border-border bg-muted/30">
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Funcionário</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Dias Trab.</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Atrasos</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Faltas</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">H. Extras</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Total Horas</th>
          </tr></thead>
          <tbody>
            {mockRelatorioPonto.map((r) => (
              <tr key={r.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                <td className="py-3 px-4 font-medium text-sm">{r.funcionario}</td>
                <td className="py-3 px-4 text-sm">{r.diasTrabalhados}</td>
                <td className="py-3 px-4 text-sm">{r.atrasos > 0 ? <span className="text-orange-500 font-medium">{r.atrasos}</span> : "0"}</td>
                <td className="py-3 px-4 text-sm">{r.faltas > 0 ? <span className="text-red-500 font-medium">{r.faltas}</span> : "0"}</td>
                <td className="py-3 px-4 text-sm text-green-600">{r.horasExtras}</td>
                <td className="py-3 px-4 text-sm font-semibold">{r.totalHoras}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
