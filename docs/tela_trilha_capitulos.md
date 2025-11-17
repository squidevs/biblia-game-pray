# Tela Trilha de Capítulos (Estilo Duolingo)

## Estrutura Geral
- **Fundo:** Cor sólida (ex: branco ou tema escuro), preenchendo toda a tela.
- **Header:** Fixo no topo, título do livro selecionado, botão de voltar à esquerda.
- **Espaçamento:** Margens laterais de 16-20px, espaçamento vertical generoso.

## Integração com Status e Gamificação
- **Bloqueio/Desbloqueio de Capítulos e Recompensas:**
  - Certos capítulos ou recompensas podem ser bloqueados conforme faixas negativas de status (ex: obras da carne ≥ 70 bloqueiam acesso a exercícios, avaliações, baús, etc).
  - Buffs do Espírito Santo liberam capítulos extras, recompensas especiais ou acesso antecipado.
  - Capítulos/recompensas bloqueados exibem overlay escuro, ícone de cadeado e tooltip explicativo ao passar/tocar.
- **Alertas Visuais e Motivacionais:**
  - Banner no topo da trilha quando há bloqueio: “Alguns capítulos estão bloqueados devido ao seu status atual. Que tal buscar confissão ou arrependimento?”
  - Ícones de buff/cura ao lado dos capítulos/recompensas liberados por status positivo.
  - Feedback motivacional ao tentar acessar capítulo/recompensa bloqueado: “Você pode desbloquear este capítulo ao melhorar seu status espiritual!”
- **Atalhos de Recuperação:**
  - Botão/atalho para ação de confissão/arrependimento aparece quando há bloqueio, levando direto à tela/ação correspondente.
- **Auditoria e Log:**
  - Modal de detalhes exibe histórico de progresso, desbloqueios, bloqueios e ações de recuperação realizadas.
- **Acessibilidade:**
  - Tooltips detalhados em todos os ícones de status/bloqueio.
  - Descrições alternativas para imagens e ícones.
  - Navegação por teclado e contraste reforçado.

## Trilha Visual de Capítulos
- **Trilha vertical centralizada** (pode ser horizontal em tablets):
  - Cada capítulo é representado por um círculo grande (40-56px), cor vibrante para desbloqueados, cinza para bloqueados.
  - Ícone ou número do capítulo centralizado no círculo.
  - Capítulos concluídos: círculo com estrela ou check, cor de destaque.
  - Capítulo atual: círculo animado (pulsando ou com borda brilhante).
  - Capítulos futuros: círculo cinza, bloqueado, com cadeado ou opacidade reduzida.
  - Conexão entre círculos por linhas curvas ou retas, formando uma trilha.
  - Elementos de gamificação: baús de recompensa, mascote, estrelas, etc. posicionados ao longo da trilha.
- Capítulos bloqueados exibem overlay escuro, ícone de cadeado e tooltip explicativo.
- Capítulos liberados por buffs exibem ícone especial.
- Tooltip ao passar/tocar: “Este capítulo está bloqueado devido ao seu status. Use confissão/arrependimento para desbloquear.”

## Interações
- Ao tocar em um capítulo desbloqueado, inicia o ciclo de aprendizado.
- Capítulos bloqueados exibem tooltip explicando o requisito para desbloqueio e status.
- Banner motivacional aparece quando há bloqueio ou status negativo.
- Atalho para confissão/arrependimento.

## Barra Inferior
- Ícones de navegação para voltar ao livro, acessar perfil, loja, conquistas, etc.
- Overlay escuro + ícone de cadeado + tooltip explicativo se opção bloqueada.
- Ícone de buff/cura se liberada por status positivo.
- Banner motivacional se houver bloqueio.
- Atalho para confissão/arrependimento.

## Microinterações e Acessibilidade
- Feedback visual/tátil ao tocar nos círculos.
- Animação suave ao rolar a trilha.
- Texto alternativo para ícones e mascote.
- Contraste alto.
- Tooltips detalhados em todos os ícones de status/bloqueio.
- Feedback motivacional ao tentar acessar capítulo/recompensa bloqueado.
- Navegação por teclado e contraste reforçado.

## Exemplo de Hierarquia Visual

```
--------------------------------------
| < Voltar |  Gênesis       ❤❤❤❤❤ |
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