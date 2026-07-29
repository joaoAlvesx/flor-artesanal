import { supabase } from "@/lib/products";

export type Producer = {
  id: string;
  name: string;
  slug: string;
  bio?: string;
  image?: string;
  location?: string;
  userId?: string;
};

// Carrega todos os produtores
export async function loadProducers(): Promise<Producer[]> {
  try {
    const { data, error } = await supabase
      .from('producers')
      .select('*')
      .order('name', { ascending: true });

    if (error) throw error;
    if (!data) return [];

    return data.map((p: any) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      bio: p.bio || "",
      image: p.image || "",
      location: p.location || "",
      userId: p.user_id,
    }));
  } catch (error) {
    console.error("Erro ao carregar produtores:", error);
    return [];
  }
}

// Carrega produtor pelo SLUG (para a página pública)
export async function loadProducerBySlug(slug: string): Promise<Producer | null> {
  try {
    const { data, error } = await supabase
      .from('producers')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    if (!data) return null;

    return {
      id: data.id,
      name: data.name,
      slug: data.slug,
      bio: data.bio || "",
      image: data.image || "",
      location: data.location || "",
      userId: data.user_id,
    };
  } catch (error) {
    console.error("Erro ao carregar produtor por slug:", error);
    return null;
  }
}

// Carrega produtor vinculado ao ID do usuário do Supabase logado
export async function loadProducerByUserId(userId: string): Promise<Producer | null> {
  try {
    const { data, error } = await supabase
      .from('producers')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    if (!data) return null;

    return {
      id: data.id,
      name: data.name,
      slug: data.slug,
      bio: data.bio || "",
      image: data.image || "",
      location: data.location || "",
      userId: data.user_id,
    };
  } catch (error) {
    console.error("Erro ao buscar loja do usuário logado:", error);
    return null;
  }
}

// Cria a conta do produtor no Supabase Auth e salva na tabela 'producers'
export async function createProducerWithAccount(data: {
  name: string;
  email: string;
  password: string;
  location?: string;
  bio?: string;
  image?: string;
}): Promise<{ success: boolean; message?: string }> {
  try {
    // 1. Cria o usuário no Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error("Não foi possível criar o usuário no sistema.");

    // 2. Salva os dados da loja na tabela 'producers' vinculados ao user_id gerado
    const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    
    const { error: dbError } = await supabase
      .from('producers')
      .insert({
        name: data.name,
        slug,
        location: data.location || "",
        bio: data.bio || "",
        image: data.image || "",
        user_id: authData.user.id,
      });

    if (dbError) throw dbError;

    window.dispatchEvent(new Event("producers:updated"));
    return { success: true };
  } catch (error: any) {
    console.error("Erro ao criar conta de produtor:", error);
    return { success: false, message: error.message || "Falha ao cadastrar produtor" };
  }
}

// Salva/Edita informações do produtor
export async function saveProducer(producer: Omit<Producer, 'id'> & { id?: string }): Promise<boolean> {
  try {
    const payload = {
      ...(producer.id ? { id: producer.id } : {}),
      name: producer.name,
      slug: producer.slug || producer.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      bio: producer.bio,
      image: producer.image,
      location: producer.location,
    };

    const { error } = await supabase
      .from('producers')
      .upsert(payload, { onConflict: 'id' });

    if (error) throw error;

    window.dispatchEvent(new Event("producers:updated"));
    return true;
  } catch (error) {
    console.error("Erro ao salvar produtor:", error);
    return false;
  }
}

// Deleta produtor
export async function deleteProducer(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('producers')
      .delete()
      .eq('id', id);

    if (error) throw error;

    window.dispatchEvent(new Event("producers:updated"));
    return true;
  } catch (error) {
    console.error("Erro ao deletar produtor:", error);
    return false;
  }
}