import React from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import Hero from "@/components/Hero";
import tattooImg from "@/assets/tattoo-card.jpg";
import muralImg from "@/assets/mura-card.jpg";
import telasImg from "@/assets/telas-card.jpg";
import digitalImg from "@/assets/digital-card.jpg";
import alvaro2 from "@/assets/elements/alvaro2.png";
import blobFace from "@/assets/blobs/face.png";
import blobPaint from "@/assets/blobs/paint.png";
import blobSpray from "@/assets/blobs/spray.png";
import blobTattoo from "@/assets/blobs/tattoo.png";
import blobPen from "@/assets/blobs/pen.png";
import { Instagram, Mail, MessageCircle, ArrowRight } from "lucide-react";

const blobMap = {
  tattoo: blobTattoo,
  graffiti: blobSpray,
  telas: blobPaint,
  ilustracoes: blobPen,
  all: blobFace
};

const areas = [
  { to: "/tattoo", label: "Tattoo" },
  { to: "/graffiti", label: "Graffiti / Mural" },
  { to: "/telas", label: "Telas" },
  { to: "/ilustracoes", label: "Ilustrações Digitais" },
];

import clickPng from "@/assets/elements/click.png";
import starImg from "@/assets/elements/star.png";

const Index = () => {
  const [activeArea, setActiveArea] = React.useState('tattoo');
  const [displayText, setDisplayText] = React.useState('na pele');
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [cycleIndex, setCycleIndex] = React.useState(0);

  const areas = ['tattoo', 'graffiti', 'telas', 'ilustracoes', 'all'];
  const activeIndex = areas.indexOf(activeArea);
  const images = [tattooImg, muralImg, telasImg, digitalImg];

  const aboutContent: Record<string, { titleSuffix: string, text: string, link: string }> = {
    tattoo: {
      titleSuffix: "na pele",
      text: "Minha jornada na tatuagem é sobre transformar histórias e significados em arte eterna. Especializado em traços finos e composições autorais, busco sempre a harmonia entre o design e a anatomia do corpo.",
      link: "/tattoo"
    },
    graffiti: {
      titleSuffix: "na rua",
      text: "O graffiti e o muralismo me permitem ocupar o espaço urbano com cores e mensagens. Cada parede é uma tela gigante onde a escala monumental encontra a expressão artística das ruas.",
      link: "/graffiti"
    },
    telas: {
      titleSuffix: "na tela",
      text: "Na pintura em tela, exploro texturas e camadas que a arte digital não alcança. É o meu momento de experimentação pura, onde o erro e o acerto se misturam em composições uniques.",
      link: "/telas"
    },
    ilustracoes: {
      titleSuffix: "no digital",
      text: "As ilustrações digitais são onde a tecnologia encontra a criatividade sem limites. De concept arts a peças publicitárias, utilizo ferramentas modernas para dar vida a mundos imaginários.",
      link: "/ilustracoes"
    },
    all: {
      titleSuffix: "em todo lugar",
      text: "Para mim, a arte não tem fronteiras. Seja na pele, nos muros, nas telas ou no digital, a essência é a mesma: expressar o inexpressável e colorir o mundo com novas perspectivas.",
      link: "/contato"
    }
  };

  // Timer for 'all' mode cycling - now runs all the time
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCycleIndex(prev => (prev + 1) % 4);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Typewriter effect logic
  React.useEffect(() => {
    const targetText = aboutContent[activeArea].titleSuffix;

    if (displayText === targetText && !isDeleting) return;

    const timeout = setTimeout(() => {
      if (isDeleting) {
        // Deleting phase
        if (displayText.length > 0) {
          setDisplayText(prev => prev.slice(0, -1));
        } else {
          setIsDeleting(false);
        }
      } else {
        // Typing phase
        if (displayText !== targetText) {
          const nextChar = targetText.slice(0, displayText.length + 1);
          setDisplayText(nextChar);
        }
      }
    }, isDeleting ? 30 : 60);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, activeArea]);

  // Trigger delete phase when activeArea changes
  React.useEffect(() => {
    if (displayText !== aboutContent[activeArea].titleSuffix) {
      setIsDeleting(true);
    }
  }, [activeArea]);

  return (
    <PageLayout>
      <Hero />

      {/* Works Section - Dark Theme */}
      <div className="container mx-auto px-6 mb-24">
        <section className="bg-[#1a1a1a] px-4 md:px-12 py-12 md:py-20 rounded-[1.5rem] md:rounded-[3rem]">
          <div className="max-w-6xl mx-auto">

          {/* Section Header */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left md:flex-row md:justify-between mb-12 gap-6">
            <h2 className="text-4xl md:text-5xl font-black font-outfit leading-tight">
              <span className="text-white">Meus </span>
              <span className="text-[hsl(var(--accent-orange))]">Trabalhos</span>
            </h2>
            <p className="text-white/40 max-w-xs text-sm leading-relaxed font-outfit md:self-center">
              Explore as diversas áreas de atuação onde transformo ideias em experiências visuais impactantes.
            </p>
          </div>

          {/* Separator */}
          <div className="w-full h-[1px] bg-white/10 mb-12" />

          {/* Cards Grid — 2 cols on mobile, 4 on desktop */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10">
            {/* Tattoo Card - Full Image */}
            <Link
              to="/tattoo"
              className="group relative rounded-[1.5rem] md:rounded-[2rem] transition-all duration-300 hover:-translate-y-1 shadow-[6px_6px_0_0_hsl(var(--accent-orange))] md:shadow-[8px_8px_0_0_hsl(var(--accent-orange))] hover:shadow-[4px_4px_0_0_hsl(var(--accent-orange))] min-h-[200px] md:min-h-[340px]"
            >
              <div className="absolute inset-0 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden">
                <img
                  src={tattooImg}
                  alt="Tattoo"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* Pop-art floating label */}
              <div className="absolute top-5 left-0 right-0 flex justify-center md:left-5 md:right-auto md:inline-flex z-10">
                <span className="inline-block bg-white text-black font-black text-lg uppercase tracking-widest px-5 py-2 rounded-full border-2 border-black shadow-[4px_4px_0_0_black] group-hover:shadow-[2px_2px_0_0_black] group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all duration-200 font-outfit">
                  Tattoo
                </span>
              </div>
              {/* Arrow button */}
              <div className="absolute bottom-5 right-5 z-10">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-lg font-bold shadow-[4px_4px_0_0_black] border-2 border-black group-hover:scale-110 transition-transform duration-300">
                  <ArrowRight className="w-6 h-6 text-[hsl(var(--accent-orange))]" />
                </div>
              </div>
            </Link>

            {/* Graffiti / Mural Card - Full Image */}
            <Link
              to="/graffiti"
              className="group relative rounded-[1.5rem] md:rounded-[2rem] transition-all duration-300 hover:-translate-y-1 shadow-[6px_6px_0_0_hsl(var(--accent-orange))] md:shadow-[8px_8px_0_0_hsl(var(--accent-orange))] hover:shadow-[4px_4px_0_0_hsl(var(--accent-orange))] min-h-[200px] md:min-h-[340px]"
            >
              <div className="absolute inset-0 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden">
                <img
                  src={muralImg}
                  alt="Graffiti / Mural"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* Pop-art floating label */}
              <div className="absolute top-5 left-0 right-0 flex justify-center md:left-5 md:right-auto md:inline-flex z-10">
                <span className="inline-block bg-white text-black font-black text-lg uppercase tracking-widest px-5 py-2 rounded-full border-2 border-black shadow-[4px_4px_0_0_black] group-hover:shadow-[2px_2px_0_0_black] group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all duration-200 font-outfit">
                  Graffiti
                </span>
              </div>
              {/* Arrow button */}
              <div className="absolute bottom-5 right-5 z-10">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-lg font-bold shadow-[4px_4px_0_0_black] border-2 border-black group-hover:scale-110 transition-transform duration-300">
                  <ArrowRight className="w-6 h-6 text-[hsl(var(--accent-orange))]" />
                </div>
              </div>
            </Link>

            {/* Telas Card - Full Image */}
            <Link
              to="/telas"
              className="group relative rounded-[1.5rem] md:rounded-[2rem] transition-all duration-300 hover:-translate-y-1 shadow-[6px_6px_0_0_hsl(var(--accent-orange))] md:shadow-[8px_8px_0_0_hsl(var(--accent-orange))] hover:shadow-[4px_4px_0_0_hsl(var(--accent-orange))] min-h-[200px] md:min-h-[340px]"
            >
              <div className="absolute inset-0 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden">
                <img
                  src={telasImg}
                  alt="Telas"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* Pop-art floating label */}
              <div className="absolute top-5 left-0 right-0 flex justify-center md:left-5 md:right-auto md:inline-flex z-10">
                <span className="inline-block bg-white text-black font-black text-lg uppercase tracking-widest px-5 py-2 rounded-full border-2 border-black shadow-[4px_4px_0_0_black] group-hover:shadow-[2px_2px_0_0_black] group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all duration-200 font-outfit">
                  Telas
                </span>
              </div>
              {/* Arrow button */}
              <div className="absolute bottom-5 right-5 z-10">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-lg font-bold shadow-[4px_4px_0_0_black] border-2 border-black group-hover:scale-110 transition-transform duration-300">
                  <ArrowRight className="w-6 h-6 text-[hsl(var(--accent-orange))]" />
                </div>
              </div>
            </Link>

            {/* Ilustrações Digitais Card - Full Image */}
            <Link
              to="/ilustracoes"
              className="group relative rounded-[1.5rem] md:rounded-[2rem] transition-all duration-300 hover:-translate-y-1 shadow-[6px_6px_0_0_hsl(var(--accent-orange))] md:shadow-[8px_8px_0_0_hsl(var(--accent-orange))] hover:shadow-[4px_4px_0_0_hsl(var(--accent-orange))] min-h-[200px] md:min-h-[340px]"
            >
              <div className="absolute inset-0 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden">
                <img
                  src={digitalImg}
                  alt="Ilustrações Digitais"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* Pop-art floating label */}
              <div className="absolute top-5 left-0 right-0 flex justify-center md:left-5 md:right-auto md:inline-flex z-10">
                <span className="inline-block bg-white text-black font-black text-lg uppercase tracking-widest px-5 py-2 rounded-full border-2 border-black shadow-[4px_4px_0_0_black] group-hover:shadow-[2px_2px_0_0_black] group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all duration-200 font-outfit">
                  Digital
                </span>
              </div>
              {/* Arrow button */}
              <div className="absolute bottom-5 right-5 z-10">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-lg font-bold shadow-[4px_4px_0_0_black] border-2 border-black group-hover:scale-110 transition-transform duration-300">
                  <ArrowRight className="w-6 h-6 text-[hsl(var(--accent-orange))]" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>

      <div className="container mx-auto px-6">
        {/* Intro / Sobre Section */}
        <section className="mb-24 pt-20">
          <div className="flex flex-col lg:flex-row items-center gap-16">

            {/* Text Content */}
            <div className="flex-1 max-w-2xl transition-all duration-500 relative">
              <style>{`
                @keyframes blob-pop {
                  0% { transform: translate(-50%, -50%) scale(0.5) rotate(-15deg); opacity: 0; }
                  60% { transform: translate(-50%, -50%) scale(1.1) rotate(5deg); opacity: 1; }
                  100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); opacity: 1; }
                }
                .animate-blob-pop {
                  animation: blob-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                }
              `}</style>
              <div className="relative flex items-center justify-center lg:justify-start w-full mb-8 min-h-[120px]">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 opacity-10 pointer-events-none z-0">
                  <img
                    key={activeArea}
                    src={blobMap[activeArea as keyof typeof blobMap]}
                    alt=""
                    loading="lazy"
                    className="w-32 h-32 md:w-[130px] md:h-[130px] animate-blob-pop object-contain block"
                  />
                </div>
                <h2 className="relative z-10 text-4xl md:text-5xl font-black uppercase tracking-tight font-outfit w-full text-center lg:text-left">
                  Arte <br />
                  <span className="text-[hsl(var(--accent-orange))]">
                    {displayText}
                    <span className="animate-pulse ml-1 inline-block w-[3px] h-[0.8em] bg-[hsl(var(--accent-orange))] align-middle" />
                  </span>
                </h2>
              </div>
              <p className="relative z-10 text-xl font-medium leading-relaxed text-black/70 font-outfit mb-8 min-h-[120px] text-center lg:text-left">
                {aboutContent[activeArea].text}
              </p>
              <Link to={aboutContent[activeArea].link} className="flex justify-center lg:justify-start">
                <button className="bg-black text-white px-8 py-4 rounded-2xl font-black text-lg shadow-[6px_6px_0_0_hsl(var(--accent-orange))] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center gap-4 group">
                  Saiba Mais
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center transition-transform group-hover:translate-x-1">
                    <ArrowRight className="w-5 h-5 text-[hsl(var(--accent-orange))]" />
                  </div>
                </button>
              </Link>

              {/* Mobile-only: horizontal 5-button selector */}
              <div className="flex lg:hidden flex-row justify-center gap-3 mt-6">
                <button
                  onClick={() => setActiveArea('tattoo')}
                  className={`w-12 h-12 overflow-hidden rounded-tl-2xl rounded-br-2xl transition-all duration-300 hover:scale-110 shrink-0 ${activeArea === 'tattoo' ? 'grayscale-0 shadow-lg border-2 border-[hsl(var(--accent-orange))]' : 'grayscale opacity-50 hover:opacity-100'}`}
                >
                  <img src={tattooImg} alt="" className="w-full h-full object-cover" />
                </button>
                <button
                  onClick={() => setActiveArea('graffiti')}
                  className={`w-12 h-12 overflow-hidden rounded-tr-2xl rounded-bl-2xl transition-all duration-300 hover:scale-110 shrink-0 ${activeArea === 'graffiti' ? 'grayscale-0 shadow-lg border-2 border-[hsl(var(--accent-orange))]' : 'grayscale opacity-50 hover:opacity-100'}`}
                >
                  <img src={muralImg} alt="" className="w-full h-full object-cover" />
                </button>
                <button
                  onClick={() => setActiveArea('telas')}
                  className={`w-12 h-12 overflow-hidden rounded-bl-2xl rounded-tr-2xl transition-all duration-300 hover:scale-110 shrink-0 ${activeArea === 'telas' ? 'grayscale-0 shadow-lg border-2 border-[hsl(var(--accent-orange))]' : 'grayscale opacity-50 hover:opacity-100'}`}
                >
                  <img src={telasImg} alt="" className="w-full h-full object-cover" />
                </button>
                <button
                  onClick={() => setActiveArea('ilustracoes')}
                  className={`w-12 h-12 overflow-hidden rounded-br-2xl rounded-tl-2xl transition-all duration-300 hover:scale-110 shrink-0 ${activeArea === 'ilustracoes' ? 'grayscale-0 shadow-lg border-2 border-[hsl(var(--accent-orange))]' : 'grayscale opacity-50 hover:opacity-100'}`}
                >
                  <img src={digitalImg} alt="" className="w-full h-full object-cover" />
                </button>
                <button
                  onClick={() => setActiveArea('all')}
                  className={`w-12 h-12 overflow-hidden rounded-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center bg-black shrink-0 ${activeArea === 'all' ? 'grayscale-0 border-2 border-[hsl(var(--accent-orange))] shadow-lg' : 'grayscale opacity-50 hover:opacity-100'}`}
                >
                  <img src={images[cycleIndex]} alt="" className="w-full h-full object-cover" />
                </button>
              </div>

              {/* Mobile-only: Click helper message */}
              <div className="flex lg:hidden items-center justify-center gap-1.5 mt-4 text-[10px] font-bold text-black/40 uppercase tracking-widest font-outfit">
                <img src={clickPng} alt="" className="w-4 h-4 opacity-40 animate-pulse" />
                <span>clique para mudar</span>
              </div>
            </div>

            {/* Diagram Section Wrapper (Sidebar + Main Grid) */}
            <div className="flex items-center gap-4">

              {/* Sidebar Mini-Thumbnails — desktop only */}
              <div className="relative hidden lg:flex flex-col gap-3">
                {/* Sliding Indicator */}
                <img
                  src={clickPng}
                  alt=""
                  className="absolute -left-6 z-20 w-12 h-12 pointer-events-none transition-all duration-500 ease-in-out"
                  style={{
                    transform: `translateY(${activeIndex * (64 + 12)}px)`,
                    top: '25px'
                  }}
                />

                {/* Mini [1] - Tattoo */}
                <button
                  onClick={() => setActiveArea('tattoo')}
                  className={`w-12 h-12 md:w-16 md:h-16 overflow-hidden rounded-tl-2xl rounded-br-2xl transition-all duration-300 hover:scale-110 ${activeArea === 'tattoo' ? 'grayscale-0 shadow-lg border-2 border-[hsl(var(--accent-orange))]' : 'grayscale opacity-50 hover:opacity-100'}`}
                >
                  <img src={tattooImg} alt="" className="w-full h-full object-cover" />
                </button>
                {/* Mini [2] - Mural */}
                <button
                  onClick={() => setActiveArea('graffiti')}
                  className={`w-12 h-12 md:w-16 md:h-16 overflow-hidden rounded-tr-2xl rounded-bl-2xl transition-all duration-300 hover:scale-110 ${activeArea === 'graffiti' ? 'grayscale-0 shadow-lg border-2 border-[hsl(var(--accent-orange))]' : 'grayscale opacity-50 hover:opacity-100'}`}
                >
                  <img src={muralImg} alt="" className="w-full h-full object-cover" />
                </button>
                {/* Mini [3] - Telas */}
                <button
                  onClick={() => setActiveArea('telas')}
                  className={`w-12 h-12 md:w-16 md:h-16 overflow-hidden rounded-bl-2xl rounded-tr-2xl transition-all duration-300 hover:scale-110 ${activeArea === 'telas' ? 'grayscale-0 shadow-lg border-2 border-[hsl(var(--accent-orange))]' : 'grayscale opacity-50 hover:opacity-100'}`}
                >
                  <img src={telasImg} alt="" className="w-full h-full object-cover" />
                </button>
                {/* Mini [4] - Digital */}
                <button
                  onClick={() => setActiveArea('ilustracoes')}
                  className={`w-12 h-12 md:w-16 md:h-16 overflow-hidden rounded-br-2xl rounded-tl-2xl transition-all duration-300 hover:scale-110 ${activeArea === 'ilustracoes' ? 'grayscale-0 shadow-lg border-2 border-[hsl(var(--accent-orange))]' : 'grayscale opacity-50 hover:opacity-100'}`}
                >
                  <img src={digitalImg} alt="" className="w-full h-full object-cover" />
                </button>
                {/* Mini [5] - All */}
                <button
                  onClick={() => setActiveArea('all')}
                  className={`w-12 h-12 md:w-16 md:h-16 overflow-hidden rounded-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center bg-black ${activeArea === 'all' ? 'grayscale-0 border-2 border-[hsl(var(--accent-orange))] shadow-lg' : 'grayscale opacity-50 hover:opacity-100'}`}
                >
                  <img src={images[cycleIndex]} alt="" className="w-full h-full object-cover" />
                </button>
              </div>

              {/* Main Diagram */}
              <div className="relative p-0 lg:p-6">
                {/* Dashed Border Wrapper — desktop only */}
                <div className="hidden lg:block absolute inset-0 border-2 border-dashed border-black/10 rounded-[3rem] pointer-events-none" />

                <div className="grid grid-cols-2 gap-3 relative">

                  {/* Top Left [1] - Tattoo */}
                  <button
                    onClick={() => setActiveArea('tattoo')}
                    className={`w-[138px] h-[138px] md:w-48 md:h-48 overflow-hidden rounded-tl-[4rem] rounded-br-[4rem] transition-all duration-500 hover:scale-105 hover:shadow-lg hover:z-10 ${activeArea === 'tattoo' || activeArea === 'all' ? 'grayscale-0 scale-105 shadow-xl z-10' : 'grayscale'}`}
                  >
                    <img src={tattooImg} alt="Tattoo" className="w-full h-full object-cover" />
                  </button>

                  {/* Top Right [2] - Mural */}
                  <button
                    onClick={() => setActiveArea('graffiti')}
                    className={`w-[138px] h-[138px] md:w-48 md:h-48 overflow-hidden rounded-tr-[4rem] rounded-bl-[4rem] transition-all duration-500 hover:scale-105 hover:shadow-lg hover:z-10 ${activeArea === 'graffiti' || activeArea === 'all' ? 'grayscale-0 scale-105 shadow-xl z-10' : 'grayscale'}`}
                  >
                    <img src={muralImg} alt="Mural" className="w-full h-full object-cover" />
                  </button>

                  {/* Bottom Left [3] - Telas */}
                  <button
                    onClick={() => setActiveArea('telas')}
                    className={`w-[138px] h-[138px] md:w-48 md:h-48 overflow-hidden rounded-bl-[4rem] rounded-tr-[4rem] transition-all duration-500 hover:scale-105 hover:shadow-lg hover:z-10 ${activeArea === 'telas' || activeArea === 'all' ? 'grayscale-0 scale-105 shadow-xl z-10' : 'grayscale'}`}
                  >
                    <img src={telasImg} alt="Telas" className="w-full h-full object-cover" />
                  </button>

                  {/* Bottom Right [4] - Digital */}
                  <button
                    onClick={() => setActiveArea('ilustracoes')}
                    className={`w-[138px] h-[138px] md:w-48 md:h-48 overflow-hidden rounded-br-[4rem] rounded-tl-[4rem] transition-all duration-500 hover:scale-105 hover:shadow-lg hover:z-10 ${activeArea === 'ilustracoes' || activeArea === 'all' ? 'grayscale-0 scale-105 shadow-xl z-10' : 'grayscale'}`}
                  >
                    <img src={digitalImg} alt="Digital" className="w-full h-full object-cover" />
                  </button>

                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Mobile-only section separator */}
        <div className="flex lg:hidden items-center justify-center w-full my-6 px-4">
          <div className="flex-1 h-[2px] bg-black/10" />
          <img src={starImg} alt="" loading="lazy" className="w-8 h-8 mx-4 opacity-40 shrink-0 animate-spin-slow" />
          <div className="flex-1 h-[2px] bg-black/10" />
        </div>

        {/* Contact CTA Section */}
        <section className="mb-16 md:mb-32 py-12 md:py-20 overflow-hidden">
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
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">

            {/* Left Image Side */}
            <div className="relative w-full lg:w-1/2 flex justify-center">
              {/* Floating Blobs around image */}
              <img
                src={blobFace}
                alt=""
                loading="lazy"
                className="absolute z-30 pointer-events-none select-none w-[50px] md:w-[70px] top-[8%] left-[8%] md:left-[15%]"
                style={{
                  animation: 'floatA 5s ease-in-out infinite',
                }}
              />
              <img
                src={blobPaint}
                alt=""
                loading="lazy"
                className="absolute z-30 pointer-events-none select-none w-[45px] md:w-[60px] top-[12%] right-[8%] md:right-[15%]"
                style={{
                  animation: 'floatB 6s ease-in-out infinite',
                }}
              />
              <img
                src={blobSpray}
                alt=""
                loading="lazy"
                className="absolute z-30 pointer-events-none select-none w-[50px] md:w-[65px] bottom-[18%] left-[6%] md:left-[10%]"
                style={{
                  animation: 'floatC 7s ease-in-out infinite',
                }}
              />
              <img
                src={blobTattoo}
                alt=""
                loading="lazy"
                className="absolute z-30 pointer-events-none select-none w-[45px] md:w-[60px] bottom-[14%] right-[6%] md:right-[10%]"
                style={{
                  animation: 'floatA 8s ease-in-out infinite reverse',
                }}
              />

              {/* Decorative Blob */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] md:w-[450px] md:h-[450px] bg-[hsl(var(--accent-orange))] rounded-full opacity-[0.08] md:opacity-10" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[290px] h-[290px] md:w-[400px] md:h-[400px] border-4 border-dashed border-black opacity-100 md:opacity-15 rounded-full animate-spin-slow" />

              <img
                src={alvaro2}
                alt="Bora fazer arte?"
                loading="lazy"
                className="relative z-10 w-full max-w-[280px] md:max-w-md h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Right Content Side */}
            <div className="flex-1 px-2 lg:px-0 text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-black font-outfit mb-6 md:mb-8 leading-tight uppercase">
                Bora fazer <br />
                <span className="text-[hsl(var(--accent-orange))]">arte comigo?</span>
              </h2>

              <p className="text-lg md:text-xl font-medium text-black/60 font-outfit mb-8 md:mb-12 max-w-lg leading-relaxed mx-auto lg:mx-0">
                Tem uma ideia incrível ou quer transformar sua história em algo visual? Seja qual for o suporte, estou pronto para dar vida ao seu projeto. Vamos conversar!
              </p>

              <div className="flex flex-col md:flex-row flex-wrap gap-4">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/556493180314"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full md:w-auto gap-3 bg-white text-black px-8 py-4 rounded-2xl font-black text-lg border-2 border-black shadow-[6px_6px_0_0_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  WhatsApp
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/alvaro.ttt/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full md:w-auto gap-3 bg-[hsl(var(--accent-orange))] text-white px-8 py-4 rounded-2xl font-black text-lg shadow-[6px_6px_0_0_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                >
                  <Instagram className="w-6 h-6" />
                  Instagram
                </a>

                {/* Email */}
                <a
                  href="mailto:seuemail@exemplo.com"
                  className="flex items-center justify-center w-full md:w-auto gap-3 bg-black text-white px-8 py-4 rounded-2xl font-black text-lg shadow-[6px_6px_0_0_hsl(var(--accent-orange))] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                >
                  <Mail className="w-6 h-6" />
                  Email
                </a>

                {/* Lista de Espera */}
                <Link
                  to="/lista-espera"
                  className="flex items-center justify-center w-full md:w-auto gap-3 bg-white text-black px-8 py-4 rounded-2xl font-black text-lg border-2 border-black shadow-[6px_6px_0_0_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                >
                  <ArrowRight className="w-6 h-6 text-[hsl(var(--accent-orange))]" />
                  Lista de Espera
                </Link>
              </div>
            </div>

          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default Index;
