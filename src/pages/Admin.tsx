import React, { useState, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import { Link, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, Star, Trash2, Plus, Save, Image as ImageIcon, 
  HelpCircle, User as UserIcon, Paintbrush, Scissors, 
  Monitor, LogOut, Check, Copy, Pencil, X, FileText
} from "lucide-react";
import { supabase } from "@/utils/supabase";

interface Artwork {
  id: string;
  title: string;
  image: string; // Base64 or URL
  isStarred: boolean;
}

interface FAQItem {
  id?: string;
  q: string;
  a: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"tattoo" | "graffiti" | "telas" | "ilustracoes" | "faq" | "sobre">("tattoo");
  
  // State for Portfolios
  const [tattoos, setTattoos] = useState<Artwork[]>([]);
  const [graffiti, setGraffiti] = useState<Artwork[]>([]);
  const [telas, setTelas] = useState<Artwork[]>([]);
  const [ilustracoes, setIlustracoes] = useState<Artwork[]>([]);
  
  // State for FAQ
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  
  // State for Sobre Photos
  const [sobrePhotos, setSobrePhotos] = useState<{ photo1: string; photo2: string }>({ photo1: "", photo2: "" });

  // State for Form Adds
  const [newTitle, setNewTitle] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newFAQQuestion, setNewFAQQuestion] = useState("");
  const [newFAQAnswer, setNewFAQAnswer] = useState("");

  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  // State for Editing
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingImage, setEditingImage] = useState("");
  const [uploadingEditImage, setUploadingEditImage] = useState(false);

  // Fetch all data from Supabase
  const fetchAllData = async () => {
    try {
      // 1. Fetch portfolio items from separate tables
      const [tattooRes, graffitiRes, telasRes, ilustracoesRes] = await Promise.all([
        supabase.from("portfolio_tattoo").select("*").order("created_at", { ascending: true }),
        supabase.from("portfolio_graffiti").select("*").order("created_at", { ascending: true }),
        supabase.from("portfolio_telas").select("*").order("created_at", { ascending: true }),
        supabase.from("portfolio_ilustracoes").select("*").order("created_at", { ascending: true })
      ]);

      if (tattooRes.error) console.error("Error loading tattoo:", tattooRes.error);
      else if (tattooRes.data) {
        setTattoos(tattooRes.data.map(item => ({
          id: item.id,
          title: item.title,
          image: item.image_url || "",
          isStarred: item.is_starred
        })));
      }

      if (graffitiRes.error) console.error("Error loading graffiti:", graffitiRes.error);
      else if (graffitiRes.data) {
        setGraffiti(graffitiRes.data.map(item => ({
          id: item.id,
          title: item.title,
          image: item.image_url || "",
          isStarred: item.is_starred
        })));
      }

      if (telasRes.error) console.error("Error loading telas:", telasRes.error);
      else if (telasRes.data) {
        setTelas(telasRes.data.map(item => ({
          id: item.id,
          title: item.title,
          image: item.image_url || "",
          isStarred: item.is_starred
        })));
      }

      if (ilustracoesRes.error) console.error("Error loading ilustracoes:", ilustracoesRes.error);
      else if (ilustracoesRes.data) {
        setIlustracoes(ilustracoesRes.data.map(item => ({
          id: item.id,
          title: item.title,
          image: item.image_url || "",
          isStarred: item.is_starred
        })));
      }

      // 2. Fetch FAQ items
      const { data: faqData, error: faqError } = await supabase
        .from("faq_items")
        .select("*")
        .order("display_order", { ascending: true });

      if (faqError) {
        console.error("Error fetching FAQ:", faqError);
      } else if (faqData) {
        setFaqs(faqData.map(item => ({
          id: item.id,
          q: item.question,
          a: item.answer
        })));
      }

      // 3. Fetch biography settings
      const { data: biographyData, error: biographyError } = await supabase
        .from("biography_settings")
        .select("*")
        .eq("id", 1)
        .maybeSingle();

      if (biographyError) {
        console.error("Error fetching biography:", biographyError);
      } else if (biographyData) {
        setSobrePhotos({
          photo1: biographyData.photo1_url || "",
          photo2: biographyData.photo2_url || ""
        });
      }
    } catch (e) {
      console.error("Unexpected error fetching data:", e);
    }
  };

  // Load from Supabase on mount after auth check
  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          navigate("/login");
        } else {
          setLoading(false);
          fetchAllData();
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

  const getActiveList = () => {
    if (activeTab === "tattoo") return tattoos;
    if (activeTab === "graffiti") return graffiti;
    if (activeTab === "telas") return telas;
    if (activeTab === "ilustracoes") return ilustracoes;
    return [];
  };

  // Add Item to Portfolio
  const handleAddArtwork = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentList = getActiveList();
    if (currentList.length >= 12) {
      alert("Limite de 12 itens atingido para este portfólio.");
      return;
    }

    const title = newTitle || `Nova Obra #${currentList.length + 1}`;
    const isStarred = currentList.length === 0;
    const tableName = `portfolio_${activeTab}`;

    const { error } = await supabase
      .from(tableName)
      .insert({
        title,
        image_url: newImage || null,
        is_starred: isStarred
      });

    if (error) {
      alert("Erro ao adicionar obra: " + error.message);
    } else {
      setNewTitle("");
      setNewImage("");
      fetchAllData();
    }
  };

  // Handle image upload to Supabase Storage
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isForSobre: 1 | 2 | null = null) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadingImage(true);
      try {
        // Generate a unique filename using timestamp and random string
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `${isForSobre ? "sobre" : activeTab}/${fileName}`;

        // Upload file to portfolio bucket
        const { error: uploadError } = await supabase.storage
          .from("portfolio")
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false
          });

        if (uploadError) {
          alert("Erro ao fazer upload da imagem: " + uploadError.message);
          return;
        }

        // Get public URL of the uploaded file
        const { data: { publicUrl } } = supabase.storage
          .from("portfolio")
          .getPublicUrl(filePath);

        if (isForSobre) {
          const field = isForSobre === 1 ? "photo1_url" : "photo2_url";
          
          const { error } = await supabase
            .from("biography_settings")
            .upsert({ id: 1, [field]: publicUrl });

          if (error) {
            alert("Erro ao salvar foto: " + error.message);
          } else {
            fetchAllData();
          }
        } else {
          setNewImage(publicUrl);
        }
      } catch (err: any) {
        alert("Erro inesperado durante o upload: " + err.message);
      } finally {
        setUploadingImage(false);
      }
    }
  };

  // Duplicate Artwork
  const handleDuplicateArtwork = async (item: Artwork) => {
    const currentList = getActiveList();
    if (currentList.length >= 12) {
      alert("Limite de 12 itens atingido para este portfólio.");
      return;
    }

    const title = `${item.title} (Cópia)`;
    const isStarred = false;
    const tableName = `portfolio_${activeTab}`;

    const { error } = await supabase
      .from(tableName)
      .insert({
        title,
        image_url: item.image || null,
        is_starred: isStarred
      });

    if (error) {
      alert("Erro ao duplicar obra: " + error.message);
    } else {
      fetchAllData();
    }
  };

  // Start Editing Artwork
  const handleStartEdit = (item: Artwork) => {
    setEditingId(item.id);
    setEditingTitle(item.title);
    setEditingImage(item.image);
  };

  // Cancel Editing Artwork
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingTitle("");
    setEditingImage("");
  };

  // Save Artwork Changes
  const handleSaveEdit = async (id: string) => {
    const tableName = `portfolio_${activeTab}`;
    const { error } = await supabase
      .from(tableName)
      .update({
        title: editingTitle,
        image_url: editingImage || null
      })
      .eq("id", id);

    if (error) {
      alert("Erro ao salvar alterações: " + error.message);
    } else {
      setEditingId(null);
      setEditingTitle("");
      setEditingImage("");
      fetchAllData();
    }
  };

  // Handle image upload for editing artwork
  const handleEditImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadingEditImage(true);
      try {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `${activeTab}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("portfolio")
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false
          });

        if (uploadError) {
          alert("Erro ao fazer upload da imagem: " + uploadError.message);
          return;
        }

        const { data: { publicUrl } } = supabase.storage
          .from("portfolio")
          .getPublicUrl(filePath);

        setEditingImage(publicUrl);
      } catch (err: any) {
        alert("Erro inesperado durante o upload: " + err.message);
      } finally {
        setUploadingEditImage(false);
      }
    }
  };

  // Delete Artwork
  const handleDeleteArtwork = async (id: string) => {
    const tableName = `portfolio_${activeTab}`;
    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq("id", id);

    if (error) {
      alert("Erro ao deletar obra: " + error.message);
    } else {
      fetchAllData();
    }
  };

  // Toggle Star / Main Artwork
  const handleStarArtwork = async (id: string) => {
    const tableName = `portfolio_${activeTab}`;
    const { error } = await supabase
      .from(tableName)
      .update({ is_starred: true })
      .eq("id", id);

    if (error) {
      alert("Erro ao destacar obra: " + error.message);
    } else {
      fetchAllData();
    }
  };

  // Add FAQ
  const handleAddFAQ = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFAQQuestion || !newFAQAnswer) return;

    const { error } = await supabase
      .from("faq_items")
      .insert({
        question: newFAQQuestion,
        answer: newFAQAnswer,
        display_order: faqs.length
      });

    if (error) {
      alert("Erro ao adicionar pergunta: " + error.message);
    } else {
      setNewFAQQuestion("");
      setNewFAQAnswer("");
      fetchAllData();
    }
  };

  // Delete FAQ
  const handleDeleteFAQ = async (item: FAQItem) => {
    if (!item.id) return;
    const { error } = await supabase
      .from("faq_items")
      .delete()
      .eq("id", item.id);

    if (error) {
      alert("Erro ao deletar pergunta: " + error.message);
    } else {
      fetchAllData();
    }
  };

  // Remove Sobre Photo
  const handleRemoveSobrePhoto = async (key: "photo1" | "photo2") => {
    const field = key === "photo1" ? "photo1_url" : "photo2_url";
    const { error } = await supabase
      .from("biography_settings")
      .upsert({ id: 1, [field]: null });

    if (error) {
      alert("Erro ao remover foto: " + error.message);
    } else {
      fetchAllData();
    }
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert("Erro ao deslogar: " + error.message);
    } else {
      navigate("/login");
    }
  };

  if (loading) {
    return (
      <PageLayout>
        <div className="-mt-32 pt-32 min-h-screen flex flex-col items-center justify-center bg-[#fafafa]">
          <div className="w-16 h-16 rounded-full border-4 border-dashed border-black mb-4 animate-spin flex items-center justify-center">
            <div className="w-8 h-8 bg-[hsl(var(--accent-orange))] rounded-full opacity-60" />
          </div>
          <p className="font-outfit font-black text-black uppercase tracking-wider text-sm animate-pulse">
            Verificando credenciais...
          </p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="-mt-32 pt-32 min-h-screen pb-20 bg-[#fafafa]">
        <div className="container mx-auto px-6 pt-10">
          
          {/* Header Dashboard */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-black/5 pb-8">
            <div className="w-full md:w-auto">
              <h1 className="text-4xl font-black font-outfit uppercase tracking-tight text-black flex items-center justify-center md:justify-start gap-3 w-full text-center md:text-left">
                Painel <span className="text-[hsl(var(--accent-orange))]">Geral</span>
              </h1>
              <p className="text-sm font-medium text-black/50 font-outfit mt-1 text-center md:text-left">
                Área do Artista • Gerenciamento de Portfólios e FAQ
              </p>
            </div>
            <div className="flex gap-4 w-full md:w-auto justify-center md:justify-start">
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 bg-white text-black border-2 border-black px-5 py-3 rounded-2xl font-black text-sm shadow-[4px_4px_0_0_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
              >
                <ArrowLeft size={16} /> Ver Site
              </Link>
              <button 
                onClick={handleSignOut}
                className="inline-flex items-center gap-2 bg-red-500 text-white border-2 border-black px-5 py-3 rounded-2xl font-black text-sm shadow-[4px_4px_0_0_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
              >
                <LogOut size={16} /> Sair
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Sidebar menu */}
            <aside className="w-full lg:w-64 shrink-0 space-y-2">
              <div className="bg-white border-4 border-black p-4 rounded-3xl shadow-[6px_6px_0_0_black]">
                <p className="text-xs font-black uppercase tracking-widest text-black/40 px-3 mb-3 font-outfit">Portfólios</p>
                <nav className="space-y-1">
                  {[
                    { id: "tattoo", label: "Tatuagens", icon: Scissors },
                    { id: "graffiti", label: "Graffiti / Mural", icon: Paintbrush },
                    { id: "telas", label: "Telas", icon: ImageIcon },
                    { id: "ilustracoes", label: "Ilustrações", icon: Monitor },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold font-outfit text-sm transition-all border-2 ${
                          activeTab === tab.id 
                            ? "bg-[hsl(var(--accent-orange))] text-white border-black shadow-[3px_3px_0_0_black]" 
                            : "bg-transparent text-black/60 border-transparent hover:bg-black/5 hover:text-black"
                        }`}
                      >
                        <Icon size={18} />
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>

                <div className="h-[1px] bg-black/5 my-4" />
                
                <p className="text-xs font-black uppercase tracking-widest text-black/40 px-3 mb-3 font-outfit">Configurações</p>
                <nav className="space-y-1">
                  {[
                    { id: "faq", label: "Perguntas FAQ", icon: HelpCircle },
                    { id: "sobre", label: "Fotos do Sobre", icon: UserIcon },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold font-outfit text-sm transition-all border-2 ${
                          activeTab === tab.id 
                            ? "bg-[hsl(var(--accent-orange))] text-white border-black shadow-[3px_3px_0_0_black]" 
                            : "bg-transparent text-black/60 border-transparent hover:bg-black/5 hover:text-black"
                        }`}
                      >
                        <Icon size={18} />
                        {tab.label}
                      </button>
                    );
                  })}
                  
                  <Link
                    to="/admin/copy"
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold font-outfit text-sm transition-all border-2 border-transparent bg-transparent text-black/60 hover:bg-black/5 hover:text-black mt-1"
                  >
                    <FileText size={18} />
                    Copy do Site
                  </Link>
                </nav>
              </div>
            </aside>

            {/* Main Content Form */}
            <main className="flex-1">
              
              {/* PORTFOLIO TAB EDITING */}
              {["tattoo", "graffiti", "telas", "ilustracoes"].includes(activeTab) && (
                <div className="space-y-8 animate-in fade-in duration-200">
                  <div className="bg-white border-4 border-black p-6 md:p-8 rounded-3xl shadow-[8px_8px_0_0_black]">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-black font-outfit uppercase tracking-tight text-black">
                        ADICIONAR À COLEÇÃO DE <span className="text-[hsl(var(--accent-orange))]">{activeTab === "tattoo" ? "TATTOO" : activeTab === "graffiti" ? "GRAFFITI" : activeTab === "telas" ? "TELAS" : "ILUSTRAÇÕES"}</span>
                      </h2>
                      <span className="bg-black/5 border border-black/10 px-3 py-1 rounded-full text-xs font-black uppercase font-outfit">
                        {getActiveList().length} / 12 Itens
                      </span>
                    </div>

                    <form onSubmit={handleAddArtwork} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="block text-xs font-black uppercase tracking-widest text-black font-outfit">Título / Legenda</label>
                          <input 
                            type="text" 
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            placeholder="Ex: Tatuagem Realista Braço" 
                            className="block w-full px-4 py-3 bg-white border-2 border-black rounded-xl font-bold text-black focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent-orange))] focus:border-black transition-all"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="block text-xs font-black uppercase tracking-widest text-black font-outfit">URL da Imagem (Opcional)</label>
                          <input 
                            type="text" 
                            value={newImage}
                            onChange={(e) => setNewImage(e.target.value)}
                            placeholder="https://exemplo.com/foto.jpg" 
                            className="block w-full px-4 py-3 bg-white border-2 border-black rounded-xl font-bold text-black focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent-orange))] focus:border-black transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-4 flex flex-col justify-between">
                        <div className="space-y-2">
                          <label className="block text-xs font-black uppercase tracking-widest text-black font-outfit">Ou Upload de Arquivo</label>
                          <div className="relative border-2 border-dashed border-black/30 hover:border-black rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer bg-[#fafafa] transition-all min-h-[140px] overflow-hidden group">
                            {uploadingImage ? (
                              <div className="flex flex-col items-center">
                                <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin mb-2" />
                                <span className="text-xs font-bold text-black/60">Enviando imagem...</span>
                              </div>
                            ) : newImage ? (
                              <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/5">
                                <img src={newImage} alt="Preview" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                  <span className="text-white text-xs font-black uppercase tracking-wider bg-black/80 px-3 py-1 rounded-lg border border-white/20">Alterar Imagem</span>
                                </div>
                                <input 
                                  type="file" 
                                  accept="image/*"
                                  onChange={(e) => handleImageUpload(e)}
                                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                              </div>
                            ) : (
                              <>
                                <input 
                                  type="file" 
                                  accept="image/*"
                                  onChange={(e) => handleImageUpload(e)}
                                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <ImageIcon size={28} className="text-black/40 mb-2" />
                                <span className="text-sm font-bold text-black/60">Escolher Imagem</span>
                                <span className="text-xs text-black/30 mt-1">PNG, JPG de até 5MB</span>
                              </>
                            )}
                          </div>
                        </div>

                        <button 
                          type="submit"
                          disabled={getActiveList().length >= 12}
                          className="w-full bg-black text-white px-6 py-4 rounded-xl font-black text-sm uppercase tracking-wider shadow-[4px_4px_0_0_hsl(var(--accent-orange))] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus size={18} /> Adicionar Obra
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* List of current artworks */}
                  <div className="bg-white border-4 border-black p-6 md:p-8 rounded-3xl shadow-[8px_8px_0_0_black]">
                    <h3 className="text-xl font-black font-outfit uppercase tracking-tight text-black mb-6">Obras Cadastradas</h3>
                    
                    {getActiveList().length === 0 ? (
                      <div className="text-center py-12 bg-[#fafafa] border-2 border-dashed border-black/10 rounded-2xl">
                        <p className="text-black/40 font-bold font-outfit">Nenhuma obra cadastrada ainda.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {getActiveList().map((item) => (
                          <div 
                            key={item.id} 
                            className={`border-2 border-black rounded-2xl overflow-hidden bg-[#fafafa] relative flex flex-col justify-between shadow-[4px_4px_0_0_black] ${
                              item.isStarred ? "ring-4 ring-[hsl(var(--accent-orange))] border-[hsl(var(--accent-orange))]" : ""
                            }`}
                          >
                            {editingId === item.id ? (
                              <>
                                <div className="aspect-square bg-black/5 relative overflow-hidden border-b border-black group">
                                  {uploadingEditImage ? (
                                    <div className="w-full h-full flex flex-col items-center justify-center bg-black/5">
                                      <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin mb-2" />
                                      <span className="text-[10px] font-bold text-black/60">Enviando...</span>
                                    </div>
                                  ) : editingImage ? (
                                    <>
                                      <img src={editingImage} alt="Preview" className="w-full h-full object-cover" />
                                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="text-white text-[10px] font-black uppercase tracking-wider bg-black/80 px-2 py-1 rounded border border-white/20">Alterar</span>
                                      </div>
                                      <input 
                                        type="file" 
                                        accept="image/*"
                                        onChange={handleEditImageUpload}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                      />
                                    </>
                                  ) : (
                                    <>
                                      <input 
                                        type="file" 
                                        accept="image/*"
                                        onChange={handleEditImageUpload}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                      />
                                      <div className="w-full h-full flex flex-col items-center justify-center text-black/20 font-black uppercase text-xs">
                                        <ImageIcon size={24} className="mb-1 opacity-50" /> Escolher Foto
                                      </div>
                                    </>
                                  )}
                                </div>

                                <div className="p-4 flex-1 flex flex-col justify-between gap-4">
                                  <input 
                                    type="text"
                                    value={editingTitle}
                                    onChange={(e) => setEditingTitle(e.target.value)}
                                    className="block w-full px-2 py-2 border-2 border-black rounded-lg text-xs font-bold focus:outline-none focus:ring-1 focus:ring-[hsl(var(--accent-orange))]"
                                  />
                                  <div className="flex gap-2 w-full">
                                    <button
                                      type="button"
                                      onClick={() => handleSaveEdit(item.id)}
                                      className="flex-1 py-2 px-3 border-2 border-black bg-black text-white hover:bg-black/90 rounded-xl font-black text-xs uppercase flex items-center justify-center gap-1 shadow-[2px_2px_0_0_hsl(var(--accent-orange))] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_0_hsl(var(--accent-orange))] transition-all"
                                    >
                                      <Check size={12} /> Salvar
                                    </button>
                                    <button
                                      type="button"
                                      onClick={handleCancelEdit}
                                      className="p-2 border-2 border-black bg-white hover:bg-black/5 text-black rounded-xl shadow-[2px_2px_0_0_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_0_black] transition-all"
                                    >
                                      <X size={14} />
                                    </button>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="aspect-square bg-black/5 relative overflow-hidden border-b border-black">
                                  {item.image ? (
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                  ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-black/20 font-black uppercase text-xs">
                                      <ImageIcon size={32} className="mb-2 opacity-50" /> Sem Imagem
                                    </div>
                                  )}
                                  {item.isStarred && (
                                    <div className="absolute top-3 left-3 bg-[hsl(var(--accent-orange))] border-2 border-black text-white px-3 py-1 rounded-full font-black text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-[2px_2px_0_0_black]">
                                      <Star size={10} className="fill-white" /> Destaque
                                    </div>
                                  )}
                                </div>

                                <div className="p-4 flex-1 flex flex-col justify-between gap-4">
                                  <h4 className="font-bold text-sm text-black truncate">{item.title}</h4>
                                  <div className="flex gap-1.5 w-full">
                                    <button
                                      type="button"
                                      onClick={() => handleStarArtwork(item.id)}
                                      className={`flex-1 py-2 px-3 border-2 border-black rounded-xl font-black text-[10px] uppercase flex items-center justify-center gap-1 transition-all ${
                                        item.isStarred 
                                          ? "bg-yellow-400 text-black shadow-none translate-x-[2px] translate-y-[2px]" 
                                          : "bg-white text-black hover:bg-yellow-50 shadow-[2px_2px_0_0_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_0_black]"
                                      }`}
                                    >
                                      <Star size={10} className={item.isStarred ? "fill-current" : ""} /> Destaque
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleStartEdit(item)}
                                      title="Editar Obra"
                                      className="p-2 border-2 border-black bg-white hover:bg-orange-50 text-orange-500 rounded-xl hover:text-orange-600 shadow-[2px_2px_0_0_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_0_black] transition-all"
                                    >
                                      <Pencil size={12} />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleDuplicateArtwork(item)}
                                      title="Duplicar Obra"
                                      className="p-2 border-2 border-black bg-white hover:bg-blue-50 text-blue-500 rounded-xl hover:text-blue-600 shadow-[2px_2px_0_0_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_0_black] transition-all"
                                    >
                                      <Copy size={12} />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteArtwork(item.id)}
                                      title="Deletar Obra"
                                      className="p-2 border-2 border-black bg-white hover:bg-red-50 text-red-500 rounded-xl hover:text-red-600 shadow-[2px_2px_0_0_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_0_black] transition-all"
                                    >
                                      <Trash2 size={12} />
                                    </button>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* FAQ TAB EDITING */}
              {activeTab === "faq" && (
                <div className="space-y-8 animate-in fade-in duration-200">
                  <div className="bg-white border-4 border-black p-6 md:p-8 rounded-3xl shadow-[8px_8px_0_0_black]">
                    <h2 className="text-2xl font-black font-outfit uppercase tracking-tight text-black mb-6">
                      ADICIONAR PERGUNTA AO <span className="text-[hsl(var(--accent-orange))]">FAQ</span>
                    </h2>
                    
                    <form onSubmit={handleAddFAQ} className="space-y-6">
                      <div className="space-y-2">
                        <label className="block text-xs font-black uppercase tracking-widest text-black font-outfit">Pergunta</label>
                        <input 
                          type="text" 
                          value={newFAQQuestion}
                          onChange={(e) => setNewFAQQuestion(e.target.value)}
                          placeholder="Ex: Qual o valor mínimo do orçamento?" 
                          className="block w-full px-4 py-3 bg-white border-2 border-black rounded-xl font-bold text-black focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent-orange))] focus:border-black transition-all"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-xs font-black uppercase tracking-widest text-black font-outfit">Resposta</label>
                        <textarea 
                          value={newFAQAnswer}
                          onChange={(e) => setNewFAQAnswer(e.target.value)}
                          placeholder="Digite aqui uma explicação clara e completa..." 
                          rows={4}
                          className="block w-full px-4 py-3 bg-white border-2 border-black rounded-xl font-bold text-black focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent-orange))] focus:border-black transition-all"
                          required
                        />
                      </div>

                      <button 
                        type="submit"
                        className="bg-black text-white px-6 py-4 rounded-xl font-black text-sm uppercase tracking-wider shadow-[4px_4px_0_0_hsl(var(--accent-orange))] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center justify-center gap-3"
                      >
                        <Plus size={18} /> Adicionar FAQ
                      </button>
                    </form>
                  </div>

                  <div className="bg-white border-4 border-black p-6 md:p-8 rounded-3xl shadow-[8px_8px_0_0_black]">
                    <h3 className="text-xl font-black font-outfit uppercase tracking-tight text-black mb-6 font-outfit">Dúvidas Cadastradas</h3>
                    
                    {faqs.length === 0 ? (
                      <div className="text-center py-12 bg-[#fafafa] border-2 border-dashed border-black/10 rounded-2xl">
                        <p className="text-black/40 font-bold font-outfit">Nenhuma pergunta cadastrada.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {faqs.map((faq, index) => (
                          <div key={index} className="border-2 border-black bg-[#fafafa] rounded-2xl p-5 shadow-[4px_4px_0_0_black] flex justify-between items-start gap-4">
                            <div className="space-y-2">
                              <h4 className="font-bold text-black text-lg font-outfit uppercase">{faq.q}</h4>
                              <p className="text-black/60 font-outfit text-sm leading-relaxed">{faq.a}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleDeleteFAQ(faq)}
                              className="p-2 border-2 border-black bg-white hover:bg-red-50 text-red-500 rounded-xl hover:text-red-600 shadow-[2px_2px_0_0_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_0_black] transition-all shrink-0"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SOBRE TAB EDITING */}
              {activeTab === "sobre" && (
                <div className="bg-white border-4 border-black p-6 md:p-8 rounded-3xl shadow-[8px_8px_0_0_black] animate-in fade-in duration-200">
                  <h2 className="text-2xl font-black font-outfit uppercase tracking-tight text-black mb-6">
                    EDITAR FOTOS DO <span className="text-[hsl(var(--accent-orange))]">SOBRE / BIOGRAFIA</span>
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* First Photo */}
                    <div className="border-2 border-black bg-[#fafafa] rounded-2xl p-6 flex flex-col justify-between gap-6 shadow-[4px_4px_0_0_black]">
                      <div>
                        <h3 className="font-bold text-lg text-black font-outfit uppercase mb-2">Primeira Foto (Principal)</h3>
                        <p className="text-xs text-black/50 font-outfit mb-4">Esta foto aparece em destaque na primeira dobra da biografia.</p>
                      </div>

                      <div className="aspect-video bg-black/5 rounded-xl border border-black overflow-hidden relative flex flex-col items-center justify-center text-black/20 font-black text-xs uppercase">
                        {sobrePhotos.photo1 ? (
                          <>
                            <img src={sobrePhotos.photo1} alt="Foto 1" className="w-full h-full object-cover" />
                            <button 
                              onClick={() => handleRemoveSobrePhoto("photo1")}
                              className="absolute top-3 right-3 bg-red-500 text-white p-2 border-2 border-black rounded-xl hover:bg-red-600 transition-colors shadow-[2px_2px_0_0_black]"
                            >
                              <Trash2 size={14} />
                            </button>
                          </>
                        ) : (
                          <>
                            <ImageIcon size={32} className="mb-2 opacity-50" /> Sem Imagem
                          </>
                        )}
                      </div>

                      <div className="space-y-4">
                        <div className="relative border-2 border-dashed border-black/30 hover:border-black rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer bg-white transition-all">
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, 1)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          <span className="text-xs font-black uppercase text-black/60">Upload Foto 1</span>
                        </div>
                      </div>
                    </div>

                    {/* Second Photo */}
                    <div className="border-2 border-black bg-[#fafafa] rounded-2xl p-6 flex flex-col justify-between gap-6 shadow-[4px_4px_0_0_black]">
                      <div>
                        <h3 className="font-bold text-lg text-black font-outfit uppercase mb-2">Segunda Foto (Secundária)</h3>
                        <p className="text-xs text-black/50 font-outfit mb-4">Esta foto aparece mais abaixo no manifesto ou rodapé da biografia.</p>
                      </div>

                      <div className="aspect-video bg-black/5 rounded-xl border border-black overflow-hidden relative flex flex-col items-center justify-center text-black/20 font-black text-xs uppercase">
                        {sobrePhotos.photo2 ? (
                          <>
                            <img src={sobrePhotos.photo2} alt="Foto 2" className="w-full h-full object-cover" />
                            <button 
                              onClick={() => handleRemoveSobrePhoto("photo2")}
                              className="absolute top-3 right-3 bg-red-500 text-white p-2 border-2 border-black rounded-xl hover:bg-red-600 transition-colors shadow-[2px_2px_0_0_black]"
                            >
                              <Trash2 size={14} />
                            </button>
                          </>
                        ) : (
                          <>
                            <ImageIcon size={32} className="mb-2 opacity-50" /> Sem Imagem
                          </>
                        )}
                      </div>

                      <div className="space-y-4">
                        <div className="relative border-2 border-dashed border-black/30 hover:border-black rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer bg-white transition-all">
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, 2)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          <span className="text-xs font-black uppercase text-black/60">Upload Foto 2</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              )}

            </main>
          </div>

        </div>
      </div>
    </PageLayout>
  );
};

export default Admin;
