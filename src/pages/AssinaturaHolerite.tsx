import { PenTool, CheckCircle, Clock, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const mockAssinaturas = [
  { id: 1, funcionario: "Carlos Silva", competencia: "Mar/2026", enviadoEm: "05/03/2026", assinadoEm: "06/03/2026", status: "Assinado" },
  { id: 2, funcionario: "Maria Santos", competencia: "Mar/2026", enviadoEm: "05/03/2026", assinadoEm: "07/03/2026", status: "Assinado" },
  { id: 3, funcionario: "João Oliveira", competencia: "Mar/2026", enviadoEm: "05/03/2026", assinadoEm: "—", status: "Pendente" },
  { id: 4, funcionario: "Ana Costa", competencia: "Mar/2026", enviadoEm: "05/03/2026", assinadoEm: "06/03/2026", status: "Assinado" },
  { id: 5, funcionario: "Pedro Lima", competencia: "Mar/2026", enviadoEm: "05/03/2026", assinadoEm: "—", status: "Pendente" },
];

export default function AssinaturaHolerite() {
  const assinados = mockAssinaturas.filter((a) => a.status === "Assinado").length;
  const pendentes = mockAssinaturas.filter((a) => a.status === "Pendente").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Assinatura Digital</h1>
          <p className="text-muted-foreground">Assinatura digital de holerites</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90"><PenTool className="h-4 w-4 mr-2" />Enviar para Assinatura</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl p-5 text-center">
          <p className="text-3xl font-bold">{mockAssinaturas.length}</p>
          <p className="text-sm text-muted-foreground">Total Enviados</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="glass rounded-xl p-5 text-center">
          <p className="text-3xl font-bold text-green-600">{assinados}</p>
          <p className="text-sm text-muted-foreground">Assinados</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-xl p-5 text-center">
          <p className="text-3xl font-bold text-orange-500">{pendentes}</p>
          <p className="text-sm text-muted-foreground">Pendentes</p>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-xl overflow-hidden">
        <div className="table-scroll">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Funcionário</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Competência</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Enviado em</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Assinado em</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockAssinaturas.map((a) => (
              <tr key={a.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                <td className="py-3 px-4 font-medium text-sm">{a.funcionario}</td>
                <td className="py-3 px-4 text-sm">{a.competencia}</td>
                <td className="py-3 px-4 text-sm text-muted-foreground">{a.enviadoEm}</td>
                <td className="py-3 px-4 text-sm text-muted-foreground">{a.assinadoEm}</td>
                <td className="py-3 px-4">
                  <Badge className={a.status === "Assinado" ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"}>
                    {a.status === "Assinado" ? <CheckCircle className="h-3 w-3 mr-1" /> : <Clock className="h-3 w-3 mr-1" />}
                    {a.status}
                  </Badge>
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
