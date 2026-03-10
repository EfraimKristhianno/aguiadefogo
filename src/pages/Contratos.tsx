import { Plus, FileText, Calendar, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const mockContratos = [
  { id: 1, numero: "CT-2026-001", client: "Condomínio Solar", inicio: "01/01/2026", fim: "31/12/2026", valor: "R$ 25.000/mês", postos: 3, status: "Vigente" },
  { id: 2, numero: "CT-2026-002", client: "Shopping Norte", inicio: "01/02/2026", fim: "31/01/2027", valor: "R$ 45.000/mês", postos: 5, status: "Vigente" },
  { id: 3, numero: "CT-2025-015", client: "Empresa ABC Ltda", inicio: "01/06/2025", fim: "31/05/2026", valor: "R$ 12.000/mês", postos: 2, status: "Vencendo" },
  { id: 4, numero: "CT-2026-003", client: "Hospital São Lucas", inicio: "15/01/2026", fim: "14/01/2027", valor: "R$ 38.000/mês", postos: 4, status: "Vigente" },
  { id: 5, numero: "CT-2025-010", client: "Escola Municipal Centro", inicio: "01/03/2025", fim: "28/02/2026", valor: "R$ 8.500/mês", postos: 1, status: "Encerrado" },
];

export default function Contratos() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Contratos</h1>
          <p className="text-muted-foreground">Gerenciar contratos de prestação de serviço</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Novo Contrato
        </Button>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Nº Contrato</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Cliente</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Início</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Término</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Valor</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Postos</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockContratos.map((c) => (
              <tr key={c.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                <td className="py-3 px-4 text-sm font-medium">{c.numero}</td>
                <td className="py-3 px-4 text-sm">{c.client}</td>
                <td className="py-3 px-4 text-sm text-muted-foreground">{c.inicio}</td>
                <td className="py-3 px-4 text-sm text-muted-foreground">{c.fim}</td>
                <td className="py-3 px-4 text-sm font-semibold">{c.valor}</td>
                <td className="py-3 px-4 text-sm text-center">{c.postos}</td>
                <td className="py-3 px-4">
                  <Badge className={
                    c.status === "Vigente" ? "bg-green-100 text-green-700 hover:bg-green-100"
                    : c.status === "Vencendo" ? "bg-orange-100 text-orange-700 hover:bg-orange-100"
                    : "bg-red-100 text-red-700 hover:bg-red-100"
                  }>{c.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
