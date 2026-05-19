import Header from "./Header";
import Footer from "./Footer";

import { useLocation } from "react-router-dom";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  const { pathname } = useLocation();

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
