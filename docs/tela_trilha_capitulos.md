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
|      [★]       imagem de referencia  |
|       |        como adão e eva       |
|     [1] (Leitura) desbloqueado       |
|       |                              |
|     [2] (Exercicio) bloqueado        |
|       |                              |
|     [3] (avaliação)    imagem da arca|
|       |                de noé        |
|    [Baú] (recompensas)               |
|       | proximos                     |
--------------------------------------
| [NavBar]                             |
--------------------------------------
```
## Exemplo de leitura

```
--------------------------------------
| < Voltar |  [1] Gn1:1-5 ♪ouvir ◀︎⏯︎⏹︎▶︎ | (modo ouvir estiver ativado, vai rolando a tela conforme vai lendo e a % tambem vai enchendo.)
--------------------------------------
|  (||2%                             )  |
--------------------------------------
| ✓1.Versiculo...................... |▲||
| 2.Versiculo...................... |▪︎||
| 3.Versiculo...................... | || (ao rolar a pagina a barra de progresso vai enchendo.)
| n.Versiculo...................... |▼||
|--------------------------------------
|              Proxima                 |
---------------------------------------
| [NavBar]                             |
--------------------------------------
```

## Exemplo de Exercicio

```
--------------------------------------
| < Voltar |  [1] Gn1:1-5             | 
--------------------------------------
| Exercicios de fixação          1/3  |
--------------------------------------
| Pergunta 1                           |
| A.Resposta......................     |
| B.Resposta......................     |
| C.Resposta......................     |
| C.Resposta......................     |
|--------------------------------------
|              Proxima                 |
---------------------------------------
| [NavBar]                             |
---------------------------------------

## Exemplo de Avaliação

```
--------------------------------------
| < Voltar |  [1] Gn1                 | 
--------------------------------------
| Exercicios de fixação          1/10  |
--------------------------------------
| Pergunta 1                           |
| A.Resposta......................     |
| B.Resposta......................     |
| C.Resposta......................     |
| C.Resposta......................     |
|--------------------------------------
|              Proxima                 |
---------------------------------------
| [NavBar]                             |
---------------------------------------