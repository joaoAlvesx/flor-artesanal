import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string[];
  category: string;
  description: string;
  isNew?: boolean;
  producerId?: string; // NOVO: Vínculo opcional com o produtor
};

// Carrega os produtos (pode filtrar por produtor específico se passar o producerId)
export async function loadProducts(producerId?: string): Promise<Product[]> {
  try {
    let query = supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (producerId) {
      query = query.eq('producer_id', producerId);
    }

    const { data, error } = await query;

    if (error) throw error;

    if (!data || data.length === 0) {
      return [];
    }

    return data.map((p: any) => ({
      id: p.id,
      name: p.name,
      price: Number(p.price),
      originalPrice: p.original_price ? Number(p.original_price) : undefined,
      image: p.image || [],
      category: p.category,
      description: p.description || "",
      isNew: p.is_new,
      producerId: p.producer_id,
    }));
  } catch (error) {
    console.error("Erro ao carregar produtos do Supabase:", error);
    return [];
  }
}

// Salva ou edita um produto no Supabase
export async function saveProducts(product: Product): Promise<boolean> {
  try {
    const databaseData = {
      id: product.id,
      name: product.name,
      price: product.price,
      original_price: product.originalPrice,
      image: product.image,
      category: product.category,
      description: product.description,
      is_new: product.isNew,
      producer_id: product.producerId || null,
    };

    const { error } = await supabase
      .from('products')
      .upsert(databaseData, { onConflict: 'id' });

    if (error) throw error;
    
    window.dispatchEvent(new Event("products:updated"));
    return true;
  } catch (error) {
    console.error("Erro ao salvar produto no Supabase:", error);
    return false;
  }
}

// Deleta um produto
export async function deleteProductFromDatabase(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;

    window.dispatchEvent(new Event("products:updated"));
    return true;
  } catch (error) {
    console.error("Erro ao deletar produto no Supabase:", error);
    return false;
  }
}

export function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}