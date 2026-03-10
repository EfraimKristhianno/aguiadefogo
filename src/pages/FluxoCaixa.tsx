import { TrendingUp, TrendingDown, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const fluxoData = [
  { dia: "01", entradas: 15000, saidas: 8000, saldo: 7000 },
  { dia: "05", entradas: 45000, saidas: 12000, saldo: 40000 },
  { dia: "10", entradas: 25000, saidas: 35000, saldo: 30000 },
  { dia: "15", entradas: 38000, saidas: 20000, saldo: 48000 },
  { dia: "20", entradas: 12000, saidas: 25000, saldo: 35000 },
  { dia: "25", entradas: 30000, saidas: 15000, saldo: 50000 },
];

const movimentacoes = [
  { id: 1, desc: "Recebimento - Condomínio Solar", tipo: "Entrada", valor: "R$ 25.000,00", date: "10/03/2026" },
  { id: 2, desc: "Folha de Pagamento - Mar/2026", tipo: "Saída", valor: "R$ 48.000,00", date: "05/03/2026" },
  { id: 3, desc: "Recebimento - Shopping Norte", tipo: "Entrada", valor: "R$ 45.000,00", date: "05/03/2026" },
  { id: 4, desc: "Aluguel de Sede", tipo: "Saída", valor: "R$ 5.500,00", date: "01/03/2026" },
  { id: 5, desc: "Recebimento - Hospital São Lucas", tipo: "Entrada", valor: "R$ 38.000,00", date: "01/03/2026" },
  { id: 6, desc: "Manutenção de Veículos", tipo: "Saída", valor: "R$ 3.200,00", date: "28/02/2026" },
];

export default function FluxoCaixa() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Fluxo de Caixa</h1>
        <p className="text-muted-foreground">Entradas e saídas financeiras</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Entradas (Mês)" value="R$ 165k" change="+12%" changeType="positive" icon={TrendingUp} />
        <StatCard title="Saídas (Mês)" value="R$ 115k" change="+3%" changeType="negative" icon={TrendingDown} />
        <StatCard title="Saldo Atual" value="R$ 50k" change="Positivo" changeType="positive" icon={DollarSign} iconColor="bg-secondary" />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl p-5">
        <h3 className="text-sm font-semibold mb-4">Fluxo de Caixa - Março 2026</h3>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={fluxoData}>
            <defs>
              <linearGradient id="colorEntradas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(120, 60%, 40%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(120, 60%, 40%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorSaidas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(0, 98%, 31%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(0, 98%, 31%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 90%)" />
            <XAxis dataKey="dia" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${v / 1000}k`} />
            <Tooltip formatter={(value: number) => `R$ ${value.toLocaleString()}`} />
            <Area type="monotone" dataKey="entradas" stroke="hsl(120, 60%, 40%)" fill="url(#colorEntradas)" strokeWidth={2} />
            <Area type="monotone" dataKey="saidas" stroke="hsl(0, 98%, 31%)" fill="url(#colorSaidas)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-xl p-5">
        <h3 className="text-sm font-semibold mb-4">Últimas Movimentações</h3>
        <div className="space-y-3">
          {movimentacoes.map((m) => (
            <div key={m.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
              <div className="flex items-center gap-3">
                {m.tipo === "Entrada" ? <ArrowUpRight className="h-5 w-5 text-green-600" /> : <ArrowDownRight className="h-5 w-5 text-red-500" />}
                <div>
                  <p className="text-sm font-medium">{m.desc}</p>
                  <p className="text-xs text-muted-foreground">{m.date}</p>
                </div>
              </div>
              <span className={`text-sm font-semibold ${m.tipo === "Entrada" ? "text-green-600" : "text-red-500"}`}>
                {m.tipo === "Entrada" ? "+" : "-"}{m.valor}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
