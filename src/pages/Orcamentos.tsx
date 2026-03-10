import { Plus, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const mockOrcamentos = [
  { id: 1, client: "Novo Condomínio XYZ", date: "08/03/2026", postos: 3, valor: "R$ 18.000/mês", status: "Pendente" },
  { id: 2, client: "Empresa Tech", date: "05/03/2026", postos: 2, valor: "R$ 10.000/mês", status: "Aprovado" },
  { id: 3, client: "Escola Municipal", date: "01/03/2026", postos: 1, valor: "R$ 5.500/mês", status: "Recusado" },
];

export default function Orcamentos() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Orçamentos</h1>
          <p className="text-muted-foreground">Propostas para novos clientes</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Novo Orçamento
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockOrcamentos.map((orc, i) => (
          <motion.div
            key={orc.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass rounded-xl p-5"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                <FileText className="h-5 w-5 text-secondary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">{orc.client}</h3>
                <p className="text-xs text-muted-foreground">{orc.date}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Postos</span><span>{orc.postos}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Valor</span><span className="font-semibold">{orc.valor}</span></div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Status</span>
                <Badge className={
                  orc.status === "Aprovado" ? "bg-green-100 text-green-700 hover:bg-green-100"
                  : orc.status === "Pendente" ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                  : "bg-red-100 text-red-700 hover:bg-red-100"
                }>{orc.status}</Badge>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
