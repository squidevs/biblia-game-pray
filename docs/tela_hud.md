# HUD (Header Fixa)

## Estrutura Geral
- **Fundo:** Cor sólida (ex: branco ou tema escuro), preenchendo toda a largura do topo.
- **Altura:** 56-64px na versão resumida, dobra ao expandir.
- **Sombra:** Sutil abaixo do header para destacar.
- **Espaçamento:** Margens laterais de 12-16px, elementos bem distribuídos.

## Elementos
- **Logo do jogo:** À esquerda, 32x32px
- **Nome do usuário:** Centralizado, fonte média/grande, bold
- **Nível:** Badge colorido ao lado do nome
- **Moedas e XP:** À direita, ícones pequenos (16-20px) + valor
- **Pontos positivos/negativos:** Ícones circulares coloridos (verde/vermelho), valor ao lado
- **Slots de itens:** Pequenos círculos/quadrados, ícone do item dentro, agrupados por tipo (permanente, consumível, armadura)
- **Imagem de perfil:** Círculo à direita, 32-40px
- **Chevron (seta):** Ao lado do perfil, indica expansão

## Versão Expandida
- HUD dobra de altura
- Mostra barras de progresso, lista de pontos, slots maiores com nome do item, status detalhado
- Accordion fecha ao tocar novamente no chevron ou fora da área expandida

## Microinterações e Acessibilidade
- Feedback visual ao expandir/fechar (animação de altura)
- Ícones grandes, textos legíveis
- Sempre visível, nunca some da tela
- Contraste alto, navegação por teclado e leitor de tela

## Exemplo de Hierarquia Visual

```
-------------------------------------------------
| [Logo] Nome [Nível] [Moedas] [XP] [Slots] [Perfil] [˅] |
-------------------------------------------------
| (expandido)                                      |
| [Barra XP] [Pontos + / -] [Slots detalhados]     |
| [Status detalhado]                               |
-------------------------------------------------
```