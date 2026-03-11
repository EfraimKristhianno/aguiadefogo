import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import loginLogo from "@/assets/login-logo.png";
import logoHeader from "@/assets/logo-header.png";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // MVP: hardcoded admin credentials
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
      {/* Left – background image */}
      <div className="hidden lg:flex lg:w-3/5 bg-muted/50 items-center justify-center p-12">
        <img src={loginLogo} alt="Águia de Fogo" className="max-w-md w-full h-auto object-contain" />
      </div>

      {/* Right – login form */}
      <div className="flex-1 flex items-center justify-center bg-[hsl(0,0%,5%)] px-6">
        


















































































        
      </div>
    </div>);

}