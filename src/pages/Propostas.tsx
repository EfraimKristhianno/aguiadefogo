import { Plus, FileSignature, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const mockPropostas = [
  { id: 1, client: "Supermercado BigBom", date: "08/03/2026", valor: "R$ 22.000/mês", postos: 3, validade: "08/04/2026", status: "Enviada" },
  { id: 2, client: "Condomínio Jardim", date: "05/03/2026", valor: "R$ 15.000/mês", postos: 2, validade: "05/04/2026", status: "Aprovada" },
  { id: 3, client: "Indústria MetalPro", date: "01/03/2026", valor: "R$ 35.000/mês", postos: 4, validade: "01/04/2026", status: "Em negociação" },
  { id: 4, client: "Faculdade Central", date: "25/02/2026", valor: "R$ 18.000/mès", postos: 2, validade: "25/03/2026", status: "Recusada" },
];

export default function Propostas() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Propostas Comerciais</h1>
          <p className="text-muted-foreground">Gerenciar propostas enviadas a clientes</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90"><Plus className="h-4 w-4 mr-2" />Nova Proposta</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockPropostas.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass rounded-xl p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center"><FileSignature className="h-5 w-5 text-primary" /></div>
                <div>
                  <h3 className="font-semibold text-sm">{p.client}</h3>
                  <p className="text-xs text-muted-foreground">Criada em {p.date}</p>
                </div>
              </div>
              <Badge className={
                p.status === "Aprovada" ? "bg-green-100 text-green-700 hover:bg-green-100"
                : p.status === "Enviada" ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                : p.status === "Em negociação" ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                : "bg-red-100 text-red-700 hover:bg-red-100"
              }>{p.status}</Badge>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Valor</span><span className="font-semibold">{p.valor}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Postos</span><span>{p.postos}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Validade</span><span>{p.validade}</span></div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
