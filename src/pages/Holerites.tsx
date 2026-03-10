import { ScrollText, Download, Search, Eye } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { downloadMockPDF, generateHoleritePDF } from "@/lib/download-utils";

const mockHolerites = [
  { id: 1, funcionario: "Carlos Silva", competencia: "Mar/2026", salarioBruto: "R$ 2.650,00", descontos: "R$ 380,00", liquido: "R$ 2.270,00", status: "Disponível" },
  { id: 2, funcionario: "Maria Santos", competencia: "Mar/2026", salarioBruto: "R$ 3.700,00", descontos: "R$ 620,00", liquido: "R$ 3.080,00", status: "Disponível" },
  { id: 3, funcionario: "João Oliveira", competencia: "Mar/2026", salarioBruto: "R$ 2.200,00", descontos: "R$ 380,00", liquido: "R$ 1.820,00", status: "Pendente" },
  { id: 4, funcionario: "Ana Costa", competencia: "Mar/2026", salarioBruto: "R$ 1.950,00", descontos: "R$ 310,00", liquido: "R$ 1.640,00", status: "Disponível" },
  { id: 5, funcionario: "Pedro Lima", competencia: "Mar/2026", salarioBruto: "R$ 2.200,00", descontos: "R$ 380,00", liquido: "R$ 1.820,00", status: "Disponível" },
];

export default function Holerites() {
  const [search, setSearch] = useState("");
  const filtered = mockHolerites.filter((h) => h.funcionario.toLowerCase().includes(search.toLowerCase()));

  const handleDownload = (h: typeof mockHolerites[0]) => {
    downloadMockPDF(`Holerite_${h.funcionario.replace(/\s/g, "_")}_${h.competencia.replace("/", "_")}.txt`, generateHoleritePDF(h.funcionario, h.competencia));
    toast.success(`Holerite de ${h.funcionario} baixado!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold">Holerites</h1><p className="text-muted-foreground">Contracheques dos funcionários</p></div>
        <Button className="bg-primary hover:bg-primary/90" onClick={() => toast.success("Holerites gerados com sucesso!")}><ScrollText className="h-4 w-4 mr-2" />Gerar Holerites</Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Buscar funcionário..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-xl overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b border-border bg-muted/30">
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Funcionário</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Competência</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Bruto</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Descontos</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Líquido</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Status</th>
            <th className="text-right py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Ações</th>
          </tr></thead>
          <tbody>
            {filtered.map((h) => (
              <tr key={h.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                <td className="py-3 px-4 font-medium text-sm">{h.funcionario}</td>
                <td className="py-3 px-4 text-sm">{h.competencia}</td>
                <td className="py-3 px-4 text-sm">{h.salarioBruto}</td>
                <td className="py-3 px-4 text-sm text-red-500">{h.descontos}</td>
                <td className="py-3 px-4 text-sm font-semibold">{h.liquido}</td>
                <td className="py-3 px-4"><Badge className={h.status === "Disponível" ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"}>{h.status}</Badge></td>
                <td className="py-3 px-4 text-right flex gap-1 justify-end">
                  <Button variant="ghost" size="sm"><Eye className="h-4 w-4 mr-1" />Ver</Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDownload(h)}><Download className="h-4 w-4 mr-1" />PDF</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
