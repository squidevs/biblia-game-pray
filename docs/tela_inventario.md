# Tela Inventário

## Estrutura Geral
- **Fundo:** Cor sólida (ex: branco ou tema escuro), preenchendo toda a tela.
- **Header:** Fixo no topo, título “Inventário”, botão de voltar à esquerda.
- **Espaçamento:** Margens laterais de 16-20px, espaçamento vertical generoso entre cards/blocos.

## Integração com Status e Gamificação
- **Bloqueio/Desbloqueio de Itens:**
  - Itens podem ser bloqueados conforme faixas negativas de status (ex: obras da carne acima de 70 bloqueiam uso de consumíveis, armaduras especiais, etc).
  - Buffs do Espírito Santo liberam bônus ou desbloqueiam itens temporariamente.
  - Itens bloqueados exibem overlay escuro, ícone de cadeado e tooltip explicativo ao passar/tocar.
- **Alertas Visuais e Motivacionais:**
  - Banner no topo do inventário quando há bloqueio: “Alguns itens estão bloqueados devido ao seu status atual. Que tal buscar confissão ou arrependimento?”
  - Ícones de buff/cura ao lado dos itens liberados por status positivo.
  - Feedback motivacional ao tentar usar item bloqueado: “Você pode desbloquear este item ao melhorar seu status espiritual!”
- **Atalhos de Recuperação:**
  - Botão/atalho para ação de confissão/arrependimento aparece quando há bloqueio, levando direto à tela/ação correspondente.
- **Auditoria e Log:**
  - Modal de detalhes exibe histórico de uso, bloqueio/desbloqueio, e ações de recuperação realizadas.
- **Acessibilidade:**
  - Tooltips detalhados em todos os ícones de status/bloqueio.
  - Descrições alternativas para imagens e ícones.
  - Navegação por teclado e contraste reforçado.

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
- **Status do Item:**
  - Overlay escuro + ícone de cadeado + tooltip explicativo se bloqueado.
  - Ícone de buff/cura se liberado por status positivo.
  - Tooltip ao passar/tocar: “Este item está bloqueado devido ao seu status. Use confissão/arrependimento para desbloquear.”
- Espaçamento generoso entre itens

## Modal de Detalhes
- Abre ao tocar em um item
- Fundo escurecido, modal centralizado
- Mostra imagem maior, nome, descrição, quantidade
- Botões grandes: Equipar, Usar, Descartar, Cancelar
- Fecha ao tocar fora ou no X
- **Histórico/Auditoria:**
  - Exibe log de uso, bloqueio/desbloqueio, e ações de recuperação.
- **Status do Item:**
  - Mostra se o item está bloqueado/desbloqueado, motivo e ação sugerida.
  - Botão de confissão/arrependimento se aplicável.

## Microinterações e Acessibilidade
- Animação suave ao abrir modal
- Feedback tátil e visual ao tocar
- Texto alternativo para imagens
- Contraste alto
- Tooltips detalhados em todos os ícones de status/bloqueio.
- Feedback motivacional ao tentar usar item bloqueado.
- Navegação por teclado e contraste reforçado.

## Exemplo de Hierarquia Visual

```
--------------------------------------
| < Voltar |      Inventário         |
--------------------------------------
| [Filtro: Permanente | Consumível | Armadura]
--------------------------------------
| [Grid/List] [Imagem] Nome [Qtd]    |
| ... outros itens ...               |
| [Banner de bloqueio/motivacional no topo, se aplicável]
| [Ícones de buff/cura ao lado dos itens liberados]
| [Overlay + cadeado + tooltip nos itens bloqueados]
| [Botão de confissão/arrependimento quando há bloqueio]
| [Histórico/auditoria no modal de detalhes]
```