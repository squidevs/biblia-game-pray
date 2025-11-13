# Tela Estudos (Estilo Duolingo)

## 1. Seleção de Testamento
- Dois cards grandes: [Antigo Testamento] e [Novo Testamento]
- Ícones ilustrativos, cores distintas, nome em destaque
- Ao tocar, avança para seleção de livro

## 2. Seleção de Livro
- Grid ou lista vertical de livros do testamento escolhido
- Cada livro: card com nome, ícone/ilustração, barra de progresso (percentual de capítulos concluídos)
- Livros bloqueados aparecem esmaecidos

## 3. Trilha de Capítulos (Roadmap)
- Trilha visual (horizontal ou vertical) com todos os capítulos como “bolhas” conectadas
- Capítulos concluídos: bolha colorida, com check ou estrela
- Capítulo atual: bolha destacada, animada
- Capítulos futuros: bolha cinza/bloqueada
- Ao tocar em um capítulo desbloqueado, inicia o ciclo de aprendizado

## 4. Ciclo de Aprendizado do Capítulo
Cada capítulo é dividido em 4 ciclos, apresentados em sequência:

### Ciclo 1: Leitura Inicial
- Exibe os versículos do capítulo, um por vez ou em blocos
- Barra de progresso no topo, preenchendo conforme o usuário avança
- Botão “Próximo” para avançar

### Ciclo 2: Leitura + Quiz da Leitura Anterior
- Nova leitura de parte do capítulo
- Mini-quiz (2-3 perguntas) sobre o que foi lido no ciclo anterior
- Feedback imediato: acerto/erro, explicação curta

### Ciclo 3: Leitura + Quiz da Leitura Anterior
- Repete o padrão: leitura de mais versículos
- Mini-quiz sobre o trecho anterior
- Barra de progresso sempre visível

### Ciclo 4: Quiz Final do Capítulo
- Quiz completo sobre todo o capítulo (5-10 perguntas)
- Barra de progresso do quiz
- Feedback ao final: nota em %, estrelas, mensagem motivacional

## 5. Desbloqueio de Capítulo
- Se nota final ≥ 75%: mensagem de parabéns, animação de desbloqueio, próximo capítulo liberado
- Se nota < 75%: mensagem de incentivo, opção de refazer o quiz

## Microinterações e Gamificação
- Animações ao desbloquear capítulos (confete, brilho)
- Estrelas ou medalhas por desempenho
- Feedback visual/tátil ao responder quiz
- Progresso global do livro/testamento sempre visível

## Exemplo de Hierarquia Visual

```
-------------------------------------------------
| [Antigo Testamento]   [Novo Testamento]       |
-------------------------------------------------
| [Livro 1] [Livro 2] [Livro 3] ...             |
| [Barra de progresso de cada livro]            |
-------------------------------------------------
| [Trilha de capítulos: O-O-O-O-O]              |
|   (bolhas conectadas, capítulo atual destacado)|
-------------------------------------------------
| [Ciclo 1: Leitura]                            |
| [Barra de progresso]                          |
| [Versículo atual]                             |
| [Botão Próximo]                               |
-------------------------------------------------
| [Ciclo 2: Leitura + Mini-Quiz]                |
| [Barra de progresso]                          |
| [Pergunta do quiz]                            |
| [Opções de resposta]                          |
-------------------------------------------------
| ...                                           |
-------------------------------------------------
| [Quiz Final]                                  |
| [Barra de progresso do quiz]                  |
| [Pergunta]                                    |
| [Opções]                                      |
-------------------------------------------------
| [Resultado: % de acertos, estrelas]           |
| [Mensagem: Parabéns! Próximo capítulo liberado]|
-------------------------------------------------
```