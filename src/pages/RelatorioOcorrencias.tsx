import { AlertTriangle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/StatCard";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { toast } from "sonner";
import { downloadMockPDF, generateRelatorioOcorrenciasPDF } from "@/lib/download-utils";

const porTipo = [
  { name: "Invasão", value: 12 },
  { name: "Furto", value: 8 },
  { name: "Vandalismo", value: 15 },
  { name: "Incêndio", value: 3 },
  { name: "Outros", value: 7 },
];

const porMes = [
  { month: "Jan", total: 18 },
  { month: "Fev", total: 12 },
  { month: "Mar", total: 15 },
  { month: "Abr", total: 9 },
  { month: "Mai", total: 11 },
  { month: "Jun", total: 7 },
];

const COLORS = ["hsl(0, 98%, 31%)", "hsl(46, 99%, 50%)", "hsl(0, 0%, 40%)", "hsl(0, 70%, 45%)", "hsl(46, 80%, 60%)"];

export default function RelatorioOcorrencias() {
  const handleExport = () => {
    downloadMockPDF("Relatorio_Ocorrencias_2026.txt", generateRelatorioOcorrenciasPDF());
    toast.success("Relatório de ocorrências exportado!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold">Relatório de Ocorrências</h1><p className="text-muted-foreground">Análise de ocorrências por período</p></div>
        <Button variant="outline" onClick={handleExport}><Download className="h-4 w-4 mr-2" />Exportar PDF</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total (Ano)" value={72} icon={AlertTriangle} />
        <StatCard title="Resolvidas" value={58} change="80.6%" changeType="positive" icon={AlertTriangle} />
        <StatCard title="Em Análise" value={9} change="12.5%" changeType="neutral" icon={AlertTriangle} />
        <StatCard title="Abertas" value={5} change="6.9%" changeType="negative" icon={AlertTriangle} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl p-5">
          <h3 className="text-sm font-semibold mb-4">Evolução Mensal</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={porMes}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 90%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="total" fill="hsl(0, 98%, 31%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-xl p-5">
          <h3 className="text-sm font-semibold mb-4">Por Tipo</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart><Pie data={porTipo} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={4} label={({ name, value }) => `${name}: ${value}`}>
              {porTipo.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
            </Pie><Tooltip /></PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
