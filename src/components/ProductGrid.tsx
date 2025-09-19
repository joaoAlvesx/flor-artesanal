import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Product images
import cestaPalhaImg from "@/assets/cesta-palha.jpg";
import bolsaCouroImg from "@/assets/bolsa-couro.jpg";
import poteCeramicaImg from "@/assets/pote-ceramica.jpg";
import tapeteFibraImg from "@/assets/tapete-fibra.jpg";
import colarSementesImg from "@/assets/colar-sementes.jpg";
import luminariaBambuImg from "@/assets/luminaria-bambu.jpg";

const products = [
  {
    id: 1,
    name: "Cesta de Palha Pantaneira",
    price: "R$ 85,00",
    originalPrice: "R$ 95,00",
    image: cestaPalhaImg,
    category: "Cestas",
    rating: 4.8,
    reviews: 12,
    description: "Cesta artesanal feita com palha natural do Pantanal",
    isNew: true,
  },
  {
    id: 2,
    name: "Bolsa de Couro Vegetal",
    price: "R$ 120,00",
    image: bolsaCouroImg,
    category: "Bolsas",
    rating: 4.9,
    reviews: 8,
    description: "Bolsa sustentável com couro vegetal tingido naturalmente",
    isNew: false,
  },
  {
    id: 3,
    name: "Pote de Cerâmica Pintado",
    price: "R$ 65,00",
    image: poteCeramicaImg,
    category: "Cerâmica",
    rating: 4.7,
    reviews: 15,
    description: "Pote de cerâmica com desenhos tradicionais pantaneiros",
    isNew: false,
  },
  {
    id: 4,
    name: "Tapete de Fibra Natural",
    price: "R$ 140,00",
    originalPrice: "R$ 160,00",
    image: tapeteFibraImg,
    category: "Decoração",
    rating: 4.6,
    reviews: 7,
    description: "Tapete tecido à mão com fibras do cerrado",
    isNew: true,
  },
  {
    id: 5,
    name: "Colar de Sementes",
    price: "R$ 45,00",
    image: colarSementesImg,
    category: "Bijuterias",
    rating: 4.8,
    reviews: 23,
    description: "Colar artesanal com sementes nativas do Pantanal",
    isNew: false,
  },
  {
    id: 6,
    name: "Luminária de Bambu",
    price: "R$ 95,00",
    image: luminariaBambuImg,
    category: "Iluminação",
    rating: 4.9,
    reviews: 11,
    description: "Luminária sustentável de bambu com design único",
    isNew: true,
  },
];

const ProductGrid = () => {
  const { toast } = useToast();

  const handleAddToCart = (productName: string) => {
    toast({
      title: "Produto adicionado!",
      description: `${productName} foi adicionado ao carrinho.`,
    });
  };

  const handleWishlist = (productName: string) => {
    toast({
      title: "Lista de desejos",
      description: `${productName} foi adicionado à sua lista de desejos.`,
    });
  };

  return (
    <section id="produtos" className="py-24 bg-gradient-earth">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Nossos Produtos
          </Badge>
          <h2 className="text-4xl md:text-5xl font-artisan font-bold text-foreground mb-6">
            Artesanato do
            <span className="text-primary"> Coração</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cada peça é única, criada com amor e técnicas tradicionais passadas de geração em geração.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-warm transition-organic bg-card/90 backdrop-blur-sm border border-border/50">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-organic"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 space-y-2">
                  {product.isNew && (
                    <Badge className="bg-primary text-primary-foreground">
                      Novo
                    </Badge>
                  )}
                  <Badge variant="secondary">
                    {product.category}
                  </Badge>
                </div>

                {/* Wishlist Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 bg-background/80 hover:bg-background text-foreground"
                  onClick={() => handleWishlist(product.name)}
                >
                  <Heart className="h-4 w-4" />
                </Button>

                {/* Quick Actions */}
                <div className="absolute inset-0 bg-foreground/20 opacity-0 group-hover:opacity-100 transition-organic flex items-center justify-center">
                  <Button
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() => handleAddToCart(product.name)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Adicionar
                  </Button>
                </div>
              </div>

              <CardContent className="p-6">
                {/* Rating */}
                <div className="flex items-center space-x-1 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? "text-primary fill-primary"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({product.reviews})
                  </span>
                </div>

                {/* Product Info */}
                <h3 className="font-semibold text-lg text-foreground mb-2">
                  {product.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {product.description}
                </p>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-primary">
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8">
            Ver Todos os Produtos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;