import { DollarSign, TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const monthlyRevenue = [
  { month: "Jan", valor: 85000 },
  { month: "Fev", valor: 92000 },
  { month: "Mar", valor: 88000 },
  { month: "Abr", valor: 95000 },
  { month: "Mai", valor: 102000 },
  { month: "Jun", valor: 98000 },
];

const contracts = [
  { client: "Condomínio Solar", valor: "R$ 25.000", vencimento: "15/04/2026", status: "Em dia" },
  { client: "Shopping Norte", valor: "R$ 45.000", vencimento: "20/03/2026", status: "Em dia" },
  { client: "Empresa ABC", valor: "R$ 12.000", vencimento: "10/03/2026", status: "Vencido" },
  { client: "Hospital São Lucas", valor: "R$ 38.000", vencimento: "01/04/2026", status: "Em dia" },
];

export default function Financeiro() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Financeiro</h1>
        <p className="text-muted-foreground">Controle de contratos e faturamento</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Receita Mensal" value="R$ 120k" change="+8.2%" changeType="positive" icon={TrendingUp} />
        <StatCard title="Despesas" value="R$ 78k" change="+3.1%" changeType="negative" icon={TrendingDown} />
        <StatCard title="Lucro Líquido" value="R$ 42k" change="+15.4%" changeType="positive" icon={DollarSign} iconColor="bg-secondary" />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl p-5">
        <h3 className="text-sm font-semibold mb-4">Faturamento Mensal</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyRevenue}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 90%)" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${v / 1000}k`} />
            <Tooltip formatter={(value: number) => `R$ ${value.toLocaleString()}`} />
            <Bar dataKey="valor" fill="hsl(0, 98%, 31%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-xl overflow-hidden">
        <div className="p-5 pb-3">
          <h3 className="text-sm font-semibold">Contratos</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left py-3 px-5 text-xs font-semibold text-muted-foreground uppercase">Cliente</th>
              <th className="text-left py-3 px-5 text-xs font-semibold text-muted-foreground uppercase">Valor</th>
              <th className="text-left py-3 px-5 text-xs font-semibold text-muted-foreground uppercase">Vencimento</th>
              <th className="text-left py-3 px-5 text-xs font-semibold text-muted-foreground uppercase">Status</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((c) => (
              <tr key={c.client} className="border-b border-border/50 hover:bg-muted/20">
                <td className="py-3 px-5 text-sm font-medium">{c.client}</td>
                <td className="py-3 px-5 text-sm">{c.valor}</td>
                <td className="py-3 px-5 text-sm text-muted-foreground">{c.vencimento}</td>
                <td className="py-3 px-5">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${c.status === "Em dia" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
