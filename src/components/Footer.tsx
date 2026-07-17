import { Link } from "react-router-dom";
import logo from "@/assets/blobs/Álvaro Logo e Slogan.webp";

const Footer = () => (
  <footer className="border-t border-border bg-background py-12">
    <div className="container mx-auto px-4 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-sm text-muted-foreground">
        <div className="flex flex-col items-center md:items-start space-y-4">
          <img src={logo} alt="Álvaro" className="h-10 w-auto object-contain" />
          <p className="max-w-xs text-center md:text-left">Arte onde você quiser</p>
          <p>hello@digitalagency.com</p>
        </div>
        <nav className="flex flex-wrap justify-center gap-4">
          {[
            { to: "/", label: "Início" },
            { to: "/tattoo", label: "Tattoo" },
            { to: "/graffiti", label: "Graffiti" },
            { to: "/telas", label: "Telas" },
            { to: "/diversos", label: "Diversos" },
            { to: "/sobre", label: "Sobre" },
            { to: "/faq", label: "FAQ" },
            { to: "/contato", label: "Contato" },
          ].map((link) => (
            <Link key={link.to} to={link.to} className="hover:text-foreground transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex justify-center md:justify-end text-[10px] text-muted-foreground/50 uppercase tracking-widest pt-4 border-t border-black/5">
        <Link to="/login" className="hover:text-[hsl(var(--accent-orange))] transition-colors font-bold">
          Área do Administrador
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;
