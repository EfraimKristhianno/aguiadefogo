import { Shield, Download, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/StatCard";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { downloadMockPDF, generateRelatorioPostosPDF } from "@/lib/download-utils";

const mockRelPostos = [
  { id: 1, posto: "Posto Central", client: "Condomínio Solar", vigilantes: 4, ocorrencias: 5, cobertura: "100%", custo: "R$ 12.000", status: "Operacional" },
  { id: 2, posto: "Torre Norte", client: "Shopping Norte", vigilantes: 6, ocorrencias: 8, cobertura: "100%", custo: "R$ 18.000", status: "Operacional" },
  { id: 3, posto: "Portaria A", client: "Empresa ABC", vigilantes: 2, ocorrencias: 2, cobertura: "95%", custo: "R$ 6.000", status: "Operacional" },
  { id: 4, posto: "Bloco B", client: "Hospital São Lucas", vigilantes: 4, ocorrencias: 3, cobertura: "100%", custo: "R$ 14.000", status: "Operacional" },
  { id: 5, posto: "Guarita", client: "Condomínio Solar", vigilantes: 2, ocorrencias: 1, cobertura: "85%", custo: "R$ 5.500", status: "Manutenção" },
];

export default function RelatorioPostos() {
  const handleExport = () => {
    downloadMockPDF("Relatorio_Postos_Mar_2026.txt", generateRelatorioPostosPDF());
    toast.success("Relatório de postos exportado!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold">Relatório de Postos</h1><p className="text-muted-foreground">Performance e custos por posto</p></div>
        <Button variant="outline" onClick={handleExport}><Download className="h-4 w-4 mr-2" />Exportar</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total de Postos" value={5} icon={Shield} />
        <StatCard title="Operacionais" value={4} change="80%" changeType="positive" icon={Shield} />
        <StatCard title="Vigilantes Alocados" value={18} icon={Users} />
        <StatCard title="Custo Total" value="R$ 55.5k" change="Mensal" changeType="neutral" icon={MapPin} />
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-xl overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b border-border bg-muted/30">
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Posto</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Cliente</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Vigilantes</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Ocorrências</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Cobertura</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Custo</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Status</th>
          </tr></thead>
          <tbody>
            {mockRelPostos.map((r) => (
              <tr key={r.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                <td className="py-3 px-4 font-medium text-sm">{r.posto}</td>
                <td className="py-3 px-4 text-sm text-muted-foreground">{r.client}</td>
                <td className="py-3 px-4 text-sm">{r.vigilantes}</td>
                <td className="py-3 px-4 text-sm">{r.ocorrencias}</td>
                <td className="py-3 px-4 text-sm font-semibold">{r.cobertura}</td>
                <td className="py-3 px-4 text-sm">{r.custo}</td>
                <td className="py-3 px-4"><Badge className={r.status === "Operacional" ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-orange-100 text-orange-700 hover:bg-orange-100"}>{r.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
