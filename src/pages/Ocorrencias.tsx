import { Plus, AlertTriangle, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const mockOcorrencias = [
  { id: 1, type: "Invasão", posto: "Posto Central", description: "Tentativa de acesso não autorizado pela porta lateral.", date: "10/03/2026 03:45", photos: 2, status: "Aberta" },
  { id: 2, type: "Vandalismo", posto: "Condomínio Sol", description: "Vidro da guarita quebrado durante a madrugada.", date: "09/03/2026 22:10", photos: 3, status: "Em análise" },
  { id: 3, type: "Furto", posto: "Shopping Norte", description: "Furto de equipamento na área de carga.", date: "08/03/2026 15:30", photos: 1, status: "Resolvida" },
];

export default function Ocorrencias() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Ocorrências</h1>
          <p className="text-muted-foreground">Registro e acompanhamento de ocorrências</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Nova Ocorrência
        </Button>
      </div>

      <div className="space-y-4">
        {mockOcorrencias.map((occ, i) => (
          <motion.div
            key={occ.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass rounded-xl p-5 hover:shadow-xl transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{occ.type}</h3>
                    <Badge className={
                      occ.status === "Aberta" ? "bg-red-100 text-red-700 hover:bg-red-100"
                      : occ.status === "Em análise" ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                      : "bg-green-100 text-green-700 hover:bg-green-100"
                    }>
                      {occ.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{occ.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{occ.posto}</span>
                    <span>{occ.date}</span>
                    <span className="flex items-center gap-1"><Camera className="h-3 w-3" />{occ.photos} fotos</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
