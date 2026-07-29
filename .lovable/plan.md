## Plano: Área do Produtor (entrega enxuta)

### Objetivo
Dar aos produtores uma experiência própria e completa dentro do marketplace, separando-os do fluxo de super admin e valorizando a história de cada um.

### 1. Novo painel exclusivo do produtor
Criar a rota `/painel` acessível apenas a produtores autenticados.

````text
/painel
├── Meus Produtos      (CRUD de produtos da loja)
├── Perfil da Loja     (dados públicos do produtor)
└── Estatísticas       (indicadores simples)
````

- Redirecionar produtores que hoje caem em `/admin` para `/painel`.
- Manter `/admin` exclusivo para super admin.
- Interface mais simples e direta, sem opções de criar outras contas.

### 2. Perfil da loja mais completo
Expandir a tabela `producers` e o formulário com novos campos:

| Campo | Uso |
|-------|-----|
| `banner` | Imagem de capa na página pública |
| `phone` | WhatsApp de contato do produtor |
| `instagram` | Link para Instagram |
| `bio` | Texto longo com a história da propriedade |
| `location` | Cidade/região (já existe, mas reforçar) |
| `image` | Foto do produtor/fazenda (já existe) |

- Upload de imagem de banner no formulário.
- Validação básica de URLs (Instagram) e telefone.

### 3. Melhorias na página pública `/produtor/:slug`
- Layout com banner no topo e foto redonda sobreposta.
- Botão "Falar no WhatsApp" usando o número do produtor (com fallback para o número geral da Gostudumatu).
- Link para Instagram, se cadastrado.
- Exibição da localização e bio completa.
- Grid de produtos mantido, com destaque para itens marcados como "novo".

### 4. Estatísticas simples do produtor
Começar com indicadores que não exigem infraestrutura complexa:

- Quantidade de produtos ativos.
- Quantidade de produtos marcados como "novo".
- Data do último produto cadastrado.
- (Opcional, se viável) Contador de cliques no botão WhatsApp da página do produtor.

### Fora do escopo desta entrega
- Sistema de pedidos/pagamentos (continua via WhatsApp).
- Relatórios avançados de vendas.
- Notificações push.
- Alterações de preço em massa.

### Critérios de aceitação
- Produtor consegue fazer login e acessar `/painel`.
- Produtor edita banner, foto, bio, WhatsApp, Instagram e localização.
- Página pública reflete todas as informações cadastradas.
- Super admin continua gerenciando produtores e produtos em `/admin`.

### Arquivos esperados de envolvimento
- `src/pages/ProducerPanel.tsx` (novo)
- `src/pages/ProducerDetail.tsx` (ajustes visuais)
- `src/lib/producers.ts` (novos campos e funções)
- `src/App.tsx` (nova rota `/painel`)
- `src/pages/Admin.tsx` (redirecionar produtores comuns)
- Supabase: migration para novas colunas na tabela `producers`