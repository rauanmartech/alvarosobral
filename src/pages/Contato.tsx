import { useState, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import { useToast } from "@/hooks/use-toast";
import { 
  Phone, 
  MapPin, 
  Mail, 
  Star, 
  Send,
  ChevronDown,
  Instagram 
} from "lucide-react";

// Assets
import alvaro2 from "@/assets/elements/alvaro2.webp";
import blobFace from "@/assets/blobs/face.webp";
import blobPaint from "@/assets/blobs/paint.webp";
import blobSpray from "@/assets/blobs/spray.webp";
import blobTattoo from "@/assets/blobs/tattoo.webp";

// WhatsApp SVG Icon Component
const WhatsAppIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const GmailIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.573l8.073-6.08c1.618-1.214 3.927-.059 3.927 1.964z"/>
  </svg>
);

const Contato = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const { toast } = useToast();

  const [activePhraseIndex, setActivePhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const phrases = ["na pele", "na rua", "na tela", "arte onde você quiser"];

  // Cycle through phrases every 1.5s
  useEffect(() => {
    const cycleInterval = setInterval(() => {
      setIsDeleting(true);
    }, 2500); // 2.5s total cycle (typing + wait + deleting)
    return () => clearInterval(cycleInterval);
  }, []);

  // Typewriter effect logic
  useEffect(() => {
    const targetText = phrases[activePhraseIndex];
    
    const timer = setTimeout(() => {
      if (isDeleting) {
        if (displayText.length > 0) {
          setDisplayText(prev => prev.slice(0, -1));
        } else {
          setIsDeleting(false);
          setActivePhraseIndex(prev => (prev + 1) % phrases.length);
        }
      } else {
        if (displayText !== targetText) {
          setDisplayText(targetText.slice(0, displayText.length + 1));
        }
      }
    }, isDeleting ? 30 : 60);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, activePhraseIndex]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ 
      title: "Mensagem enviada", 
      description: "Recebemos seu contato e retornaremos em breve!" 
    });
    setName("");
    setPhone("");
    setService("");
  };

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
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .cursor-blink {
          animation: blink 0.7s infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

      <div className="container mx-auto px-6 py-4 relative min-h-[80vh] flex flex-col items-center">
        
        {/* Main Content Section */}
        <div className="relative z-20 w-full flex flex-col lg:flex-row items-start justify-center gap-12 lg:gap-20 pt-8">
          
          {/* Image Section - 1/3 width */}
          <div className="w-full lg:w-1/3 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[380px] aspect-square flex items-center justify-center">
              {/* Background Decorative Elements */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] aspect-square bg-gradient-to-b from-orange-400 to-orange-600 rounded-full opacity-100 pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] aspect-square border border-solid border-black rounded-full animate-spin-slow pointer-events-none" />

              {/* Floating Blobs */}
              <img src={blobFace} alt="" className="absolute z-10 w-16 -top-4 left-0" style={{ animation: 'floatA 5s ease-in-out infinite' }} />
              <img src={blobPaint} alt="" className="absolute z-10 w-12 top-8 -right-4" style={{ animation: 'floatB 6s ease-in-out infinite' }} />
              <img src={blobSpray} alt="" className="absolute z-10 w-16 bottom-8 -left-4" style={{ animation: 'floatC 7s ease-in-out infinite' }} />
              <img src={blobTattoo} alt="" className="absolute z-10 w-12 -bottom-4 right-0" style={{ animation: 'floatA 8s ease-in-out infinite reverse' }} />
              
              <img 
                src={alvaro2} 
                alt="Alvaro" 
                className="relative z-0 w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Text Content - 2/3 width */}
          <div className="w-full lg:w-2/3 space-y-10 text-center lg:text-left flex flex-col items-center lg:items-start">
            <div className="space-y-6 flex flex-col items-center lg:items-start w-full">
              {/* Badge */}
              <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-white border-2 border-black rounded-tr-2xl rounded-bl-2xl rounded-tl-sm rounded-br-sm shadow-[4px_4px_0_0_black] -rotate-1 font-outfit">
                <div className="w-5 h-5 rounded-full bg-[hsl(var(--accent-orange))] border border-black flex items-center justify-center text-white shrink-0">
                  <Star size={8} fill="currentColor" />
                </div>
                <span className="text-black text-xs font-black uppercase tracking-widest">Iniciar Projeto</span>
              </div>

              {/* Title */}
              <h1 className="text-5xl md:text-6xl lg:text-8xl font-black font-outfit leading-[1.0] lg:leading-[0.85] text-black tracking-tighter uppercase flex flex-col gap-2 lg:gap-0 w-full text-center lg:text-left">
                <span>Transforme</span>
                <span className="text-[hsl(var(--accent-orange))]">visão em arte</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-xl lg:text-2xl font-medium text-black/60 max-w-3xl mx-auto lg:mx-0 leading-relaxed font-outfit text-center lg:text-left">
              Da tatuagem às telas, do graffiti ao digital. <br className="hidden lg:block" />
              Vamos tirar sua ideia do papel e criar algo único juntos.
            </p>
          </div>
        </div>

        {/* Contact Grid - Now moved to the bottom for full-width layout */}
        <div className="relative z-20 w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 pt-10 border-t border-black/5">
          <div className="flex flex-col gap-6 p-6 rounded-[2rem] bg-white/50 backdrop-blur-sm border border-black/5 shadow-sm hover:shadow-md transition-all">
            <a href="https://www.instagram.com/alvaro.ttt/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group hover:text-[hsl(var(--accent-orange))] transition-all">
              <div className="w-10 h-10 flex-shrink-0 rounded-full bg-gradient-to-tr from-[#FFB700] via-[#FF0069] to-[#7600C5] flex items-center justify-center text-white group-hover:scale-110 transition-all">
                <Instagram size={18} />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase font-bold opacity-40 tracking-widest leading-none mb-1">Instagram</span>
                <span className="font-bold text-sm tracking-tight">@alvaro.ttt</span>
              </div>
            </a>
            <a href="https://www.instagram.com/juramento.ttt/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group hover:text-[hsl(var(--accent-orange))] transition-all">
              <div className="w-10 h-10 flex-shrink-0 rounded-full bg-gradient-to-tr from-[#FFB700] via-[#FF0069] to-[#7600C5] flex items-center justify-center text-white group-hover:scale-110 transition-all">
                <Instagram size={18} />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase font-bold opacity-40 tracking-widest leading-none mb-1">Estúdio</span>
                <span className="font-bold text-sm tracking-tight">@juramento.ttt</span>
              </div>
            </a>
            <a href="https://wa.me/556493180314" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group hover:text-[hsl(var(--accent-orange))] transition-all">
              <div className="w-10 h-10 flex-shrink-0 rounded-full bg-[#25D366] flex items-center justify-center text-white group-hover:scale-110 transition-all">
                <WhatsAppIcon size={18} />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase font-bold opacity-40 tracking-widest leading-none mb-1">WhatsApp</span>
                <span className="font-bold text-sm tracking-tight">+55 (64) 9318-0314</span>
              </div>
            </a>
            <a href="mailto:hello@digitalagency.com" className="flex items-center gap-4 group hover:text-[hsl(var(--accent-orange))] transition-all">
              <div className="w-10 h-10 flex-shrink-0 rounded-full bg-[#EA4335] flex items-center justify-center text-white group-hover:scale-110 transition-all">
                <GmailIcon size={18} />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase font-bold opacity-40 tracking-widest leading-none mb-1">E-mail</span>
                <span className="font-bold text-sm tracking-tight truncate">hello@digitalagency.com</span>
              </div>
            </a>
          </div>
          
          <div className="flex flex-col gap-4 group p-5 rounded-[2rem] bg-white/50 backdrop-blur-sm border border-black/5 hover:border-[hsl(var(--accent-orange))] transition-all shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex-shrink-0 rounded-full bg-[#1A1C20] flex items-center justify-center text-white transition-all">
                <MapPin size={20} />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase font-bold opacity-40 tracking-widest leading-none mb-1">Localização</span>
                <span className="font-bold text-base">Rua Dr. Wiliam Faiad, 171</span>
                <span className="text-xs font-medium text-black/40">Catalão, GO — 75701-220</span>
              </div>
            </div>
            
            {/* Embedded Map */}
            <div className="w-full flex-1 min-h-[180px] rounded-2xl overflow-hidden border border-black/5 shadow-inner mt-2">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d552.3460358527765!2d-47.94686996117049!3d-18.167952235573885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94a6666dd555d55f%3A0x2e5f91df4d852254!2sR.%20Dr.%20Wiliam%20Faiad%2C%20171%20-%20Santo%20Antonio%2C%20Catal%C3%A3o%20-%20GO%2C%2075701-220!5e1!3m2!1sen!2sbr!4v1778630171153!5m2!1sen!2sbr" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center p-8 rounded-[2rem] bg-black text-white border-4 border-[hsl(var(--accent-orange))] shadow-xl relative overflow-hidden group">
            {/* Decorative background for the typing card */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-[hsl(var(--accent-orange))] rounded-full -mr-12 -mt-12 opacity-20 blur-2xl group-hover:scale-150 transition-transform duration-700" />
            
            <span className="text-[10px] uppercase font-black tracking-[0.2em] text-[hsl(var(--accent-orange))] mb-4">Arte que inspira</span>
            
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-black font-outfit text-center min-h-[60px] flex items-center justify-center">
                {displayText}
                <span className="w-1 h-8 bg-[hsl(var(--accent-orange))] ml-2 cursor-blink" />
              </h2>
            </div>
            
            <p className="text-[10px] uppercase font-bold opacity-40 mt-6 tracking-widest">Transformação constante</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Contato;
