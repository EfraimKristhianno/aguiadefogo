import { ClipboardCheck, CheckCircle, Circle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const mockChecklists = [
  { id: 1, employee: "Carlos Silva", posto: "Posto Central", date: "10/03/2026", completed: 8, total: 10, status: "Parcial" },
  { id: 2, employee: "Maria Santos", posto: "Condomínio Sol", date: "10/03/2026", completed: 10, total: 10, status: "Completo" },
  { id: 3, employee: "Ana Costa", posto: "Empresa ABC", date: "10/03/2026", completed: 5, total: 10, status: "Em andamento" },
];

export default function Checklists() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Checklists de Segurança</h1>
          <p className="text-muted-foreground">Acompanhamento de rondas e verificações</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <ClipboardCheck className="h-4 w-4 mr-2" />
          Novo Checklist
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockChecklists.map((cl, i) => (
          <motion.div
            key={cl.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass rounded-xl p-5"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-sm">{cl.employee}</h3>
                <p className="text-xs text-muted-foreground">{cl.posto} • {cl.date}</p>
              </div>
              <Badge className={
                cl.status === "Completo" ? "bg-green-100 text-green-700 hover:bg-green-100"
                : cl.status === "Parcial" ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                : "bg-blue-100 text-blue-700 hover:bg-blue-100"
              }>
                {cl.status}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progresso</span>
                <span className="font-medium">{cl.completed}/{cl.total}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${(cl.completed / cl.total) * 100}%` }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
