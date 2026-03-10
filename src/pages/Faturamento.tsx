import { Banknote, TrendingUp, FileText } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const faturamentoData = [
  { month: "Jan", valor: 85000 },
  { month: "Fev", valor: 92000 },
  { month: "Mar", valor: 120000 },
  { month: "Abr", valor: 95000 },
  { month: "Mai", valor: 102000 },
  { month: "Jun", valor: 110000 },
];

const nfEmitidas = [
  { id: 1, nf: "NF-0453", client: "Hospital São Lucas", valor: "R$ 38.000,00", emissao: "01/03/2026", status: "Emitida" },
  { id: 2, nf: "NF-0452", client: "Shopping Norte", valor: "R$ 45.000,00", emissao: "01/03/2026", status: "Emitida" },
  { id: 3, nf: "NF-0451", client: "Condomínio Solar", valor: "R$ 25.000,00", emissao: "01/03/2026", status: "Emitida" },
  { id: 4, nf: "NF-0450", client: "Empresa ABC", valor: "R$ 12.000,00", emissao: "01/03/2026", status: "Cancelada" },
];

export default function Faturamento() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Faturamento</h1>
          <p className="text-muted-foreground">Notas fiscais e faturamento mensal</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90"><FileText className="h-4 w-4 mr-2" />Emitir NF</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Faturado (Mês)" value="R$ 120k" change="+15% vs anterior" changeType="positive" icon={Banknote} />
        <StatCard title="NFs Emitidas" value="4" change="Março 2026" changeType="neutral" icon={FileText} />
        <StatCard title="Ticket Médio" value="R$ 30k" change="+8%" changeType="positive" icon={TrendingUp} />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl p-5">
        <h3 className="text-sm font-semibold mb-4">Evolução do Faturamento</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={faturamentoData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 90%)" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${v / 1000}k`} />
            <Tooltip formatter={(value: number) => `R$ ${value.toLocaleString()}`} />
            <Bar dataKey="valor" fill="hsl(0, 98%, 31%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">NF</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Cliente</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Valor</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Emissão</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Status</th>
            </tr>
          </thead>
          <tbody>
            {nfEmitidas.map((nf) => (
              <tr key={nf.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                <td className="py-3 px-4 font-medium text-sm">{nf.nf}</td>
                <td className="py-3 px-4 text-sm">{nf.client}</td>
                <td className="py-3 px-4 text-sm font-semibold">{nf.valor}</td>
                <td className="py-3 px-4 text-sm text-muted-foreground">{nf.emissao}</td>
                <td className="py-3 px-4">
                  <Badge className={nf.status === "Emitida" ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-red-100 text-red-700 hover:bg-red-100"}>{nf.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
