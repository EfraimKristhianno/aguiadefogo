import { Users, Building2, Shield, AlertTriangle, DollarSign, Clock, TrendingUp, CheckCircle } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";

const monthlyData = [
  { month: "Jan", receita: 85000, despesa: 62000 },
  { month: "Fev", receita: 92000, despesa: 65000 },
  { month: "Mar", receita: 88000, despesa: 60000 },
  { month: "Abr", receita: 95000, despesa: 68000 },
  { month: "Mai", receita: 102000, despesa: 70000 },
  { month: "Jun", receita: 98000, despesa: 66000 },
];

const occurrenceData = [
  { name: "Invasão", value: 12 },
  { name: "Furto", value: 8 },
  { name: "Vandalismo", value: 15 },
  { name: "Incêndio", value: 3 },
  { name: "Outros", value: 7 },
];

const COLORS = ["hsl(0, 98%, 31%)", "hsl(46, 99%, 50%)", "hsl(0, 0%, 20%)", "hsl(0, 70%, 45%)", "hsl(46, 80%, 60%)"];

const attendanceData = [
  { dia: "Seg", presentes: 45, ausentes: 3 },
  { dia: "Ter", presentes: 47, ausentes: 1 },
  { dia: "Qua", presentes: 44, ausentes: 4 },
  { dia: "Qui", presentes: 46, ausentes: 2 },
  { dia: "Sex", presentes: 48, ausentes: 0 },
  { dia: "Sáb", presentes: 30, ausentes: 2 },
  { dia: "Dom", presentes: 25, ausentes: 1 },
];

const recentOccurrences = [
  { id: 1, type: "Invasão", post: "Posto Central", date: "10/03/2026", status: "Aberta" },
  { id: 2, type: "Vandalismo", post: "Condomínio Sol", date: "09/03/2026", status: "Em análise" },
  { id: 3, type: "Furto", post: "Shopping Norte", date: "08/03/2026", status: "Resolvida" },
  { id: 4, type: "Outros", post: "Empresa ABC", date: "08/03/2026", status: "Aberta" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral do sistema</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Funcionários Ativos"
          value={48}
          change="+3 este mês"
          changeType="positive"
          icon={Users}
        />
        <StatCard
          title="Postos Ativos"
          value={12}
          change="2 novos contratos"
          changeType="positive"
          icon={Shield}
        />
        <StatCard
          title="Ocorrências (Mês)"
          value={15}
          change="-23% vs mês anterior"
          changeType="positive"
          icon={AlertTriangle}
        />
        <StatCard
          title="Faturamento Mensal"
          value="R$ 98k"
          change="+8.2% vs mês anterior"
          changeType="positive"
          icon={DollarSign}
          iconColor="bg-secondary"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-xl p-5 lg:col-span-2"
        >
          <h3 className="text-sm font-semibold mb-4">Receita vs Despesa</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(0, 98%, 31%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(0, 98%, 31%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorDespesa" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(46, 99%, 50%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(46, 99%, 50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 90%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip formatter={(value: number) => `R$ ${value.toLocaleString()}`} />
              <Area type="monotone" dataKey="receita" stroke="hsl(0, 98%, 31%)" fill="url(#colorReceita)" strokeWidth={2} />
              <Area type="monotone" dataKey="despesa" stroke="hsl(46, 99%, 50%)" fill="url(#colorDespesa)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Occurrences Pie */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-xl p-5"
        >
          <h3 className="text-sm font-semibold mb-4">Tipos de Ocorrências</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={occurrenceData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" paddingAngle={4}>
                {occurrenceData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Attendance + Recent */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Attendance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-xl p-5"
        >
          <h3 className="text-sm font-semibold mb-4">Presença Semanal</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 90%)" />
              <XAxis dataKey="dia" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="presentes" fill="hsl(0, 98%, 31%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="ausentes" fill="hsl(46, 99%, 50%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Recent Occurrences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-xl p-5"
        >
          <h3 className="text-sm font-semibold mb-4">Ocorrências Recentes</h3>
          <div className="space-y-3">
            {recentOccurrences.map((occ) => (
              <div key={occ.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium">{occ.type}</p>
                    <p className="text-xs text-muted-foreground">{occ.post}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      occ.status === "Aberta"
                        ? "bg-red-100 text-red-700"
                        : occ.status === "Em análise"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {occ.status}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">{occ.date}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
