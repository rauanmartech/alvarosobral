import React, { useState, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import { ArrowRight } from "lucide-react";

// Assets
import sobreShape from '@/assets/elements/sobre-shape-2.webp';

import star from '@/assets/elements/star.png';

import { supabase } from "@/utils/supabase";

const Sobre = () => {
  const [photos, setPhotos] = useState<{ photo1: string; photo2: string }>({ photo1: "", photo2: "" });

  useEffect(() => {
    async function loadBiographicalPhotos() {
      try {
        const { data, error } = await supabase
          .from("biography_settings")
          .select("*")
          .eq("id", 1)
          .maybeSingle();

        if (error) {
          console.error("Error loading biographical photos:", error);
        } else if (data) {
          setPhotos({
            photo1: data.photo1_url || "",
            photo2: data.photo2_url || ""
          });
        }
      } catch (err) {
        console.error("Unexpected error loading biography photos:", err);
      }
    }
    loadBiographicalPhotos();
  }, []);
  return (
    <PageLayout>
      <div className="bg-[#fafafa] -mt-32 pt-32 min-h-screen">
        <style>{`
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes spin-slow-reverse {
            from { transform: rotate(0deg); }
            to { transform: rotate(-360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 20s linear infinite;
          }
          .animate-spin-slow-reverse {
            animation: spin-slow-reverse 20s linear infinite;
          }
        `}</style>

        <div className="relative min-h-[700px] overflow-visible pb-20">

          {/* Shape Image - Centered horizontally, aligned to TOP of Viewport */}
          <div className="absolute top-[-8rem] left-0 w-full h-[calc(100%+8rem)] pointer-events-none z-0 overflow-hidden lg:overflow-visible">
            <img
              src={sobreShape}
              alt="Sobre Shape"
              loading="eager"
              className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full object-contain object-top z-10 scale-[0.86] origin-top"
            />


          </div>

          <div className="container mx-auto px-6 relative z-10 pt-[85vw] lg:pt-20">
            <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-20">
 
              {/* Left Side: Content */}
              <div className="max-w-xl relative flex flex-col items-center lg:items-start text-center lg:text-left">
                <img
                  src={star}
                  alt=""
                  loading="lazy"
                  className="absolute left-1/2 lg:left-0 -translate-x-1/2 lg:translate-x-0 lg:-left-16 top-0 w-48 h-48 opacity-10 brightness-0 invert pointer-events-none z-0 rotate-12"
                />
                <p className="relative z-10 text-xl font-medium font-outfit text-black/60 mb-4 italic">Olá eu sou o Álvaro, um artista multidisciplinar</p>
                <h1 className="relative z-10 text-5xl md:text-7xl font-black font-outfit leading-[0.8] text-black uppercase mb-8">
                  UM ARTISTA <br />
                  <span className="italic font-light lowercase">multidisciplinar</span> <br />
                </h1>
                <p className="relative z-10 text-lg md:text-xl text-black/50 font-outfit mb-12 max-w-lg leading-relaxed">
                  Transformando visões em expressões brutas — de murais de rua a belas artes e criações digitais.
                </p>
                <a
                  href="https://wa.me/556493180314"
                  target="_blank"
                  className="relative z-10 inline-flex items-center justify-center gap-4 bg-[hsl(var(--accent-orange))] md:bg-black text-black md:text-white px-8 py-4 border-2 md:border-0 border-black rounded-full font-black font-outfit uppercase tracking-widest text-xs md:text-sm hover:bg-black md:hover:bg-[hsl(var(--accent-orange))] hover:text-white transition-all shadow-[4px_4px_0_0_black] md:shadow-none active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_black] md:active:translate-y-0 group w-full md:w-auto"
                >
                  Entre em Contato
                  <div className="w-8 h-8 bg-black md:bg-white rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform shrink-0">
                    <ArrowRight className="w-4 h-4 text-white md:text-[hsl(var(--accent-orange))]" />
                  </div>
                </a>

                {/* Mobile Statistics & Quote */}
                <div className="flex flex-col gap-y-12 mt-16 w-full lg:hidden text-center items-center">
                  <div className="bg-white/40 backdrop-blur-md p-6 rounded-3xl border border-black/5 shadow-sm max-w-sm text-left w-full">
                    <span className="text-4xl font-black block mb-2 leading-none text-[hsl(var(--accent-orange))]">"</span>
                    <p className="text-sm font-semibold leading-relaxed italic text-black/60 mb-4">
                      Se você pudesse dizer em palavras, não haveria necessidade de pintar
                    </p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-black/40 text-right">
                      — Edward Hopper
                    </p>
                  </div>
                  <div>
                    <p className="text-6xl font-black font-outfit text-black leading-none">8+</p>
                    <p className="text-[10px] font-bold font-outfit text-black/30 mt-2 uppercase tracking-[0.2em]">Anos de Experiência</p>
                  </div>
                </div>
              </div>
 
              {/* Right Side: Quote & Statistics (Desktop Only) */}
              <div className="hidden lg:flex flex-col gap-16 text-right w-full lg:w-auto mt-12 lg:mt-0 justify-end">
                <div className="bg-white/40 backdrop-blur-md p-6 rounded-3xl border border-black/5 shadow-sm max-w-[260px] text-left self-end">
                  <span className="text-4xl font-black block mb-2 leading-none text-[hsl(var(--accent-orange))]">"</span>
                  <p className="text-sm font-semibold leading-relaxed italic text-black/60 mb-4">
                    Se você pudesse dizer em palavras, não haveria necessidade de pintar
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-black/40 text-right">
                    — Edward Hopper
                  </p>
                </div>
                <div>
                  <p className="text-6xl font-black font-outfit text-black leading-none">8+</p>
                  <p className="text-xs font-bold font-outfit text-black/30 mt-2 uppercase tracking-[0.2em]">Anos de Experiência</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* New Content Sections */}
        <div className="container mx-auto px-6 pb-32 space-y-16 md:space-y-32">
 
          {/* Section 1: Text Left, Image Right */}
          <div className="flex flex-col md:flex-row items-stretch gap-12 lg:gap-24">
            <div className="flex-1 space-y-4 md:space-y-6 py-4 relative">
              <img
                src={star}
                alt=""
                className="absolute -left-12 -top-4 w-32 h-32 opacity-5 brightness-0 invert pointer-events-none z-0 -rotate-12"
              />
              <div className="flex items-center justify-between gap-4 w-full md:block">
                <h2 className="relative z-10 text-3xl md:text-5xl font-black font-outfit uppercase leading-tight flex-1 text-center md:text-left">
                  Sobre <br />
                  <span className="text-[hsl(var(--accent-orange))]">mim</span>
                </h2>
                
                {/* Mobile Photo (beside title) */}
                <div className="md:hidden w-24 h-24 sm:w-32 sm:h-32 shrink-0 bg-[#1a1a1a] border-2 border-black rounded-tl-[1.5rem] rounded-br-[1.5rem] rounded-tr-[0.5rem] rounded-bl-[0.5rem] shadow-[4px_4px_0_0_black] overflow-hidden relative">
                  {photos.photo1 ? (
                    <img src={photos.photo1} alt="Sobre Alvaro 1" loading="lazy" className="w-full h-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full border-2 border-dashed border-white/20 animate-spin-slow" />
                    </div>
                  )}
                </div>
              </div>
              <p className="relative z-10 text-lg text-black/70 font-outfit leading-relaxed text-center md:text-left">
                A arte sempre esteve presente na minha vida e foi logo na infância que percebi uma facilidade natural para atividades manuais, especialmente o desenho e a música.
                Eu fui uma criança curiosa e criativa, que passava horas criando histórias, construindo universos imaginários e observando as criaturas que surgiam nos desenhos naturais das paredes de madeira da casa onde morei.
                O tempo passou, o menino cresceu e junto com ele também cresceu a vontade de viver da arte. Aos 19 anos encontrei a oportunidade de transformar essa paixão em profissão. O que começou como um sonho se tornou um caminho de aprendizado e constante evolução.
                Hoje, após mais de oito anos de trajetória, continuo movido pela mesma curiosidade que me acompanhava na infância. A diferença é que agora encontrei novas formas de explorar, criar e compartilhar minha visão de mundo.
              </p>
            </div>
            <div className="flex-1 w-full min-h-[300px] hidden md:block">
              <div className="w-full h-full bg-[#1a1a1a] border-2 border-black rounded-tl-[5rem] rounded-br-[5rem] rounded-tr-[1.5rem] rounded-bl-[1.5rem] shadow-[12px_12px_0_0_black] overflow-hidden relative group transition-transform hover:-translate-y-1 duration-300 min-h-[350px]">
                {photos.photo1 ? (
                  <img src={photos.photo1} alt="Sobre Alvaro 1" loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full border-4 border-dashed border-white/10 flex items-center justify-center animate-spin-slow">
                      <div className="w-8 h-8 bg-[hsl(var(--accent-orange))] rounded-full opacity-20" />
                    </div>
                    <p className="absolute bottom-6 text-white/10 font-black uppercase tracking-[0.2em] text-[10px]">Bio Image 01</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Image Left, Text Right */}
          <div className="flex flex-col md:flex-row-reverse items-stretch gap-12 lg:gap-24">
            <div className="flex-1 space-y-4 md:space-y-6 text-center md:text-right py-4 relative">
              <img
                src={star}
                alt=""
                className="absolute -right-8 -top-4 w-32 h-32 opacity-5 brightness-0 invert pointer-events-none z-0 rotate-45"
              />
              <div className="flex items-center justify-between gap-4 w-full md:block">
                {/* Mobile Photo (beside title) */}
                <div className="md:hidden w-24 h-24 sm:w-32 sm:h-32 shrink-0 bg-[#1a1a1a] border-2 border-black rounded-tr-[1.5rem] rounded-bl-[1.5rem] rounded-tl-[0.5rem] rounded-br-[0.5rem] shadow-[4px_4px_0_0_black] overflow-hidden relative">
                  {photos.photo2 ? (
                    <img src={photos.photo2} alt="Sobre Alvaro 2" loading="lazy" className="w-full h-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full border-2 border-dashed border-white/20 animate-spin-slow" />
                    </div>
                  )}
                </div>

                <h2 className="relative z-10 text-3xl md:text-5xl font-black font-outfit uppercase leading-tight flex-1 text-center md:text-right">
                  Minha <br />
                  <span className="text-[hsl(var(--accent-orange))]">Filosofia</span>
                </h2>
              </div>
              <p className="relative z-10 text-lg text-black/70 font-outfit leading-relaxed text-center md:text-right">
                A arte me ensina a olhar com mais atenção. Para as pessoas, para os espaços, para a natureza e para os pequenos detalhes que muitas vezes passam despercebidos. É desse exercício de observação que nasce grande parte do meu trabalho.
                Acredito no valor do tempo e dos processos. Algumas ideias levam dias para amadurecer, outras levam meses. Por isso, procuro criar sem pressa, respeitando o caminho que cada projeto precisa percorrer até encontrar sua forma final.
                No fim, a arte é a forma que encontrei de deixar algo de mim no mundo. E existe um certo conforto em saber que, enquanto uma dessas criações continuar existindo, uma parte da minha história seguirá viva junto com ela.
              </p>
            </div>
            <div className="flex-1 w-full min-h-[300px] hidden md:block">
              <div className="w-full h-full bg-[#1a1a1a] border-2 border-black rounded-tr-[5rem] rounded-bl-[5rem] rounded-tl-[1.5rem] rounded-br-[1.5rem] shadow-[12px_12px_0_0_black] overflow-hidden relative group transition-transform hover:-translate-y-1 duration-300 min-h-[350px]">
                {photos.photo2 ? (
                  <img src={photos.photo2} alt="Sobre Alvaro 2" loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full border-4 border-dashed border-white/10 flex items-center justify-center animate-spin-slow">
                      <div className="w-8 h-8 bg-[hsl(var(--accent-orange))] rounded-full opacity-20" />
                    </div>
                    <p className="absolute bottom-6 text-white/10 font-black uppercase tracking-[0.2em] text-[10px]">Bio Image 02</p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Artistic Word Cloud "Piled" at the bottom */}
        <div className="container mx-auto px-6 pb-0 relative overflow-visible -translate-y-[30px]">
          <div className="flex flex-wrap justify-center items-end gap-3 md:gap-4 max-w-4xl mx-auto">
            {/* Word: Versátilidade */}
            <div className="px-8 py-3 bg-[hsl(var(--accent-orange))] text-white rounded-full font-black font-alpha uppercase tracking-widest text-sm shadow-[6px_6px_0_0_black] border-2 border-black rotate-[-3deg] hover:rotate-0 transition-transform">
              Versátilidade
            </div>
            {/* Word: Arte */}
            <div className="px-10 py-4 bg-[#1a1a1a] text-white rounded-full font-black font-alpha uppercase tracking-widest text-lg shadow-[6px_6px_0_0_black] border-2 border-black rotate-[5deg] hover:rotate-0 transition-transform translate-y-4">
              Arte
            </div>
            {/* Word: Tattoo */}
            <div className="px-8 py-3 bg-white text-black rounded-full font-black font-alpha uppercase tracking-widest text-sm shadow-[6px_6px_0_0_black] border-2 border-black rotate-[-8deg] hover:rotate-0 transition-transform">
              Tattoo
            </div>
            {/* Word: Graffiti */}
            <div className="px-9 py-3.5 bg-[hsl(var(--accent-orange))] text-white rounded-full font-black font-alpha uppercase tracking-widest text-md shadow-[6px_6px_0_0_black] border-2 border-black rotate-[2deg] hover:rotate-0 transition-transform translate-y-2">
              Graffiti
            </div>
            {/* Word: Digital */}
            <div className="px-8 py-3 bg-[#1a1a1a] text-white rounded-full font-black font-alpha uppercase tracking-widest text-sm shadow-[6px_6px_0_0_black] border-2 border-black rotate-[12deg] hover:rotate-0 transition-transform">
              Digital
            </div>
            {/* Word: Criatividade */}
            <div className="px-12 py-5 bg-white text-black rounded-full font-black font-alpha uppercase tracking-widest text-xl shadow-[8px_8px_0_0_black] border-2 border-black rotate-[-4deg] hover:rotate-0 transition-transform translate-y-6">
              Criatividade
            </div>
            {/* Word: Expressão */}
            <div className="px-7 py-3 bg-[#1a1a1a] text-white rounded-full font-black font-alpha uppercase tracking-widest text-xs shadow-[4px_4px_0_0_black] border-2 border-black rotate-[15deg] hover:rotate-0 transition-transform">
              Expressão
            </div>
            {/* Word: Muralismo */}
            <div className="px-8 py-3 bg-[hsl(var(--accent-orange))] text-white rounded-full font-black font-alpha uppercase tracking-widest text-sm shadow-[6px_6px_0_0_black] border-2 border-black rotate-[-10deg] hover:rotate-0 transition-transform translate-y-3">
              Muralismo
            </div>
            {/* Word: Originalidade */}
            <div className="px-10 py-4 bg-white text-black rounded-full font-black font-alpha uppercase tracking-widest text-md shadow-[6px_6px_0_0_black] border-2 border-black rotate-[6deg] hover:rotate-0 transition-transform">
              Originalidade
            </div>
            {/* Word: Cores */}
            <div className="px-6 py-2 bg-[#1a1a1a] text-white rounded-full font-black font-alpha uppercase tracking-widest text-xs shadow-[4px_4px_0_0_black] border-2 border-black rotate-[-15deg] hover:rotate-0 transition-transform translate-y-1">
              Cores
            </div>
            {/* Word: Autoral */}
            <div className="px-9 py-3.5 bg-[hsl(var(--accent-orange))] text-white rounded-full font-black font-alpha uppercase tracking-widest text-sm shadow-[6px_6px_0_0_black] border-2 border-black rotate-[8deg] hover:rotate-0 transition-transform">
              Autoral
            </div>
          </div>
        </div>

      </div>
    </PageLayout>
  );
};

export default Sobre;
