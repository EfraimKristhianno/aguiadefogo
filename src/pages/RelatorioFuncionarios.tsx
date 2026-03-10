import { Users, Download, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/StatCard";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { toast } from "sonner";
import { downloadMockPDF, generateRelatorioFuncionariosPDF } from "@/lib/download-utils";

const porCargo = [
  { name: "Vigilante", value: 32 },
  { name: "Supervisor", value: 6 },
  { name: "Porteiro", value: 8 },
  { name: "Controlador", value: 2 },
];

const porStatus = [
  { name: "Ativos", value: 42 },
  { name: "Férias", value: 3 },
  { name: "Afastados", value: 2 },
  { name: "Desligados", value: 1 },
];

const COLORS = ["hsl(0, 98%, 31%)", "hsl(46, 99%, 50%)", "hsl(0, 0%, 40%)", "hsl(0, 70%, 45%)"];

export default function RelatorioFuncionarios() {
  const handleExport = () => {
    downloadMockPDF("Relatorio_Funcionarios_Mar_2026.txt", generateRelatorioFuncionariosPDF());
    toast.success("Relatório de funcionários exportado!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold">Relatório de Funcionários</h1><p className="text-muted-foreground">Análise detalhada da equipe</p></div>
        <Button variant="outline" onClick={handleExport}><Download className="h-4 w-4 mr-2" />Exportar PDF</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total" value={48} change="+3 este mês" changeType="positive" icon={Users} />
        <StatCard title="Ativos" value={42} change="87.5%" changeType="positive" icon={Users} />
        <StatCard title="Turnover" value="2.1%" change="-0.5% vs anterior" changeType="positive" icon={TrendingUp} />
        <StatCard title="Custo Médio" value="R$ 2.8k" change="Por funcionário" changeType="neutral" icon={Users} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl p-5">
          <h3 className="text-sm font-semibold mb-4">Por Cargo</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart><Pie data={porCargo} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={4} label={({ name, value }) => `${name}: ${value}`}>
              {porCargo.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
            </Pie><Tooltip /></PieChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-xl p-5">
          <h3 className="text-sm font-semibold mb-4">Por Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={porStatus}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 90%)" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="value" fill="hsl(0, 98%, 31%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
