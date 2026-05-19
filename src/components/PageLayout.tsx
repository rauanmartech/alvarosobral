import Header from "./Header";
import Footer from "./Footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  const { pathname } = useLocation();

  useEffect(() => {
    const titles: Record<string, string> = {
      "/": "Álvaro Sobral | Artista Multidisciplinar — Tattoo, Graffiti & Belas Artes",
      "/tattoo": "Tatuagens Exclusivas | Álvaro Sobral",
      "/graffiti": "Graffiti & Murais Urbanos | Álvaro Sobral",
      "/telas": "Telas & Belas Artes | Álvaro Sobral",
      "/ilustracoes": "Ilustrações & Arte Digital | Álvaro Sobral",
      "/sobre": "Sobre o Artista | Álvaro Sobral",
      "/faq": "Dúvidas Frequentes | FAQ | Álvaro Sobral",
      "/contato": "Contato & Orçamentos | Álvaro Sobral",
      "/lista-espera": "Lista de Espera | Álvaro Sobral",
      "/login": "Área Restrita | Login | Álvaro Sobral",
      "/admin": "Painel de Administração | Álvaro Sobral",
    };

    document.title = titles[pathname] || "Álvaro Sobral | Artista Multidisciplinar";
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main 
        key={pathname}
        className="flex-1 pt-32 pb-0 animate-in slide-in-from-bottom-3 duration-500 ease-out overflow-x-hidden w-full relative"
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
