import { Eye, Camera, Wifi, WifiOff, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const mockCameras = [
  { id: 1, name: "Câmera 01 - Entrada", posto: "Posto Central", status: "Online", lastActivity: "10/03/2026 08:32" },
  { id: 2, name: "Câmera 02 - Estacionamento", posto: "Posto Central", status: "Online", lastActivity: "10/03/2026 08:30" },
  { id: 3, name: "Câmera 03 - Recepção", posto: "Shopping Norte", status: "Offline", lastActivity: "09/03/2026 23:15" },
  { id: 4, name: "Câmera 04 - Garagem", posto: "Condomínio Solar", status: "Online", lastActivity: "10/03/2026 08:31" },
  { id: 5, name: "Câmera 05 - Portaria", posto: "Hospital São Lucas", status: "Online", lastActivity: "10/03/2026 08:29" },
  { id: 6, name: "Câmera 06 - Corredor B", posto: "Empresa ABC", status: "Manutenção", lastActivity: "08/03/2026 10:00" },
];

export default function Monitoramento() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Monitoramento</h1>
        <p className="text-muted-foreground">Central de monitoramento e câmeras</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl p-5 text-center">
          <p className="text-3xl font-bold text-green-600">4</p>
          <p className="text-sm text-muted-foreground">Câmeras Online</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="glass rounded-xl p-5 text-center">
          <p className="text-3xl font-bold text-red-500">1</p>
          <p className="text-sm text-muted-foreground">Offline</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-xl p-5 text-center">
          <p className="text-3xl font-bold text-orange-500">1</p>
          <p className="text-sm text-muted-foreground">Manutenção</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass rounded-xl p-5 text-center">
          <p className="text-3xl font-bold">5</p>
          <p className="text-sm text-muted-foreground">Postos Monitorados</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockCameras.map((cam, i) => (
          <motion.div key={cam.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass rounded-xl overflow-hidden">
            <div className="h-40 bg-muted/50 flex items-center justify-center">
              <Camera className="h-12 w-12 text-muted-foreground/30" />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-sm">{cam.name}</h3>
                  <p className="text-xs text-muted-foreground">{cam.posto}</p>
                </div>
                <Badge className={
                  cam.status === "Online" ? "bg-green-100 text-green-700 hover:bg-green-100"
                  : cam.status === "Offline" ? "bg-red-100 text-red-700 hover:bg-red-100"
                  : "bg-orange-100 text-orange-700 hover:bg-orange-100"
                }>
                  {cam.status === "Online" ? <Wifi className="h-3 w-3 mr-1" /> : <WifiOff className="h-3 w-3 mr-1" />}
                  {cam.status}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Última atividade: {cam.lastActivity}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
