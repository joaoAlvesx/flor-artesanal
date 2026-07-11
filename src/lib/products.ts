import cestaPalhaImg from "@/assets/cesta-palha.jpg";
import bolsaCouroImg from "@/assets/bolsa-couro.jpg";
import poteCeramicaImg from "@/assets/pote-ceramica.jpg";
import tapeteFibraImg from "@/assets/tapete-fibra.jpg";
import colarSementesImg from "@/assets/colar-sementes.jpg";
import luminariaBambuImg from "@/assets/luminaria-bambu.jpg";

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
  { id: "1", name: "Cesta de Palha Pantaneira", price: 85, originalPrice: 95, image: cestaPalhaImg, category: "Cestas", description: "Cesta artesanal feita com palha natural do Pantanal", isNew: true },
  { id: "2", name: "Bolsa de Couro Vegetal", price: 120, image: bolsaCouroImg, category: "Bolsas", description: "Bolsa sustentável com couro vegetal tingido naturalmente" },
  { id: "3", name: "Pote de Cerâmica Pintado", price: 65, image: poteCeramicaImg, category: "Cerâmica", description: "Pote de cerâmica com desenhos tradicionais pantaneiros" },
  { id: "4", name: "Tapete de Fibra Natural", price: 140, originalPrice: 160, image: tapeteFibraImg, category: "Decoração", description: "Tapete tecido à mão com fibras do cerrado", isNew: true },
  { id: "5", name: "Colar de Sementes", price: 45, image: colarSementesImg, category: "Bijuterias", description: "Colar artesanal com sementes nativas do Pantanal" },
  { id: "6", name: "Luminária de Bambu", price: 95, image: luminariaBambuImg, category: "Iluminação", description: "Luminária sustentável de bambu com design único", isNew: true },
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
