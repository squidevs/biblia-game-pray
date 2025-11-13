# Tela Conquistas

## Estrutura Geral
- **Fundo:** Cor sólida (ex: branco ou tema escuro), preenchendo toda a tela.
- **Header:** Fixo no topo, com título “Conquistas”, botão de voltar (seta à esquerda) e, se necessário, ícone de filtro à direita.
- **Espaçamento:** Margens laterais de 16-20px, espaçamento vertical generoso entre cards e seções.

## Filtros e Navegação
- **Barra de Filtros:** Logo abaixo do header, horizontal, com botões para filtrar conquistas por status (Todas, Desbloqueadas, Em Progresso, Ocultas).
  - Botão ativo destacado (cor de fundo, sublinhado ou bold).
  - Microanimação de transição ao trocar de filtro.

## Lista de Conquistas
- **Scroll vertical, lista de cards.**
- Cada card de conquista contém:
  - **Container:** Borda arredondada, sombra leve, fundo branco/cinza (ou tema escuro).
  - **Ícone da conquista:** À esquerda, circular, 48-64px, colorido. Se bloqueada, ícone cinza ou com cadeado sobreposto.
  - **Informações principais (ao lado do ícone):**
    - **Nome da conquista:** Fonte grande, bold, cor de destaque.
    - **Descrição curta:** Fonte menor, cor secundária, até 2 linhas.
    - **Barra de progresso:** Se for conquista progressiva, barra horizontal logo abaixo da descrição, cor vibrante, valor percentual à direita.
    - **Status:** Badge pequeno (ex: “Desbloqueada”, “Em progresso”, “Oculta”), cor diferente para cada status.
    - **Recompensa:** Ícone (ex: moeda, troféu, item) + valor, alinhado à direita do card.
  - **Feedback visual:** Ao desbloquear, card faz animação de “pulse” ou brilho, badge muda de cor, ícone ganha cor viva.
  - **Interação:** Ao tocar no card, abre modal ou bottom sheet com detalhes completos.

## Modal/Bottom Sheet de Detalhes
- **Fundo escurecido, modal centralizado ou bottom sheet ocupando 70% da altura.**
- **Conteúdo:**
  - Ícone grande da conquista, nome, descrição longa.
  - Data de desbloqueio (se aplicável).
  - Progresso detalhado (ex: “Faltam 2 missões para desbloquear”).
  - Recompensa detalhada, botão para “Coletar” se aplicável.
  - Botão de fechar (X) no topo direito.

## Estados Visuais
- **Desbloqueada:** Ícone colorido, badge verde, card com sombra mais forte.
- **Em Progresso:** Ícone parcialmente colorido, badge amarelo, barra de progresso visível.
- **Oculta:** Ícone cinza ou com interrogação, badge cinza, descrição oculta ou “???”.

## Microinterações e Acessibilidade
- **Toque:** Feedback tátil e visual (leve aumento de escala no card).
- **Desbloqueio:** Animação de confete ou brilho no card.
- **Barra de progresso:** Animação suave ao atualizar.
- **Acessibilidade:** Texto alternativo para ícones, contraste alto, navegação por teclado e leitor de tela.

## Exemplo de Hierarquia Visual

```
-------------------------------------------------
| < Voltar |        Conquistas         | [Filtro]|
-------------------------------------------------
| [Todas] [Desbloqueadas] [Em Progresso] [Ocultas]
-------------------------------------------------
| [Ícone] Nome da conquista         [Recompensa] |
|         Descrição curta                        |
|         [Barra de progresso] [Status]          |
-------------------------------------------------
| ... outros cards ...                           |
```