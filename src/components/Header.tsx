import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, X, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { count, openCart } = useCart();

  return (
    <header className="w-full bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-artisan font-semibold text-foreground">Gostudumatu</h1>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-foreground hover:text-primary transition-organic">Início</a>
            <a href="#produtos" className="text-foreground hover:text-primary transition-organic">Produtos</a>
            <a href="#sobre" className="text-foreground hover:text-primary transition-organic">Nossa História</a>
            <a href="#contato" className="text-foreground hover:text-primary transition-organic">Contato</a>
          </nav>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" className="text-foreground hover:text-primary">
              <Search className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-foreground hover:text-primary relative"
              onClick={openCart}
              aria-label="Abrir carrinho"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {count}
              </span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-foreground hover:text-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden mt-4 py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <a href="#home" className="text-foreground hover:text-primary py-2" onClick={() => setIsMenuOpen(false)}>Início</a>
              <a href="#produtos" className="text-foreground hover:text-primary py-2" onClick={() => setIsMenuOpen(false)}>Produtos</a>
              <a href="#sobre" className="text-foreground hover:text-primary py-2" onClick={() => setIsMenuOpen(false)}>Nossa História</a>
              <a href="#contato" className="text-foreground hover:text-primary py-2" onClick={() => setIsMenuOpen(false)}>Contato</a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
