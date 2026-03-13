import { useState, useEffect } from "react";
import { FolderOpen, Upload, Download, Trash2, User, FileText, ChevronRight, ChevronsUpDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface Funcionario {
  id: string;
  nome: string;
  cargo: string;
  status: string;
}

interface Documento {
  id: string;
  categoria: string;
  nome_arquivo: string;
  arquivo_url: string;
  created_at: string;
  mes_referencia: string | null;
}

const CATEGORIAS = [
  { value: "holerites", label: "Holerites", icon: "💰" },
  { value: "comprovantes_holerite", label: "Comprovantes de Holerite", icon: "📄" },
  { value: "folha_ponto", label: "Folha Ponto", icon: "⏰" },
  { value: "documentos_pessoais", label: "Documentos Pessoais", icon: "🪪" },
  { value: "ficha_registro", label: "Ficha de Registro", icon: "📋" },
  { value: "recibos_va_vt", label: "Recibos V.A / V.T", icon: "🎫" },
  { value: "comprovantes", label: "Comprovantes Diversos", icon: "📎" },
  { value: "avaliacao_desempenho", label: "Avaliação de Desempenho", icon: "⭐" },
  { value: "medida_disciplinar", label: "Medida Disciplinar", icon: "⚠️" },
  { value: "ficha_epi", label: "Ficha de E.P.I", icon: "🦺" },
  { value: "admissionais", label: "Documentos Admissionais", icon: "📝" },
];

export default function DocumentosFuncionario() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [selectedFunc, setSelectedFunc] = useState<Funcionario | null>(null);
  const [selectedCategoria, setSelectedCategoria] = useState<string | null>(null);
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [uploadCategoria, setUploadCategoria] = useState("");
  const [comboOpen, setComboOpen] = useState(false);

  useEffect(() => {
    fetchFuncionarios();
  }, []);

  useEffect(() => {
    if (selectedFunc) fetchDocumentos();
  }, [selectedFunc, selectedCategoria]);

  const fetchFuncionarios = async () => {
    const { data } = await supabase
      .from("funcionarios")
      .select("id, nome, cargo, status")
      .order("nome");
    setFuncionarios(data || []);
    setLoading(false);
  };

  const fetchDocumentos = async () => {
    if (!selectedFunc) return;
    let query = supabase
      .from("documentos_funcionario")
      .select("*")
      .eq("funcionario_id", selectedFunc.id)
      .order("created_at", { ascending: false });
    if (selectedCategoria) query = query.eq("categoria", selectedCategoria);
    const { data } = await query;
    setDocumentos(data || []);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0] || !selectedFunc || !uploadCategoria) return;
    setUploading(true);
    const file = e.target.files[0];
    const path = `${selectedFunc.id}/${uploadCategoria}/${Date.now()}_${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from("documentos-funcionarios")
      .upload(path, file);

    if (uploadError) {
      toast.error("Erro no upload: " + uploadError.message);
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("documentos-funcionarios")
      .getPublicUrl(path);

    const { error: dbError } = await supabase.from("documentos_funcionario").insert({
      funcionario_id: selectedFunc.id,
      categoria: uploadCategoria,
      nome_arquivo: file.name,
      arquivo_url: urlData.publicUrl,
      storage_path: path,
    });

    if (dbError) {
      toast.error("Erro ao salvar registro");
    } else {
      toast.success("Documento enviado com sucesso!");
      fetchDocumentos();
      setUploadDialogOpen(false);
    }
    setUploading(false);
  };

  const handleDelete = async (doc: Documento) => {
    const docFull = await supabase
      .from("documentos_funcionario")
      .select("storage_path")
      .eq("id", doc.id)
      .single();

    if (docFull.data?.storage_path) {
      await supabase.storage.from("documentos-funcionarios").remove([docFull.data.storage_path]);
    }
    await supabase.from("documentos_funcionario").delete().eq("id", doc.id);
    toast.success("Documento removido");
    fetchDocumentos();
  };


  const getCategoriaLabel = (val: string) =>
    CATEGORIAS.find((c) => c.value === val)?.label || val;

  // Breadcrumb view
  if (selectedFunc) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <button onClick={() => { setSelectedFunc(null); setSelectedCategoria(null); }} className="hover:text-foreground transition-colors">
            Funcionários
          </button>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-medium">{selectedFunc.nome}</span>
          {selectedCategoria && (
            <>
              <ChevronRight className="h-3 w-3" />
              <span className="text-foreground font-medium">{getCategoriaLabel(selectedCategoria)}</span>
            </>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{selectedFunc.nome}</h1>
            <p className="text-muted-foreground">{selectedFunc.cargo} · {selectedFunc.status}</p>
          </div>
          <Button onClick={() => setUploadDialogOpen(true)}>
            <Upload className="h-4 w-4 mr-2" />Enviar Documento
          </Button>
        </div>

        {!selectedCategoria ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {CATEGORIAS.map((cat, i) => (
              <motion.button
                key={cat.value}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => setSelectedCategoria(cat.value)}
                className="glass rounded-xl p-5 text-left hover:ring-2 hover:ring-primary/30 transition-all"
              >
                <span className="text-2xl">{cat.icon}</span>
                <h3 className="font-semibold text-sm mt-2">{cat.label}</h3>
              </motion.button>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            <Button variant="ghost" size="sm" onClick={() => setSelectedCategoria(null)}>
              ← Voltar às categorias
            </Button>
            {documentos.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <FolderOpen className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Nenhum documento nesta categoria</p>
              </div>
            ) : (
              <div className="space-y-2">
                {documentos.map((doc) => (
                  <div key={doc.id} className="glass rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">{doc.nome_arquivo}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(doc.created_at).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" asChild>
                        <a href={doc.arquivo_url} target="_blank" rel="noopener noreferrer">
                          <Download className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button size="sm" variant="ghost" className="text-destructive" onClick={() => handleDelete(doc)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Enviar Documento</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-1.5">
                <Label>Categoria</Label>
                <Select value={uploadCategoria} onValueChange={setUploadCategoria}>
                  <SelectTrigger><SelectValue placeholder="Selecione a categoria" /></SelectTrigger>
                  <SelectContent>
                    {CATEGORIAS.map((c) => (
                      <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Arquivo</Label>
                <Input type="file" onChange={handleUpload} disabled={!uploadCategoria || uploading} />
              </div>
              {uploading && <p className="text-sm text-muted-foreground">Enviando...</p>}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // Dropdown selection view
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Documentos de Funcionários</h1>
        <p className="text-muted-foreground">Selecione um funcionário para gerenciar seus documentos</p>
      </div>

      <Popover open={comboOpen} onOpenChange={setComboOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={comboOpen}
            className="w-full max-w-md justify-between h-11"
          >
            {selectedFunc ? selectedFunc.nome : "Selecione um funcionário..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full max-w-md p-0">
          <Command>
            <CommandInput placeholder="Pesquisar funcionário..." />
            <CommandList>
              <CommandEmpty>Nenhum funcionário encontrado.</CommandEmpty>
              <CommandGroup>
                {funcionarios.map((func) => (
                  <CommandItem
                    key={func.id}
                    value={func.nome}
                    onSelect={() => {
                      setSelectedFunc(func);
                      setSelectedCategoria(null);
                      setComboOpen(false);
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", selectedFunc?.id === func.id ? "opacity-100" : "opacity-0")} />
                    <div className="flex items-center gap-2 flex-1">
                      <User className="h-4 w-4 text-primary" />
                      <span>{func.nome}</span>
                      <span className="text-xs text-muted-foreground ml-auto">{func.cargo}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
