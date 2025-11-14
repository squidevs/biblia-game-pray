## Biblia Gamepray — Especificação do Projeto

## Índice

- [Tutorial rápido](#tutorial-rapido)
- [Resumo](#resumo)
- [Escopo e público-alvo](#escopo)
- [Formato do documento](#formato)
- [Convenções gerais](#convencoes)
- [Estrutura de pastas](#estrutura-pastas)
- [Entidades principais e contratos JSON](#entidades)
- [Contrato de mensagens](#contrato-mensagens)
- [Regras do jogo — comportamento](#regras-comportamento)
- [Níveis e Ligas — regras formais](#niveis-ligas)
- [Mensagens e sons de feedback](#mensagens-sons)
- [UX e acessibilidade (A11Y)](#ux-a11y)
- [Marca e logotipo](#marca-logotipo)
- [Modelagem de Dados (DB Schema + Relacionamentos)](#modelagem-dados)
- [Conteúdo consolidado](#conteudo-consolidado)

## Tutorial rápido — Passo a passo de apresentação {#tutorial-rapido}

Este tutorial está posicionado no topo do documento para facilitar demonstrações rápidas e onboarding.

### Tutorial Divertido — Passo a Passo de Apresentação {#tutorial-divertido}

Este tutorial é pensado para demo / fluxo de primeiro uso. Duração alvo: 3 minutos.

1) Boas-vindas (0:00–0:20)
- Tela simples com logomarca e frase: “Bem-vindo ao Biblia Gamepray — onde fé e hábito se encontram!”.
- Dois botões: "Criar Conta" e "Explorar". "Explorar" abre um modo demo com dados fictícios.

2) Quick Tour (0:20–1:00)
- Mostrar 3 cards: Missões, Estudos, Conquistas.
- Cada card com micro-interaction (fade-in), ícone e CTA. Ao tocar, exibir tooltip curto (1 linha) explicando o benefício.

3) Aceitar a primeira missão (1:00–2:00)
- Missão sugerida: "Ler 1 capítulo".
- Ao aceitar: tocar `confirm.wav`, mostrar modal com botão "Registrar evidência".
- O usuário registra um versículo e toca "Concluir". Ao submeter, tocar `mission_done.wav` e animar moeda + XP.

4) Inventário e recompensa (2:00–2:30)
- Mostrar notificação "Você ganhou: Poção de Fé (Pequena)" com CTA "Usar agora".
- Exibir inventário breve e botão rápido para aplicar o item.

5) Ranking e desafio (2:30–3:00)
- Exibir leaderboard semanal com destaque para promoções.
- Mostrar badge de conquista recém-ganha e opção de compartilhar.

Microcopy sugerida (pt-BR):
- "Comece sua jornada — uma prática por vez." (Boas-vindas)
- "Ler e refletir — registre um versículo." (Missão)
- "Parabéns! Você desbloqueou: Primeira leitura." (Conquista)

Observações rápidas: mantenha a demo curta (<3min), use sons com moderação e respeite preferências de acessibilidade.

## Resumo {#resumo}
 
Biblia Gamepray é um PWA gamificado cujo objetivo é apoiar práticas espirituais diárias por meio de missões, estudos bíblicos, quizzes e ações devocionais, com mecânicas de progressão (XP, níveis, ligas), inventário de itens (permanentes e consumíveis) e sistema de conquistas. Este documento descreve, de forma organizada e detalhada, o escopo funcional, contratos de dados, regras de jogo, UX/A11Y, mapeamento de assets, marca e considerações para migração e integração.

## Escopo e público-alvo {#escopo}

O sistema destina-se a usuários móveis e web interessados em gamificar hábitos espirituais. O protótipo será implementado inicialmente com JSONs locais sob `/dados/` e será preparado para migração a um banco relacional (ex.: Supabase/Postgres). O projeto prioriza mobile-first e acessibilidade (WCAG).

## Formato do documento {#formato}

As seções a seguir cobrem: convenções, arquitetura de pastas, entidades e contratos JSON, regras de jogo (missões, corações, economia), níveis e ligas, mensagens/sons, UI/HUD e acessibilidade, marca e logotipo, e notas técnicas para migração e deploy.


## Convenções gerais {#convencoes}

- Linguagem: Português (pt-BR) em microcopy, nomes de chaves e documentação.
- Formato de arquivos: JSONs com ids em formato string legível (ex.: "usuario-001", "missao-diaria-01").
- Indentação: 2 espaços em JSON, HTML e CSS. UTF-8 sem BOM.
- Nomenclatura de chaves: camelCase (ex.: `usuarioId`, `dataCriacao`) exceto onde nomes legados usarem hífen (consistência a ser mantida ao migrar).
- Assets: imagens em `/assets/imagens/`, sons em `/assets/sounds/`.

## Estrutura de pastas (padrão do projeto) {#estrutura-pastas}

Apresentamos abaixo a árvore de pastas sugerida com descrição curta de cada arquivo/pasta — projetada para prototipagem local (JSONs) e fácil migração para backend:

```
/
├─ index.html               # PWA shell (entry point)
├─ manifest.json            # Web App Manifest (icons, name, display, scope)
├─ service-worker.js       # Service Worker: cache strategy, offline, updates
├─ css/
│  ├─ globais.css          # Reset, tokens (cores, espaçamentos), utilitários
│  ├─ mobile/
│  │  ├─ base.css          # Mobile-first base styles (tipografia, grid)
│  │  └─ components/       # Component styles (cards, modais, HUD)
│  └─ desktop/
│     └─ base.css          # Desktop overrides e breakpoints
├─ js/
│  ├─ globais.js           # Inicialização, helpers, i18n minimal
│  ├─ home/
│  │  └─ home.js           # Comportamento da tela inicial
│  ├─ missoes/
│  │  └─ missoes.js        # Lógica de listagem/execução de missões
│  ├─ acoes/
│  │  └─ acoes.js          # Timers e workflows de Ações (oração/estudo)
│  ├─ armadura/
│  │  └─ armadura.js       # Equipamentos, buffs, slots
│  ├─ perfil/
│  │  └─ perfil.js         # Perfil, avatar editor, configurações de usuário
│  └─ avatar/
│     └─ avatar.js         # Integração Avataaars / DiceBear
├─ dados/
│  ├─ usuarios.json                # Perfis de usuário (seed, prefs mínimas)
│  ├─ status_player_base.json      # Estado base do jogador (atributos, inventário)
│  ├─ acoes.json                    # Ações possíveis (oração, jejum, estudo)
│  ├─ missoes.json                  # Missões diárias/semanal/mensal/eventos
│  ├─ itens.json                    # Itens (consumíveis e permanentes)
│  ├─ conquistas.json               # Lista de conquistas (66) com critérios
│  ├─ estudos.json                  # Jornadas de estudo / trilhas (Duolingo-like)
│  ├─ loja.json                     # Itens à venda / custos e ofertas
│  ├─ avatar-configs.json           # Presets e seeds de avatar
│  └─ config_global.json            # Parâmetros globais (niveis, heart timing, xp)
├─ assets/
│  ├─ imagens/
│  │  ├─ logo/                      # SVGs e variações da marca
│  │  ├─ missoes/                   # Imagens por missão / thumbnails
│  │  ├─ usuarios/                  # Avatares gerados / custom assets
│  │  └─ ui/                        # Ícones, ilustrações de interface
│  └─ sounds/
│     ├─ intro.wav
│     ├─ confirm.wav
│     ├─ success.wav
│     ├─ fail.wav
│     ├─ level_up.wav
│     ├─ level_down.wav
│     ├─ mission_done.wav
│     ├─ reward.wav
│     ├─ conquest.wav
│     ├─ no_hearts.wav
│     └─ backup_synthetic/          # WAVs gerados sinteticamente (backup)
└─ docs/
  ├─ BIBLIA_GAMEPRAY_SPEC.md       # Especificação principal
  └─ brand_guidelines.md           # Regras de uso e tokens de cor (sugerido)
```

Notas e recomendações rápidas sobre a estrutura

- CSS: manter tokens em `globais.css` (cores, espaçamentos, fontes). Componentes específicos ficam em `css/mobile/components` e podem ser importados/escalados para desktop com overrides.
- JS: cada pasta representa um domínio com responsabilidades claras (missoes, acoes, armadura, etc.). `globais.js` carrega polyfills, init de analytics dev/QA, e gerencia i18n leve.
- Dados: os JSONs em `/dados/` são a fonte de verdade durante prototipagem. Sempre manter `createdAt`/`updatedAt` em registros para facilitar migração.
- Assets: armazenar SVGs vetoriais para logos e ícones; usar OGG/MP3 como alternativa compacta para produção, mantendo WAVs originais em `assets/sounds/` para editing.

***

## Entidades principais e contratos JSON (resumo) {#entidades}
### Atributos Espirituais e Negativos

No modelo do jogador, os atributos espirituais são representados pelos frutos do Espírito (Gálatas 5:22-23):

- Amor
- Alegria
- Paz
- Paciência
- Bondade
- Benignidade
- Fidelidade
- Mansidão
- Domínio próprio

Os atributos negativos (pecados) são:
- Medo
- Ansiedade
- Ira
- Inveja
- Preguiça
- Orgulho
- Luxúria
- Mentira
- Fofoca

Esses campos aparecem em `status_player_base.json` e são usados para progressão, penalidades e buffs no jogo. Recomenda-se exibir os frutos do Espírito e pecados na HUD, perfil e telas de progresso do jogador.

Nota: os exemplos abaixo são contratuais — todos os campos marcados como obrigatórios devem existir mesmo que com valores nulos/zero.

1) `usuarios.json` (perfil mínimo)

```json
{
  "id": "usuario-001",
  "nome": "Mariana",
  "email": "maria@example.com",
  "sid": "seed-avataaars-123",
  "statusId": "status-usuario-001",
  "createdAt": "2025-11-13T00:00:00Z"
}
```

2) `status_player_base.json` (estado jogador)

```json
{
  "id": "status-usuario-001",
  "usuarioId": "usuario-001",
  "xp": 1245,
  "level": 5,
  "hearts": 3,
  "heartsMax": 5,
  "heartsRegenMinutes": 30,
  "moeda": 250,
  "atributos": {
    "fe": 42,
    "sabedoria": 12,
    "pecado": 0
  },
  "inventario": [ { "itemId": "poção-coracao", "quantidade": 2 } ],
  "progressoNivel": {
    "nivelId": "nivel-03",
    "nivelOrdem": 3,
    "nivelNome": "Companheiro",
    "posicaoNaLigaAtual": 14
  }
}
```

3) `acoes.json` (ações / atividades)

```json
{
  "id": "acao-orar-01",
  "titulo": "Oração de Gratidão",
  "categoria": "Oracao",
  "tempoMinutos": 10,
  "recompensa": { "xp": 10, "moeda": 1 },
  "referenciaBiblica": "Salmo 100:4"
}
```

4) `missoes.json` (missões)

```json
{
  "id": "missao-diaria-001",
  "tipo": "diaria",
  "titulo": "Ler 1 capítulo",
  "descricao": "Leia um capítulo da Bíblia e registre um versículo.",
  "dificuldade": 2,
  "recompensas": { "xp": 20, "moeda": 5 },
  "evidenciaRequired": false
}
```

5) `itens.json` (modelo resumido)

```json
{
  "id": "poção-coracao",
  "nome": "Poção de Coração",
  "tipo": "consumivel",
  "efeito": { "heartsRestore": 3 },
  "stackMaximo": 10
}
```

6) `conquistas.json` (exemplo)

```json
{
  "id": "conquista-01",
  "titulo": "Primeiro Capítulo",
  "descricao": "Leia o primeiro capítulo do Novo Testamento.",
  "recompensa": { "xp": 50 }
}
```

## Contrato de mensagens (`mensagem.json`) {#contrato-mensagens}

Estrutura padrão para mensagens e notificações exibidas na UI:

```json
{
  "id": "levelUp-01",
  "tipo": "levelUp",
  "titulo": "Você subiu de nível!",
  "descricao": "Parabéns — agora você é Companheiro.",
  "som": "assets/sounds/level_up.wav",
  "estilo": "epico",
  "persistente": false
}
```

## Regras do jogo — comportamento {#regras-comportamento}

- Missões diárias resetam às 04:00 horário local do usuário.
- Corações: cada erro em quiz consome 1 heart; coração regenera conforme `heartsRegenMinutes` no `status_player_base` e não excede `heartsMax`.
- Economia: moeda principal ("Ouro da Fé") usada na loja; XP acumulado aumenta `level`.
- Itens consumíveis aplicam efeitos imediatos; itens permanentes concedem buffs enquanto equipados.

## Níveis e Ligas — regras formais {#niveis-ligas}

Definições de nível estão em `config_global.json` como lista ordenada com `nivelId`, `nome`, `ordem` e parâmetros opcionais (`minXp`, `gemsRequired`). Cada jogador tem `progressoNivel` em seu status.

Avaliação semanal (processo batch):

1. Para cada `nivelId`, gerar leaderboard ordenado por critério (ex.: XP semanal acumulado). Leaderboard contém posição e `usuarioId`.
2. Aplicar regras:
   - Posições 1 a 10 → promover para próximo nível (se houver).
   - Posições 11 a 20 → manter o nível atual.
   - Posição > 20 → rebaixar para nível anterior (se houver).
3. Atualizar `progressoNivel` de cada jogador afetado e registrar snapshot em `ranking.historicoSnapshots` com timestamp e mudanças aplicadas.
4. Garantir operação atômica: alterações por jogador devem ser registradas com `changedAt` e `changedBy` (processo id) para auditoria.

Observações de balanceamento:

- Para evitar oscilações, aplicar um cooldown mínimo de uma semana entre mudanças de nível por jogador (implicitamente garantido pelo ciclo semanal).
- Critério de ordenação e desempate devem estar explicitados (ex.: XP, depois tiebreaker por `lastActive`).

## Mensagens e sons de feedback {#mensagens-sons}

Mensagens críticas (levelUp, levelDown, missaoConcluida, conquista) devem mapear para entradas em `mensagem.json` com `som` apontando para `assets/sounds/*.wav`. O player front-end deve respeitar a preferência do usuário para áudio e `prefers-reduced-motion`.

Mapeamento canônico de sons (nomes usados dentro do projeto)

- `intro.wav` — intro / transição
- `confirm.wav` — confirmação curta
- `success.wav` — feedback de sucesso
- `fail.wav` — feedback de falha
- `level_up.wav` — subir de nível
- `level_down.wav` — rebaixamento
- `mission_done.wav` — missão concluída
- `reward.wav` — recebimento de recompensa
- `conquest.wav` — nova conquista
- `no_hearts.wav` — sem corações
- `warning.wav` — aviso/erro

## UX e acessibilidade (A11Y) {#ux-a11y}

- Mobile-first: layout pensado para telas pequenas, breakpoints responsivos.
- Touch targets: mínimo 44x44 CSS pixels.
- Contraste: texto deve cumprir WCAG AA (4.5:1) para texto normal; tokens de cor definidos em `brand_guidelines`.
- Preferências: respeitar `prefers-reduced-motion` e `prefers-contrast` do sistema; respeitar opção de desativar sons.
- ARIA: todos os controles dinâmicos devem expor roles e labels apropriados; modais devem gerenciar foco.

Comportamento de modais e toasts

- Modais para ações críticas (ex.: usar item que consome moeda): bloqueiam interações principais e oferecem confirmação explícita.
- Toasts devem ser breves e não bloquear (3–6s), com opção de fechar.

## Marca e logotipo (especificação de identidade visual) {#marca-logotipo}

Nome: Biblia Gamepray

Elementos do logotipo (descrição para design):
- Ícone: Bíblia aberta em três camadas (silhueta preta, detalhe dourado, folha frontal bege) com uma linha marca-texto vermelha central como acento.
- Elementos de gamepad embutidos: D-pad e botões de ação estilizados em dourado nas páginas da bíblia (de forma sutil, integrados ao traço). Dois analógicos ilustrativos podem ser usados para equilíbrio.
- Tipografia: palavra "Biblia" em serifada clássica; "Gamepray" em contraste com uma fonte monoespaçada ou pixel-style para evocar jogo.
- Paleta de cores (tokens): preto #000000, dourado #D4AF37, bege #ffdb97ff, vermelho #C62828.

Variações: full-color, monocromática preta, monocromática branca, ícone reduzido (favicon), horizontal (ícone+texto) e vertical (ícone acima do texto).

Considerações técnicas e de migração

- Arquivo de configuração global: `dados/config_global.json` deve conter parâmetros de base (baseXP, heartsBase, heartRegenMinutes, niveis array, regrasNiveis com frequência e parâmetros de promoção).
- Migração para Supabase/Postgres: os JSONs usam FKs por id para permitir mapeamento direto para tabelas relacionais. Campos de auditoria recomendados: `createdAt`, `updatedAt`, `changedBy`.
- Processos batch (ex.: avaliação semanal de ligas) devem ser idempotentes e registrar snapshots para auditoria.

Observações operacionais

- A implementação front-end deve fornecer controles de consentimento para som e notificações, e opções de acessibilidade visível nas configurações do usuário.
- Logs e snapshots de ranking devem ser mantidos para retrocesso e análise; considerar armazenamento de hashes de integridade para detectar alterações indevidas em ambiente de produção.

Esquemas e validação

Todo JSON de domínio deve ter um esquema JSON Schema correspondente para validação local e durante migração. Ex.: `schemas/status_player_base.schema.json` validando presença de campos obrigatórios e tipos básicos.

Notas finais

Este documento descreve as regras e contratos necessários para a construção do protótipo e sua futura migração. Implementações concretas (páginas, componentes e scripts) deverão seguir estritamente os contratos de dados e as regras de A11Y aqui definidas para garantir interoperabilidade, auditabilidade e usabilidade.

***
## Modelagem de Dados (DB Schema + Relacionamentos) {#modelagem-dados}

Este arquivo contém as cópias geradas dos artefatos JSON que descrevem o esquema de banco de dados (tabelas/colunas) e os relacionamentos principais do protótipo. Estão também presentes em `/dados/` como `db_schema.json` e `db_relacionamentos.json`.

---

Arquivo: db_schema.json (resumo)

```json
{
  "meta": {
    "nome": "Biblia Gamepray - DB Schema (JSON)",
    "versao": "0.1",
    "descricao": "Representação em JSON das tabelas principais usadas pelo protótipo. Destinado a documentar o modelo para Migração a Postgres/Supabase.",
    "geradoEm": "2025-11-13"
  },
  "tables": [
    {
      "name": "usuarios",
      "description": "Contas de usuário / jogadores.",
      "columns": [
        { "name": "id", "type": "uuid", "primary": true },
        { "name": "email", "type": "string", "nullable": false },
        { "name": "nome", "type": "string" },
        { "name": "apelido", "type": "string", "nullable": true },
        { "name": "senha_hash", "type": "string", "nullable": true, "note": "apenas se houver autenticação local" },
        { "name": "created_at", "type": "datetime" },
        { "name": "last_login", "type": "datetime", "nullable": true },
        { "name": "avatar_config_id", "type": "int", "nullable": true, "fk": "avatar_configs.id" },
        { "name": "status_player_id", "type": "string", "nullable": true, "fk": "status_player.user_id", "note": "user_id também é PK em status_player" }
      ]
    },
    {
      "name": "avatar_configs",
      "description": "Seeds / presets de avatar (Avataaars / DiceBear).",
      "columns": [
        { "name": "id", "type": "int", "primary": true },
        { "name": "user_id", "type": "uuid", "fk": "usuarios.id" },
        { "name": "sid", "type": "string", "description": "seed string usada pelo gerador" },
        { "name": "json_config", "type": "jsonb", "description": "opcional: objeto de configuração completo" },
        { "name": "created_at", "type": "datetime" }
      ]
    },
    { "name": "status_player", "description": "Estado canônico do jogador — snapshots das attributes (modelo armazenado em JSON para flexibilidade). PK = user_id", "columns": [ { "name": "user_id", "type": "uuid", "primary": true, "fk": "usuarios.id" }, { "name": "atributos", "type": "jsonb" }, { "name": "sistema_progresso", "type": "jsonb" }, { "name": "progresso_nivel", "type": "jsonb" }, { "name": "hud_status", "type": "jsonb" }, { "name": "estatisticas", "type": "jsonb" }, { "name": "configuracoes", "type": "jsonb" }, { "name": "updated_at", "type": "datetime" } ] }
  ]
}
```

---

Arquivo: db_relacionamentos.json (resumo)

```json
{
  "meta": { "nome": "Biblia Gamepray - Relacionamentos (JSON)", "versao": "0.1", "geradoEm": "2025-11-13" },
  "relationships": [
    { "from": "usuarios", "to": "status_player", "type": "1:1", "local_key": "id", "foreign_key": "status_player.user_id" },
    { "from": "usuarios", "to": "avatar_configs", "type": "1:N", "local_key": "id", "foreign_key": "avatar_configs.user_id" },
    { "from": "acoes", "to": "missoes", "type": "1:N", "local_key": "acoes.id", "foreign_key": "missoes.acao_id" }
  ]
}
```

---

Observação: os arquivos completos e detalhados estão em `dados/db_schema.json` e `dados/db_relacionamentos.json`.

Para regras e comportamento detalhado do jogo, consulte também: `docs/GAME_RULES.md`.
Para o tutorial passo-a-passo e roteiro de onboarding, consulte: `docs/TUTORIAL.md`.

---

## Conteúdo consolidado de todos os documentos (merge) {#conteudo-consolidado}

A seguir estão os documentos criados separadamente incorporados neste único arquivo para facilitar leitura e distribuição. Cada seção mantém o conteúdo original dos arquivos em `docs/`.

### DB_MODEL.md — Modelagem de Dados (cópia)

Biblia Gamepray — Modelagem de Dados (DB Schema + Relacionamentos)

Este arquivo contém as cópias geradas dos artefatos JSON que descrevem o esquema de banco de dados (tabelas/colunas) e os relacionamentos principais do protótipo. Estão também presentes em `/dados/` como `db_schema.json` e `db_relacionamentos.json`.

---

Arquivo: db_schema.json (resumo)

```json
{
  "meta": {
    "nome": "Biblia Gamepray - DB Schema (JSON)",
    "versao": "0.1",
    "descricao": "Representação em JSON das tabelas principais usadas pelo protótipo. Destinado a documentar o modelo para Migração a Postgres/Supabase.",
    "geradoEm": "2025-11-13"
  },
  "tables": [
    {
      "name": "usuarios",
      "description": "Contas de usuário / jogadores.",
      "columns": [
        { "name": "id", "type": "uuid", "primary": true },
        { "name": "email", "type": "string", "nullable": false },
        { "name": "nome", "type": "string" },
        { "name": "apelido", "type": "string", "nullable": true },
        { "name": "senha_hash", "type": "string", "nullable": true, "note": "apenas se houver autenticação local" },
        { "name": "created_at", "type": "datetime" },
        { "name": "last_login", "type": "datetime", "nullable": true },
        { "name": "avatar_config_id", "type": "int", "nullable": true, "fk": "avatar_configs.id" },
        { "name": "status_player_id", "type": "string", "nullable": true, "fk": "status_player.user_id", "note": "user_id também é PK em status_player" }
      ]
    },
    {
      "name": "avatar_configs",
      "description": "Seeds / presets de avatar (Avataaars / DiceBear).",
      "columns": [
        { "name": "id", "type": "int", "primary": true },
        { "name": "user_id", "type": "uuid", "fk": "usuarios.id" },
        { "name": "sid", "type": "string", "description": "seed string usada pelo gerador" },
        { "name": "json_config", "type": "jsonb", "description": "opcional: objeto de configuração completo" },
        { "name": "created_at", "type": "datetime" }
      ]
    },
    { "name": "status_player", "description": "Estado canônico do jogador — snapshots das attributes (modelo armazenado em JSON para flexibilidade). PK = user_id", "columns": [ { "name": "user_id", "type": "uuid", "primary": true, "fk": "usuarios.id" }, { "name": "atributos", "type": "jsonb" }, { "name": "sistema_progresso", "type": "jsonb" }, { "name": "progresso_nivel", "type": "jsonb" }, { "name": "hud_status", "type": "jsonb" }, { "name": "estatisticas", "type": "jsonb" }, { "name": "configuracoes", "type": "jsonb" }, { "name": "updated_at", "type": "datetime" } ] }
  ]
}
```

---

Arquivo: db_relacionamentos.json (resumo)

```json
{
  "meta": { "nome": "Biblia Gamepray - Relacionamentos (JSON)", "versao": "0.1", "geradoEm": "2025-11-13" },
  "relationships": [
    { "from": "usuarios", "to": "status_player", "type": "1:1", "local_key": "id", "foreign_key": "status_player.user_id" },
    { "from": "usuarios", "to": "avatar_configs", "type": "1:N", "local_key": "id", "foreign_key": "avatar_configs.user_id" },
    { "from": "acoes", "to": "missoes", "type": "1:N", "local_key": "acoes.id", "foreign_key": "missoes.acao_id" }
  ]
}
```

---

### GAME_RULES.md — Regras e comportamentos detalhados (cópia)

# Regras e comportamentos detalhados

Esta página reúne as regras operacionais e escolhas de design para o jogo: XP, níveis, corações, missões, itens, economia e ligas.

## 1) Sistema de XP e progressão

- Fórmula sugerida: XP necessário para subir do nível n para n+1 = baseXP * (multiplier)^(n-1). Ex.: baseXP=100, multiplier=1.25.
- XP ganho: use `recompensas.xp` declaradas por ação/missão; aplique multiplicadores de evento, itens e streaks.
- Streaks: sequência diária dá bônus percentual cumulativo (ex.: +5% por dia, cap 50%). Reiniciar streak reduz bônus.
- Perda de XP: falhas graves podem aplicar perda de XP; essa penalidade deve ser parametrizável por `config_global`.

## 2) Corações / Tentativas

- Cada falha em quiz ou tentativa de estudo consome 1 heart.
- Hearts regeneram automaticamente com base em `heartsRegenMinutes` até `heartsMax`.
- Quando `hearts == 0` bloquear início de quiz que precisam de tentativas, oferecendo opção de usar item regenerador ou comprar tentativas.

## 3) Missões (lifecycle)

- Estados: `pendente` -> `em_andamento` -> `aguardando_verificacao` -> `concluida` | `expirada` | `cancelada`.
- Evidências: suportar texto, imagem, áudio; armazenar em `missoes.evidencias[]` com metadados (uploaderId, timestamp, tipo, verificado boolean).
- Validação: possível auto-validação via regras simples, uso de itens `validador_missao` ou revisão humana.
- Expiração: aplicar penalidade (configurável) e registro em `missoes.historico`.

## 4) Missões Compartilhadas

- Modelo: tabela `mission_participants` sugerida com `missao_id`, `user_id`, `papel`, `confirmado`, `pontuacao_local`.
- Políticas: definir regra de conclusão coletiva (todos/maioria) e dividir recompensas proporcionalmente.
- Proteções: itens de grupo podem isentar membros de penalidades individuais.

## 5) Economia e Loja

- Moeda: "Ouro da Fé" (campo `economia.moeda_nome` em `config_global`).
- Transações: `transacoes_loja` com status, método, valor e metadados para auditar pagamentos.
- Ofertas: suportar `promocoes` e `validade` no `shop_items`.

## 6) Itens

- Consumíveis decrementam `user_items.quantidade` ao usar; aplicar `efeitos` imediatamente (ou com duração se `efeitos.duracaoMinutos`).
- Permanentes (equipáveis) aplicam buffs enquanto `equipado=true`.
- Cooldowns e stacking obedecem campos `uso.cooldownMinutos` e `uso.stackMaximo`.

## 7) Ligas / Promoções (algoritmo)

- Agrupar por `nivelId` e computar leaderboard semanal por critério (XP semanal, pontos de missão etc.).
- Regras aplicadas:
  - posição 1..10 → marcar para promoção (se houver próximo nível)
  - posição 11..20 → manter
  - posição >20 → marcar para rebaixamento
- Desempate: usar `lastActive` (mais recente sobe), seguido por `xpTotal`.
- Snapshot: registrar mudanças em `ranking_snapshots` (periodo, usuarioId, posicaoAntiga, posicaoNova, acao).
- Implementação: rodar como job idempotente (Cloud Function / cron) com transações para consistência.

## Observações de balanceamento

- Para evitar oscilações, aplicar um cooldown mínimo de uma semana entre mudanças de nível por jogador (implicitamente garantido pelo ciclo semanal).
- Critério de ordenação e desempate devem estar explicitados (ex.: XP, depois tiebreaker por `lastActive`).

## Mensagens e sons de feedback

Mensagens críticas (levelUp, levelDown, missaoConcluida, conquista) devem mapear para entradas em `mensagem.json` com `som` apontando para `assets/sounds/*.wav`. O player front-end deve respeitar a preferência do usuário para áudio e `prefers-reduced-motion`.

## Notas técnicas

- Processos batch (ex.: avaliação semanal de ligas) devem ser idempotentes e registrar snapshots para auditoria.
- Garantir que mudanças de nível e transações financeiras sejam executadas em transação atômica no backend.

---

### Fim do conteúdo consolidado

Se desejar, posso refinar a ordem (por exemplo: colocar o Tutorial no início), ou transformar este arquivo consolidado em uma versão 'printable' para encaminhar a stakeholders (remover seções técnicas). Também posso criar um índice (TOC) navegável no topo.
