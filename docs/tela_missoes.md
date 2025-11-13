# Tela Missões

## Estrutura Geral
- **Fundo:** Cor sólida (ex: branco ou tema escuro), preenchendo toda a tela.
- **Header:** Fixo no topo, título “Missões”, botão de voltar à esquerda.
- **Espaçamento:** Margens laterais de 16-20px, espaçamento vertical generoso entre cards/blocos.

## Filtros
- Barra horizontal no topo, botões para filtrar por status (Ativas, Concluídas, Falhadas)
- Botão ativo destacado (cor de fundo, sublinhado ou bold)
- Microanimação ao trocar de filtro

## Lista de Missões
- Lista vertical de cards/blocos
- Cada card/bloco:
  - **Nome da missão:** Fonte média/grande, bold, cor de destaque
  - **Status:** Badge colorido (verde, amarelo, vermelho)
  - **Recompensa:** Ícone + valor, à direita
  - **Botão de ação:** Iniciar/Concluir, cor de destaque, ocupa toda a largura do card
  - Feedback visual ao tocar (leve aumento de escala, cor de fundo)
- Espaçamento generoso entre cards

## Modal de Detalhes
- Abre ao tocar em uma missão
- Mostra nome, descrição longa, status, recompensa, botão de ação
- Fecha ao tocar fora ou deslizar para baixo

## Microinterações e Acessibilidade
- Animação suave ao atualizar status
- Feedback tátil e visual ao tocar
- Texto alternativo para ícones
- Contraste alto

## Exemplo de Hierarquia Visual

```
--------------------------------------
| < Voltar |        Missões         |
--------------------------------------
| [Filtro: Ativas | Concluídas | Falhadas]
--------------------------------------
| [Card] Nome da missão [Recompensa] |
|        [Status] [Botão]            |
--------------------------------------
| ... outros cards ...               |
```