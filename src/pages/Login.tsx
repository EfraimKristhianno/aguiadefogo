import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import loginLogo from "@/assets/logo-aguia-de-fogo.png";
import loginBg from "@/assets/login-bg.png";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (email === "admin@aguiadefogo.com.br" && password === "123456") {
      toast.success("Login realizado com sucesso!");
      navigate("/");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast.error("Credenciais inválidas. Verifique seu e-mail e senha.");
    } else {
      navigate("/");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left – login form with dark overlay */}
      <div className="w-full lg:w-[50%] flex items-center justify-center bg-black/90 px-6 relative">
        {/* Dark background for left side */}
        <div className="absolute inset-0 bg-black/75 z-0" />
        
        <div className="w-full max-w-md space-y-8 relative z-10">
          {/* Logo on top */}
          <div className="flex justify-center mb-2">
            <img src={loginLogo} alt="Águia de Fogo" className="h-20 w-auto object-contain" />
          </div>

          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Bem-vindo de volta
            </h1>
            <p className="text-sm text-white/50">
              Acesse o painel de gestão Águia de Fogo
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/70 text-sm">
                E-mail
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/25 focus:border-primary focus:ring-primary/30"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/70 text-sm">
                Senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 pr-10 bg-white/5 border-white/10 text-white placeholder:text-white/25 focus:border-primary focus:ring-primary/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" className="border-white/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                <Label htmlFor="remember" className="text-xs text-white/50 cursor-pointer">
                  Lembrar de mim
                </Label>
              </div>
              <button type="button" className="text-xs text-primary hover:text-primary/80 transition-colors">
                Esqueceu a senha?
              </button>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2.5 transition-all duration-200"
            >
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <p className="text-center text-xs text-white/30 pt-4">
            © {new Date().getFullYear()} Águia de Fogo – Segurança e Monitoramento
          </p>
        </div>
      </div>

      {/* Right – background image with logo */}
      <div
        className="hidden lg:flex lg:w-[50%] items-center justify-center relative"
        style={{
          backgroundImage: `url(${loginBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <img src={loginLogo} alt="Águia de Fogo" className="max-w-sm w-full h-auto object-contain drop-shadow-2xl" />
      </div>
    </div>
  );
}
