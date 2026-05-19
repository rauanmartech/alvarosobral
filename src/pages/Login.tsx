import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { ArrowRight, Lock, User, Eye, EyeOff } from "lucide-react";
import star from "@/assets/elements/star.png";
import { supabase } from "@/utils/supabase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/admin");
      }
    };
    checkSession();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Preencha todos os campos!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (signInError) {
        setError(signInError.message || "E-mail ou senha incorretos.");
      } else {
        navigate("/admin");
      }
    } catch (err: any) {
      setError("Erro inesperado. Tente novamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className="-mt-32 pt-32 min-h-[70vh] flex items-center justify-center pb-20 px-6 relative overflow-hidden bg-[#fafafa]">
        {/* Background elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-[hsl(var(--accent-orange))] rounded-full opacity-5 pointer-events-none blur-3xl" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-black rounded-full opacity-5 pointer-events-none blur-3xl" />
        
        {/* Decorative Star */}
        <img 
          src={star} 
          alt="" 
          className="absolute -right-16 -top-16 w-48 h-48 opacity-10 pointer-events-none rotate-45"
        />
        
        {/* Creative Login Card */}
        <div className="relative w-full max-w-md bg-white border-4 border-black p-8 md:p-10 rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-[1rem] rounded-bl-[1rem] shadow-[12px_12px_0_0_black] z-10 transition-transform duration-300 hover:-translate-y-1">
          
          {/* Pop-art badge */}
          <div className="absolute -top-6 left-8 bg-[hsl(var(--accent-orange))] text-white border-2 border-black px-6 py-2 rounded-full font-black text-sm uppercase tracking-widest shadow-[4px_4px_0_0_black] -rotate-3 font-syne">
            Acesso Restrito
          </div>

          <div className="text-center mt-4 mb-8">
            <h1 className="text-4xl font-black font-syne uppercase tracking-tight text-black">
              ADMIN <span className="text-[hsl(var(--accent-orange))]">AREA</span>
            </h1>
            <p className="text-sm font-medium text-black/50 font-outfit mt-2">
              Identifique-se para gerenciar o portfólio.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-500 text-red-700 text-sm font-semibold rounded-xl flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="block text-xs font-black uppercase tracking-widest text-black font-syne">
                E-mail
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-black/40">
                  <User size={18} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  className="block w-full pl-12 pr-4 py-4 bg-white border-2 border-black rounded-xl font-bold text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent-orange))] focus:border-black transition-all"
                  placeholder="seu@email.com"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-black uppercase tracking-widest text-black font-syne">
                  Senha
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-black/40">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  className="block w-full pl-12 pr-12 py-4 bg-white border-2 border-black rounded-xl font-bold text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent-orange))] focus:border-black transition-all"
                  placeholder="Sua senha secreta"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-black/40 hover:text-black transition-colors"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-8 bg-black text-white px-8 py-4 rounded-2xl font-black text-lg shadow-[6px_6px_0_0_hsl(var(--accent-orange))] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center justify-center gap-4 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Entrando..." : "Entrar"}
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center transition-transform group-hover:translate-x-1">
                <ArrowRight className="w-5 h-5 text-[hsl(var(--accent-orange))]" />
              </div>
            </button>
          </form>
        </div>
      </div>
    </PageLayout>
  );
};

export default Login;
