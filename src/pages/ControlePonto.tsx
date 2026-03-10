import { Clock, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const mockPonto = [
  { id: 1, employee: "Carlos Silva", date: "10/03/2026", entrada: "06:00", saida: "14:00", location: "Lat -23.55, Lng -46.63", status: "Regular" },
  { id: 2, employee: "Maria Santos", date: "10/03/2026", entrada: "14:00", saida: "22:00", location: "Lat -23.54, Lng -46.64", status: "Regular" },
  { id: 3, employee: "João Oliveira", date: "10/03/2026", entrada: "06:15", saida: "14:00", location: "Lat -23.56, Lng -46.62", status: "Atraso" },
  { id: 4, employee: "Ana Costa", date: "10/03/2026", entrada: "22:00", saida: "06:00", location: "Lat -23.55, Lng -46.65", status: "Regular" },
];

export default function ControlePonto() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Controle de Ponto</h1>
        <p className="text-muted-foreground">Registro de entrada e saída dos funcionários</p>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Funcionário</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Data</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Entrada</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Saída</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Localização</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockPonto.map((p) => (
              <tr key={p.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                <td className="py-3 px-4 font-medium text-sm">{p.employee}</td>
                <td className="py-3 px-4 text-sm text-muted-foreground">{p.date}</td>
                <td className="py-3 px-4 text-sm"><Clock className="h-3 w-3 inline mr-1" />{p.entrada}</td>
                <td className="py-3 px-4 text-sm"><Clock className="h-3 w-3 inline mr-1" />{p.saida}</td>
                <td className="py-3 px-4 text-xs text-muted-foreground"><MapPin className="h-3 w-3 inline mr-1" />{p.location}</td>
                <td className="py-3 px-4">
                  <Badge className={p.status === "Regular" ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-orange-100 text-orange-700 hover:bg-orange-100"}>
                    {p.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
