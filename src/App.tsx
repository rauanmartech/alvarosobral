import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Tattoo from "./pages/Tattoo.tsx";
import Graffiti from "./pages/Graffiti.tsx";
import Telas from "./pages/Telas.tsx";
import Ilustracoes from "./pages/Ilustracoes.tsx";
import Sobre from "./pages/Sobre.tsx";
import FAQ from "./pages/FAQ.tsx";
import Contato from "./pages/Contato.tsx";
import ListaEspera from "./pages/ListaEspera.tsx";
import Login from "./pages/Login.tsx";
import Admin from "./pages/Admin.tsx";
import NotFound from "./pages/NotFound.tsx";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tattoo" element={<Tattoo />} />
          <Route path="/graffiti" element={<Graffiti />} />
          <Route path="/telas" element={<Telas />} />
          <Route path="/ilustracoes" element={<Ilustracoes />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/lista-espera" element={<ListaEspera />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
