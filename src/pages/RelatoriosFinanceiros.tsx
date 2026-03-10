import { useState } from "react";
import { BarChart3, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { downloadMockPDF, generateDRE, generateBalancete, generateFluxoCaixa, generateInadimplencia, generateCustosPosto } from "@/lib/download-utils";

const reports = [
  { id: 1, name: "DRE - Março 2026", type: "DRE", date: "10/03/2026", size: "245 KB", generator: generateDRE },
  { id: 2, name: "Balancete - Fevereiro 2026", type: "Balancete", date: "05/03/2026", size: "320 KB", generator: generateBalancete },
  { id: 3, name: "Fluxo de Caixa Projetado - Q1 2026", type: "Projeção", date: "01/03/2026", size: "180 KB", generator: generateFluxoCaixa },
  { id: 4, name: "Relatório de Inadimplência", type: "Cobrança", date: "28/02/2026", size: "95 KB", generator: generateInadimplencia },
  { id: 5, name: "Análise de Custos por Posto", type: "Custos", date: "25/02/2026", size: "410 KB", generator: generateCustosPosto },
];

export default function RelatoriosFinanceiros() {
  const [open, setOpen] = useState(false);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); toast.success("Relatório financeiro gerado com sucesso!"); setOpen(false); };

  const handleDownload = (report: typeof reports[0]) => {
    const content = report.generator();
    downloadMockPDF(`${report.name.replace(/\s/g, "_")}.txt`, content);
    toast.success(`Download: ${report.name}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold">Relatórios Financeiros</h1><p className="text-muted-foreground">Relatórios e análises financeiras</p></div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button className="bg-primary hover:bg-primary/90"><BarChart3 className="h-4 w-4 mr-2" />Gerar Relatório</Button></DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>Gerar Relatório Financeiro</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Tipo de Relatório</Label>
                <Select><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dre">DRE - Demonstrativo de Resultado</SelectItem>
                    <SelectItem value="balancete">Balancete</SelectItem>
                    <SelectItem value="fluxo">Fluxo de Caixa Projetado</SelectItem>
                    <SelectItem value="inadimplencia">Relatório de Inadimplência</SelectItem>
                    <SelectItem value="custos">Análise de Custos por Posto</SelectItem>
                    <SelectItem value="receitas">Relatório de Receitas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Período Início</Label><Input type="date" required /></div>
                <div className="space-y-2"><Label>Período Fim</Label><Input type="date" required /></div>
              </div>
              <div className="space-y-2">
                <Label>Formato</Label>
                <Select defaultValue="pdf"><SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter><Button type="submit" className="bg-primary hover:bg-primary/90">Gerar Relatório</Button></DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {reports.map((r, i) => (
          <motion.div key={r.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="glass rounded-xl p-5 flex items-center justify-between hover:shadow-xl transition-all">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center"><FileText className="h-5 w-5 text-primary" /></div>
              <div><h3 className="font-semibold text-sm">{r.name}</h3><p className="text-xs text-muted-foreground">{r.type} • {r.date} • {r.size}</p></div>
            </div>
            <Button variant="outline" size="sm" onClick={() => handleDownload(r)}><Download className="h-4 w-4 mr-1" />Baixar</Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
