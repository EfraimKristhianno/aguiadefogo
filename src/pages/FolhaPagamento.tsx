import { Receipt, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const mockFolha = [
  { id: 1, employee: "Carlos Silva", salario: "R$ 2.200,00", extras: "R$ 450,00", descontos: "R$ 380,00", liquido: "R$ 2.270,00", status: "Pago" },
  { id: 2, employee: "Maria Santos", salario: "R$ 3.500,00", extras: "R$ 200,00", descontos: "R$ 620,00", liquido: "R$ 3.080,00", status: "Pago" },
  { id: 3, employee: "João Oliveira", salario: "R$ 2.200,00", extras: "R$ 0,00", descontos: "R$ 380,00", liquido: "R$ 1.820,00", status: "Pendente" },
  { id: 4, employee: "Ana Costa", salario: "R$ 1.800,00", extras: "R$ 150,00", descontos: "R$ 310,00", liquido: "R$ 1.640,00", status: "Pago" },
];

export default function FolhaPagamento() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Folha de Pagamento</h1>
          <p className="text-muted-foreground">Março 2026</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <Receipt className="h-4 w-4 mr-2" />
            Gerar Holerites
          </Button>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Funcionário</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Salário Base</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">H. Extras</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Descontos</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Líquido</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Status</th>
              <th className="text-right py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Holerite</th>
            </tr>
          </thead>
          <tbody>
            {mockFolha.map((f) => (
              <tr key={f.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                <td className="py-3 px-4 font-medium text-sm">{f.employee}</td>
                <td className="py-3 px-4 text-sm">{f.salario}</td>
                <td className="py-3 px-4 text-sm text-green-600">{f.extras}</td>
                <td className="py-3 px-4 text-sm text-red-500">{f.descontos}</td>
                <td className="py-3 px-4 text-sm font-semibold">{f.liquido}</td>
                <td className="py-3 px-4">
                  <Badge className={f.status === "Pago" ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"}>
                    {f.status}
                  </Badge>
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="ghost" size="sm">
                    <FileText className="h-4 w-4 mr-1" />
                    PDF
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
