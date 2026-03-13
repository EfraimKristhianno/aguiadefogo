import { useState, useEffect } from "react";
import { FileText, Download, Eye, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface FormularioQualidade {
  id: string;
  codigo: string;
  titulo: string;
  revisao: string;
  categoria: string;
  campos: any[];
  status: string;
}

export default function Qualidade() {
  const [formularios, setFormularios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedForm, setSelectedForm] = useState<FormularioQualidade | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [fillDialogOpen, setFillDialogOpen] = useState(false);

  useEffect(() => {
    fetchFormularios();
  }, []);

  const fetchFormularios = async () => {
    const { data, error } = await supabase
      .from("formularios_qualidade")
      .select("*")
      .order("codigo");
    if (error) {
      toast.error("Erro ao carregar formulários");
    } else {
      setFormularios(data || []);
    }
    setLoading(false);
  };

  const filtered = formularios.filter(
    (f) =>
      f.titulo.toLowerCase().includes(search.toLowerCase()) ||
      f.codigo.toLowerCase().includes(search.toLowerCase())
  );

  const openFillForm = (form: FormularioQualidade) => {
    setSelectedForm(form);
    setFormData({});
    setFillDialogOpen(true);
  };

  const handleFieldChange = (nome: string, value: string) => {
    setFormData((prev) => ({ ...prev, [nome]: value }));
  };

  const handleSubmitForm = async () => {
    if (!selectedForm) return;
    const { error } = await supabase.from("formularios_preenchidos").insert({
      formulario_id: selectedForm.id,
      dados: formData,
      status: "Preenchido",
    });
    if (error) {
      toast.error("Erro ao salvar formulário");
    } else {
      toast.success("Formulário salvo com sucesso!");
      setFillDialogOpen(false);
    }
  };

  const exportFormPDF = (form: FormularioQualidade) => {
    const content = `${form.codigo} - ${form.titulo} (${form.revisao})\n\nCategoria: ${form.categoria}\n\nCampos:\n${(form.campos as any[]).map((c: any) => `- ${c.label}`).join("\n")}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${form.codigo}_${form.titulo.replace(/\s/g, "_")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Formulário exportado!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Qualidade - Formulários RH</h1>
          <p className="text-muted-foreground">Gestão de formulários e documentos do SGQ</p>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar formulário..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Carregando...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((form, i) => (
            <motion.div
              key={form.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-xl p-5 space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <Badge variant="outline" className="text-xs">{form.codigo}</Badge>
                </div>
                <Badge className="text-xs">{form.revisao}</Badge>
              </div>
              <h3 className="font-semibold text-sm">{form.titulo}</h3>
              <p className="text-xs text-muted-foreground">
                {(form.campos as any[]).length} campos · {form.categoria.toUpperCase()}
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => openFillForm(form)}>
                  <Plus className="h-3 w-3 mr-1" />Preencher
                </Button>
                <Button size="sm" variant="ghost" onClick={() => exportFormPDF(form)}>
                  <Download className="h-3 w-3 mr-1" />PDF
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <Dialog open={fillDialogOpen} onOpenChange={setFillDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedForm?.codigo} - {selectedForm?.titulo}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            {selectedForm &&
              (selectedForm.campos as any[]).map((campo: any) => (
                <div key={campo.nome} className="space-y-1.5">
                  <Label>{campo.label}</Label>
                  {campo.tipo === "textarea" ? (
                    <Textarea
                      value={formData[campo.nome] || ""}
                      onChange={(e) => handleFieldChange(campo.nome, e.target.value)}
                    />
                  ) : campo.tipo === "select" ? (
                    <Select
                      value={formData[campo.nome] || ""}
                      onValueChange={(v) => handleFieldChange(campo.nome, v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                      <SelectContent>
                        {campo.opcoes?.map((op: string) => (
                          <SelectItem key={op} value={op}>{op}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      type={campo.tipo === "date" ? "date" : "text"}
                      value={formData[campo.nome] || ""}
                      onChange={(e) => handleFieldChange(campo.nome, e.target.value)}
                    />
                  )}
                </div>
              ))}
            <div className="flex gap-3 pt-4">
              <Button onClick={handleSubmitForm} className="flex-1">Salvar Formulário</Button>
              <Button variant="outline" onClick={() => setFillDialogOpen(false)}>Cancelar</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
