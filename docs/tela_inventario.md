# Tela Inventário

## Estrutura Geral
- **Fundo:** Cor sólida (ex: branco ou tema escuro), preenchendo toda a tela.
- **Header:** Fixo no topo, título “Inventário”, botão de voltar à esquerda.
- **Espaçamento:** Margens laterais de 16-20px, espaçamento vertical generoso entre cards/blocos.

## Filtros
- Barra horizontal no topo, botões para filtrar por tipo (Permanente, Consumível, Armadura)
- Botão ativo destacado (cor de fundo, sublinhado ou bold)
- Microanimação ao trocar de filtro

## Lista de Itens
- Grid (2-3 colunas) ou lista vertical
- Cada item:
  - **Imagem grande** (48-64px), centralizada
  - **Nome** abaixo da imagem, fonte média
  - **Quantidade:** Badge no canto da imagem
  - **Container:** Borda arredondada, sombra leve, fundo branco/cinza
  - Feedback visual ao tocar (leve aumento de escala, cor de fundo)
- Espaçamento generoso entre itens

## Modal de Detalhes
- Abre ao tocar em um item
- Fundo escurecido, modal centralizado
- Mostra imagem maior, nome, descrição, quantidade
- Botões grandes: Equipar, Usar, Descartar, Cancelar
- Fecha ao tocar fora ou no X

## Microinterações e Acessibilidade
- Animação suave ao abrir modal
- Feedback tátil e visual ao tocar
- Texto alternativo para imagens
- Contraste alto

## Exemplo de Hierarquia Visual

```
--------------------------------------
| < Voltar |      Inventário         |
--------------------------------------
| [Filtro: Permanente | Consumível | Armadura]
--------------------------------------
| [Grid/List] [Imagem] Nome [Qtd]    |
| ... outros itens ...               |
```