import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Trash2, Pencil, X, LogOut } from "lucide-react";
import { loadProducts, saveProducts, formatPrice, type Product } from "@/lib/products";
import { useToast } from "@/hooks/use-toast";

const ADMIN_PASSWORD = "pantanal2026";
const AUTH_KEY = "gostodomato:admin-auth";

const emptyForm = {
  id: "",
  name: "",
  price: "",
  originalPrice: "",
  image: "",
  category: "",
  description: "",
  isNew: false,
};

const Admin = () => {
  const { toast } = useToast();
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(AUTH_KEY) === "1");
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    if (authed) setProducts(loadProducts());
  }, [authed]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, "1");
      setAuthed(true);
    } else {
      toast({ title: "Senha incorreta", variant: "destructive" });
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setAuthed(false);
    setPassword("");
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((f) => ({ ...f, image: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.image || !form.category) {
      toast({ title: "Preencha os campos obrigatórios", variant: "destructive" });
      return;
    }
    const product: Product = {
      id: editingId ?? crypto.randomUUID(),
      name: form.name,
      price: parseFloat(form.price),
      originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : undefined,
      image: form.image,
      category: form.category,
      description: form.description,
      isNew: form.isNew,
    };
    const next = editingId
      ? products.map((p) => (p.id === editingId ? product : p))
      : [product, ...products];
    setProducts(next);
    saveProducts(next);
    toast({ title: editingId ? "Produto atualizado" : "Produto adicionado" });
    resetForm();
  };

  const handleEdit = (p: Product) => {
    setEditingId(p.id);
    setForm({
      id: p.id,
      name: p.name,
      price: String(p.price),
      originalPrice: p.originalPrice ? String(p.originalPrice) : "",
      image: p.image,
      category: p.category,
      description: p.description,
      isNew: !!p.isNew,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Remover este produto?")) return;
    const next = products.filter((p) => p.id !== id);
    setProducts(next);
    saveProducts(next);
    toast({ title: "Produto removido" });
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-earth px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="font-artisan text-2xl">Área do Administrador</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="pw">Senha</Label>
                <Input
                  id="pw"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoFocus
                />
              </div>
              <Button type="submit" className="w-full">Entrar</Button>
              <Link to="/" className="block text-center text-sm text-muted-foreground hover:text-primary">
                ← Voltar ao site
              </Link>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4 mr-2" />Ver site</Button>
            </Link>
            <h1 className="font-artisan text-xl font-semibold">Admin · Gostudumatu</h1>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />Sair
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-artisan">
              {editingId ? "Editar produto" : "Adicionar produto"}
            </CardTitle>
            {editingId && (
              <Button variant="ghost" size="sm" onClick={resetForm}>
                <X className="h-4 w-4 mr-1" />Cancelar
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Nome *</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Preço (R$) *</Label>
                  <Input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                </div>
                <div>
                  <Label>Preço original</Label>
                  <Input type="number" step="0.01" value={form.originalPrice} onChange={(e) => setForm({ ...form, originalPrice: e.target.value })} />
                </div>
              </div>
              <div>
                <Label>Categoria *</Label>
                <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Ex: Mel, Queijos, Doce de Leite..." />
              </div>
              <div>
                <Label>Descrição</Label>
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
              </div>
              <div>
                <Label>Imagem *</Label>
                <Input type="file" accept="image/*" onChange={handleImageUpload} />
                {form.image && (
                  <img src={form.image} alt="preview" className="mt-2 w-32 h-32 object-cover rounded-md border border-border" />
                )}
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.isNew} onChange={(e) => setForm({ ...form, isNew: e.target.checked })} />
                <span className="text-sm">Marcar como novidade</span>
              </label>
              <Button type="submit" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                {editingId ? "Salvar alterações" : "Adicionar produto"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-artisan">Produtos ({products.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 max-h-[70vh] overflow-y-auto">
            {products.map((p) => (
              <div key={p.id} className="flex gap-3 p-3 rounded-lg border border-border hover:shadow-soft transition-organic">
                <img src={p.image} alt={p.name} className="w-16 h-16 object-cover rounded-md" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium truncate">{p.name}</h4>
                    {p.isNew && <Badge className="bg-primary text-primary-foreground text-xs">Novo</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground">{p.category}</p>
                  <p className="text-primary font-semibold text-sm">{formatPrice(p.price)}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <Button size="icon" variant="ghost" onClick={() => handleEdit(p)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="text-destructive" onClick={() => handleDelete(p.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Admin;
