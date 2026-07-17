import React, { useState, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Star } from "lucide-react";
import star from '@/assets/elements/star.png';
import faqPng from '@/assets/elements/faq.png';

import { supabase } from "@/utils/supabase";

interface FAQItem {
  q: string;
  a: string;
}

const FAQ = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);

  useEffect(() => {
    async function loadFAQs() {
      try {
        const { data, error } = await supabase
          .from("faq_items")
          .select("*")
          .order("display_order", { ascending: true });

        if (error) {
          console.error("Error loading FAQs:", error);
        } else if (data) {
          setFaqs(data.map(item => ({
            q: item.question,
            a: item.answer
          })));
        }
      } catch (err) {
        console.error("Unexpected error loading FAQs:", err);
      }
    }
    loadFAQs();
  }, []);

  return (
    <PageLayout>
      <div className="bg-[#fafafa] -mt-32 pt-32 min-h-screen pb-32 overflow-hidden">

        {/* Pop-Art Header Background Shape */}
        <div className="absolute top-0 left-0 w-full h-[500px] pointer-events-none z-0 hidden md:block">
          <svg
            viewBox="0 0 1440 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full object-cover opacity-10 md:opacity-20"
          >
            <path
              d="M0 0H1440V300L1200 450L900 350L600 500L300 400L0 500V0Z"
              fill="hsl(var(--accent-orange))"
            />
          </svg>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#fafafa]" />
        </div>

        <div className="container mx-auto px-6 relative z-10 pt-20">

          {/* Header Content */}
          <div className="text-center mb-20 relative">
            <img
              src={star}
              alt=""
              className="absolute left-1/2 -top-16 -translate-x-1/2 w-40 h-40 opacity-20 brightness-0 invert pointer-events-none z-0 rotate-12"
            />
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-white border-2 border-black rounded-tr-2xl rounded-bl-2xl rounded-tl-sm rounded-br-sm mb-8 shadow-[4px_4px_0_0_black] -rotate-2">
              <div className="w-2 h-2 bg-[hsl(var(--accent-orange))] rounded-full" />
              <span className="text-black text-[10px] font-black uppercase tracking-[0.2em] font-alpha">Ainda está com dúvidas?</span>
            </div>
            <div className="mb-12 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
              <div className="relative hidden md:block">
                <h1 className="sr-only">FAQ - Perguntas Frequentes</h1>
                <img
                  src={faqPng}
                  alt="FAQ"
                  className="h-44 md:h-[260px] lg:h-[320px] w-auto object-contain relative z-10"
                />
              </div>

              <div className="flex flex-col gap-2 md:gap-0 items-center md:items-start justify-center text-center md:text-left md:pt-4">
                <span className="text-5xl md:text-7xl lg:text-9xl font-black font-alpha uppercase leading-[0.8] text-black tracking-tighter">
                  Dúvidas
                </span>
                <span className="text-5xl md:text-7xl lg:text-9xl font-black font-alpha uppercase leading-[0.8] text-[hsl(var(--accent-orange))] tracking-tighter">
                  Frequentes<span className="hidden md:inline">.</span>
                </span>
              </div>
            </div>
            <p className="text-lg text-black/40 font-outfit max-w-xl mx-auto">
              Tudo o que você precisa saber sobre o meu processo criativo, agendamentos e projetos autorais.
            </p>
          </div>

          {/* Accordion List */}
          <div className="max-w-3xl mx-auto space-y-6">
            <Accordion type="single" collapsible className="space-y-6 border-none">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="bg-white border-2 border-black rounded-[2rem] shadow-[6px_6px_0_0_black] px-4 md:px-8 overflow-hidden data-[state=open]:shadow-none data-[state=open]:translate-x-[2px] data-[state=open]:translate-y-[2px] transition-all"
                >
                  <AccordionTrigger className="hover:no-underline py-6 text-left font-outfit font-black text-lg md:text-xl uppercase group">
                    <span className="group-data-[state=open]:text-[hsl(var(--accent-orange))] transition-colors">{faq.q}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-8 text-black/60 font-outfit text-lg leading-relaxed border-t border-black/5 pt-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Footer CTA */}
          <div className="mt-24 text-center">
            <p className="text-black/30 font-black uppercase tracking-widest text-sm mb-6">Ainda tem dúvidas?</p>
            <a
              href="https://wa.me/556493180314"
              target="_blank"
              className="inline-flex items-center justify-center w-full md:w-auto gap-4 bg-black text-white px-10 py-5 rounded-full font-black font-alpha uppercase tracking-widest text-sm hover:bg-[hsl(var(--accent-orange))] transition-all shadow-[8px_8px_0_0_black]"
            >
              Falar com Álvaro
            </a>
          </div>

        </div>
      </div>
    </PageLayout>
  );
};

export default FAQ;
