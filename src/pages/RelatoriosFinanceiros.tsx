import { BarChart3, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const reports = [
  { id: 1, name: "DRE - Março 2026", type: "DRE", date: "10/03/2026", size: "245 KB" },
  { id: 2, name: "Balancete - Fevereiro 2026", type: "Balancete", date: "05/03/2026", size: "320 KB" },
  { id: 3, name: "Fluxo de Caixa Projetado - Q1 2026", type: "Projeção", date: "01/03/2026", size: "180 KB" },
  { id: 4, name: "Relatório de Inadimplência", type: "Cobrança", date: "28/02/2026", size: "95 KB" },
  { id: 5, name: "Análise de Custos por Posto", type: "Custos", date: "25/02/2026", size: "410 KB" },
];

export default function RelatoriosFinanceiros() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Relatórios Financeiros</h1>
          <p className="text-muted-foreground">Relatórios e análises financeiras</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90"><BarChart3 className="h-4 w-4 mr-2" />Gerar Relatório</Button>
      </div>

      <div className="space-y-3">
        {reports.map((r, i) => (
          <motion.div key={r.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="glass rounded-xl p-5 flex items-center justify-between hover:shadow-xl transition-all">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center"><FileText className="h-5 w-5 text-primary" /></div>
              <div>
                <h3 className="font-semibold text-sm">{r.name}</h3>
                <p className="text-xs text-muted-foreground">{r.type} • {r.date} • {r.size}</p>
              </div>
            </div>
            <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1" />Baixar</Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
