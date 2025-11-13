# Tela Início

## Estrutura Geral
- **Fundo:** Cor sólida (ex: branco ou tema escuro), preenchendo toda a tela.
- **Header:** Fixo no topo, título “Início”, botão de perfil à direita.
- **Espaçamento:** Margens laterais de 16-20px, espaçamento vertical generoso entre cards/blocos.

## Perfil e Progresso
- **Avatar grande** (64-80px), centralizado no topo
- **Nome do usuário:** Fonte grande, bold, centralizado
- **Nível e moedas:** Badges coloridos ao lado do nome
- **Barra de XP:** Horizontal, logo abaixo do nome
- **Pontos positivos/negativos:** Linha de ícones grandes, valores destacados

## Estatísticas Rápidas
- Cards/blocos para:
  - Missões completas
  - Dias consecutivos
  - Conquistas desbloqueadas
- Cada card/bloco: ícone grande, valor, label
- Cards com sombra/borda, espaçamento entre eles

## Atalhos
- Botões grandes, cor de destaque, ícone + texto
- Atalhos para Missões, Estudos, Conquistas
- Feedback visual ao tocar (leve aumento de escala, cor de fundo)

## Microinterações e Acessibilidade
- Animação suave ao atualizar barra de XP
- Feedback tátil e visual ao tocar
- Texto alternativo para ícones
- Contraste alto

## Exemplo de Hierarquia Visual

```
--------------------------------------
|        Início        | [Perfil]    |
--------------------------------------
|     [Avatar]                     |
| Nome do usuário [Nível] [Moedas] |
| [Barra de XP]                    |
| [Pontos + / -]                   |
--------------------------------------
| [Card] Missões completas         |
| [Card] Dias consecutivos         |
| [Card] Conquistas desbloqueadas  |
--------------------------------------
| [Atalho] Missões [Atalho] Estudos|
| [Atalho] Conquistas              |
--------------------------------------
```