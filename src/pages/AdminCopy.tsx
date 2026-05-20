import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { ArrowLeft, Save, Star, RefreshCw, Check, X, Clock, HelpCircle, AlertCircle, FileText, Send } from "lucide-react";
import { supabase } from "@/utils/supabase";
import { useToast } from "@/hooks/use-toast";

interface CopyItem {
  id: string;
  section: string;
  element_key: string;
  label: string;
  value: string;
  updated_at?: string;
}

const DEFAULT_COPY_ITEMS: CopyItem[] = [
  // Global
  { id: "global_header_menu", section: "global", element_key: "header_menu", label: "Menu de Navegação", value: "Início, Tattoo, Graffiti, Telas, Ilustrações, Sobre, FAQ, Contato" },
  { id: "global_footer_slogan", section: "global", element_key: "footer_slogan", label: "Slogan do Rodapé", value: "Transformando ideias em arte, da pele às telas." },
  { id: "global_footer_email", section: "global", element_key: "footer_email", label: "E-mail de Contato", value: "hello@digitalagency.com" },
  { id: "global_footer_admin_link", section: "global", element_key: "footer_admin_link", label: "Texto do Link do Admin", value: "Área do Administrador" },

  // Home
  { id: "home_hero_title", section: "home", element_key: "hero_title", label: "Título do Hero", value: "Eu sou Álvaro, Seu Multiartista" },
  { id: "home_hero_btn1", section: "home", element_key: "hero_btn1", label: "Botão de Portfólio", value: "Portfolio ↗" },
  { id: "home_hero_btn2", section: "home", element_key: "hero_btn2", label: "Botão de Contratação", value: "Hire Me" },
  { id: "home_hero_quote", section: "home", element_key: "hero_quote", label: "Frase de Citação", value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor." },
  { id: "home_hero_stat1", section: "home", element_key: "hero_stat1", label: "Estatística 1", value: "450+ Client Served" },
  { id: "home_hero_stat2", section: "home", element_key: "hero_stat2", label: "Estatística 2", value: "10 Years Experts" },
  { id: "home_hero_tags", section: "home", element_key: "hero_tags", label: "Cápsulas de Física", value: "REFLEXÃO, PROCESSO, CONCEITO, AUTORAL, IDENTIDADE, PROJETOS" },
  { id: "home_works_title", section: "home", element_key: "works_title", label: "Título de Trabalhos", value: "Meus Trabalhos" },
  { id: "home_works_desc", section: "home", element_key: "works_desc", label: "Descrição de Trabalhos", value: "Explore as diversas áreas de atuação onde transformo ideias em experiências visuais impactantes." },
  { id: "home_works_categories", section: "home", element_key: "works_categories", label: "Categorias de Trabalhos", value: "Tattoo, Graffiti, Telas, Digital" },
  { id: "home_areas_prefix", section: "home", element_key: "areas_prefix", label: "Prefixo do Título de Áreas", value: "Arte" },
  { id: "home_areas_hint", section: "home", element_key: "areas_hint", label: "Dica de Clique", value: "clique para mudar" },
  { id: "home_area_tattoo_desc", section: "home", element_key: "area_tattoo_desc", label: "Descrição de Tattoo (na pele)", value: "Minha jornada na tatuagem é sobre transformar histórias e significados em arte eterna. Especializado em traços finos e composições autorais, busco sempre a harmonia entre o design e a anatomia do corpo." },
  { id: "home_area_graffiti_desc", section: "home", element_key: "area_graffiti_desc", label: "Descrição de Graffiti (na rua)", value: "O graffiti e o muralismo me permitem ocupar o espaço urbano com cores e mensagens. Cada parede é uma tela gigante onde a escala monumental encontra a expressão artística das ruas." },
  { id: "home_area_telas_desc", section: "home", element_key: "area_telas_desc", label: "Descrição de Telas (na tela)", value: "Na pintura em tela, exploro texturas e camadas que a arte digital não alcança. É o meu momento de experimentação pura, onde o erro e o acerto se misturam em composições uniques." },
  { id: "home_area_digital_desc", section: "home", element_key: "area_digital_desc", label: "Descrição de Digital (no digital)", value: "As ilustrações digitais são onde a tecnologia encontra a criatividade sem limites. De concept arts a peças publicitárias, utilizo ferramentas modernas para dar vida a mundos imaginários." },
  { id: "home_area_general_desc", section: "home", element_key: "area_general_desc", label: "Descrição Geral (em todo lugar)", value: "Para mim, a arte não tem fronteiras. Seja na pele, nos muros, nas telas ou no digital, a essência é a mesma: expressar o inexpressável e colorir o mundo com novas perspectivas." },

  // Tattoo
  { id: "tattoo_badge", section: "tattoo", element_key: "badge", label: "Selo da Página", value: "Portfólio de Tatuagem" },
  { id: "tattoo_title", section: "tattoo", element_key: "title", label: "Título Principal", value: "ARTE NA PELE" },
  { id: "tattoo_desc", section: "tattoo", element_key: "desc", label: "Descrição Principal", value: "Minha jornada na tatuagem é sobre transformar histórias e significados em arte eterna. Especializado em traços finos e composições autorais, busco sempre a harmonia entre o design e a anatomia do corpo." },
  { id: "tattoo_info_label1", section: "tattoo", element_key: "info_label1", label: "Info Rápida 1", value: "Fine Line & Autoral" },
  { id: "tattoo_info_label2", section: "tattoo", element_key: "info_label2", label: "Info Rápida 2", value: "Studio Privado" },
  { id: "tattoo_btn_action", section: "tattoo", element_key: "btn_action", label: "Botão de Ação", value: "Agendar" },
  { id: "tattoo_btn_insta", section: "tattoo", element_key: "btn_insta", label: "Botão Instagram", value: "Ver no Insta" },
  { id: "tattoo_gallery_title", section: "tattoo", element_key: "gallery_title", label: "Título da Galeria", value: "Trabalhos Recentes" },
  { id: "tattoo_gallery_desc", section: "tattoo", element_key: "gallery_desc", label: "Descrição da Galeria", value: "Uma seleção exclusiva de artes criadas no studio, do traço à eternidade." },

  // Graffiti
  { id: "graffiti_badge", section: "graffiti", element_key: "badge", label: "Selo da Página", value: "Portfólio de Graffiti" },
  { id: "graffiti_title", section: "graffiti", element_key: "title", label: "Título Principal", value: "VOZ DAS RUAS" },
  { id: "graffiti_desc", section: "graffiti", element_key: "desc", label: "Descrição Principal", value: "Minha arte nas ruas é um diálogo entre as cores e o concreto. Transformo muros em portais de expression, trazendo vida e questionamento para o cenário urbano através de murais de grande escala e intervenções autorais." },
  { id: "graffiti_info_label1", section: "graffiti", element_key: "info_label1", label: "Info Rápida 1", value: "Spray & Muralismo" },
  { id: "graffiti_info_label2", section: "graffiti", element_key: "info_label2", label: "Info Rápida 2", value: "Projetos Nacionais" },
  { id: "graffiti_btn_action", section: "graffiti", element_key: "btn_action", label: "Botão de Ação", value: "Orçar" },
  { id: "graffiti_btn_insta", section: "graffiti", element_key: "btn_insta", label: "Botão Instagram", value: "Ver no Insta" },
  { id: "graffiti_gallery_title", section: "graffiti", element_key: "gallery_title", label: "Título da Galeria", value: "Murais Recentes" },
  { id: "graffiti_gallery_desc", section: "graffiti", element_key: "gallery_desc", label: "Descrição da Galeria", value: "Uma seleção de intervenções urbanas e murais que transformaram espaços públicos e privados." },

  // Telas
  { id: "telas_badge", section: "telas", element_key: "badge", label: "Selo da Página", value: "Portfólio de Telas" },
  { id: "telas_title", section: "telas", element_key: "title", label: "Título Principal", value: "UNIVERSO EM TELAS" },
  { id: "telas_desc", section: "telas", element_key: "desc", label: "Descrição Principal", value: "Nas telas, minha arte encontra a pausa e a profundidade. É onde exploro texturas, camadas e a liberdade do pincel. Cada quadro é um fragmento de um universe particular que convida à contemplação." },
  { id: "telas_info_label1", section: "telas", element_key: "info_label1", label: "Info Rápida 1", value: "Acrílica & Mista" },
  { id: "telas_info_label2", section: "telas", element_key: "info_label2", label: "Info Rápida 2", value: "Expressivo & Autoral" },
  { id: "telas_btn_action", section: "telas", element_key: "btn_action", label: "Botão de Ação", value: "Adquirir" },
  { id: "telas_btn_insta", section: "telas", element_key: "btn_insta", label: "Botão Instagram", value: "Ver no Insta" },
  { id: "telas_gallery_title", section: "telas", element_key: "gallery_title", label: "Título da Galeria", value: "Obras Disponíveis" },
  { id: "telas_gallery_desc", section: "telas", element_key: "gallery_desc", label: "Descrição da Galeria", value: "Uma coleção de pinturas originais que exploram a essência da forma e da cor em suportes tradicionais." },

  // Ilustracoes
  { id: "ilustracoes_badge", section: "ilustracoes", element_key: "badge", label: "Selo da Página", value: "Ilustração Digital" },
  { id: "ilustracoes_title", section: "ilustracoes", element_key: "title", label: "Título Principal", value: "MUNDO DIGITAL" },
  { id: "ilustracoes_desc", section: "ilustracoes", element_key: "desc", label: "Descrição Principal", value: "No ambiente digital, a criatividade não tem limites. Explore minhas ilustrações autorais, onde o traço manual encontra a versatilidade tecnológica para criar peças únicas." },
  { id: "ilustracoes_info_label1", section: "ilustracoes", element_key: "info_label1", label: "Info Rápida 1", value: "Procreate & PS" },
  { id: "ilustracoes_info_label2", section: "ilustracoes", element_key: "info_label2", label: "Info Rápida 2", value: "Character Design" },
  { id: "ilustracoes_btn_action", section: "ilustracoes", element_key: "btn_action", label: "Botão de Ação", value: "Contratar" },
  { id: "ilustracoes_btn_insta", section: "ilustracoes", element_key: "btn_insta", label: "Botão Instagram", value: "Ver no Insta" },
  { id: "ilustracoes_gallery_title", section: "ilustracoes", element_key: "gallery_title", label: "Título da Galeria", value: "Projetos Digitais" },
  { id: "ilustracoes_gallery_desc", section: "ilustracoes", element_key: "gallery_desc", label: "Descrição da Galeria", value: "Uma coleção de trabalhos desenvolvidos inteiramente em ambiente digital, explorando novos styles e narrativas visuais." },

  // Sobre
  { id: "sobre_prefix", section: "sobre", element_key: "prefix", label: "Apresentação Inicial", value: "Olá, eu sou o Alvaro," },
  { id: "sobre_title", section: "sobre", element_key: "title", label: "Título Principal", value: "UM ARTISTA multidisciplinar" },
  { id: "sobre_desc", section: "sobre", element_key: "desc", label: "Descrição Principal", value: "Transformando visões em expressões brutas — de murais de rua a belas artes e criações digitais." },
  { id: "sobre_btn_action", section: "sobre", element_key: "btn_action", label: "Botão de Contato", value: "Entre em Contato" },
  { id: "sobre_stat_1", section: "sobre", element_key: "stat_1", label: "Estatística 1", value: "15+ Anos de Experiência" },
  { id: "sobre_stat_2", section: "sobre", element_key: "stat_2", label: "Estatística 2", value: "280+ Projetos Entregues" },
  { id: "sobre_stat_3", section: "sobre", element_key: "stat_3", label: "Estatística 3", value: "*99% Satisfação dos Clientes" },
  { id: "sobre_stat_4", section: "sobre", element_key: "stat_4", label: "Estatística 4", value: "50 Clientes pelo mundo" },
  { id: "sobre_sec1_title", section: "sobre", element_key: "sec1_title", label: "Título do Histórico 1", value: "O Início de Tudo" },
  { id: "sobre_sec1_desc", section: "sobre", element_key: "sec1_desc", label: "Descrição do Histórico 1", value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
  { id: "sobre_sec2_title", section: "sobre", element_key: "sec2_title", label: "Título do Histórico 2", value: "Minha Filosofia" },
  { id: "sobre_sec2_desc", section: "sobre", element_key: "sec2_desc", label: "Descrição do Histórico 2", value: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem." },
  { id: "sobre_word_cloud", section: "sobre", element_key: "word_cloud", label: "Nuvem de Palavras", value: "Versátilidade, Arte, Tattoo, Graffiti, Digital, Criatividade, Expressão, Muralismo, Originalidade, Cores, Autoral" },

  // FAQ
  { id: "faq_badge", section: "faq", element_key: "badge", label: "Selo do FAQ", value: "Ainda está com dúvidas?" },
  { id: "faq_title", section: "faq", element_key: "title", label: "Título Principal", value: "Dúvidas Frequentes." },
  { id: "faq_desc", section: "faq", element_key: "desc", label: "Descrição Auxiliar", value: "Tudo o que você precisa saber sobre o meu processo criativo, agendamentos e projetos autorais." },
  { id: "faq_cta_title", section: "faq", element_key: "cta_title", label: "Título da Chamada Final", value: "Ainda tem dúvidas?" },
  { id: "faq_cta_btn", section: "faq", element_key: "cta_btn", label: "Botão de Ação do FAQ", value: "Falar com Alvaro" },

  // Contato
  { id: "contato_badge", section: "contato", element_key: "badge", label: "Selo do Contato", value: "Iniciar Projeto" },
  { id: "contato_title", section: "contato", element_key: "title", label: "Título Principal", value: "Transforme visão em arte" },
  { id: "contato_desc", section: "contato", element_key: "desc", label: "Descrição Principal", value: "Da tatuagem às telas, do graffiti ao digital. Vamos tirar sua ideia do papel e criar algo único juntos." },
  { id: "contato_instagram_label", section: "contato", element_key: "instagram_label", label: "Rótulo do Instagram", value: "Instagram" },
  { id: "contato_instagram_val", section: "contato", element_key: "instagram_val", label: "Perfil do Instagram", value: "@alvaro.ttt" },
  { id: "contato_studio_label", section: "contato", element_key: "studio_label", label: "Rótulo do Estúdio", value: "Estúdio" },
  { id: "contato_studio_val", section: "contato", element_key: "studio_val", label: "Perfil do Estúdio", value: "@juramento.ttt" },
  { id: "contato_whatsapp_label", section: "contato", element_key: "whatsapp_label", label: "Rótulo do WhatsApp", value: "WhatsApp" },
  { id: "contato_whatsapp_val", section: "contato", element_key: "whatsapp_val", label: "Telefone do WhatsApp", value: "+55 (64) 9318-0314" },
  { id: "contato_email_label", section: "contato", element_key: "email_label", label: "Rótulo do E-mail", value: "E-mail" },
  { id: "contato_email_val", section: "contato", element_key: "email_val", label: "Endereço de E-mail", value: "hello@digitalagency.com" },
  { id: "contato_address_label", section: "contato", element_key: "address_label", label: "Rótulo do Endereço", value: "Localização" },
  { id: "contato_address_street", section: "contato", element_key: "address_street", label: "Rua e Número", value: "Rua Dr. Wiliam Faiad, 171" },
  { id: "contato_address_city", section: "contato", element_key: "address_city", label: "Cidade, Estado e CEP", value: "Catalão, GO — 75701-220" },
  { id: "contato_typing_badge", section: "contato", element_key: "typing_badge", label: "Selo da Frase Rotativa", value: "Arte que inspira" },
  { id: "contato_typing_phrases", section: "contato", element_key: "typing_phrases", label: "Frases Rotativas", value: "na pele, na rua, na tela, no digital, em todo lugar" },

  // Lista de Espera
  { id: "waiting_badge", section: "lista-espera", element_key: "badge", label: "Selo da Página", value: "Lista de Espera" },
  { id: "waiting_title", section: "lista-espera", element_key: "title", label: "Título Principal", value: "Lista de Espera" },
  { id: "waiting_desc", section: "lista-espera", element_key: "desc", label: "Descrição Auxiliar", value: "Garanta seu lugar para as próximas sessões. Preencha os dados abaixo e entrarei em contato em breve." },
  { id: "waiting_field_email", section: "lista-espera", element_key: "field_email", label: "Campo E-mail", value: "E-mail" },
  { id: "waiting_field_name", section: "lista-espera", element_key: "field_name", label: "Campo Nome", value: "Nome Completo" },
  { id: "waiting_field_age", section: "lista-espera", element_key: "field_age", label: "Campo Idade", value: "Idade" },
  { id: "waiting_field_whatsapp", section: "lista-espera", element_key: "field_whatsapp", label: "Campo WhatsApp", value: "Telefone com WhatsApp" },
  { id: "waiting_field_instagram", section: "lista-espera", element_key: "field_instagram", label: "Campo Instagram", value: "Instagram" },
  { id: "waiting_field_city", section: "lista-espera", element_key: "field_city", label: "Campo Cidade", value: "Cidade onde mora" },
  { id: "waiting_field_tatuou", section: "lista-espera", element_key: "field_tatuou", label: "Campo Já Tatuou", value: "Já se tatuou comigo?" },
  { id: "waiting_field_orcamento", section: "lista-espera", element_key: "field_orcamento", label: "Campo Orçamento", value: "Deseja fazer o orçamento do seu projeto?" },
  { id: "waiting_btn_submit", section: "lista-espera", element_key: "btn_submit", label: "Botão Enviar", value: "Enviar Inscrição" }
];

const AdminCopy = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [copyItems, setCopyItems] = useState<CopyItem[]>([]);
  const [activeTab, setActiveTab] = useState<string>("global");
  const [editedValues, setEditedValues] = useState<Record<string, string>>({});
  const [savingIds, setSavingIds] = useState<Set<string>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [seeding, setSeeding] = useState(false);

  // Verification & Auth Check
  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          toast({
            title: "Acesso Restrito",
            description: "Você precisa fazer login para acessar este gerenciador.",
            variant: "destructive"
          });
          navigate("/login");
        } else {
          fetchCopyData();
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        navigate("/login");
      }
    };
    checkUser();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        navigate("/login");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  // Fetch data from database
  const fetchCopyData = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("copy")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        toast({
          title: "Erro ao carregar cópias",
          description: error.message,
          variant: "destructive"
        });
      } else if (data && data.length > 0) {
        setCopyItems(data);
        // Initialize edited state values
        const initialEdits: Record<string, string> = {};
        data.forEach(item => {
          initialEdits[item.id] = item.value;
        });
        setEditedValues(initialEdits);
      } else {
        // Table is empty, execute auto-seed
        await seedDatabase();
      }
    } catch (err) {
      console.error("Error fetching copy copywriting data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Seed default items into the copy database
  const seedDatabase = async () => {
    setSeeding(true);
    try {
      toast({
        title: "Inicializando Copy",
        description: "Aguarde enquanto semeamos os textos iniciais do site no banco de dados...",
      });

      const { error } = await supabase
        .from("copy")
        .insert(DEFAULT_COPY_ITEMS);

      if (error) {
        toast({
          title: "Erro ao semear banco",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Copy Inicializado",
          description: "Textos semeados com sucesso! Carregando dados...",
        });
        // Re-fetch database records
        const { data } = await supabase.from("copy").select("*").order("id", { ascending: true });
        if (data) {
          setCopyItems(data);
          const initialEdits: Record<string, string> = {};
          data.forEach(item => {
            initialEdits[item.id] = item.value;
          });
          setEditedValues(initialEdits);
        }
      }
    } catch (err: any) {
      console.error("Seeding failed:", err);
    } finally {
      setSeeding(false);
    }
  };

  // Handle value change locally
  const handleValueChange = (id: string, value: string) => {
    setEditedValues(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Save single item change to database
  const handleSaveItem = async (id: string, section: string, elementKey: string, label: string) => {
    const newValue = editedValues[id];
    const originalItem = copyItems.find(item => item.id === id);

    if (originalItem && originalItem.value === newValue) {
      toast({
        description: "Nenhuma alteração detectada para este campo.",
      });
      return;
    }

    setSavingIds(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });

    try {
      const { error } = await supabase
        .from("copy")
        .update({
          value: newValue,
          updated_at: new Date().toISOString()
        })
        .eq("id", id);

      if (error) {
        toast({
          title: "Erro ao salvar",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Salvo com sucesso!",
          description: `O campo "${label}" foi atualizado no banco de dados.`
        });
        // Refresh local items state to update timestamps
        const { data } = await supabase.from("copy").select("*").order("id", { ascending: true });
        if (data) {
          setCopyItems(data);
        }
      }
    } catch (err: any) {
      toast({
        title: "Erro inesperado",
        description: err.message,
        variant: "destructive"
      });
    } finally {
      setSavingIds(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  // Check if timestamp is in the last 24h
  const isRecent = (dateString?: string) => {
    if (!dateString) return false;
    const diffMs = new Date().getTime() - new Date(dateString).getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    return diffHours <= 24;
  };

  // Format date helper
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Não alterado";
    const date = new Date(dateString);
    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  };

  // Filter items based on active tab
  const filteredItems = copyItems.filter(item => item.section === activeTab);

  // Get recently updated items (top 3)
  const recentUpdates = [...copyItems]
    .filter(item => item.updated_at)
    .sort((a, b) => new Date(b.updated_at || 0).getTime() - new Date(a.updated_at || 0).getTime())
    .slice(0, 3);

  // Tab definitions
  const tabs = [
    { id: "global", label: "Geral" },
    { id: "home", label: "Página Inicial" },
    { id: "tattoo", label: "Tattoo" },
    { id: "graffiti", label: "Graffiti" },
    { id: "telas", label: "Telas" },
    { id: "ilustracoes", label: "Digital" },
    { id: "sobre", label: "Sobre / Bio" },
    { id: "faq", label: "FAQ" },
    { id: "contato", label: "Contato" },
    { id: "lista-espera", label: "Lista Espera" }
  ];

  if (loading && !seeding) {
    return (
      <PageLayout>
        <div className="-mt-32 pt-32 min-h-screen flex flex-col items-center justify-center bg-[#fafafa] copy-admin-page">
          <div className="w-16 h-16 rounded-full border-4 border-dashed border-black mb-4 animate-spin flex items-center justify-center">
            <div className="w-8 h-8 bg-[hsl(var(--accent-orange))] rounded-full opacity-60" />
          </div>
          <p className="font-outfit font-black text-black uppercase tracking-wider text-sm animate-pulse">
            Carregando textos da base...
          </p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="-mt-32 pt-32 min-h-screen pb-20 bg-[#fafafa] copy-admin-page">
        <div className="container mx-auto px-6 pt-10">
          
          {/* Header Action bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 border-b-4 border-black pb-8">
            <div className="space-y-1">
              <h1 className="text-4xl md:text-5xl font-black font-outfit uppercase tracking-tight text-black flex items-center gap-3">
                Edição de <span className="text-[hsl(var(--accent-orange))]">Copywriting</span>
              </h1>
              <p className="text-sm font-medium text-black/50 font-outfit">
                Gerencie todos os textos estáticos do site e salve no banco de dados.
              </p>
            </div>
            <div>
              <Link 
                to="/admin" 
                className="inline-flex items-center gap-3 bg-white text-black border-4 border-black px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-wider shadow-[6px_6px_0_0_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_0_black] transition-all"
              >
                <ArrowLeft size={16} /> Retornar ao Painel Administrativo
              </Link>
            </div>
          </div>

          {/* Section: Recent Updates Feed */}
          {recentUpdates.length > 0 && (
            <div className="mb-10 bg-white border-4 border-black p-6 rounded-3xl shadow-[8px_8px_0_0_black] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[hsl(var(--accent-orange))]/10 rounded-full -mr-8 -mt-8 pointer-events-none" />
              <h3 className="text-lg font-black font-outfit uppercase tracking-wider text-black mb-4 flex items-center gap-2">
                <Clock size={18} className="text-[hsl(var(--accent-orange))]" />
                Últimas Atualizações do Sistema
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recentUpdates.map(item => {
                  const tabInfo = tabs.find(t => t.id === item.section);
                  return (
                    <div 
                      key={item.id}
                      className="bg-[#fafafa] border-2 border-black p-4 rounded-2xl shadow-[4px_4px_0_0_black] flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-start gap-2 mb-2">
                          <span className="bg-black text-white text-[9px] font-black uppercase px-2 py-0.5 rounded">
                            {tabInfo?.label || item.section}
                          </span>
                          <span className="text-[10px] font-black text-[hsl(var(--accent-orange))] bg-[hsl(var(--accent-orange))]/10 px-2 py-0.5 rounded">
                            RECONHECIDO
                          </span>
                        </div>
                        <h4 className="font-bold text-xs text-black truncate mb-1">{item.label}</h4>
                        <p className="text-[11px] text-black/60 line-clamp-2 italic font-medium">
                          "{item.value}"
                        </p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-black/5 text-[9px] font-bold text-black/40 flex items-center gap-1.5">
                        <Clock size={10} />
                        Modificado: {formatDate(item.updated_at)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-10">
            {/* Sidebar Tab Menu */}
            <aside className="w-full lg:w-64 shrink-0">
              <div className="bg-white border-4 border-black p-4 rounded-3xl shadow-[8px_8px_0_0_black] sticky top-8">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40 px-3 mb-4 font-outfit">Seções do Site</p>
                <nav className="space-y-1.5">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl font-bold font-outfit text-sm transition-all border-2 ${
                        activeTab === tab.id 
                          ? "bg-[hsl(var(--accent-orange))] text-white border-black shadow-[4px_4px_0_0_black] translate-x-1" 
                          : "bg-transparent text-black/60 border-transparent hover:bg-black/5 hover:text-black"
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        activeTab === tab.id ? "bg-white text-black" : "bg-black/10 text-black/60"
                      }`}>
                        {copyItems.filter(item => item.section === tab.id).length}
                      </span>
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Editor Content Area */}
            <main className="flex-1 space-y-6">
              <div className="bg-white border-4 border-black p-6 md:p-8 rounded-3xl shadow-[8px_8px_0_0_black]">
                <div className="flex justify-between items-center mb-8 border-b-2 border-black/5 pb-4">
                  <div>
                    <h2 className="text-2xl font-black font-outfit uppercase tracking-tight text-black">
                      Gerenciar Seção: <span className="text-[hsl(var(--accent-orange))]">{tabs.find(t => t.id === activeTab)?.label}</span>
                    </h2>
                    <p className="text-xs text-black/40 font-medium font-outfit mt-1">
                      Edite os valores estáticos abaixo e clique em Salvar para atualizar no servidor.
                    </p>
                  </div>
                  {seeding && (
                    <span className="flex items-center gap-2 text-xs font-bold text-orange-500 animate-pulse bg-orange-50 border border-orange-200 px-3 py-1.5 rounded-full">
                      <RefreshCw size={12} className="animate-spin" /> Semeando Banco...
                    </span>
                  )}
                </div>

                {filteredItems.length === 0 ? (
                  <div className="text-center py-16 bg-[#fafafa] border-4 border-dashed border-black/15 rounded-2xl">
                    <AlertCircle size={40} className="mx-auto text-black/30 mb-4" />
                    <p className="text-black/50 font-black uppercase text-sm tracking-wider">Nenhum elemento cadastrado nesta seção.</p>
                    <button 
                      onClick={seedDatabase} 
                      className="mt-4 inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-black/90"
                    >
                      <RefreshCw size={12} /> Executar Seed Manual
                    </button>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {filteredItems.map((item) => {
                      const valueHasChanged = editedValues[item.id] !== item.value;
                      const recentUpdate = isRecent(item.updated_at);
                      const saving = savingIds.has(item.id);

                      return (
                        <div 
                          key={item.id}
                          className={`bg-white border-4 border-black rounded-[2rem] p-6 md:p-8 shadow-[6px_6px_0_0_black] hover:shadow-[8px_8px_0_0_black] hover:-translate-y-0.5 transition-all relative overflow-hidden ${
                            recentUpdate ? "border-[hsl(var(--accent-orange))]" : ""
                          }`}
                        >
                          {/* Accent Ribbon for recent edits */}
                          {recentUpdate && (
                            <div className="absolute top-0 right-0 bg-[hsl(var(--accent-orange))] text-white font-black text-[9px] uppercase px-4 py-1.5 tracking-wider rounded-bl-2xl flex items-center gap-1 shadow-sm">
                              <Star size={10} className="fill-white" /> Atualizado Recente (24h)
                            </div>
                          )}

                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                            <div className="space-y-1">
                              <span className="text-[10px] font-black uppercase text-black/30 tracking-widest block font-outfit">
                                CHAVE: {item.element_key}
                              </span>
                              <h3 className="text-lg font-black font-outfit uppercase tracking-tight text-black flex items-center gap-2">
                                {item.label}
                                {valueHasChanged && (
                                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" title="Alterações não salvas" />
                                )}
                              </h3>
                            </div>
                            <div className="text-[11px] font-bold text-black/40 flex items-center gap-1.5 bg-[#fafafa] px-3 py-1.5 rounded-xl border border-black/5 self-start md:self-auto">
                              <Clock size={12} className="text-black/30" />
                              Modificado: <span className="text-black/60">{formatDate(item.updated_at)}</span>
                            </div>
                          </div>

                          <div className="relative">
                            <textarea
                              rows={Math.max(2, Math.ceil((editedValues[item.id] || "").length / 100))}
                              value={editedValues[item.id] || ""}
                              onChange={(e) => handleValueChange(item.id, e.target.value)}
                              className="w-full px-6 py-4 bg-[#fafafa] border-2 border-black rounded-2xl font-medium font-outfit text-black placeholder:text-black/30 focus:outline-none focus:ring-4 focus:ring-[hsl(var(--accent-orange))]/10 focus:border-[hsl(var(--accent-orange))] transition-all resize-y shadow-inner"
                              placeholder="Digite o texto da copy..."
                            />
                          </div>

                          <div className="flex justify-end gap-3 mt-4">
                            {valueHasChanged && (
                              <button
                                onClick={() => handleValueChange(item.id, item.value)}
                                className="px-5 py-3 border-2 border-black bg-white hover:bg-black/5 text-black rounded-xl font-black text-xs uppercase tracking-wider transition-all"
                              >
                                Descartar
                              </button>
                            )}
                            <button
                              onClick={() => handleSaveItem(item.id, item.section, item.element_key, item.label)}
                              disabled={saving || !valueHasChanged}
                              className={`inline-flex items-center gap-2 px-6 py-3 border-2 border-black rounded-xl font-black text-xs uppercase tracking-wider shadow-[4px_4px_0_0_black] hover:translate-x-[1.5px] hover:translate-y-[1.5px] hover:shadow-none transition-all disabled:opacity-55 disabled:cursor-not-allowed disabled:hover:translate-none ${
                                valueHasChanged 
                                  ? "bg-[hsl(var(--accent-orange))] text-white shadow-[4px_4px_0_0_black]" 
                                  : "bg-gray-100 text-black/40 shadow-none border-gray-300"
                              }`}
                            >
                              {saving ? (
                                <>
                                  <RefreshCw size={14} className="animate-spin" /> Salvando...
                                </>
                              ) : (
                                <>
                                  <Save size={14} /> Salvar Alteração
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Developer Sync CTA Block */}
              <div className="bg-black text-white border-4 border-black p-8 md:p-10 rounded-[3rem] shadow-[12px_12px_0_0_black] text-center relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[hsl(var(--accent-orange))]/10 rounded-full -mr-16 -mt-16 blur-xl" />
                <span className="text-[10px] uppercase font-black tracking-[0.25em] text-[hsl(var(--accent-orange))] mb-3 block">Finalizar Alterações</span>
                <h3 className="text-3xl md:text-4xl font-black font-outfit uppercase tracking-tight mb-4">Enviar Alterações ao Desenvolvedor</h3>
                <p className="text-white/60 font-outfit text-sm max-w-xl mx-auto mb-8 leading-relaxed">
                  Finalizou todos os ajustes nos textos do site? Clique abaixo para consolidar sua cópia e sinalizar o desenvolvedor para a sincronização dos arquivos estáticos.
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-[hsl(var(--accent-orange))] text-white px-10 py-5 rounded-[2rem] border-4 border-white inline-flex items-center gap-3 font-black uppercase text-sm tracking-wider hover:bg-[hsl(var(--accent-orange))]/90 hover:scale-105 active:scale-95 transition-all shadow-[6px_6px_0_0_white]"
                >
                  <Send size={16} /> Enviar Copy para o Desenvolvedor
                </button>
              </div>
            </main>
          </div>

        </div>
      </div>

      {/* Pop-art Modal Alert */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div 
            className="relative w-full max-w-lg bg-white border-4 border-black p-8 md:p-10 rounded-tl-[3.5rem] rounded-br-[3.5rem] rounded-tr-[1.5rem] rounded-bl-[1.5rem] shadow-[16px_16px_0_0_black] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Pop-art ribbon */}
            <div className="absolute -top-6 left-8 bg-[hsl(var(--accent-orange))] text-white border-2 border-black px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest shadow-[4px_4px_0_0_black] -rotate-3">
              Sucesso!
            </div>

            {/* Close Button X */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 border-2 border-black rounded-full hover:bg-black/5 text-black hover:-rotate-90 transition-all"
            >
              <X size={18} />
            </button>

            <div className="text-center mt-6">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full border-4 border-black flex items-center justify-center mx-auto mb-6 shadow-[3px_3px_0_0_black]">
                <Check size={28} strokeWidth={3} />
              </div>
              <h2 className="text-2xl md:text-3xl font-black font-outfit uppercase tracking-tight text-black mb-4">
                Resposta Recebida!
              </h2>
              <p className="text-black/60 font-outfit text-base leading-relaxed mb-8">
                A <span className="font-black text-black">origin development</span> agradece sua resposta!
              </p>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full bg-black text-white px-8 py-4 rounded-2xl font-black uppercase text-sm tracking-wider shadow-[4px_4px_0_0_hsl(var(--accent-orange))] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
              >
                Fechar Notificação
              </button>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default AdminCopy;
