import { Settings, Bell, Shield, Palette, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";

export default function Configuracoes() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Configurações</h1>
        <p className="text-muted-foreground">Configurações gerais do sistema</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl p-6 space-y-5">
          <div className="flex items-center gap-3 mb-2">
            <Globe className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Dados da Empresa</h3>
          </div>
          <div className="space-y-3">
            <div><Label>Razão Social</Label><Input defaultValue="Águia de Fogo Segurança Ltda" className="mt-1" /></div>
            <div><Label>CNPJ</Label><Input defaultValue="12.345.678/0001-99" className="mt-1" /></div>
            <div><Label>Telefone</Label><Input defaultValue="(11) 3456-7890" className="mt-1" /></div>
            <div><Label>E-mail</Label><Input defaultValue="contato@aguiadefogo.com.br" className="mt-1" /></div>
          </div>
          <Button className="bg-primary hover:bg-primary/90">Salvar Alterações</Button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-xl p-6 space-y-5">
          <div className="flex items-center gap-3 mb-2">
            <Bell className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Notificações</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between"><div><p className="text-sm font-medium">Ocorrências</p><p className="text-xs text-muted-foreground">Receber alerta de novas ocorrências</p></div><Switch defaultChecked /></div>
            <div className="flex items-center justify-between"><div><p className="text-sm font-medium">Atrasos de Ponto</p><p className="text-xs text-muted-foreground">Notificar atrasos de funcionários</p></div><Switch defaultChecked /></div>
            <div className="flex items-center justify-between"><div><p className="text-sm font-medium">Contratos Vencendo</p><p className="text-xs text-muted-foreground">Alertar 30 dias antes do vencimento</p></div><Switch defaultChecked /></div>
            <div className="flex items-center justify-between"><div><p className="text-sm font-medium">Relatórios Automáticos</p><p className="text-xs text-muted-foreground">Enviar relatórios semanais por e-mail</p></div><Switch /></div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-xl p-6 space-y-5">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Segurança</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between"><div><p className="text-sm font-medium">Autenticação 2 Fatores</p><p className="text-xs text-muted-foreground">Exigir 2FA para todos os usuários</p></div><Switch /></div>
            <div className="flex items-center justify-between"><div><p className="text-sm font-medium">Expiração de Sessão</p><p className="text-xs text-muted-foreground">Deslogar após 8 horas de inatividade</p></div><Switch defaultChecked /></div>
            <div className="flex items-center justify-between"><div><p className="text-sm font-medium">Log de Atividades</p><p className="text-xs text-muted-foreground">Registrar todas as ações do sistema</p></div><Switch defaultChecked /></div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-xl p-6 space-y-5">
          <div className="flex items-center gap-3 mb-2">
            <Palette className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Aparência</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between"><div><p className="text-sm font-medium">Modo Escuro</p><p className="text-xs text-muted-foreground">Ativar tema escuro</p></div><Switch /></div>
            <div className="flex items-center justify-between"><div><p className="text-sm font-medium">Sidebar Compacta</p><p className="text-xs text-muted-foreground">Iniciar com menu lateral recolhido</p></div><Switch /></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
