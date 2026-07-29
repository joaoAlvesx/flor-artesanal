import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ArrowLeft, MapPin, Store, ShoppingCart, Star, X, Loader2 } from "lucide-react";
import { loadProducerBySlug, type Producer } from "@/lib/producers";
import { loadProducts, formatPrice, type Product } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";

// Imagem de fundo da paisagem
import bgNature from "@/assets/hero-pantanal.jpg";

const ProducerDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  const { addItem, openCart } = useCart();

  const [producer, setProducer] = useState<Producer | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados do Pop-up de detalhes
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentImgIdx, setCurrentImgIdx] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      setLoading(true);
      const producerData = await loadProducerBySlug(slug);
      
      if (producerData) {
        setProducer(producerData);
        const producerProducts = await loadProducts(producerData.id);
        setProducts(producerProducts);
      }
      setLoading(false);
    };

    fetchData();
  }, [slug]);

  const handleAddToCart = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    addItem(product);
    toast({ title: "Adicionado ao carrinho!", description: product.name });
    openCart();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center text-amber-100">
        <Loader2 className="w-10 h-10 animate-spin text-amber-500 mb-4" />
        <p className="font-artisan text-xl tracking-wide">Carregando história do produtor...</p>
      </div>
    );
  }

  if (!producer) {
    return (
      <div className="min-h-screen bg-neutral-900 text-white flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <h2 className="text-3xl font-artisan font-bold mb-4">Produtor não encontrado</h2>
          <p className="text-neutral-400 mb-6">Não foi possível encontrar as informações deste produtor.</p>
          <Link to="/">
            <Button className="bg-amber-700 hover:bg-amber-800 text-white">
              <ArrowLeft className="h-4 w-4 mr-2" /> Voltar ao início
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen font-sans bg-neutral-900 text-[#3D3028] antialiased">
      <Header />
      <CartDrawer />

      {/* 1. IMAGEM DE FUNDO FIXA DA PAISAGEM */}
      <div className="fixed inset-0 z-0">
        <img
          src={bgNature}
          alt="Fundo Pantanal"
          className="w-full h-full object-cover brightness-[0.35]"
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
      </div>

      {/* 2. CONTEÚDO DA PÁGINA */}
      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        {/* Botão de Voltar */}
        <Link 
          to="/" 
          className="inline-flex items-center text-sm font-medium text-white/80 hover:text-white mb-6 transition-colors bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para a página inicial
        </Link>

        {/* CARTÃO CENTRAL FLUTUANTE EM TOM PALHA/CREME */}
        <div className="max-w-6xl mx-auto bg-[#F4EFE6]/95 backdrop-blur-md rounded-3xl p-6 md:p-12 shadow-2xl border border-amber-200/40">
          
          {/* HERÓI DO PRODUTOR */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
            
            {/* Lado Esquerdo: Imagem/Logo no Box Branco */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="bg-white rounded-2xl p-6 shadow-md border border-amber-200/60 w-full max-w-sm aspect-square flex items-center justify-center relative overflow-hidden group">
                {producer.image ? (
                  <img 
                    src={producer.image} 
                    alt={producer.name} 
                    className="max-h-full max-w-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-amber-900/40 space-y-2">
                    <Store className="h-16 w-16" />
                    <span className="font-artisan text-2xl font-bold text-amber-900 text-center">
                      {producer.name}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Lado Direito: Informações */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-sm font-semibold text-amber-800 uppercase tracking-widest">
                Produtor Local
              </span>

              <h1 className="text-4xl md:text-5xl font-artisan font-bold text-[#2A1E17]">
                {producer.name}
              </h1>

              {producer.location && (
                <div className="flex items-center text-amber-900/90 font-medium text-sm md:text-base">
                  <MapPin className="w-4 h-4 mr-1 text-amber-700 fill-amber-700/20" />
                  <span>{producer.location}</span>
                </div>
              )}

              <p className="text-[#524338] leading-relaxed text-base md:text-lg pt-2">
                {producer.bio || "Este produtor ainda não cadastrou sua história detalhada."}
              </p>
            </div>
          </div>

          {/* VITRINE DE PRODUTOS */}
          <div className="pt-8 border-t border-amber-900/10">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-artisan font-bold text-[#2A1E17]">
                Produtos de <span className="text-amber-700">{producer.name}</span>
              </h2>
              <p className="text-[#6A5A4D] text-sm md:text-base">
                Confira tudo o que é produzido artesanalmente nesta propriedade.
              </p>
            </div>

            {products.length === 0 ? (
              <div className="text-center py-12 bg-[#FAF7F2] rounded-2xl border border-dashed border-amber-300/60">
                <p className="text-amber-900/70 font-medium">
                  Nenhum produto cadastrado para este produtor no momento.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => {
                  const firstImg = Array.isArray(product.image) && product.image[0] ? product.image[0] : "";

                  return (
                    <div 
                      key={product.id} 
                      onClick={() => {
                        setSelectedProduct(product);
                        setCurrentImgIdx(0);
                      }}
                      className="bg-[#FAF7F2] rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-amber-200/50 transition-all duration-300 flex flex-col group cursor-pointer"
                    >
                      {/* Imagem + Selo da Categoria */}
                      <div className="relative h-48 sm:h-52 overflow-hidden bg-amber-100/50">
                        {firstImg ? (
                          <img
                            src={firstImg} 
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-amber-800/40 text-sm">
                            Sem imagem
                          </div>
                        )}

                        {/* Selo/Tag no Canto Superior */}
                        {product.category && (
                          <span className="absolute top-3 right-3 bg-[#6A4E3A] text-amber-50 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md backdrop-blur-sm border border-amber-300/30">
                            {product.category}
                          </span>
                        )}

                        {product.isNew && (
                          <span className="absolute top-3 left-3 bg-amber-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-md">
                            Novo
                          </span>
                        )}
                      </div>

                      {/* Conteúdo do Card */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          <div className="flex items-center space-x-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-3.5 w-3.5 text-amber-600 fill-amber-500" />
                            ))}
                          </div>

                          <h3 className="font-artisan text-xl font-bold text-[#2A1E17] mb-1 group-hover:text-amber-800 transition-colors line-clamp-1">
                            {product.name}
                          </h3>

                          {product.description && (
                            <p className="text-xs text-[#6A5A4D] line-clamp-2 mb-2">
                              {product.description}
                            </p>
                          )}

                          <p className="text-lg font-semibold text-amber-900">
                            {formatPrice(product.price)}
                          </p>
                        </div>

                        {/* Botão de Adicionar */}
                        <Button 
                          size="sm"
                          className="w-full bg-[#3D3028] hover:bg-[#2A1E17] text-amber-50 gap-2 rounded-xl transition-colors"
                          onClick={(e) => handleAddToCart(product, e)}
                        >
                          <ShoppingCart className="h-4 w-4" />
                          Adicionar
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </main>

      {/* MODAL DE DETALHES DO PRODUTO */}
      <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
        {selectedProduct && (
          <DialogContent className="max-w-xl bg-[#FAF7F2] border border-amber-200/80 text-[#2A1E17] rounded-2xl p-0 overflow-hidden shadow-2xl">
            <div className="relative bg-neutral-200">
              <img 
                src={selectedProduct.image && selectedProduct.image[currentImgIdx] ? selectedProduct.image[currentImgIdx] : ""} 
                alt={selectedProduct.name} 
                className="w-full h-72 object-cover"
              />
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full h-8 w-8 z-50"
              >
                <X className="h-4 w-4" />
              </Button>

              {selectedProduct.image && selectedProduct.image.length > 1 && (
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2 bg-black/40 backdrop-blur-sm p-1.5 rounded-lg z-40">
                  {selectedProduct.image.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      onClick={() => setCurrentImgIdx(idx)}
                      className={`w-10 h-10 object-cover rounded-md cursor-pointer border-2 transition-all ${currentImgIdx === idx ? 'border-amber-400 scale-105' : 'border-transparent opacity-70'}`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="p-8 space-y-4">
              {selectedProduct.category && (
                <span className="bg-[#6A4E3A] text-amber-50 text-xs font-semibold px-3 py-1 rounded-full">
                  {selectedProduct.category}
                </span>
              )}

              <DialogTitle className="font-artisan text-3xl font-bold text-[#2A1E17]">
                {selectedProduct.name}
              </DialogTitle>

              <DialogDescription className="text-[#524338] text-base leading-relaxed">
                {selectedProduct.description || "Sem descrição disponível para este produto da roça."}
              </DialogDescription>

              <div className="flex items-center justify-between pt-6 border-t border-amber-900/10">
                <span className="text-3xl font-bold text-amber-900">
                  {formatPrice(selectedProduct.price)}
                </span>

                <Button 
                  size="lg"
                  className="bg-[#3D3028] hover:bg-[#2A1E17] text-amber-50 rounded-xl"
                  onClick={() => {
                    handleAddToCart(selectedProduct);
                    setSelectedProduct(null); 
                  }}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Adicionar à Sacola
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>

      <Footer />
    </div>
  );
};

export default ProducerDetail;