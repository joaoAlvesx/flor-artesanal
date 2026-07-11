import melImg from "@/assets/mel-artesanal.jpg";
import doceLeiteImg from "@/assets/doce-de-leite.jpg";
import queijoImg from "@/assets/queijo-artesanal.jpg";
import geleiaImg from "@/assets/geleia-pequi.jpg";
import rapaduraImg from "@/assets/rapadura.jpg";
import licorImg from "@/assets/licor-artesanal.jpg";

export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description: string;
  isNew?: boolean;
};

const STORAGE_KEY = "gostodomato:products";

const seedProducts: Product[] = [
  { id: "1", name: "Mel Silvestre Puro", price: 38, originalPrice: 45, image: melImg, category: "Mel", description: "Mel puro colhido de abelhas nativas da região de Jardim/MS", isNew: true },
  { id: "2", name: "Doce de Leite Cremoso", price: 28, image: doceLeiteImg, category: "Doce de Leite", description: "Doce de leite artesanal cozido lentamente no tacho de cobre" },
  { id: "3", name: "Queijo Artesanal Curado", price: 65, image: queijoImg, category: "Queijos", description: "Queijo curado maturado por 30 dias, receita tradicional pantaneira" },
  { id: "4", name: "Geleia de Pequi", price: 32, originalPrice: 38, image: geleiaImg, category: "Geleias e Compotas", description: "Geleia artesanal feita com pequi fresco do cerrado", isNew: true },
  { id: "5", name: "Rapadura de Cana", price: 18, image: rapaduraImg, category: "Rapadura e Melado", description: "Rapadura pura feita da cana moída no engenho local" },
  { id: "6", name: "Licor de Bocaiuva", price: 55, image: licorImg, category: "Bebidas Artesanais", description: "Licor artesanal com frutas nativas do Pantanal", isNew: true },
];

export function loadProducts(): Product[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seedProducts));
      return seedProducts;
    }
    return JSON.parse(raw);
  } catch {
    return seedProducts;
  }
}

export function saveProducts(products: Product[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  window.dispatchEvent(new Event("products:updated"));
}

export function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
