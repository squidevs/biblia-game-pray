# Roteiro de Prompts – Bíblia GamePray

Este documento divide o desenvolvimento em etapas pequenas, com prompts autocontidos para que qualquer agente de IA execute o projeto ponta a ponta. Copie e cole **um prompt por vez**, validando o resultado antes de seguir.

## Como usar
- Siga a ordem numérica; não pule etapas.
- Antes de cada entrega, releia `PROMPT_DESENVOLVIMENTO_COMPLETO.md` e os arquivos específicos da tela citada em `/docs`.
- Peça sempre um resumo do que foi feito, arquivos alterados e testes executados.
- Exija que cada agente mantenha o estilo mobile-first, acessibilidade, Alpine.js via CDN e dados mockados a partir de `/dados/*.json`.

---

## Fase 1 – Frontend (UI/UX)

### Prompt 1 – Setup Base do PWA
**Objetivo:** Criar estrutura inicial (HTML, CSS, JS), manifest e service worker stub.  
**Entradas obrigatórias:** `PROMPT_DESENVOLVIMENTO_COMPLETO.md`, `docs/TECNOLOGIAS.md`.  
**Entrega esperada:** `index.html`, `manifest.json`, `service-worker.js`, `css/globais.css`, `css/mobile/base.css`, `css/desktop/base.css`, `js/globais.js`, `js/utils.js`, import de Alpine.js/CDNs, reset CSS e tokens.  

**Prompt sugerido:**
```
Você é o desenvolvedor responsável por inicializar o PWA Bíblia GamePray. Leia PROMPT_DESENVOLVIMENTO_COMPLETO.md e docs/TECNOLOGIAS.md.
Tarefas:
1. Criar a estrutura de pastas base descrita no prompt global (css/, js/, dados/, assets/, docs/).
2. Implementar index.html com HTML semântico, meta tags PWA, preload de fontes, inclusão de Tailwind CDN, Alpine.js, Bootstrap Icons, Material Icons.
3. Criar css/globais.css com reset, tokens de cor, tipografia, espaçamentos e utilitários; adicionar css/mobile/base.css (mobile-first) e css/desktop/base.css (overrides ≥1024px).
4. Criar js/globais.js para inicialização (registro do service worker, helpers gerais) e js/utils.js contendo função fetchJSON que lê arquivos de /dados/ com cache simples (localStorage).
5. Adicionar manifest.json (ícones, cores da marca, display standalone) e um service-worker.js stub com eventos install/activate + cache básico de assets estáticos.
Critérios: código comentado apenas onde necessário, sem frameworks extras, todas referências relativas. Liste arquivos criados/alterados e descreva como testar (ex: servir via npx serve).
```

### Prompt 2 – Shell de Navegação e Layout Principal
**Objetivo:** Construir o shell SPA (header fixo, drawer, navegação por seções) e placeholders das telas.  
**Entradas obrigatórias:** `docs/tela_navbar.md`, `docs/tela_drawer.md`, `docs/tela_inicio.md`.  
**Entrega esperada:** Estrutura `main` com seções referenciadas por `data-screen`, navegação responsiva (hambúrguer + drawer), componentes básicos (botões, cartões).  

**Prompt sugerido:**
```
Implemente o shell de navegação da Bíblia GamePray. Leia docs/tela_navbar.md, docs/tela_drawer.md e docs/tela_inicio.md.
Tarefas:
1. No index.html, crie header fixo com logo, título, ícones de acessibilidade (contraste, fonte, TTS) e botão para abrir o drawer.
2. Criar componente drawer (HTML + Alpine) com atalhos para todas as telas definidas na documentação. Drawer deve suportar navegação por teclado e aria-labels.
3. Estruturar <main> com contêiner que alterna telas (role="tabpanel"), cada uma com data-screen (inicio, missoes, estudos, trilha, inventario, loja, conquistas, ranking, perfil, configuracoes, login, tutorial).
4. Implementar navegação SPA simples em js/globais.js: clique em links atualiza tela ativa (mostrar/ocultar seções). Manter estado atual no hash/location.
5. Estilizar layout base (responsivo, mobile-first). Garantir que sem conteúdo real ainda, existam placeholders legíveis para cada tela.
Critérios: Acessibilidade (ARIA, foco), animação suave para drawer, nenhum framework além de Alpine/Tailwind CDN. Explique como testar navegação.
```

### Prompt 3 – HUD Minimizada e Expandida
**Objetivo:** Implementar o HUD descrito na documentação, com estados minimizado/expandido e slots de itens.  
**Entradas obrigatórias:** `docs/tela_hud.md`, `dados/status_player_base.json`, `dados/itens.json`.  
**Entrega esperada:** Componente HUD reutilizável (`section` fixa abaixo do header), Alpine store com dados mockados carregados via `fetchJSON`.  

**Prompt sugerido:**
```
Construa o HUD completo (versão minimizada e expandida). Leia docs/tela_hud.md e utilize dados/status_player_base.json + dados/itens.json como fonte.
Tarefas:
1. Criar componente Alpine (store hudStore) que carrega o status do usuário via utils.fetchJSON e expõe computed para XP, corações, Espírito Santo, moedas.
2. Renderizar HUD minimizado com avatar, nome, nível, moedas, XP, corações e barra do Espírito Santo.
3. Implementar botão "Ver mais" que expande painel com grid da Armadura de Deus, slots de itens permanentes/consumíveis, lista de buffs/debuffs, seções Frutos do Espírito e Obras da Carne.
4. Adicionar menu de contexto para cada item (Ver, Trocar, Remover) utilizando menus acessíveis.
5. Garantir responsividade e animações suaves (transições CSS); respeitar contrastes e labels ARIA.
Critérios: Dados mockados devem refletir JSON, sem valores hardcoded. Explicar como o HUD reage quando dados mudam.
```

### Prompt 4 – Tela Início
**Objetivo:** Construir a tela inicial (dashboard) com cards de resumo e atalhos.  
**Entradas obrigatórias:** `docs/tela_inicio.md`, `docs/regras_status.md`, `dados/status_player_base.json`, `dados/conquistas.json`.  
**Entrega esperada:** Cards de estatísticas, barra de XP/Espírito, widget de streak/confissão, atalhos.  

**Prompt sugerido:**
```
Implemente a tela Início conforme docs/tela_inicio.md.
Tarefas:
1. Carregar dados do usuário (status_player_base) e conquistas para preencher cards (missões concluídas, dias consecutivos, conquistas desbloqueadas).
2. Criar barra grande de XP + botão "Ver progresso" que ancora para HUD expandida.
3. Inserir cards de ações rápidas (Missões, Estudos, Conquistas) com ícones e indicadores.
4. Implementar widget de alerta quando alguma Obra da Carne ≥50, mostrando CTA para "Confessar/Arrepender".
5. Garantir layout responsivo (grid mobile/desktop) e acessível.
Critérios: Nenhum dado estático; tudo vem do JSON. Explique como atualizar quando backend existir.
```

### Prompt 5 – Tela Missões
**Objetivo:** Criar lista de missões com filtros e modal de detalhes.  
**Entradas obrigatórias:** `docs/tela_missoes.md`, `dados/missoes.json`, `dados/acoes.json`.  
**Entrega esperada:** Filtros (ativas, concluídas, falhadas), cards com status, botão ação, modal com descrição completa.  

**Prompt sugerido:**
```
Implemente a tela de Missões seguindo docs/tela_missoes.md.
Tarefas:
1. Carregar dados/missoes.json e exibir em cards com título, tipo, dificuldade, recompensas, ícones de buff/cura.
2. Criar filtros (Ativas, Concluídas, Falhadas) com Alpine e transições suaves.
3. Indicar bloqueios por status negativo (overlay + cadeado + tooltip) usando regras de docs/regras_status.md.
4. Adicionar modal acessível com detalhes, recompensas, evidências e botão (Iniciar/Concluir).
5. Integrar banner motivacional do Espírito Santo quando aplicável.
Critérios: Layout mobile-first, sem repetir código, e listagem reativa a filtros. Documentar estados vazios.
```

### Prompt 6 – Tela Estudos & Trilha de Capítulos
**Objetivo:** Construir experiência estilo Duolingo com seleção de testamento/livro e roadmap de capítulos.  
**Entradas obrigatórias:** `docs/tela_estudos.md`, `docs/tela_trilha_capitulos.md`, `dados/estudos.json`.  
**Entrega esperada:** Seleção de testamento, grid de livros, trilha animada de capítulos, ciclo de aprendizagem com etapas.  

**Prompt sugerido:**
```
Implemente as telas Estudos e Trilha de Capítulos. Leia docs/tela_estudos.md e docs/tela_trilha_capitulos.md.
Tarefas:
1. Criar seleção de Antigo/Novo Testamento com progressos agregados.
2. Exibir grid de livros com percentuais e badges de bloqueio/desbloqueio.
3. Implementar trilha visual (vertical no mobile, horizontal no desktop) representando capítulos: concluído, atual, bloqueado.
4. Construir painel “Ciclo de Aprendizado” com 4 etapas, mostrando status e CTA para iniciar quizzes/leitura.
5. Adicionar tooltips para bloqueios por status negativo e botões de TTS.
Critérios: Usar dados reais de estudos.json, animações leves, componentes reutilizáveis. Detalhar como trocar de livro/capítulo.
```

### Prompt 7 – Telas Inventário e Loja
**Objetivo:** Implementar UI de inventário (filtros, grid/lista, ações) e loja (catálogo, filtros, modais).  
**Entradas obrigatórias:** `docs/tela_inventario.md`, `docs/tela_loja.md`, `dados/itens.json`, `dados/loja.json`, `dados/transacoes_loja.json`.  
**Entrega esperada:** Inventário com tabs (Permanente/Consumível/Armadura), botão Usar/Equipar, loja com filtros e modal de compra.  

**Prompt sugerido:**
```
Implemente as telas Inventário e Loja.
Tarefas:
1. Montar filtros (segundo especificação) para ambos os módulos, mantendo estado no URL hash.
2. Inventário: mostrar quantidade, status (equipado/bloqueado), ações (Usar, Equipar, Detalhes) com menus contextuais acessíveis.
3. Loja: grid responsivo com imagem, preço, badges de buff/debuff e bloqueios por status.
4. Criar modal de detalhes com descrição, requisitos, efeitos e CTA “Comprar”.
5. Exibir histórico de transações recentes (mock de transacoes_loja.json) no rodapé da loja.
Critérios: Componentização, responsividade, uso consistente de tokens de cor. Explicar próxima etapa (integração real).
```

### Prompt 8 – Telas Perfil e Configurações
**Objetivo:** Montar telas de perfil completo e configurações com controles de acessibilidade.  
**Entradas obrigatórias:** `docs/tela_perfil.md`, `docs/tela_configuracoes.md`, `docs/tela_sobre.md`, `dados/usuarios.json`, `dados/status_player_base.json`, `dados/config_global.json`.  
**Entrega esperada:** Perfil com avatar editável, estatísticas, histórico; Configurações com seções (notificações, privacidade, idioma, tema, acessibilidade, sobre).  

**Prompt sugerido:**
```
Construa as telas Perfil e Configurações.
Tarefas:
1. Perfil: avatar grande com botão para editar (abre modal), informações pessoais, estatísticas, badges e timeline de alterações.
2. Adicionar seções para preferências, bloqueios ativos (overlay + tooltip) e botão rápido de confissão.
3. Configurações: criar formulário dividido em blocos (Notificações, Privacidade, Idioma, Tema, Acessibilidade, Sobre).
4. Implementar toggles reais (ligam/desligam estados no Alpine store) para TTS, alto contraste, tamanho de fonte, Libras.
5. Incluir seção “Sobre” com versão (config_global.json) e links para termos/políticas.
Critérios: Navegação por teclado, labels ARIA, persistência temporária das preferências (localStorage). Explicar próximos passos para salvar remotamente.
```

### Prompt 9 – Telas Ranking e Conquistas
**Objetivo:** Criar leaderboard completo e grid de conquistas com modal.  
**Entradas obrigatórias:** `docs/tela_ranking.md`, `docs/tela_conquistas.md`, `dados/ranking.json`, `dados/conquistas.json`.  
**Entrega esperada:** Ranking com filtros (semanal/mensal, liga), destaque promoções/rebaixamentos, conquistas com grid responsivo e detalhes.  

**Prompt sugerido:**
```
Implemente Ranking e Conquistas.
Tarefas:
1. Ranking: exibir tabela com posição, avatar, nome, score, badges (promoção, manutenção, rebaixamento).
2. Adicionar filtros por liga/nível, tabs semanal vs mensal, e placeholder para bloqueio (ciúmes ≥75).
3. Conquistas: grid com estados desbloqueado/bloqueado, imagens, tooltip com pré-requisitos.
4. Modal de conquista com descrição, requisitos, recompensas e progresso atual.
5. Incluir CTA “Ver ranking completo” e “Ver detalhes” conectando as telas.
Critérios: Dados reais dos JSONs, animações leves, mensagens para estados vazios. Documentar possíveis integrações futuras.
```

### Prompt 10 – Tela Login/Registro e Tutorial Interativo
**Objetivo:** Construir onboarding (splash, login/registro, modo demo, tutorial em 7 passos).  
**Entradas obrigatórias:** `docs/tela_login.md`, `docs/tutorial_primeiro_acesso.md`, `docs/splashscreen.md`.  
**Entrega esperada:** Splash animado, formulário de login/registro com validações básicas, opção “Explorar” (modo demo), carousel tutorial.  

**Prompt sugerido:**
```
Implemente o fluxo de onboarding do Bíblia GamePray.
Tarefas:
1. Criar splash screen animada com logo + carregamento (3 segundos) antes de mostrar login.
2. Tela de login/registro com tabs (Entrar/Criar Conta), validações client-side, botões sociais e CTA “Explorar sem cadastro”.
3. Ao primeiro acesso, abrir tutorial de 7 passos (conforme docs) com barra de progresso, botões Próximo/Voltar/Pular e persistência (localStorage).
4. Integrar tutorial à tela Configurações (“Ver tutorial novamente”).
5. Garantir acessibilidade (foco, aria-live, labels). 
Critérios: Layout responsivo, feedback visual/textual, fluxo demo leva usuário direto para tela Início com dados mock. Documente como integrar autenticação real depois.
```

---

## Fase 2 – Consumo de Dados / Camada de API

### Prompt 11 – Serviço de Dados e Cache
**Objetivo:** Centralizar carregamento dos JSONs simulando API, com cache e fallback offline.  
**Entradas obrigatórias:** Todos arquivos em `/dados`, `docs/TECNOLOGIAS.md`.  
**Entrega esperada:** `js/services/dataStore.js` com métodos getUserStatus, getMissions, getEstudos etc., cache em IndexedDB ou localStorage, eventos para atualização.  

**Prompt sugerido:**
```
Implemente um serviço de dados único.
Tarefas:
1. Criar js/services/dataStore.js exportando funções assíncronas para cada entidade (usuarios, status, missoes, estudos, itens, conquistas, ranking, notificacoes, loja, transacoes).
2. Usar fetch para ler os JSONs locais; encapsular em cache (IndexedDB preferencial, fallback localStorage) com TTL configurável (config_global.json).
3. Expor mecanismo simples de pub/sub (EventTarget) para notificar telas quando dados forem atualizados.
4. Prever futuro backend: incluir baseURL e função loadFromAPI com fallback local.
5. Atualizar módulos existentes para consumir o serviço (sem fetch direto nos componentes).
Critérios: Código modular, tratativa de erros, logs amigáveis, instruções de teste.
```

### Prompt 12 – Bindings HUD + Tela Início
**Objetivo:** Conectar HUD e Tela Início ao dataStore, incluindo atualizações em tempo real simuladas.  
**Entradas obrigatórias:** `docs/tela_hud.md`, `docs/tela_inicio.md`, `dados/status_player_base.json`, `dados/notificacoes.json`.  
**Entrega esperada:** HUD e Início reagindo a mudanças (ex: botão “Recarregar dados”), notificações/resumos.  

**Prompt sugerido:**
```
Integre HUD e Tela Início ao dataStore.
Tarefas:
1. Utilizar dataStore.getStatus e getNotificacoes para hidratar o HUD.
2. Implementar botão/ação “Sincronizar” que aciona refetch e atualiza componentes via eventos.
3. Adicionar feed compacto de notificações na tela Início (tops 3 mensagens).
4. Simular updates periódicos (setInterval) para demonstrar reatividade (ex: variar XP).
5. Garantir que HUD e Início compartilhem a mesma fonte (sem duplicar estado).
Critérios: Sem race conditions, loading skeletons, mensagens de erro amigáveis.
```

### Prompt 13 – Fluxo de Missões com Estados
**Objetivo:** Conectar lista de missões ao dataStore, gerenciar estados (pendente, em andamento etc.) no front.  
**Entradas obrigatórias:** `docs/tela_missoes.md`, `dados/missoes.json`, `dados/acoes.json`.  
**Entrega esperada:** Ações (Iniciar, Concluir, Cancelar) atualizando estado local + histórico exibido.  

**Prompt sugerido:**
```
Implemente a camada de dados das Missões.
Tarefas:
1. Adicionar no dataStore métodos para atualizar status local de missões (com persistência em IndexedDB).
2. Atualizar UI para refletir mudanças imediatamente, com badges “Aguardando verificação”, “Expirada” etc.
3. Registrar histórico das ações do usuário (timestamp + ação) e exibir linha do tempo na modal.
4. Mockar chamada para evidências (upload textual/imagem) usando FileReader e armazenar base64 em cache local.
5. Expor ponto único para futura sincronização com backend.
Critérios: Tratamento de erros, rollback em falhas e logs no console.
```

### Prompt 14 – Estudos e Ciclo de Aprendizagem
**Objetivo:** Integrar dados de estudos, progresso e quizzes ao front.  
**Entradas obrigatórias:** `docs/tela_estudos.md`, `docs/tela_trilha_capitulos.md`, `dados/estudos.json`.  
**Entrega esperada:** Progresso salvo localmente, notas por ciclo, bloqueio/desbloqueio automático.  

**Prompt sugerido:**
```
Conecte Estudos/Trilha aos dados.
Tarefas:
1. dataStore: métodos para getEstudosPorLivro, salvar progresso de ciclos, calcular nota final.
2. UI: atualizar trilha e ciclo em tempo real após o usuário completar um passo (mock).
3. Implementar quizzes simplificados (3 perguntas) com validação e armazenamento da nota.
4. Aplicar lógica de desbloqueio (nota ≥75 libera próximo capítulo).
5. Persistir progresso por usuário e sincronizar com HUD (XP, Espírito Santo).
Critérios: Estados claros, salvamento confiável, modo offline funcionando.
```

### Prompt 15 – Inventário, Loja e Transações
**Objetivo:** Ligar inventário e loja ao dataStore, registrando compras/usos.  
**Entradas obrigatórias:** `docs/tela_inventario.md`, `docs/tela_loja.md`, `dados/itens.json`, `dados/loja.json`, `dados/transacoes_loja.json`.  
**Entrega esperada:** Operações de compra, uso e equipar com atualização instantânea do HUD.  

**Prompt sugerido:**
```
Implemente a lógica de dados para Inventário e Loja.
Tarefas:
1. Criar métodos dataStore.purchaseItem, useConsumable, equipItem, unequipItem, com validações (saldo, stack, cooldown).
2. Atualizar UI para refletir mudanças e mostrar toasts de sucesso/erro.
3. Registrar transações em transacoes_loja.json (mock local) e exibir na tela.
4. Ajustar HUD para exibir itens equipados após alteração.
5. Preparar ganchos para backend (expor payloads prontos para POST).
Critérios: Regras de negócio respeitadas, mensagens claras, fácil migração para API real.
```

### Prompt 16 – Ranking, Conquistas e Notificações
**Objetivo:** Sincronizar dados de ranking/conquistas, gerar notificações e vínculos com bloqueios de status.  
**Entradas obrigatórias:** `docs/tela_ranking.md`, `docs/tela_conquistas.md`, `dados/ranking.json`, `dados/conquistas.json`, `dados/notificacoes.json`.  
**Entrega esperada:** Ranking reativo, conquistas desbloqueadas automaticamente, notificações coerentes.  

**Prompt sugerido:**
```
Finalize integrações de Ranking e Conquistas.
Tarefas:
1. dataStore: métodos para getRanking(liga, período) e atualizar posições.
2. Conectar conquistas aos eventos do app (ex: completar missão → desbloquear conquista).
3. Gerar notificações correspondentes usando dados/notificacoes.json como template.
4. Aplicar bloqueios dinâmicos (ex: ciúmes ≥75 esconde ranking).
5. Preparar hooks para sincronização futura (payloads de promoções/rebaixamentos).
Critérios: Atualizações em cadeia funcionando, logs claros, UI responsiva.
```

---

## Fase 3 – Lógica de Jogo e Integrações

### Prompt 17 – XP, Níveis, Ligas e Streaks
**Objetivo:** Implementar fórmulas de XP, progressão de níveis e streaks diários com bônus.  
**Entradas obrigatórias:** `PROMPT_DESENVOLVIMENTO_COMPLETO.md`, `docs/regras_status.md`, `dados/status_player_base.json`, `dados/config_global.json`, `dados/ranking.json`.  
**Entrega esperada:** Módulo `js/gameplay/xpEngine.js` com cálculos, atualização da HUD e ranking.  

**Prompt sugerido:**
```
Implemente a engine de XP/níveis/streaks.
Tarefas:
1. Criar módulo xpEngine com funções para calcular XP necessário (baseXP + multiplier), aplicar bônus de streak (+5% diário até 50%).
2. Atualizar status do usuário ao completar missões/estudos, emitindo eventos para HUD e ranking.
3. Implementar rotina semanal simulada que promove/rebaixa usuários com base na posição (dados/ranking.json).
4. Exibir avisos quando usuário estiver perto de subir/baixar de liga.
5. Persistir streak (data da última atividade) e resetar quando quebrada.
Critérios: Fórmulas documentadas em comentários, testes manuais descritos.
```

### Prompt 18 – Sistema de Atributos e Bloqueios
**Objetivo:** Aplicar regras de Frutos do Espírito e Obras da Carne, habilitando/desabilitando funcionalidades.  
**Entradas obrigatórias:** `docs/regras_status.md`, `docs/tela_hud.md`, `docs/tela_missoes.md`, `docs/tela_loja.md`.  
**Entrega esperada:** `js/gameplay/atributosEngine.js` controlando faixas (0-24, 25-49, 50-74, 75-100) e bloqueios automáticos.  

**Prompt sugerido:**
```
Construa a engine de atributos/frutos/obras.
Tarefas:
1. Criar módulo atributosEngine com funções para atualizar valores positivos/negativos conforme ações do usuário.
2. Implementar efeitos visuais no HUD e nas telas impactadas (ex: overlay + tooltip nos componentes bloqueados).
3. Adicionar CTA de confissão/arrependimento que reduz obras negativas segundo regras do doc.
4. Registrar histórico (timestamp + ação) em IndexedDB e exibir na tela Perfil.
5. Integrar com notificações (quando faixa muda, disparar alerta).
Critérios: Código claro, sem duplicação, fácil ajuste futuro.
```

### Prompt 19 – Espírito Santo, Corações e Alertas
**Objetivo:** Programar mecânica de depleção/restauração do Espírito Santo e regeneração de corações.  
**Entradas obrigatórias:** `docs/regras_status.md`, `docs/tela_hud.md`, `dados/status_player_base.json`, `dados/config_global.json`, `assets/sounds`.  
**Entrega esperada:** Timers que reduzem espírito, notificações em thresholds, regeneração de corações, sons configuráveis.  

**Prompt sugerido:**
```
Implemente a mecânica do Espírito Santo e corações.
Tarefas:
1. Criar módulo spiritEngine responsável por reduzir 1 ponto/hora e respeitar limites (50% batizado, 15% não batizado).
2. Configurar notificações (visual + sonora) para cada queda de 15% usando assets/sounds.
3. Implementar regeneração automática de corações com base em heartsRegenMinutes e travas (max heartsMax).
4. Adicionar bloqueio de quizzes quando sem corações e CTA para consumir itens.
5. Garantir persistência ao recarregar a página (salvar timestamps).
Critérios: Timers resilientes, uso de requestAnimationFrame/setInterval controlado, instruções de teste.
```

### Prompt 20 – Workflow de Missões e Estudos (Estados e Evidências)
**Objetivo:** Consolidar lógica de estados complexos, validação de evidências e penalidades.  
**Entradas obrigatórias:** `docs/tela_missoes.md`, `docs/tela_estudos.md`, `docs/BIBLIA_GAMEPRAY_SPEC.md`.  
**Entrega esperada:** State machine em `js/gameplay/workflowEngine.js` controlando transições e penalidades.  

**Prompt sugerido:**
```
Implemente workflow avançado para Missões e Estudos.
Tarefas:
1. Criar state machine declarativa (pendente → em_andamento → aguardando_verificacao → concluida | expirada | cancelada) com guard clauses.
2. Validar evidências (texto/imagem/áudio) antes de permitir conclusão; armazenar metadados localmente.
3. Aplicar penalidades configuráveis ao expirar/cancelar (perda de XP/moedas, aumento de Obras da Carne).
4. Integrar com xpEngine e atributosEngine para recompensas/penalidades.
5. Expor logs para auditoria (download JSON pela UI).
Critérios: Fácil extensão futura, testes manuais descritos.
```

### Prompt 21 – Integrações (TTS, Avatares, Email, Notificações Push)
**Objetivo:** Implementar integrações mencionadas (mock/local).  
**Entradas obrigatórias:** `docs/TECNOLOGIAS.md`, `docs/tela_estudos.md`, `docs/tela_perfil.md`, `docs/tela_configuracoes.md`.  
**Entrega esperada:** TTS nas leituras, geração de avatares (DiceBear), stub para EmailJS, fluxo de inscrição Web Push.  

**Prompt sugerido:**
```
Implemente integrações auxiliares.
Tarefas:
1. TTS: controles (play/pause, velocidade, voz) na tela Estudos usando Web Speech API; respeitar preferências em Configurações.
2. Avatares: gerar imagens usando DiceBear/Avataaars a partir de seeds em dados/avatar-configs.json; permitir atualizar seed.
3. EmailJS: criar módulo de serviço com placeholders de ID/chave (sem expor secrets) e formulário de contato em Configurações.
4. Web Push: implementar fluxo de inscrição (PushManager) e UI para ativar/desativar notificações; salvar subscription no localStorage (mock).
5. Documentar passos para conectar backend real.
Critérios: Tratamento de permissões, fallbacks, nada de secrets hardcoded.
```

### Prompt 22 – PWA Completo, Offline e Tutorial Final
**Objetivo:** Finalizar service worker, cache strategies e revisar tutorial/onboarding + testes E2E manuais.  
**Entradas obrigatórias:** `docs/splashscreen.md`, `docs/tutorial_primeiro_acesso.md`, `PROMPT_DESENVOLVIMENTO_COMPLETO.md`.  
**Entrega esperada:** Service worker com estratégias (cache-first, network-first), suporte offline, atualização automática, checklist final de QA.  

**Prompt sugerido:**
```
Finalize o PWA e revise o onboarding.
Tarefas:
1. Atualizar service-worker.js com workbox-like manual: cache-first para assets/JSONs, network-first para APIs futuras, fallback offline para telas críticas.
2. Implementar fluxo de atualização (mensagem “Nova versão disponível” + botão “Atualizar”).
3. Garantir que tutorial, login e modo demo funcionem offline após primeiro acesso.
4. Criar checklist de QA (acessibilidade, responsividade, performance) e registrar em docs/NOTAS_TECNICAS_APLICADAS.md.
5. Fornecer instruções claras de build/deploy (ex: usar `npx serve` ou `vite preview` se adotado).
Critérios: Testes descritos, logs limpos, documentação atualizada com data.
```

---

Utilize estes prompts como roteiro. Ao concluir cada etapa, atualize a documentação (`docs/notas.md`) com o status para manter rastreabilidade. Boa construção! 💛

