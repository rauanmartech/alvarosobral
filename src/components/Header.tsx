import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/blobs/Álvaro Logo e Slogan.webp";

const navLinks = [
  { to: "/", label: "Início" },
  { to: "/tattoo", label: "Tattoo" },
  { to: "/graffiti", label: "Graffiti" },
  { to: "/telas", label: "Telas" },
  { to: "/diversos", label: "Diversos" },
  { to: "/sobre", label: "Sobre" },
  { to: "/faq", label: "FAQ" },
  { to: "/contato", label: "Contato" },
];

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
      <div className="bg-white rounded-[2rem] md:rounded-full px-6 py-2 flex items-center justify-between shadow-[6px_6px_0_0_black] border-2 border-black transition-all relative">
        
        {/* Mobile Left Spacer */}
        <div className="flex md:hidden flex-1" />

        {/* Left Links */}
        <nav className="hidden md:flex items-center gap-1 flex-1 justify-start">
          {navLinks.slice(0, 4).map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-1.5 rounded-full text-xs font-black tracking-tight uppercase transition-all border-2 ${
                location.pathname === link.to 
                  ? "bg-black text-white border-black" 
                  : "bg-white/40 hover:bg-white/60 backdrop-blur-md text-black border-transparent hover:border-black/10"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Center Logo */}
        <div className="flex items-center justify-center px-4">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Álvaro" className="h-10 md:h-10 w-auto object-contain" />
          </Link>
        </div>
        
        {/* Right Links */}
        <nav className="hidden md:flex items-center gap-1 flex-1 justify-end">
          {navLinks.slice(4).map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-1.5 rounded-full text-xs font-black tracking-tight uppercase transition-all border-2 ${
                location.pathname === link.to 
                  ? "bg-black text-white border-black" 
                  : "bg-white/40 hover:bg-white/60 backdrop-blur-md text-black border-transparent hover:border-black/10"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center justify-end flex-1 pr-1">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 bg-zinc-100 border-2 border-black rounded-xl shadow-[3px_3px_0_0_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_0_black] transition-all"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} className="text-black" /> : <Menu size={20} className="text-black" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full mt-4 bg-white border-2 border-black rounded-[2rem] p-4 shadow-[8px_8px_0_0_black] flex flex-col gap-2 md:hidden animate-in fade-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-4 rounded-2xl text-sm font-black tracking-widest uppercase transition-all border-2 text-center ${
                location.pathname === link.to 
                  ? "bg-black text-white border-black" 
                  : "bg-zinc-50 text-black border-transparent hover:border-black"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
