# Tutorial Interativo – Primeiro Acesso

## Objetivo
Guiar o usuário, passo a passo, pelas principais telas e mecânicas do Bíblia GamePray, explicando como jogar e aproveitar o app.

## Estrutura do Tutorial
- **Exibição automática no primeiro acesso.**
- **Disponível para reexibição em Configurações (opção “Ver Tutorial”).**
- **Navegação por páginas:**
  - Cada página destaca uma tela ou função principal, com explicação clara e visual.
  - Botões “Próximo”, “Voltar” e “Pular tutorial”.
  - Indicador de progresso (ex: 1/7).

## Páginas Sugeridas
1. **Bem-vindo!**
   - Apresentação do app, logotipo, slogan.
   - Breve mensagem motivacional.
   - **Wireframe:**
   ```
   ┌─────────────────────────────┐
   │ [Barra de Progresso 1/7]   │
   │        [Logotipo]          │
   │  Bíblia GamePray           │
   │  Jogando e Crescendo no Espírito │
   │  Bem-vindo ao app!         │
   │  [Botão Próximo]           │
   └─────────────────────────────┘
   ```
2. **HUD e Status Espiritual**
   - Explicação dos atributos, faixas, buffs/debuffs, barra do Espírito Santo.
   - Dicas sobre como evoluir e evitar bloqueios.
   - **Wireframe:**
   ```
   ┌─────────────────────────────┐
   │ [Barra de Progresso 2/7]   │
   │ [Barra Espírito Santo 100%] │
   │ [Atributos + / -]           │
   │ [Faixas coloridas]          │
   │ [Tooltip explicativo]       │
   │ [Botão Próximo]             │
   └─────────────────────────────┘
   ```
3. **Inventário**
   - Como visualizar, filtrar e usar itens.
   - Bloqueio/desbloqueio de itens conforme status.
   - **Wireframe:**
   ```
   ┌─────────────────────────────┐
   │ [Barra de Progresso 3/7]   │
   │ [Filtro: Permanente | Consumível] │
   │ [Grid/List] [Imagem] Nome [Qtd]  │
   │ [Ícone de cadeado nos itens bloqueados] │
   │ [Botão Próximo]             │
   └─────────────────────────────┘
   ```
4. **Missões e Estudos**
   - Como iniciar missões, estudar capítulos, ganhar recompensas.
   - Dicas para manter a sequência e desbloquear conteúdo.
   - **Wireframe:**
   ```
   ┌─────────────────────────────┐
   │ [Barra de Progresso 4/7]   │
   │ [Card] Missão ativa        │
   │ [Card] Estudo disponível   │
   │ [Barra de progresso]       │
   │ [Botão Próximo]            │
   └─────────────────────────────┘
   ```
5. **Ranking e Conquistas**
   - Como funciona o ranking, conquistas e recompensas.
   - Interações sociais e motivacionais.
   - **Wireframe:**
   ```
   ┌─────────────────────────────┐
   │ [Barra de Progresso 5/7]   │
   │ [Lista de jogadores]        │
   │ [Posição, avatar, pontuação]│
   │ [Card de conquista]         │
   │ [Ícone de buff/cura]        │
   │ [Botão Próximo]             │
   └─────────────────────────────┘
   ```
6. **Loja e Economia**
   - Como comprar itens, pacotes, usar moedas.
   - Regras de bloqueio/desbloqueio e ofertas especiais.
   - **Wireframe:**
   ```
   ┌─────────────────────────────┐
   │ [Barra de Progresso 6/7]   │
   │ [Filtro: Itens | Pacotes]   │
   │ [Grid/List] [Imagem] Nome [Preço] │
   │ [Ícone de cadeado nos itens bloqueados] │
   │ [Botão Próximo]             │
   └─────────────────────────────┘
   ```
7. **Configurações e Recuperação**
   - Como acessar configurações, ver o tutorial novamente, ajustar acessibilidade.
   - Atalhos para confissão/arrependimento e recuperação de status.
   - **Wireframe:**
   ```
   ┌─────────────────────────────┐
   │ [Barra de Progresso 7/7]   │
   │ [Lista de opções]           │
   │ [Opção: Ver Tutorial]       │
   │ [Opção: Acessibilidade]     │
   │ [Botão Confissão/Arrependimento] │
   │ [Botão Finalizar]           │
   └─────────────────────────────┘
   ```

## Barra de Progresso
- **Barra horizontal no topo ou base do tutorial.**
- A barra se enche proporcionalmente conforme o usuário avança pelas etapas (ex: 1/7, 2/7, ...).
- Animação suave ao preencher cada segmento.
- Cor de destaque (ex: azul, dourado, verde) para indicar progresso.
- Pode exibir o número da etapa atual e total (ex: “Etapa 3 de 7”).
- Acessível por leitor de tela e com contraste alto.

## Microinterações e Acessibilidade
- Animações suaves ao trocar de página (ex: fade, slide, zoom).
- Tooltips e textos alternativos em todos os ícones e botões.
- Navegação por teclado, swipe e leitor de tela.
- Opção de pular tutorial a qualquer momento.
- Indicador de progresso visual (ex: bolinhas ou barra).

## Observações Técnicas
- Tutorial exibido automaticamente apenas no primeiro acesso (flag salva em local storage ou backend).
- Opção “Ver Tutorial” disponível em Configurações.
- Cada página pode ser implementada como modal, carrossel ou navegação dedicada.
- Conteúdo adaptável conforme atualizações do app.
