
## Mudanças solicitadas

### 1. Rebrand: "Gosto do Mato" → "Gostudumatu"
- `index.html`: `<title>`, meta description, og/twitter tags
- `src/components/Header.tsx`: logo/título
- `src/components/Footer.tsx`: título e email (`contato@gostudumatu.com.br`)
- `src/pages/Admin.tsx`: textos visíveis
- Storage keys mantidos como estão (`gostodomato:*`) para não perder produtos já cadastrados no localStorage — apenas troca de rótulo visual. (Se preferir renomear as chaves e resetar, me avise.)

### 2. Seção "Nossa História" (`src/components/About.tsx`)
Novo texto (proposta):
> A Gostudumatu nasceu da vontade de facilitar o encontro entre quem faz e quem valoriza o verdadeiro sabor artesanal. Sentimos falta de um lugar simples para achar os produtos feitos com carinho aqui da nossa região — e, principalmente, para dar visibilidade a quem produz. Aqui em Jardim/MS, cercados pela natureza do Pantanal, reunimos produtores locais que preservam receitas de família e o gosto de verdade da roça.

Ajustes:
- Título: "Raízes que se Espalham" → "Do Produtor pra Sua Mesa" (ou similar — abro para sua escolha)
- Remover o botão "Conheça Nossa Equipe"
- Ajustar os 4 "valores" para o contexto de comida artesanal:
  - Sustentabilidade → **Direto do Produtor** (sem atravessadores)
  - Tradição Familiar → **Receitas de Família**
  - Qualidade Premium → **Ingredientes Naturais**
  - Feito com Amor → **Sabor de Verdade**

### 3. Localização (`src/components/Footer.tsx`)
- "Corumbá, MS" → "Jardim, MS"

### 4. Categorias de comidas (substituir as atuais)
Categorias no Footer e no seed de produtos (`src/lib/products.ts`):
- Mel
- Doce de Leite
- Queijos
- Geleias e Compotas
- Rapadura e Melado
- Farinhas e Grãos
- Conservas
- Bebidas Artesanais (licores, cachaças, sucos)

Também trocar os produtos-seed (cesta, bolsa, cerâmica, tapete, colar, luminária) por 6 comidas artesanais com novas imagens geradas (ex.: pote de mel, doce de leite de colher, queijo curado, geleia de pequi, rapadura, licor de pequi/bocaiuva).

### 5. Ajustes de tom em Hero e badges
- Hero: manter estética, mas subtítulo passa a falar de "sabores artesanais do Pantanal" em vez de "peças".
- Badge "Frete Grátis acima de R$ 150" — manter ou remover? (comida costuma ter frete por região; sugiro remover ou trocar por "Entrega em Jardim e região").

## Outras ideias (opcionais, me diga quais topa)

1. **Página/seção "Produtores"**: cada produto mostra quem fez (nome, foto, pequena bio). Fortalece o propósito de dar visibilidade a quem produz.
2. **Filtro por categoria** no grid de produtos (chips clicáveis: Mel, Queijos, Doces...).
3. **Selo "Da Semana"** ou "Produção Limitada" nos cards (mel só sai na safra, queijo tem cura, etc.).
4. **Campo "Produtor" e "Origem" no admin** ao cadastrar produto, exibidos no card.
5. **Mensagem do WhatsApp** já inclui a cidade do cliente ou pergunta sobre entrega/retirada em Jardim.
6. **Paleta**: manter o ipê amarelo, mas talvez puxar tons um pouco mais "quentes/apetitosos" (mel, caramelo) já que o foco virou comida.

## Aguardo confirmação
Confirma esse escopo? E me diz:
- Quer que eu inclua as ideias 1–6 acima (quais)?
- Manter frete grátis ou trocar por "Entrega em Jardim e região"?
- Resetar produtos do localStorage ou preservar os já cadastrados?
