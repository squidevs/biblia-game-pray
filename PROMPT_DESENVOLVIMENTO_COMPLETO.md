# PROMPT COMPLETO PARA DESENVOLVIMENTO - BÍBLIA GAMEPRAY

## 📋 VISÃO GERAL DO PROJETO

**Bíblia GamePray** é um Progressive Web App (PWA) gamificado focado em práticas espirituais diárias baseadas na Bíblia. O aplicativo combina mecânicas de jogos (XP, níveis, conquistas, inventário) com conteúdo bíblico (missões, estudos, leitura de capítulos) para incentivar hábitos espirituais consistentes.

### Objetivo Principal
Criar uma experiência gamificada que motive usuários a:
- Ler e estudar a Bíblia regularmente
- Realizar práticas devocionais (oração, jejum, arrependimento)
- Acompanhar progresso espiritual através de atributos (Frutos do Espírito vs Obras da Carne)
- Participar de missões diárias, semanais e especiais
- Competir em rankings e desbloquear conquistas

---

## 🏗️ ARQUITETURA E TECNOLOGIAS

### Stack Tecnológico

**Frontend:**
- **Tailwind** estilo e components padrões
- **HTML5** semântico e acessível
- **CSS3** responsivo (mobile-first)
- **Alpine.js** (via CDN) para reatividade e interações
- **Bootstrap Icons** e **Material Icons** para ícones
- **PWA** completo com Service Worker e Manifest

**Persistência (Protótipo):**
- **JSONs locais** em `/dados/` como fonte de verdade
- Preparado para migração futura para **Supabase/PostgreSQL**

**Integrações:**
- **Web Speech API** (TTS) para leitura de versículos
- **Avataaars** para geração de avatares
- **EmailJS** para envio de emails
- **Web Push API** para notificações (requer backend)
- **IndexedDB** para cache local

**Acessibilidade:**
- Padrões **WCAG AA**
- Suporte a leitores de tela
- Controles de TTS, alto contraste, tamanho de fonte
- Suporte a Libras (documentado)

---

## 📁 ESTRUTURA DE PASTAS

```
/
├── index.html                    # Entry point PWA
├── manifest.json                 # Web App Manifest
├── service-worker.js            # Service Worker (cache, offline)
├── css/
│   ├── globais.css              # Tokens (cores, espaçamentos, reset)
│   ├── mobile/
│   │   ├── base.css             # Mobile-first base styles
│   │   └── components/          # Componentes (cards, modais, HUD)
│   └── desktop/
│       └── base.css             # Desktop overrides
├── js/
│   ├── globais.js               # Polyfills, init, i18n
│   ├── missoes.js               # Lógica de missões
│   ├── estudos.js               # Lógica de estudos/trilha
│   ├── acoes.js                 # Ações devocionais
│   ├── armadura.js               # Equipamentos e buffs
│   ├── perfil.js                # Perfil do usuário
│   ├── inventario.js            # Gestão de itens
│   ├── loja.js                  # Sistema de compras
│   ├── ranking.js               # Rankings e ligas
│   ├── conquistas.js            # Sistema de conquistas
│   ├── hud.js                   # HUD e status
│   ├── integracoes.js           # TTS, avatares, dicionário
│   └── utils.js                 # Utilitários gerais
├── dados/                       # JSONs locais (fonte de verdade)
│   ├── usuarios.json
│   ├── status_player_base.json
│   ├── missoes.json
│   ├── acoes.json
│   ├── itens.json
│   ├── conquistas.json
│   ├── estudos.json
│   ├── ranking.json
│   ├── loja.json
│   ├── config_global.json
│   ├── db_schema.json
│   └── ... (outros JSONs)
├── assets/
│   ├── imagens/
│   │   ├── logo/                # SVGs da marca
│   │   ├── missoes/            # Thumbnails de missões
│   │   ├── usuarios/           # Avatares
│   │   └── ui/                  # Ícones e ilustrações
│   └── sounds/
│       ├── intro.wav
│       ├── confirm.wav
│       ├── success.wav
│       ├── fail.wav
│       ├── level_up.wav
│       ├── level_down.wav
│       ├── mission_done.wav
│       ├── reward.wav
│       ├── conquest.wav
│       ├── no_hearts.wav
│       └── warning.wav
└── docs/                        # Documentação completa
    ├── BIBLIA_GAMEPRAY_SPEC.md
    ├── TECNOLOGIAS.md
    └── ... (outros docs)
```

---

## 🎮 SISTEMA DE JOGO - MECÂNICAS PRINCIPAIS

### 1. Sistema de Progressão (XP e Níveis)

**Fórmula de XP:**
- XP necessário para nível n → n+1 = `baseXP * (multiplier)^(n-1)`
- Exemplo: baseXP=100, multiplier=1.25
- XP ganho através de missões, estudos, ações devocionais

**Níveis e Ligas:**
- 7 níveis: Chamado → Discípulo → Companheiro → Servo → Mestre → Apóstolo → Líder Espiritual
- Avaliação semanal de ranking:
  - Top 10 do nível → promove para próximo nível
  - Posições 11-20 → mantém nível atual
  - Posição >20 → rebaixa para nível anterior

**Streaks:**
- Sequência diária dá bônus cumulativo (+5% por dia, máximo 50%)
- Reiniciar streak remove bônus

### 2. Sistema de Atributos Espirituais

**Frutos do Espírito (Atributos Positivos - 0-100):**
- Amor, Alegria, Paz, Paciência, Bondade, Benignidade, Fidelidade, Mansidão, Domínio Próprio

**Obras da Carne (Atributos Negativos - 0-100):**
- Imoralidade/Impureza, Idolatria/Feitiçaria, Inimizade/Ódio, Ciúmes/Inveja, Ira, Dissensão/Facção, Orgias/Bebedices, Ambição/Egoísmo, Orgulho/Egoísmo

**Faixas de Impacto:**
- 0-24: Sem efeito/penalidade
- 25-49: Bônus/penalidade leve
- 50-74: Bônus/penalidade moderada
- 75-100: Bônus máximo/bloqueio de funcionalidades

**Bloqueios por Status Negativo:**
- ≥75 em qualquer obra da carne bloqueia funcionalidades específicas:
  - Ranking: bloqueado se ciúmes/inveja ≥75
  - Missões colaborativas: bloqueadas se egoísmo/orgulho ≥75
  - Estudos: bloqueados se imoralidade/impureza ≥75
  - Loja: alguns itens bloqueados conforme status

### 3. Espírito Santo (Mecânica Dinâmica)

- Diminui automaticamente: 1 ponto por hora
- Notificações motivacionais a cada 15% perdido (85%, 70%, 55%, 40%, 25%, 10%)
- Limites:
  - Se `batizado = true`: nunca desce abaixo de 50%
  - Se `batizado = false`: nunca desce abaixo de 15%
- Restauração: missões, estudos, itens específicos

### 4. Corações (Tentativas)

- Máximo: 5 corações (configurável)
- Consumo: 1 coração por erro em quiz
- Regeneração: automática conforme `heartsRegenMinutes` (padrão: 60min)
- Bloqueio: sem corações, não pode iniciar quizzes que requerem tentativas

### 5. Economia

- Moeda principal: "Ouro da Fé" (●)
- Ganho: completar missões, estudos, conquistas
- Uso: comprar itens na loja
- Transações registradas em `transacoes_loja.json`

### 6. Inventário e Itens

**Tipos de Itens:**
- **Permanentes**: equipáveis, concedem buffs enquanto equipados
- **Consumíveis**: uso único, efeitos imediatos ou temporários
- **Armadura Divina**: 6 peças (Efésios 6:10-18)
  - Cinto da Verdade
  - Couraça da Justiça
  - Sandálias do Evangelho
  - Escudo da Fé
  - Capacete da Salvação
  - Espada do Espírito

**Efeitos:**
- Buffs/Debuffs: máximo 5 de cada tipo ativo
- Duração: alguns itens têm efeitos temporários (minutos/horas)
- Cooldowns: itens podem ter cooldown entre usos

---

## 🖥️ TELAS E INTERFACES

### 1. HUD (Header Fixo)

**Versão Minimizada:**
- Avatar do usuário (esquerda)
- Nome e nível (centro)
- Moedas, corações, XP (direita)
- Barra de Espírito Santo
- Grid de itens permanentes e consumíveis (6 slots cada)
- Botão "Ver mais" para expandir

**Versão Expandida:**
- Todos elementos da minimizada
- Grid completo da Armadura Divina (6 peças)
- Seção "Frutos do Espírito" (9 atributos com valores)
- Seção "Obras da Carne" (9 atributos agrupados com valores)
- Grid de efeitos ativos (buffs/debuffs com timer)
- Botão "Ver menos" para recolher

**Menu de Contexto:**
- Ao clicar em slot de item: menu com opções "Ver", "Trocar", "Remover"

### 2. Tela Início

- Avatar grande centralizado
- Nome, nível, moedas
- Barra de XP e Espírito Santo
- Cards de estatísticas (missões completas, dias consecutivos, conquistas)
- Atalhos para Missões, Estudos, Conquistas
- Ação rápida de confissão/arrependimento (se status negativo alto)

### 3. Tela Missões

- Filtros: Ativas, Concluídas, Falhadas
- Lista de cards de missões:
  - Nome, status, recompensa
  - Ícone de cura/buff se ajuda a recuperar atributos
  - Botão de ação (Iniciar/Concluir)
  - Overlay + cadeado se bloqueada por status negativo
- Modal de detalhes ao tocar em missão
- Banner motivacional do Espírito Santo se necessário

**Tipos de Missões:**
- Diárias (resetam às 04:00)
- Semanais
- Mensais
- Especiais (reconciliação, etc.)

**Estados:**
- Pendente → Em andamento → Aguardando verificação → Concluída | Expirada | Cancelada

**Evidências:**
- Suporte a texto, imagem, áudio
- Armazenadas em `missoes.evidencias[]`

### 4. Tela Estudos (Estilo Duolingo)

**Fluxo:**
1. Seleção de Testamento (Antigo/Novo)
2. Seleção de Livro (grid com progresso)
3. Trilha de Capítulos (roadmap visual)
4. Ciclo de Aprendizado (4 ciclos por capítulo):
   - Ciclo 1: Leitura inicial
   - Ciclo 2: Leitura + Quiz da leitura anterior
   - Ciclo 3: Leitura + Quiz da leitura anterior
   - Ciclo 4: Quiz final do capítulo

**Desbloqueio:**
- Nota final ≥75%: desbloqueia próximo capítulo
- Nota <75%: opção de refazer
- Bloqueio por status negativo: overlay + cadeado + tooltip

**Recursos:**
- TTS (Text-to-Speech) para leitura automática
- Controle de rolagem automática durante TTS
- Cache de áudio para offline

### 5. Tela Trilha de Capítulos

- Trilha visual vertical (ou horizontal em tablets)
- Círculos representando capítulos:
  - Concluídos: estrela/check, cor vibrante
  - Atual: animado (pulsando)
  - Futuros: cinza, bloqueado
- Baús de recompensa ao longo da trilha
- Imagens de referência bíblica
- Banner motivacional se bloqueado

### 6. Tela Perfil

- Avatar grande (editável)
- Nome, email, nível, XP, moedas, reputação
- Estatísticas (missões, dias consecutivos, conquistas, livros)
- Preferências e configurações
- Histórico/auditoria de alterações
- Bloqueios: overlay + cadeado + tooltip se função bloqueada
- Atalho para confissão/arrependimento

### 7. Tela Loja

- Filtros: Itens, Consumíveis, Armaduras, Pacotes
- Grid de itens à venda:
  - Imagem, nome, preço
  - Overlay + cadeado se bloqueado por status
  - Ícone de buff/cura se liberado por status positivo
- Modal de detalhes ao tocar
- Banner motivacional se bloqueios ativos

### 8. Tela Inventário

- Filtros: Permanente, Consumível, Armadura
- Grid/lista de itens:
  - Imagem, nome, quantidade
  - Overlay + cadeado se bloqueado
  - Botão "Usar" para consumíveis
  - Botão "Equipar" para permanentes/armadura
- Modal de detalhes

### 9. Tela Conquistas

- Grid de conquistas (66 planejadas)
- Conquistas desbloqueadas: destacadas
- Conquistas bloqueadas: esmaecidas
- Modal de detalhes com requisitos e recompensas

### 10. Tela Ranking

- Leaderboard semanal/mensal
- Posição, avatar, nome, pontuação
- Destaque para promoções/rebaixamentos
- Filtros por nível/liga
- Bloqueio se ciúmes/inveja ≥75

### 11. Tela Configurações

- Notificações (push/email)
- Privacidade
- Idioma
- Tema (claro/escuro, alto contraste)
- Acessibilidade (TTS, Libras, tamanho de fonte)
- Sobre (versão, termos, políticas)
- Opção "Ver Tutorial"
- Sair

### 12. Tela Login/Registro

- Autenticação (Google, local)
- Opção "Explorar" (modo demo)
- Boas-vindas

### 13. Tutorial Interativo

- 7 páginas explicativas:
  1. Bem-vindo
  2. HUD e Status Espiritual
  3. Inventário
  4. Missões e Estudos
  5. Ranking e Conquistas
  6. Loja e Economia
  7. Configurações e Recuperação
- Barra de progresso
- Navegação: Próximo, Voltar, Pular
- Exibido automaticamente no primeiro acesso

---

## 📊 MODELO DE DADOS

### Entidades Principais

**usuarios.json:**
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

**status_player_base.json:**
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
    "espiritoSanto": 100,
    "frutosEspirito": {
      "amor": 0,
      "alegria": 0,
      "paz": 0,
      // ... outros 6
    },
    "obrasCarneAgrupadas": {
      "imoralidadeImpureza": 0,
      "idolatriaFeiticaria": 0,
      // ... outros 7
    }
  },
  "armaduraDeus": {
    "cintoVerdade": {"valor": 0, "buffs": {}},
    "couracaJustica": {"valor": 0, "buffs": {}},
    // ... outras 4 peças
  },
  "inventario": [{"itemId": "poção-coracao", "quantidade": 2}],
  "progressoNivel": {
    "nivelId": "nivel-03",
    "nivelOrdem": 3,
    "nivelNome": "Companheiro",
    "posicaoNaLigaAtual": 14
  }
}
```

**missoes.json:**
```json
{
  "id": "missao-diaria-001",
  "tipo": "diaria",
  "titulo": "Ler 1 capítulo",
  "descricao": "Leia um capítulo da Bíblia e registre um versículo.",
  "dificuldade": 2,
  "recompensas": {"xp": 20, "moeda": 5},
  "evidenciaRequired": false
}
```

**itens.json:**
```json
{
  "id": "poção-coracao",
  "nome": "Poção de Coração",
  "tipo": "consumivel",
  "efeito": {"heartsRestore": 3},
  "stackMaximo": 10
}
```

---

## 🎨 DESIGN E UX

### Princípios de Design

1. **Mobile-First**: Layout pensado para telas pequenas primeiro
2. **Acessibilidade (WCAG AA)**:
   - Contraste mínimo 4.5:1 para texto
   - Touch targets mínimo 44x44px
   - Navegação por teclado
   - Labels ARIA em todos controles
3. **Microinterações**:
   - Animações suaves (fade, slide, pulse)
   - Feedback visual/tátil em todas ações
   - Respeitar `prefers-reduced-motion`
4. **Feedback Sonoro**:
   - Sons opcionais para ações críticas
   - Respeitar preferência do usuário
   - Mapeamento canônico de sons (ver especificação)

### Paleta de Cores (Marca)

- Preto: #000000
- Dourado: #D4AF37
- Bege: #FFDB97
- Vermelho: #C62828

### Tokens CSS

Definir em `css/globais.css`:
- Cores (primária, secundária, sucesso, erro, etc.)
- Espaçamentos (4px, 8px, 12px, 16px, 24px, 32px, etc.)
- Tipografia (fontes, tamanhos, pesos)
- Sombras
- Bordas arredondadas

---

## 🔧 FUNCIONALIDADES TÉCNICAS

### Service Worker

**Estratégias de Cache:**
- **Cache-first**: assets estáticos, JSONs locais
- **Network-first**: APIs externas (Bible API, dicionário) com fallback para cache
- **Handlers**: `push` e `notificationclick` para notificações

### Integrações

**TTS (Text-to-Speech):**
- Web Speech API (`speechSynthesis`)
- Controle de velocidade, voz, idioma
- Cache de áudio em IndexedDB

**Avatares:**
- Geração via Avataaars/DiceBear usando seed
- Salvar seed em `avatar-configs.json`

**Dicionário:**
- API de dicionário para palavras clicadas
- Cache em IndexedDB
- Modal/tooltip com definição

**EmailJS:**
- Envio de emails direto do front-end
- Contato, recuperação de senha

**Web Push:**
- Inscrição via `pushManager.subscribe`
- Requer backend com VAPID/FCM para envio

### Acessibilidade

**Controles:**
- TTS: ativar/desativar, velocidade, voz
- Alto contraste: toggle
- Tamanho de fonte: aumentar/diminuir
- Libras: toggle (documentado, implementação futura)

**ARIA:**
- Roles apropriados em todos componentes
- Labels descritivos
- Modais: gerenciar foco (trap-focus)

---

## 📝 REGRAS DE NEGÓCIO

### Missões

- Reset diário: 04:00 horário local
- Estados: pendente → em_andamento → aguardando_verificacao → concluida | expirada | cancelada
- Validação: auto-validação, itens validador, ou revisão humana
- Expiração: penalidade configurável

### Corações

- Regeneração automática conforme `heartsRegenMinutes`
- Não excede `heartsMax`
- Bloqueio de quizzes sem corações

### Itens

- Consumíveis: decrementam quantidade ao usar
- Permanentes: aplicam buffs enquanto equipados
- Cooldowns: respeitar `uso.cooldownMinutos`
- Stacking: respeitar `uso.stackMaximo`

### Ranking e Ligas

- Avaliação semanal (processo batch)
- Idempotente e transacional
- Snapshot de mudanças para auditoria

### Bloqueios por Status

- Verificar faixas (0-24, 25-49, 50-74, 75-100)
- Aplicar bloqueios conforme regras
- Exibir tooltips explicativos
- Oferecer atalho para confissão/arrependimento

---

## 🚀 IMPLEMENTAÇÃO - CHECKLIST

### Fase 1: Estrutura Base
- [ ] Criar estrutura de pastas
- [ ] Configurar `index.html` com Alpine.js (CDN)
- [ ] Criar `manifest.json` e `service-worker.js`
- [ ] Configurar tokens CSS em `globais.css`
- [ ] Implementar reset CSS e base mobile-first

### Fase 2: Sistema de Dados
- [ ] Criar módulo `js/utils.js` para carregar JSONs
- [ ] Implementar funções de leitura/escrita de dados
- [ ] Criar sistema de cache em IndexedDB
- [ ] Implementar validação de dados

### Fase 3: HUD
- [ ] Implementar HUD minimizada
- [ ] Implementar HUD expandida
- [ ] Sistema de atributos (frutos/obras)
- [ ] Grid de itens (permanentes, consumíveis, armadura)
- [ ] Grid de efeitos ativos (buffs/debuffs)
- [ ] Menu de contexto para itens
- [ ] Animações de expansão/recolhimento

### Fase 4: Telas Principais
- [ ] Tela Início
- [ ] Tela Missões (lista, filtros, modais)
- [ ] Tela Estudos (seleção, trilha, ciclos)
- [ ] Tela Perfil
- [ ] Tela Loja
- [ ] Tela Inventário
- [ ] Tela Conquistas
- [ ] Tela Ranking
- [ ] Tela Configurações
- [ ] Tela Login/Registro

### Fase 5: Sistema de Jogo
- [ ] Lógica de XP e níveis
- [ ] Sistema de atributos e faixas
- [ ] Mecânica do Espírito Santo
- [ ] Sistema de corações
- [ ] Sistema de bloqueios por status
- [ ] Lógica de missões (estados, validação)
- [ ] Lógica de estudos (ciclos, quizzes)
- [ ] Sistema de conquistas
- [ ] Sistema de ranking e ligas

### Fase 6: Integrações
- [ ] TTS (Web Speech API)
- [ ] Geração de avatares (Avataaars/DiceBear)
- [ ] Dicionário (API + cache)
- [ ] EmailJS (configuração)
- [ ] Web Push (inscrição)

### Fase 7: Acessibilidade
- [ ] Controles de TTS, alto contraste, fonte
- [ ] Labels ARIA em todos componentes
- [ ] Navegação por teclado
- [ ] Suporte a leitores de tela
- [ ] Respeitar `prefers-reduced-motion`

### Fase 8: PWA
- [ ] Service Worker completo (cache strategies)
- [ ] Offline support
- [ ] Notificações push (inscrição)
- [ ] Atualização de cache

### Fase 9: Tutorial e Onboarding
- [ ] Tutorial interativo (7 páginas)
- [ ] Fluxo de primeiro acesso
- [ ] Opção "Ver Tutorial" em configurações

### Fase 10: Polimento
- [ ] Animações e microinterações
- [ ] Feedback sonoro (opcional)
- [ ] Testes de acessibilidade
- [ ] Testes em diferentes dispositivos
- [ ] Otimização de performance

---

## 📚 DOCUMENTAÇÃO DE REFERÊNCIA

Todos os arquivos em `/docs/` contêm especificações detalhadas:

- `BIBLIA_GAMEPRAY_SPEC.md`: Especificação completa do projeto
- `TECNOLOGIAS.md`: Stack tecnológico e integrações
- `tela_*.md`: Especificações detalhadas de cada tela
- `regras_status.md`: Regras de atributos e faixas
- `tutorial_primeiro_acesso.md`: Fluxo de tutorial

---

## ⚠️ OBSERVAÇÕES IMPORTANTES

1. **Dados Locais**: Durante prototipagem, usar JSONs em `/dados/`. Preparar estrutura para migração futura para Supabase/PostgreSQL.

2. **Segurança**: Não commitar chaves de API no repositório. Documentar em `docs/keys.md`.

3. **Acessibilidade**: Priorizar sempre. Testar com leitores de tela e navegação por teclado.

4. **Performance**: Otimizar carregamento de imagens, lazy loading, code splitting se necessário.

5. **Testes**: Testar em diferentes navegadores e dispositivos (mobile, tablet, desktop).

6. **Auditoria**: Registrar logs de ações críticas (confissão, uso de itens raros, mudanças de nível).

7. **Balanceamento**: Ajustar valores de XP, recompensas, cooldowns conforme feedback de usuários.

---

## 🎯 OBJETIVO FINAL

Criar um PWA completo, funcional, acessível e gamificado que motive práticas espirituais diárias através de mecânicas de jogo bem balanceadas, conteúdo bíblico rico e uma experiência de usuário excepcional.

---

**Versão do Prompt:** 1.0  
**Data:** 2025-01-27  
**Baseado em:** Especificações completas em `/docs/` e `/dados/`

