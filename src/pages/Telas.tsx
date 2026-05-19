import React, { useState, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import { Instagram, ArrowRight } from "lucide-react";

// Assets
import telaShape from '@/assets/elements/tela-shape.png';
import blobFace from '@/assets/blobs/face.png';
import blobPaint from '@/assets/blobs/paint.png';
import blobSpray from '@/assets/blobs/spray.png';
import star from '@/assets/elements/star.png';

import { supabase } from "@/utils/supabase";

interface Artwork {
  id: string;
  title: string;
  image: string;
  isStarred: boolean;
}

const Telas = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);

  useEffect(() => {
    async function loadTelas() {
      try {
        const { data, error } = await supabase
          .from("portfolio_telas")
          .select("*")
          .order("created_at", { ascending: true });

        if (error) {
          console.error("Error loading telas:", error);
        } else if (data && data.length > 0) {
          setArtworks(data.map(item => ({
            id: item.id,
            title: item.title,
            image: item.image_url || "",
            isStarred: item.is_starred
          })));
          return;
        }
      } catch (err) {
        console.error("Unexpected error loading telas:", err);
      }

      // Fallback
      const initial = Array.from({ length: 9 }, (_, i) => ({
        id: `c-${i}`,
        title: `Tela Canvas #${i + 1}`,
        image: "",
        isStarred: i === 0
      }));
      setArtworks(initial);
    }
    loadTelas();
  }, []);

  const starredItem = artworks.find(item => item.isStarred) || artworks[0];
  const otherItems = artworks.filter(item => item.id !== (starredItem?.id || ""));

  return (
    <PageLayout>
      <style>{`
        @keyframes floatA {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
        }
        @keyframes floatB {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(-3deg); }
        }
        @keyframes floatC {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
        }
      `}</style>

      {/* Banner Section */}
      <section className="relative bg-[#1a1a1a] rounded-[3rem] mb-20 min-h-[600px] flex items-center overflow-hidden">
        <div className="container mx-auto px-6 py-12 lg:py-0 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            
            {/* Left Side: Content */}
            <div className="flex-1 z-10 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="inline-flex items-center gap-3 px-6 py-2 bg-white border-2 border-black rounded-tr-2xl rounded-bl-2xl rounded-tl-sm rounded-br-sm mb-8 shadow-[4px_4px_0_0_black] -rotate-2">
                <div className="w-2 h-2 bg-[hsl(var(--accent-orange))] rounded-full" />
                <span className="text-black text-[10px] font-black uppercase tracking-[0.2em] font-alpha">Portfólio de Telas</span>
              </div>

              <div className="relative w-full">
                <img 
                  src={star} 
                  alt="" 
                  loading="lazy"
                  className="absolute left-1/2 lg:left-0 -translate-x-1/2 lg:translate-x-0 lg:-left-20 top-1/2 -translate-y-1/2 w-56 h-56 opacity-20 brightness-0 invert pointer-events-none z-0 rotate-12"
                />
                <h1 className="relative z-10 text-6xl md:text-8xl font-black font-outfit mb-6 leading-[0.9] text-white uppercase">
                  UNIVERSO <br />
                  <span className="text-[hsl(var(--accent-orange))]">EM TELAS</span>
                </h1>
              </div>

              <p className="text-lg md:text-xl text-white/50 font-outfit mb-10 max-w-xl leading-relaxed">
                Nas telas, minha arte encontra a pausa e a profundidade. É onde exploro texturas, camadas e a liberdade do pincel. Cada quadro é um fragmento de um universe particular que convida à contemplação.
              </p>

              {/* Info Bar - UX Improved (Differentiating Info vs Action) */}
              <div className="flex flex-col md:flex-row items-center gap-6 mb-10 w-full lg:w-fit p-1">
                {/* Info Card 1 */}
                <div className="bg-white/5 border-2 border-dashed border-white/20 px-6 h-20 rounded-2xl flex flex-col justify-center min-w-[180px] w-full md:w-auto relative group overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[hsl(var(--accent-orange))] opacity-50" />
                  <p className="text-white/30 text-[10px] font-black uppercase tracking-widest mb-1">Técnica</p>
                  <p className="text-white font-bold font-outfit">Acrílica & Mista</p>
                </div>
                
                {/* Info Card 2 */}
                <div className="bg-white/5 border-2 border-dashed border-white/20 px-6 h-20 rounded-2xl flex flex-col justify-center min-w-[180px] w-full md:w-auto relative group overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[hsl(var(--accent-orange))] opacity-50" />
                  <p className="text-white/30 text-[10px] font-black uppercase tracking-widest mb-1">Estilo</p>
                  <p className="text-white font-bold font-outfit">Expressivo & Autoral</p>
                </div>

                {/* Primary Action Button - Stays Pop Art */}
                <a 
                  href="https://wa.me/556493180314" 
                  target="_blank" 
                  className="bg-[hsl(var(--accent-orange))] text-white border-2 border-black px-8 h-20 rounded-2xl flex items-center justify-center gap-4 font-black text-lg shadow-[4px_4px_0_0_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all w-full md:w-auto min-w-[200px]"
                >
                  Adquirir
                  <div className="w-8 h-8 bg-white border-2 border-black rounded-full flex items-center justify-center text-black">
                    <ArrowRight size={18} />
                  </div>
                </a>
              </div>
            </div>

            {/* Right Side: Visual Container (Shapes, Image, and Blobs) - Mobile: flows below text, Desktop: absolute on the right */}
            <div className="relative w-full lg:absolute lg:top-0 lg:right-0 lg:h-full lg:w-1/2 flex justify-center items-center min-h-[350px] lg:min-h-0 z-0">
              {/* Geometric Background Shapes */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[500px] md:h-[500px] bg-[hsl(var(--accent-orange))] rounded-full opacity-10 z-0" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] md:w-[550px] md:h-[550px] border border-white/5 rounded-full z-0" />
              <div className="absolute top-[48%] left-[52%] -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] md:w-[480px] md:h-[480px] border-2 border-dashed border-[hsl(var(--accent-orange))]/20 rounded-full z-0" />

              {/* Main Shape Image */}
              <img 
                src={telaShape} 
                alt="Tela Shape" 
                loading="eager"
                fetchPriority="high"
                className="relative z-10 w-full max-w-[260px] md:max-w-none h-auto object-contain object-center lg:object-right lg:scale-[0.87] lg:origin-right"
              />

              {/* Floating Blobs */}
              <img 
                src={blobPaint} 
                alt="" 
                loading="lazy"
                className="absolute z-30 pointer-events-none select-none w-[55px] md:w-[90px] top-[8%] left-[8%] lg:left-auto lg:right-[82%]" 
                style={{ animation: 'floatA 5s ease-in-out infinite' }} 
              />
              <img 
                src={blobFace} 
                alt="" 
                loading="lazy"
                className="absolute z-30 pointer-events-none select-none w-[45px] md:w-[75px] bottom-[15%] left-[12%] lg:left-auto lg:right-[72%]" 
                style={{ animation: 'floatB 6s ease-in-out infinite' }} 
              />
              <img 
                src={blobSpray} 
                alt="" 
                loading="lazy"
                className="absolute z-30 pointer-events-none select-none w-[40px] md:w-[60px] top-[40%] right-[8%] lg:right-auto lg:top-[calc(45%+90px)] lg:right-[calc(12%-90px)]" 
                style={{ animation: 'floatC 7s ease-in-out infinite' }} 
              />
            </div>

          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <div className="container mx-auto px-6 pb-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between items-center md:items-end text-center md:text-left mb-16 gap-6">
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-5xl font-black font-outfit uppercase leading-none">
              Obras <br />
              <span className="text-[hsl(var(--accent-orange))]">Disponíveis</span>
            </h2>
            <p className="text-black/40 font-outfit mt-4 max-w-sm">Uma coleção de pinturas originais que exploram a essência da forma e da cor em suportes tradicionais.</p>
          </div>
          <div className="flex gap-4 w-full md:w-auto justify-center">
            <a href="https://instagram.com" target="_blank" className="flex items-center justify-center w-full md:w-auto gap-3 bg-black text-white px-6 py-3 rounded-2xl font-black shadow-[4px_4px_0_0_hsl(var(--accent-orange))] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all font-outfit uppercase text-sm">
              <Instagram className="w-5 h-5" />
              Ver no Insta
            </a>
          </div>
        </div>
        
        {/* Custom Grid Layout - Mobile: 3 columns (2x2 principal + 1x1 others) */}
        <div className="grid grid-cols-3 gap-3 md:gap-8">
          {/* Card 1: Large - 2x2 */}
          {starredItem && (
            <div className="col-span-2 row-span-2 aspect-square md:aspect-auto bg-[#1a1a1a] border-2 border-black/5 rounded-tl-[3rem] md:rounded-tl-[6rem] rounded-br-[3rem] md:rounded-br-[6rem] rounded-tr-[1rem] md:rounded-tr-[1.5rem] rounded-bl-[1rem] md:rounded-bl-[1.5rem] shadow-[6px_6px_0_0_black] md:shadow-[12px_12px_0_0_black] flex flex-col items-end justify-start p-3 md:p-10 group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden [transform:translate3d(0,0,0)] isolation-isolate md:min-h-[500px] lg:min-h-[600px]">
              {starredItem.image ? (
                <img src={starredItem.image} alt={starredItem.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-12 h-12 md:w-20 md:h-20 rounded-full border-4 border-dashed border-white/10 mb-2 md:mb-6 flex items-center justify-center animate-spin-slow">
                    <div className="w-6 h-6 md:w-10 md:h-10 bg-[hsl(var(--accent-orange))] rounded-full opacity-20" />
                  </div>
                </div>
              )}
              <div className="relative z-10 bg-zinc-900 border-2 border-black p-1.5 md:p-3.5 rounded-lg md:rounded-xl shadow-[2px_2px_0_0_black] md:shadow-[3px_3px_0_0_black] w-full md:max-w-xs mt-auto flex items-center gap-1 md:gap-2 -rotate-1">
                <div className="w-1.5 h-1.5 bg-[hsl(var(--accent-orange))] rounded-full shrink-0 animate-pulse" />
                <p className="text-white font-black text-[8px] md:text-sm uppercase font-outfit tracking-wider leading-tight truncate">{starredItem.title}</p>
              </div>
            </div>
          )}

          {/* Cards 2-12 - 1x1 */}
          {otherItems.map((item, index) => (
            <div 
              key={item.id} 
              className={`bg-[#1a1a1a] border-2 border-black/5 shadow-[4px_4px_0_0_black] md:shadow-[12px_12px_0_0_black] flex flex-col items-end justify-start p-2.5 md:p-8 group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden [transform:translate3d(0,0,0)] isolation-isolate aspect-square md:aspect-auto md:min-h-[280px] ${
                index % 2 === 0 
                  ? 'rounded-tr-[1.5rem] md:rounded-tr-[3rem] rounded-bl-[1.5rem] md:rounded-bl-[3rem] rounded-tl-[0.5rem] md:rounded-tl-[0.75rem] rounded-br-[0.5rem] md:rounded-br-[0.75rem]' 
                  : 'rounded-tl-[1.5rem] md:rounded-tl-[3rem] rounded-br-[1.5rem] md:rounded-br-[3rem] rounded-tr-[0.5rem] md:rounded-tr-[0.75rem] rounded-bl-[0.5rem] md:rounded-bl-[0.75rem]'
              }`}
            >
              {item.image ? (
                <img src={item.image} alt={item.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-white/5 rounded-lg md:rounded-2xl" />
                </div>
              )}
              <div className="relative z-10 bg-zinc-900 border-2 border-black p-1 md:p-2.5 rounded md:rounded-lg shadow-[1.5px_1.5px_0_0_black] md:shadow-[2.5px_2.5px_0_0_black] w-full mt-auto flex items-center gap-1 md:gap-1.5 rotate-1">
                <div className="w-1.5 h-1.5 bg-[hsl(var(--accent-orange))] rounded-full shrink-0" />
                <p className="text-white font-black uppercase font-outfit tracking-wider text-[7px] md:text-[10px] truncate">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default Telas;
