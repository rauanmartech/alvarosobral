import React from "react";
import PageLayout from "@/components/PageLayout";
import { ArrowRight, Star } from "lucide-react";
import star from '@/assets/elements/star.png';

const ListaEspera = () => {
  const [formData, setFormData] = React.useState({
    email: "",
    nome: "",
    idade: "",
    cidade: "",
    whatsapp: "",
    instagram: "",
    jaTatuou: "",
    orcamento: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Inscrição enviada com sucesso!");
  };

  const cities = [
    "Goiânia", "Brasília", "Uberlândia", "Belo Horizonte", "São Paulo", "Rio de Janeiro", "Recife"
  ];

  return (
    <PageLayout>
      <div className="bg-[#fafafa] -mt-32 pt-40 pb-32 min-h-screen">
        <div className="container mx-auto px-6 max-w-4xl">
          
          {/* Header Section */}
          <div className="relative mb-16 text-center">
            <img 
              src={star} 
              alt="" 
              className="absolute left-1/2 -top-12 -translate-x-1/2 w-48 h-48 opacity-10 brightness-0 invert pointer-events-none z-0 rotate-12"
            />
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-white border-2 border-black rounded-tr-2xl rounded-bl-2xl rounded-tl-sm rounded-br-sm mb-6 shadow-[4px_4px_0_0_black] -rotate-2 relative z-10">
              <div className="w-2 h-2 bg-[hsl(var(--accent-orange))] rounded-full" />
              <span className="text-black text-[10px] font-black uppercase tracking-[0.2em] font-outfit">Lista de Espera</span>
            </div>
            <h1 className="relative z-10 text-5xl md:text-7xl font-black font-outfit leading-tight text-black uppercase">
              Lista de <br />
              <span className="text-[hsl(var(--accent-orange))]">Espera</span>
            </h1>
            <p className="mt-6 text-black/50 font-outfit max-w-lg mx-auto leading-relaxed">
              Quer que eu tatue na sua cidade? Preencha os dados abaixo e registre seu interesse.
            </p>
          </div>

          {/* Form Card */}
          <form 
            onSubmit={handleSubmit}
            className="relative bg-white border-4 border-black rounded-[3rem] p-8 md:p-12 shadow-[16px_16px_0_0_black] z-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* E-mail */}
              <div className="space-y-3">
                <label className="block text-sm font-black font-outfit uppercase tracking-wider text-black">
                  E-mail <span className="text-[hsl(var(--accent-orange)) text-xl">*</span>
                </label>
                <input 
                  required
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full px-6 py-4 bg-[#fafafa] border-2 border-black rounded-2xl font-outfit focus:outline-none focus:ring-4 focus:ring-[hsl(var(--accent-orange))/20] focus:border-[hsl(var(--accent-orange))] transition-all shadow-[4px_4px_0_0_black]"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              {/* Nome Completo */}
              <div className="space-y-3">
                <label className="block text-sm font-black font-outfit uppercase tracking-wider text-black">
                  Nome Completo <span className="text-[hsl(var(--accent-orange)) text-xl">*</span>
                </label>
                <input 
                  required
                  type="text"
                  placeholder="Como devemos te chamar?"
                  className="w-full px-6 py-4 bg-[#fafafa] border-2 border-black rounded-2xl font-outfit focus:outline-none focus:ring-4 focus:ring-[hsl(var(--accent-orange))/20] focus:border-[hsl(var(--accent-orange))] transition-all shadow-[4px_4px_0_0_black]"
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                />
              </div>

              {/* Idade */}
              <div className="space-y-3">
                <label className="block text-sm font-black font-outfit uppercase tracking-wider text-black">
                  Idade
                </label>
                <input 
                  type="number"
                  placeholder="Sua idade"
                  className="w-full px-6 py-4 bg-[#fafafa] border-2 border-black rounded-2xl font-outfit focus:outline-none focus:ring-4 focus:ring-[hsl(var(--accent-orange))/20] focus:border-[hsl(var(--accent-orange))] transition-all shadow-[4px_4px_0_0_black]"
                  onChange={(e) => setFormData({...formData, idade: e.target.value})}
                />
              </div>

              {/* Telefone / WhatsApp */}
              <div className="space-y-3">
                <label className="block text-sm font-black font-outfit uppercase tracking-wider text-black">
                  Telefone com WhatsApp <span className="text-[hsl(var(--accent-orange)) text-xl">*</span>
                </label>
                <input 
                  required
                  type="tel"
                  placeholder="(00) 00000-0000"
                  className="w-full px-6 py-4 bg-[#fafafa] border-2 border-black rounded-2xl font-outfit focus:outline-none focus:ring-4 focus:ring-[hsl(var(--accent-orange))/20] focus:border-[hsl(var(--accent-orange))] transition-all shadow-[4px_4px_0_0_black]"
                  onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                />
              </div>

              {/* Instagram */}
              <div className="space-y-3">
                <label className="block text-sm font-black font-outfit uppercase tracking-wider text-black">
                  Instagram
                </label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-black/30 font-black">@</span>
                  <input 
                    type="text"
                    placeholder="seu.perfil"
                    className="w-full pl-12 pr-6 py-4 bg-[#fafafa] border-2 border-black rounded-2xl font-outfit focus:outline-none focus:ring-4 focus:ring-[hsl(var(--accent-orange))/20] focus:border-[hsl(var(--accent-orange))] transition-all shadow-[4px_4px_0_0_black]"
                    onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                  />
                </div>
              </div>

              {/* Cidade */}
              <div className="space-y-3">
                <label className="block text-sm font-black font-outfit uppercase tracking-wider text-black">
                  Cidade onde mora <span className="text-[hsl(var(--accent-orange)) text-xl">*</span>
                </label>
                <select 
                  required
                  className="w-full px-6 py-4 bg-[#fafafa] border-2 border-black rounded-2xl font-outfit focus:outline-none focus:ring-4 focus:ring-[hsl(var(--accent-orange))/20] focus:border-[hsl(var(--accent-orange))] transition-all shadow-[4px_4px_0_0_black] appearance-none"
                  onChange={(e) => setFormData({...formData, cidade: e.target.value})}
                  value={formData.cidade}
                >
                  <option value="" disabled>Selecione uma cidade</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              {/* Já se tatuou? */}
              <div className="md:col-span-2 space-y-4 pt-4">
                <label className="block text-sm font-black font-outfit uppercase tracking-wider text-black">
                  Já se tatuou comigo? <span className="text-[hsl(var(--accent-orange)) text-xl">*</span>
                </label>
                <div className="flex flex-wrap gap-4">
                  {["Sim", "Não"].map((option) => (
                    <label key={option} className="flex-1 min-w-[120px] cursor-pointer group">
                      <input 
                        type="radio" 
                        name="jaTatuou" 
                        value={option}
                        required
                        className="peer hidden"
                        onChange={(e) => setFormData({...formData, jaTatuou: e.target.value})}
                      />
                      <div className="w-full py-4 text-center border-2 border-black rounded-2xl font-black font-outfit uppercase text-xs transition-all peer-checked:bg-[hsl(var(--accent-orange))] peer-checked:text-white peer-checked:shadow-none shadow-[4px_4px_0_0_black] hover:-translate-y-1 bg-[#fafafa]">
                        {option}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Orçamento? */}
              <div className="md:col-span-2 space-y-4 pt-4">
                <label className="block text-sm font-black font-outfit uppercase tracking-wider text-black">
                  Deseja fazer o orçamento do seu projeto? <span className="text-[hsl(var(--accent-orange)) text-xl">*</span>
                </label>
                <div className="flex flex-col gap-3">
                  {[
                    { val: "Sim", label: "Sim" },
                    { val: "Não", label: "Não, só quero entrar na lista por enquanto" }
                  ].map((option) => (
                    <label key={option.val} className="cursor-pointer group">
                      <input 
                        type="radio" 
                        name="orcamento" 
                        value={option.val}
                        required
                        className="peer hidden"
                        onChange={(e) => setFormData({...formData, orcamento: e.target.value})}
                      />
                      <div className="w-full px-6 py-4 border-2 border-black rounded-2xl font-black font-outfit uppercase text-xs transition-all peer-checked:bg-[#1a1a1a] peer-checked:text-white peer-checked:shadow-none shadow-[4px_4px_0_0_black] hover:translate-x-1 bg-[#fafafa] text-left">
                        {option.label}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

            </div>

            {/* Submit Button */}
            <div className="mt-12 flex justify-center w-full">
              <button 
                type="submit"
                className="bg-[hsl(var(--accent-orange))] text-white px-12 py-5 rounded-[2rem] flex items-center justify-center gap-4 font-black text-xl shadow-[8px_8px_0_0_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all group w-full md:w-auto"
              >
                Enviar Inscrição
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center transition-transform group-hover:translate-x-1 shrink-0">
                  <ArrowRight className="w-6 h-6 text-[hsl(var(--accent-orange))]" />
                </div>
              </button>
            </div>
          </form>

        </div>
      </div>
    </PageLayout>
  );
};

export default ListaEspera;
