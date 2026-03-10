import { DollarSign, Download, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/StatCard";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const evolucao = [
  { month: "Jan", receita: 85000, despesa: 62000, lucro: 23000 },
  { month: "Fev", receita: 92000, despesa: 65000, lucro: 27000 },
  { month: "Mar", receita: 120000, despesa: 78000, lucro: 42000 },
  { month: "Abr", receita: 95000, despesa: 68000, lucro: 27000 },
  { month: "Mai", receita: 102000, despesa: 70000, lucro: 32000 },
  { month: "Jun", receita: 110000, despesa: 72000, lucro: 38000 },
];

export default function RelatorioFinanceiro() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Relatório Financeiro</h1>
          <p className="text-muted-foreground">Análise financeira consolidada</p>
        </div>
        <Button variant="outline"><Download className="h-4 w-4 mr-2" />Exportar</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Receita Anual" value="R$ 604k" change="+18% vs 2025" changeType="positive" icon={TrendingUp} />
        <StatCard title="Despesa Anual" value="R$ 415k" change="+5%" changeType="negative" icon={TrendingDown} />
        <StatCard title="Lucro Anual" value="R$ 189k" change="+42%" changeType="positive" icon={DollarSign} iconColor="bg-secondary" />
        <StatCard title="Margem" value="31.3%" change="+5.2pp" changeType="positive" icon={TrendingUp} />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl p-5">
        <h3 className="text-sm font-semibold mb-4">Evolução Financeira - 2026</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={evolucao}>
            <defs>
              <linearGradient id="colorRec" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(120, 60%, 40%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(120, 60%, 40%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorDesp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(0, 98%, 31%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(0, 98%, 31%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 90%)" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${v / 1000}k`} />
            <Tooltip formatter={(value: number) => `R$ ${value.toLocaleString()}`} />
            <Area type="monotone" dataKey="receita" stroke="hsl(120, 60%, 40%)" fill="url(#colorRec)" strokeWidth={2} />
            <Area type="monotone" dataKey="despesa" stroke="hsl(0, 98%, 31%)" fill="url(#colorDesp)" strokeWidth={2} />
            <Area type="monotone" dataKey="lucro" stroke="hsl(46, 99%, 50%)" fill="none" strokeWidth={2} strokeDasharray="5 5" />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
