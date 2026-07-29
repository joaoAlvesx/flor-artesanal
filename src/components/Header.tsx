import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import logoHeader from "@/assets/logo.svg";

const Header = () => {
  const cart = useCart();

  const totalCount = 
    cart?.totalItems ?? 
    cart?.items?.reduce((acc, item) => acc + (item.quantity || 1), 0) ?? 
    0;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between relative">
        
        <Link to="/" className="flex items-center space-x-2 group">
          <img 
            src={logoHeader} 
            alt="Emblema Gostudumatu" 
            className="h-12 w-auto object-contain -ml-6 transition-transform group-hover:scale-105" 
          />
          <span className="font-artisan text-2xl font-bold text-foreground">
            Gosto<span className="text-primary">dumatu</span>
          </span>
        </Link>

        {/* Links de Navegação */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium absolute left-1/2 -translate-x-1/2">
          <a href="/#produtores" className="transition-colors hover:text-primary text-foreground/80">
            Produtores
          </a>
          <a href="/#produtos" className="transition-colors hover:text-primary text-foreground/80">
            Produtos
          </a>
          <a href="/#sobre" className="transition-colors hover:text-primary text-foreground/80">
            Sobre Nós
          </a>
        </nav>

        {/* Botão do Carrinho */}
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="icon"
            className="relative"
            onClick={() => cart?.openCart()}
            aria-label="Abrir carrinho"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground animate-in zoom-in-50">
                {totalCount}
              </span>
            )}
          </Button>
        </div>

      </div>
    </header>
  );
};

export default Header;