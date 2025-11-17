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
    - Tooltip explicativo ao passar/tocar, mostrando se há bloqueio por status negativo alto (ex: “Missão bloqueada por inveja ≥ 75”)
  - **Recompensa:** Ícone + valor, à direita
    - Ícone especial se a missão ajuda a recuperar atributos positivos ou reduzir negativos (ex: “cura” ou “buff”)
  - **Botão de ação:** Iniciar/Concluir, cor de destaque, ocupa toda a largura do card
    - Se bloqueado por status negativo, botão desabilitado e tooltip explicativo
  - Feedback visual ao tocar (leve aumento de escala, cor de fundo)
- Espaçamento generoso entre cards

## Modal de Detalhes
- Abre ao tocar em uma missão
- Mostra nome, descrição longa, status, recompensa, botão de ação
- Se bloqueado por status negativo, exibe sugestão de ação rápida de confissão/arrependimento
- Fecha ao tocar fora ou deslizar para baixo

## Microinterações e Acessibilidade
- Animação suave ao atualizar status
- Feedback tátil e visual ao tocar
- Texto alternativo para ícones
- Contraste alto
- Banner ou pop-up motivacional do Espírito Santo sugerindo missão para restaurar atributo, se necessário

## Exemplo de Hierarquia Visual

```
--------------------------------------
| < Voltar |        Missões         |
--------------------------------------
| [Filtro: Ativas | Concluídas | Falhadas]
--------------------------------------
| [Card] Nome da missão [Recompensa] |
|        [Status] [Botão]            |
|        [Ícone de cura/buff]        |
--------------------------------------
| ... outros cards ...               |
| [Banner] Sugestão do Espírito Santo|
```