import { CreditCard, DollarSign, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/dashboard/StatCard";
import { motion } from "framer-motion";

const mockContas = [
  { id: 1, client: "Condomínio Solar", nf: "NF-0451", valor: "R$ 25.000,00", vencimento: "15/03/2026", status: "A vencer" },
  { id: 2, client: "Shopping Norte", nf: "NF-0452", valor: "R$ 45.000,00", vencimento: "20/03/2026", status: "A vencer" },
  { id: 3, client: "Empresa ABC", nf: "NF-0448", valor: "R$ 12.000,00", vencimento: "05/03/2026", status: "Vencido" },
  { id: 4, client: "Hospital São Lucas", nf: "NF-0453", valor: "R$ 38.000,00", vencimento: "01/04/2026", status: "A vencer" },
  { id: 5, client: "Condomínio Solar", nf: "NF-0440", valor: "R$ 25.000,00", vencimento: "15/02/2026", status: "Pago" },
  { id: 6, client: "Shopping Norte", nf: "NF-0441", valor: "R$ 45.000,00", vencimento: "20/02/2026", status: "Pago" },
];

export default function ContasReceber() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Contas a Receber</h1>
        <p className="text-muted-foreground">Controle de recebíveis e cobranças</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total a Receber" value="R$ 120k" change="4 títulos" changeType="neutral" icon={DollarSign} />
        <StatCard title="Vencidos" value="R$ 12k" change="1 título" changeType="negative" icon={AlertCircle} />
        <StatCard title="Recebidos (Mês)" value="R$ 70k" change="+12% vs anterior" changeType="positive" icon={CreditCard} />
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-xl overflow-hidden">
        <div className="table-scroll">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Cliente</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">NF</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Valor</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Vencimento</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockContas.map((c) => (
              <tr key={c.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                <td className="py-3 px-4 font-medium text-sm">{c.client}</td>
                <td className="py-3 px-4 text-sm text-muted-foreground">{c.nf}</td>
                <td className="py-3 px-4 text-sm font-semibold">{c.valor}</td>
                <td className="py-3 px-4 text-sm text-muted-foreground">{c.vencimento}</td>
                <td className="py-3 px-4">
                  <Badge className={
                    c.status === "Pago" ? "bg-green-100 text-green-700 hover:bg-green-100"
                    : c.status === "Vencido" ? "bg-red-100 text-red-700 hover:bg-red-100"
                    : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                  }>{c.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </motion.div>
    </div>
  );
}
