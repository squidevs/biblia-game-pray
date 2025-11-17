# Tela Ranking

## Estrutura Geral
- **Fundo:** Cor sólida (ex: branco ou tema escuro), preenchendo toda a tela.
- **Header:** Fixo no topo, título “Ranking”, botão de voltar à esquerda.
- **Espaçamento:** Margens laterais de 16-20px, espaçamento vertical generoso entre cards/blocos.

## Filtros e Tipos de Ranking
- Barra horizontal no topo, botões para filtrar por tipo (Geral, Amigos, Missões, Estudos, Conquistas)
- Botão ativo destacado (cor de fundo, sublinhado ou bold)
- Microanimação ao trocar de filtro

## Lista de Jogadores
- Grid (1-2 colunas) ou lista vertical
- Cada jogador:
  - **Avatar grande** (48-64px), centralizado
  - **Nome** abaixo do avatar, fonte média
  - **Posição:** Badge colorido, destaque para top 3
  - **Pontuação:** Valor destacado
  - **Container:** Borda arredondada, sombra leve, fundo branco/cinza
  - Feedback visual ao tocar (leve aumento de escala, cor de fundo)
- Espaçamento generoso entre jogadores

## Integração com Status e Gamificação
- **Bloqueio/Desbloqueio de Interações:**
  - Jogadores com status negativo alto (obras da carne ≥ 75) aparecem com overlay escuro, ícone de alerta e tooltip explicativo: “Interações limitadas devido ao status atual.”
  - Buffs do Espírito Santo exibem ícone especial ao lado do nome, liberando interações extras (ex: enviar mensagem, parabenizar, etc).
- **Alertas Visuais e Motivacionais:**
  - Banner no topo do ranking se houver bloqueio: “Algumas interações estão limitadas devido ao status. Que tal buscar confissão ou arrependimento?”
  - Feedback motivacional ao tentar interagir com jogador bloqueado: “Melhore seu status para liberar todas as interações!”
- **Atalhos de Recuperação:**
  - Botão/atalho para ação de confissão/arrependimento aparece quando há bloqueio, levando direto à tela/ação correspondente.
- **Auditoria e Log:**
  - Modal de detalhes do jogador exibe histórico de interações, bloqueios/desbloqueios, e ações de recuperação realizadas.
- **Acessibilidade:**
  - Tooltips detalhados em todos os ícones de status/bloqueio.
  - Descrições alternativas para imagens e ícones.
  - Navegação por teclado e contraste reforçado.

## Modal de Detalhes do Jogador
- Abre ao tocar em um jogador
- Fundo escurecido, modal centralizado
- Mostra avatar maior, nome, posição, pontuação, status
- Botões grandes: Parabenizar, Enviar mensagem, Cancelar
- Fecha ao tocar fora ou no X
- **Histórico/Auditoria:**
  - Exibe log de interações, bloqueios/desbloqueios, e ações de recuperação
- **Status do Jogador:**
  - Mostra se o jogador está bloqueado/desbloqueado, motivo e ação sugerida
  - Botão de confissão/arrependimento se aplicável

## Microinterações e Acessibilidade
- Animação suave ao abrir modal
- Feedback tátil e visual ao tocar
- Tooltips detalhados em todos os ícones de status/bloqueio
- Feedback motivacional ao tentar interagir com jogador bloqueado
- Navegação por teclado e contraste reforçado

## Exemplo de Hierarquia Visual

```
--------------------------------------
| < Voltar |      Ranking            |
--------------------------------------
| [Filtro: Geral | Amigos | Missões | Estudos | Conquistas]
--------------------------------------
| [Grid/List] [Avatar] Nome [Posição] [Pontuação]
| ... outros jogadores ...
--------------------------------------
| [Banner de bloqueio/motivacional no topo, se aplicável]
| [Ícone de buff ao lado do nome]
| [Overlay + alerta + tooltip nos jogadores bloqueados]
| [Botão de confissão/arrependimento quando há bloqueio]
| [Histórico/auditoria no modal de detalhes]
--------------------------------------
```
