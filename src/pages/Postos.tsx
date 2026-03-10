import { Plus, MapPin, Users, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const mockPostos = [
  { id: 1, name: "Posto Central", client: "Condomínio Solar", address: "Rua das Flores, 123", guards: 4, status: "Operacional" },
  { id: 2, name: "Torre Norte", client: "Shopping Norte", address: "Av. Principal, 456", guards: 6, status: "Operacional" },
  { id: 3, name: "Portaria A", client: "Empresa ABC", address: "Rua Industrial, 789", guards: 2, status: "Operacional" },
  { id: 4, name: "Bloco B", client: "Hospital São Lucas", address: "Av. Saúde, 321", guards: 3, status: "Manutenção" },
];

export default function Postos() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Postos de Segurança</h1>
          <p className="text-muted-foreground">Gerenciar postos e locais de trabalho</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Novo Posto
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockPostos.map((posto, i) => (
          <motion.div
            key={posto.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass rounded-xl p-5 hover:shadow-xl transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{posto.name}</h3>
                  <p className="text-xs text-muted-foreground">{posto.client}</p>
                </div>
              </div>
              <Badge className={posto.status === "Operacional" ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-orange-100 text-orange-700 hover:bg-orange-100"}>
                {posto.status}
              </Badge>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{posto.address}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{posto.guards} vigilantes alocados</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
