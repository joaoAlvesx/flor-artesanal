import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";
import heroImage from "@/assets/hero-pantanal.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${heroImage})`,
          filter: "brightness(0.7)"
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/50 via-foreground/30 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-8 backdrop-blur-sm">
            <Heart className="h-4 w-4" />
            <span className="text-sm font-medium">Feito com amor no coração do Pantanal</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-artisan font-bold text-background mb-6 leading-tight">
            Tradição que
            <span className="block text-primary"> Floresce</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-background/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Produtos artesanais autênticos do Pantanal. Cada peça carrega a essência da nossa terra
            e o carinho de nossas mãos.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-medium shadow-warm transition-organic"
            >
              Explorar Produtos
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-background text-background hover:bg-background hover:text-foreground px-8 py-4 text-lg font-medium backdrop-blur-sm transition-organic"
            >
              Nossa História
            </Button>
          </div>

          {/* Features */}
          <div className="flex flex-wrap items-center justify-center space-x-8 mt-16 text-background/80">
            <div className="flex items-center space-x-2 mb-4">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              <span className="text-sm">100% Artesanal</span>
            </div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              <span className="text-sm">Materiais Naturais</span>
            </div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              <span className="text-sm">Tradição Pantaneira</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <ArrowRight className="h-6 w-6 text-background/60 rotate-90" />
        </div>
      </div>
    </section>
  );
};

export default Hero;