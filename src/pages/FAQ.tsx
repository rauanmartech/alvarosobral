import React, { useState, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
      <div className="bg-[#fafafa] -mt-32 pt-32 min-h-screen pb-32 overflow-hidden relative">
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

        <div className="container mx-auto px-6 relative z-10 pt-20 lg:pt-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 max-w-7xl mx-auto">
            
            {/* Left Column: Heading and CTA */}
            <div className="flex flex-col gap-8">
              <div className="flex flex-col items-start text-left">
                {/* Badge */}
                <div className="inline-flex items-center gap-3 px-6 py-2 bg-white border-2 border-black rounded-tr-2xl rounded-bl-2xl rounded-tl-sm rounded-br-sm mb-8 shadow-[4px_4px_0_0_black] -rotate-2">
                  <div className="w-2 h-2 bg-[hsl(var(--accent-orange))] rounded-full" />
                  <span className="text-black text-[10px] font-black uppercase tracking-[0.2em] font-alpha">Suas dúvidas, respondidas</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-black font-alpha uppercase leading-[0.9] text-black tracking-tighter mb-6">
                  Perguntas <br className="hidden lg:block"/>
                  <span className="text-[hsl(var(--accent-orange))]">Frequentes</span>
                </h1>

                <p className="text-lg md:text-xl text-black/60 font-outfit max-w-md leading-relaxed">
                  Tudo o que você precisa saber sobre o meu processo criativo, agendamentos e projetos autorais.
                </p>
              </div>

              {/* Still Have Questions Box */}
              <div className="bg-white border-2 border-black rounded-[2rem] p-8 md:p-10 shadow-[8px_8px_0_0_black] mt-4 lg:mt-8 max-w-md">
                <h3 className="text-3xl font-black font-alpha uppercase mb-4 text-black">Ainda tem dúvidas?</h3>
                <p className="text-black/60 font-outfit mb-10 text-lg leading-relaxed">
                  Entendemos que cada projeto tem necessidades únicas. Se você quer esclarecer algo sobre orçamentos, disponibilidade ou apresentar sua ideia, estamos aqui para ajudar.
                </p>
                <a
                  href="https://wa.me/556493180314"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full gap-4 bg-[hsl(var(--accent-orange))] text-black border-2 border-black px-8 py-5 rounded-full font-black font-alpha uppercase tracking-widest text-sm hover:-translate-y-1 hover:shadow-[4px_4px_0_0_black] transition-all"
                >
                  Falar com Álvaro
                </a>
              </div>
            </div>

            {/* Right Column: Accordion */}
            <div className="flex flex-col pt-4 lg:pt-0">
              <Accordion type="single" collapsible className="space-y-5 border-none">
                {faqs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`item-${i}`}
                    className="bg-white border-2 border-black rounded-[1.5rem] shadow-[4px_4px_0_0_black] px-6 md:px-8 data-[state=open]:shadow-none data-[state=open]:translate-x-[4px] data-[state=open]:translate-y-[4px] transition-all overflow-hidden"
                  >
                    <AccordionTrigger className="hover:no-underline py-6 text-left font-outfit font-black text-lg md:text-xl uppercase group [&>svg]:text-black">
                      <span className="group-data-[state=open]:text-[hsl(var(--accent-orange))] transition-colors pr-4 leading-tight">{faq.q}</span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-8 text-black/60 font-outfit text-lg leading-relaxed pt-2">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default FAQ;
