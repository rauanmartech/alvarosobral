import { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxImage {
  id: string;
  image: string;
  title: string;
}

interface ImageLightboxProps {
  images: LightboxImage[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const ImageLightbox = ({ images, currentIndex, onClose, onNavigate }: ImageLightboxProps) => {
  const current = images[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < images.length - 1;

  const handlePrev = useCallback(() => {
    if (hasPrev) onNavigate(currentIndex - 1);
  }, [hasPrev, currentIndex, onNavigate]);

  const handleNext = useCallback(() => {
    if (hasNext) onNavigate(currentIndex + 1);
  }, [hasNext, currentIndex, onNavigate]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, handlePrev, handleNext]);

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 z-30 w-10 h-10 md:w-12 md:h-12 bg-white text-black rounded-full flex items-center justify-center border-2 border-black shadow-[3px_3px_0_0_hsl(var(--accent-orange))] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
        aria-label="Fechar"
      >
        <X size={20} />
      </button>

      {/* Counter */}
      <div className="absolute top-4 md:top-6 left-4 md:left-6 z-20 bg-black/60 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-full">
        <span className="text-white font-black font-outfit text-xs md:text-sm uppercase tracking-widest">
          {currentIndex + 1} / {images.length}
        </span>
      </div>

      {/* Image Container */}
      <div
        className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center px-2 md:px-8 pt-20 pb-[180px] md:pb-[160px] z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          key={current.id}
          src={current.image}
          alt={current.title}
          className="max-w-full max-h-full object-contain rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)]"
          style={{ animation: "lightbox-in 0.25s cubic-bezier(0.34,1.56,0.64,1) forwards" }}
        />
      </div>

      {/* Navigation Panel (Bottom) */}
      <div 
        className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 w-full max-w-[95vw]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title Tag */}
        <div className="bg-white border-2 border-black px-4 py-2 rounded-xl shadow-[3px_3px_0_0_black] flex items-center gap-2">
          <div className="w-2 h-2 bg-[hsl(var(--accent-orange))] rounded-full shrink-0 animate-pulse" />
          <p className="text-black font-black text-xs md:text-sm uppercase font-outfit tracking-widest truncate max-w-[250px] md:max-w-md">{current.title}</p>
        </div>

        {/* Nav Controls: Prev + Thumbnails + Next */}
        <div className="flex items-center gap-3 w-full justify-center">
          {/* Prev Button */}
          <button
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            disabled={!hasPrev}
            className={`shrink-0 w-10 h-10 md:w-12 md:h-12 bg-white text-black rounded-full flex items-center justify-center border-2 border-black shadow-[3px_3px_0_0_hsl(var(--accent-orange))] transition-all ${hasPrev ? "hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none" : "opacity-20 cursor-not-allowed"}`}
            aria-label="Anterior"
          >
            <ChevronLeft size={20} />
          </button>
          
          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto max-w-[65vw] md:max-w-2xl px-1 pb-1 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={(e) => { e.stopPropagation(); onNavigate(i); }}
                  className={`shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-lg overflow-hidden border-2 transition-all ${i === currentIndex ? "border-[hsl(var(--accent-orange))] scale-110 shadow-[2px_2px_0_0_hsl(var(--accent-orange))]" : "border-white/20 opacity-50 hover:opacity-100"}`}
                >
                  <img src={img.image} alt={img.title} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Next Button */}
          <button
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            disabled={!hasNext}
            className={`shrink-0 w-10 h-10 md:w-12 md:h-12 bg-white text-black rounded-full flex items-center justify-center border-2 border-black shadow-[3px_3px_0_0_hsl(var(--accent-orange))] transition-all ${hasNext ? "hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none" : "opacity-20 cursor-not-allowed"}`}
            aria-label="Próximo"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes lightbox-in {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ImageLightbox;
