import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ArrowLeft, MapPin, Store, ShoppingCart, Star, Heart, X } from "lucide-react";
import { loadProducerBySlug, type Producer } from "@/lib/producers";
import { loadProducts, formatPrice, type Product } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";

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
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground animate-pulse">Carregando história do produtor...</p>
      </div>
    );
  }

  if (!producer) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
        <h2 className="text-2xl font-artisan font-bold mb-4">Produtor não encontrado</h2>
        <Link to="/">
          <Button><ArrowLeft className="h-4 w-4 mr-2" />Voltar ao início</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      <main className="pb-24">
        {/* Cabeçalho / Hero do Produtor */}
        <section className="bg-gradient-earth py-16 border-b border-border/50">
          <div className="container mx-auto px-4">
            <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" /> Voltar para a página inicial
            </Link>

            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              {producer.image ? (
                <img 
                  src={producer.image} 
                  alt={producer.name} 
                  className="w-40 h-40 md:w-48 md:h-48 object-cover rounded-full border-4 border-primary/20 shadow-warm"
                />
              ) : (
                <div className="w-40 h-40 md:w-48 md:h-48 bg-muted rounded-full flex items-center justify-center text-muted-foreground border-4 border-border">
                  <Store className="h-16 w-16" />
                </div>
              )}

              <div className="flex-1 text-center md:text-left space-y-4">
                <Badge variant="secondary" className="mb-2">Produtor Local</Badge>
                <h1 className="text-4xl md:text-5xl font-artisan font-bold text-foreground">
                  {producer.name}
                </h1>
                
                {producer.location && (
                  <div className="flex items-center justify-center md:justify-start gap-2 text-primary font-medium">
                    <MapPin className="h-4 w-4" />
                    <span>{producer.location}</span>
                  </div>
                )}

                <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl pt-2">
                  {producer.bio || "Este produtor ainda não cadastrou sua história detalhada."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Vitrine de Produtos deste Produtor */}
        <section className="container mx-auto px-4 py-16">
          <div className="mb-10">
            <h2 className="text-3xl font-artisan font-bold text-foreground">
              Produtos de <span className="text-primary">{producer.name}</span>
            </h2>
            <p className="text-muted-foreground">Confira tudo o que é produzido artesanalmente nesta propriedade.</p>
          </div>

          {products.length === 0 ? (
            <Card className="p-12 text-center bg-card/50">
              <p className="text-muted-foreground">Nenhum produto cadastrado para este produtor no momento.</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <Card 
                  key={product.id} 
                  onClick={() => {
                    setSelectedProduct(product);
                    setCurrentImgIdx(0);
                  }}
                  className="group hover:shadow-warm transition-organic bg-card/90 backdrop-blur-sm border border-border/50 cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={product.image && product.image[0] ? product.image[0] : ""} 
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-organic"
                    />
                    <div className="absolute top-3 left-3 space-y-2">
                      {product.isNew && <Badge className="bg-primary text-primary-foreground">Novo</Badge>}
                      <Badge variant="secondary">{product.category}</Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-primary fill-primary" />
                      ))}
                    </div>
                    <h3 className="font-semibold text-lg text-foreground mb-2">{product.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4 truncate">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">{formatPrice(product.price)}</span>
                      <Button size="sm" variant="outline" onClick={(e) => handleAddToCart(product, e)}>
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Modal de Detalhes do Produto */}
        <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
          {selectedProduct && (
            <DialogContent className="max-w-xl bg-card/95 border border-border/80 text-foreground rounded-lg p-0 overflow-hidden shadow-2xl">
              <div className="relative">
                <img 
                  src={selectedProduct.image && selectedProduct.image[currentImgIdx] ? selectedProduct.image[currentImgIdx] : ""} 
                  alt={selectedProduct.name} 
                  className="w-full h-72 object-cover"
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 bg-background/80 hover:bg-background text-foreground rounded-full h-8 w-8 z-50"
                >
                  <X className="h-4 w-4" />
                </Button>

                {selectedProduct.image && selectedProduct.image.length > 1 && (
                  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2 bg-background/60 backdrop-blur-sm p-1.5 rounded-md z-40">
                    {selectedProduct.image.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        onClick={() => setCurrentImgIdx(idx)}
                        className={`w-10 h-10 object-cover rounded cursor-pointer border-2 transition-all ${currentImgIdx === idx ? 'border-primary scale-105' : 'border-transparent opacity-80'}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="p-8 space-y-4">
                <Badge variant="secondary">{selectedProduct.category}</Badge>
                <DialogTitle className="font-artisan text-3xl font-bold">{selectedProduct.name}</DialogTitle>
                <DialogDescription className="text-muted-foreground text-base leading-relaxed">
                  {selectedProduct.description || "Sem descrição disponível para este produto da roça."}
                </DialogDescription>

                <div className="flex items-center justify-between pt-6 border-t border-border/50">
                  <span className="text-3xl font-bold text-primary">{formatPrice(selectedProduct.price)}</span>
                  <Button 
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
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
      </main>

      <Footer />
    </div>
  );
};

export default ProducerDetail;