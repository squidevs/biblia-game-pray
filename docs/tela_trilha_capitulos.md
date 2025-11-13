# Tela Trilha de Capítulos (Estilo Duolingo)

## Estrutura Geral
- **Fundo:** Cor sólida (ex: branco ou tema escuro), preenchendo toda a tela.
- **Header:** Fixo no topo, título do livro selecionado, botão de voltar à esquerda.
- **Espaçamento:** Margens laterais de 16-20px, espaçamento vertical generoso.

## Trilha Visual de Capítulos
- **Trilha vertical centralizada** (pode ser horizontal em tablets):
  - Cada capítulo é representado por um círculo grande (40-56px), cor vibrante para desbloqueados, cinza para bloqueados.
  - Ícone ou número do capítulo centralizado no círculo.
  - Capítulos concluídos: círculo com estrela ou check, cor de destaque.
  - Capítulo atual: círculo animado (pulsando ou com borda brilhante).
  - Capítulos futuros: círculo cinza, bloqueado, com cadeado ou opacidade reduzida.
  - Conexão entre círculos por linhas curvas ou retas, formando uma trilha.
  - Elementos de gamificação: baús de recompensa, mascote, estrelas, etc. posicionados ao longo da trilha.

## Interações
- Ao tocar em um capítulo desbloqueado, inicia o ciclo de aprendizado.
- Capítulos bloqueados exibem tooltip explicando o requisito para desbloqueio.
- Animação ao desbloquear novo capítulo (confete, brilho, mascote comemorando).

## Barra Inferior
- Ícones de navegação para voltar ao livro, acessar perfil, loja, conquistas, etc.

## Microinterações e Acessibilidade
- Feedback visual/tátil ao tocar nos círculos.
- Animação suave ao rolar a trilha.
- Texto alternativo para ícones e mascote.
- Contraste alto.

## Exemplo de Hierarquia Visual

```
--------------------------------------
| < Voltar |  Gênesis                |
--------------------------------------
|                                      |
|      [★]                             |
|       |                              |
|     [1] (atual)                      |
|       |                              |
|     [2] (desbloqueado)               |
|       |                              |
|     [3] (bloqueado)                  |
|       |                              |
|    [Baú]                             |
|       |                              |
|   [Mascote]                          |
--------------------------------------
| [NavBar]                             |
--------------------------------------
```
