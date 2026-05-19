import React from 'react';
import fotoTransparente from '@/assets/alvaro-foto-transparente.png';


const Hero: React.FC = () => {
  return (
    /*
     * MOBILE LAYOUT MATH (desktop is unchanged):
     * - section height  = 100vh - 128px  (so the bottom touches the viewport bottom)
     * - gap above title = top-4 = 16px
     * - h1 height       ≈ 3rem × 2 lines × 1.1 leading ≈ 106px
     * - title bottom    = 16 + 106 = 122px
     * - gap below title = same 16px  →  photo top must be at 138px
     * - photo height    = section_height - 138  = (100vh - 128) - 138 = 100vh - 266px
     * - orange circle: bottom-[-175px] so center = container bottom = photo bottom ✓
     */
    <section className="
      relative w-full flex flex-col items-center bg-white
      h-[calc(100vh-128px)] min-h-[500px]
      md:h-[calc(100vh-50px)] md:min-h-[800px]
    ">
      {/* Background Artistic Text - behind photo on mobile (z-[2] < photo z-10) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2] md:z-0 select-none pointer-events-none opacity-[0.03] whitespace-nowrap">
        <h2 className="text-[28vw] font-black uppercase leading-none font-syne tracking-tighter">
          ALVARO
        </h2>
      </div>

      {/* Main Title — mobile: absolute top-4; desktop: relative in flex flow */}
      <div className="
        absolute top-4 left-0 w-full z-20 px-6 text-center
        md:relative md:top-auto md:left-auto md:w-auto md:px-4 md:mb-4 md:mt-8 md:z-10
      ">
        <h1 className="
          text-[3rem] leading-[1.1]
          md:text-8xl md:leading-[0.95]
          font-extrabold font-syne tracking-tight
        ">
          Eu sou <span className="text-[hsl(var(--accent-orange))]">Álvaro</span>,<br />
          Seu Multiartista
        </h1>
      </div>

      <style>{`
        @keyframes floatA {
          0%, 100% { transform: translateY(0px) rotate(-4deg); }
          50% { transform: translateY(-14px) rotate(4deg); }
        }
        @keyframes floatB {
          0%, 100% { transform: translateY(0px) rotate(6deg); }
          50% { transform: translateY(-18px) rotate(-3deg); }
        }
        @keyframes floatC {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50% { transform: translateY(-12px) rotate(8deg); }
        }
      `}</style>

      {/* Hero Visual Container */}
      <div className="relative w-full flex-1 flex flex-col items-center justify-end overflow-hidden">
        {/* Orange Half-Moon / Circle */}
        {/* center of circle = container bottom → half-moon aligns with top of Meus Trabalhos */}
        <div className="absolute bottom-[-175px] md:bottom-[-220px] left-1/2 -translate-x-1/2 w-[350px] h-[350px] md:w-[600px] md:h-[600px] bg-[hsl(var(--accent-orange))] rounded-full z-0" />

        {/* The Photo — z-10 stays above watermark (z-[2]) */}
        <div className="relative z-10 w-full max-w-lg md:max-w-xl px-4 flex justify-center">
          <img
            src={fotoTransparente}
            alt="Álvaro"
            loading="eager"
            fetchPriority="high"
            className="
              w-auto object-contain object-bottom drop-shadow-2xl
              h-[calc(100vh-266px)]
              md:h-[78vh]
            "
          />
        </div>

        {/* Buttons — smaller & tighter on mobile, always on one line */}
        <div className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 z-20 bg-white p-1 md:p-1.5 rounded-full flex items-center shadow-xl border-2 md:border-4 border-white w-max">
          <button className="bg-[hsl(var(--accent-orange))] text-white px-5 py-2 md:px-8 md:py-3 rounded-full font-black text-sm md:text-lg flex items-center gap-1.5 transition-all hover:brightness-110 active:scale-95 whitespace-nowrap shrink-0">
            Portfolio <span className="text-base md:text-xl">↗</span>
          </button>
          <button className="bg-white text-black px-5 py-2 md:px-8 md:py-3 rounded-full font-black text-sm md:text-lg border border-black/70 md:border-2 md:border-black/80 ml-1 md:ml-2 transition-all hover:bg-black/5 active:scale-95 whitespace-nowrap shrink-0">
            Hire Me
          </button>
        </div>

        {/* Side Stats - Desktop Only */}
        <div className="absolute left-6 xl:left-12 bottom-20 hidden lg:flex flex-col gap-6 max-w-[180px] z-10 scale-90 xl:scale-100 origin-bottom-left">
          <div className="bg-white/40 backdrop-blur-md p-4 rounded-2xl border border-black/5 shadow-sm">
            <span className="text-3xl font-black block mb-1">"</span>
            <p className="text-xs font-semibold leading-relaxed italic text-black/60">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.
            </p>
          </div>
          <div>
            <p className="text-3xl font-black tracking-tighter">450+</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-black/40">Client Served</p>
          </div>
        </div>

        <div className="absolute right-6 xl:right-12 bottom-20 hidden lg:flex flex-col gap-6 items-end z-10 scale-90 xl:scale-100 origin-bottom-right">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(s => (
              <span key={s} className="text-[#FFB800] text-lg">★</span>
            ))}
          </div>
          <div className="text-right">
            <p className="text-3xl font-black tracking-tighter">10 Years</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-black/40">Experts</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
