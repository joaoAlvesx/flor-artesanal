import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { loadProducts, formatPrice, type Product } from "@/lib/products";
import { useCart } from "@/context/CartContext";

const ProductGrid = () => {
  const { toast } = useToast();
  const { addItem, openCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(loadProducts());
    const refresh = () => setProducts(loadProducts());
    window.addEventListener("products:updated", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("products:updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const handleAddToCart = (product: Product) => {
    addItem(product);
    toast({ title: "Adicionado ao carrinho!", description: product.name });
    openCart();
  };

  const handleWishlist = (name: string) => {
    toast({ title: "Lista de desejos", description: `${name} foi salvo.` });
  };

  return (
    <section id="produtos" className="py-24 bg-gradient-earth">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Nossos Produtos</Badge>
          <h2 className="text-4xl md:text-5xl font-artisan font-bold text-foreground mb-6">
            Artesanato do<span className="text-primary"> Coração</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cada peça é única, criada com amor e técnicas tradicionais passadas de geração em geração.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-warm transition-organic bg-card/90 backdrop-blur-sm border border-border/50">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-organic"
                />
                <div className="absolute top-3 left-3 space-y-2">
                  {product.isNew && <Badge className="bg-primary text-primary-foreground">Novo</Badge>}
                  <Badge variant="secondary">{product.category}</Badge>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 bg-background/80 hover:bg-background text-foreground"
                  onClick={() => handleWishlist(product.name)}
                >
                  <Heart className="h-4 w-4" />
                </Button>
                <div className="absolute inset-0 bg-foreground/20 opacity-0 group-hover:opacity-100 transition-organic flex items-center justify-center">
                  <Button
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Adicionar
                  </Button>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center space-x-1 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-primary fill-primary" />
                    ))}
                  </div>
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">{product.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-primary">{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  <Button size="sm" variant="outline" onClick={() => handleAddToCart(product)}>
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
