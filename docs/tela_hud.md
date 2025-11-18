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
- Recomenda-se exibir os frutos do Espírito (atributos positivos) e pecados (atributos negativos) em uma seção dedicada, com ícones e valores, facilitando o acompanhamento do progresso espiritual do jogador.
- Accordion fecha ao tocar novamente no chevron ou fora da área expandida

## Microinterações e Acessibilidade
- Feedback visual ao expandir/fechar (animação de altura)
- Ícones grandes, textos legíveis
- Sempre visível, nunca some da tela
- Contraste alto, navegação por teclado e leitor de tela

## Descrição da tela

A HUD é um painel fixo no topo da interface, projetado para apresentar o progresso espiritual, recursos e status do jogador de forma clara e acessível. Ela possui dois modos de visualização: minimizada e expandida.

### Visualização Minimizada
- Avatar do usuário (círculo grande à esquerda)
- Nome do usuário e título (centralizado abaixo do avatar)
- Barra de Espírito Santo (progresso azul, valor percentual)
- Indicadores de moedas, corações e chaves (canto superior direito)
- Grid de itens permanentes (lado esquerdo, abaixo do avatar)
- Grid de itens consumíveis (lado direito)
- Botão/área "Ver mais" para expandir HUD

### Visualização Expandida
- Mantém todos elementos da minimizada
- Grid completo da Armadura Divina (Efésios) à esquerda
- Seção "Frutos do Espírito" (Gl 5:22-23) à direita, listando os 9 frutos com valores
- Seção "Obras da carne" (atributos negativos agrupados) à direita, abaixo dos frutos, listando os 9 atributos agrupados com valores
- Nomes de chaves sugeridos para integração JSON/UI:
  - Frutos do Espírito: amor, alegria, paz, paciencia, bondade, benignidade, fidelidade, mansidao, dominioProprio
  - Obras da carne: imoralidadeImpureza, idolatriaFeiticaria, inimizadeOdio, ciumesInveja, ira, dissensaoFaccao, orgiasBebedices, ambicaoEgoista, orgulhoEgoismo
- Botão/área "Ver menos" para recolher HUD

## Melhorias Visuais e de UX Aplicadas

- Cada fruto do Espírito e pecado deve ser representado por um ícone temático (ex: coração verde para frutos, coração partido vermelho para pecados).
- Ao passar o mouse ou tocar em um atributo, exibir um tooltip explicando seu significado e efeito no jogo.
- Frutos do Espírito devem ser exibidos em verde ou azul, pecados em vermelho ou cinza, facilitando a distinção visual.
- Ao expandir ou recolher a HUD, aplicar uma microanimação suave (fade/slide) para transição.
- Quando o usuário ganha ou cura um fruto/pecado, mostrar uma animação breve (ex: brilho, pulso ou confete).
- A barra de Espírito Santo deve ser animada ao preencher, com valor percentual destacado.
- Todos ícones e textos devem ter contraste alto e labels/alt text para acessibilidade.
- Permitir que o usuário ordene frutos e pecados por valor ou relevância (ex: os maiores aparecem primeiro).

## Efeitos Ativos: Buffs e Debuffs

Itens permanentes, consumíveis e armaduras podem conceder efeitos temporários ao jogador, chamados de buffs (efeitos positivos) e debuffs (efeitos negativos). Esses efeitos são exibidos em uma grade (grid) ao lado da Armadura Divina na HUD expandida, facilitando o acompanhamento do status atual do jogador.

### Estrutura Visual
- **Grid de Efeitos:** Ao lado da Armadura Divina, uma grade exibe ícones dos efeitos ativos, cada um com:
  - Ícone temático (ex: escudo para defesa, raio para velocidade, veneno para debuff)
  - Nome do efeito
  - Tempo restante (ex: 00:45)
  - Tooltip explicativo ao passar o mouse ou tocar e segurar
- **Separação:** Buffs (verde/azul) e debuffs (vermelho/cinza) são visualmente separados.
- **Microinterações:**
  - Animação de entrada/saída ao ativar ou expirar efeito
  - Pulso/brilho ao ganhar um buff
  - Fade ao perder um debuff

### Exemplos de Efeitos
- **Buffs:**
  - Defesa Extra: Reduz dano recebido por 60 segundos
  - Velocidade Divina: Movimentação aumentada por 30 segundos
  - Cura Gradual: Recupera 2❤ a cada 10 segundos por 1 minuto
  - Imunidade: Protege contra debuffs por 20 segundos
- **Debuffs:**
  - Veneno: Perde 1❤ a cada 15 segundos por 1 minuto
  - Lentidão: Movimentação reduzida por 20 segundos
  - Silêncio: Não pode usar consumíveis por 10 segundos
  - Vulnerabilidade: Dano recebido aumentado por 15 segundos

### Funcionamento
- Ao usar um item ou armadura que gera efeito, o buff/debuff aparece imediatamente no grid.
- O tempo restante é atualizado em tempo real.
- Ao expirar, o efeito some do grid com animação.
- Tooltips explicam o impacto de cada efeito.
- A HUD permite visualizar todos efeitos ativos de forma clara e acessível.

### Exemplo Visual
```markdown
┌───────────────────────────────────────────────┐
│ Armadura Divina (Efésios)                    │
│ [⚔️]  [🛡️]  [🪖]                              |
│ 0/100 0/100 0/100                            │
│ [🩴]  [🎽]  [🙏]                              |
│ 0/100 0/100 0/100                            │
│                                               │
│ Efeitos Ativos:                               │
│ [🛡️ Defesa Extra] 00:45                       │
│ [💨 Velocidade Divina] 00:30                   │
│ [☠️ Veneno] 00:15                             │
└───────────────────────────────────────────────┘
```

## Efeitos dos atributos espirituais e negativos

### Frutos do Espírito (atributos positivos)
Cada ponto aumenta benefícios e resistência a debuffs. Tooltips sugeridos:
 - **amor:** +Bônus em recompensas de grupo, reduz penalidades por inimizade.
 - **alegria:** +Aumenta XP ganho em missões, reduz efeitos de tristeza/debuff.
 - **paz:** +Reduz chance de debuffs de conflito, aumenta regeneração de corações.
 - **paciencia:** +Permite mais tentativas em quizzes, reduz penalidade por erros.
 - **bondade:** +Desbloqueia recompensas extras em missões colaborativas.
 - **benignidade:** +Aumenta chance de buffs ao ajudar outros jogadores.
 - **fidelidade:** +Bônus de streak diário, reduz perda de XP por falha.
 - **mansidao:** +Reduz impacto de debuffs de ira, facilita reconciliação em missões.
 - **dominioProprio:** +Reduz consumo de corações por erro, aumenta resistência a debuffs.
### Obras da carne (atributos negativos agrupados)
Cada ponto aumenta vulnerabilidade a debuffs e penalidades. Tooltips sugeridos:
 - **impureza(s):** -Aumenta chance de penalidade em quizzes, bloqueia buffs de pureza.
 - **idolatria(s):** -Reduz XP ganho, aumenta chance de debuffs aleatórios.
 - **odio(s):** -Bloqueia recompensas de grupo, aumenta penalidade por conflitos.
 - **inveja(s):** -Reduz ganhos em missões colaborativas, aumenta chance de perder itens.
 - **ira(s):** -Aumenta consumo de corações por erro, ativa debuff de vulnerabilidade.
 - **Condenda(s):** -Reduz streak, aumenta penalidade por missões não concluídas.
 - **Excesso(s):** -Reduz regeneração de corações, aumenta chance de debuffs de lentidão.
 - **Egoismo:** -Bloqueia buffs de grupo, reduz recompensas coletivas.
 - **orgulho(s):** -Reduz chance de buffs, aumenta penalidade por falha em missões.
### Mecânica de buffs/debuffs

### Limites e lógica do Espírito Santo
- Máximo de 5 buffs e 5 debuffs ativos por vez (exibir contador na HUD).
- O atributo "espiritoSanto" diminui sozinho ao longo do tempo; a cada 15% perdidos, exibir pop-up/notificação/push motivacional.
- Se "batizado" for true, o Espírito Santo nunca desce abaixo de 50%; se não, trava em 15%.
- Mensagens motivacionais e feedbacks visuais devem incentivar o usuário a realizar missões, estudos ou usar itens para restaurar o Espírito Santo.
- Logs de ações críticas e sistema de rollback devem ser acessíveis via menu de configurações para auditoria e suporte.

### Exemplo prático
- Jogador com alto "alegria" recebe +10% XP em missões.
- Jogador com alto "ira" perde 2 corações por erro em quiz ao invés de 1.
- Item "Poção de Paz" reduz "inimizadeOdio" e aumenta "paz" por 1 hora.
- Armadura "Escudo da Fidelidade" aumenta "fidelidade" e reduz debuffs de streak.

Essas descrições podem ser usadas para tooltips, regras de balanceamento e integração nos contratos JSON.

## Hierarquia visual

### Minimizada
```
┌─────────────────────────────────────────────────┐
| Logotipo                               500⛃ 5❤|
│ [Avatar]                                        │
│ Matheus Bonotto   [Espírito Santo 100%]         │
│ Discípulo  Nv1    [éF             100%]         │
│                                                 │
│ PERMANENTE                      CONSUMÍVEIS     |
|   ♾︎   ♾︎                          ➎             |
│ [🅱] [♰] [ ]                    [♨︎] [ ] [ ]     │
│ [ ] [ ] [ ]                     [ ] [ ] [ ]     │
└─────────────────────────────────────────────────┘
                   ▾ Ver mais
```

### Expandida
```
┌─────────────────────────────────────────────────┐
| Logotipo |                         🔔➋ 500⛃ 5❤|
│ [Avatar]                                        │
│ Matheus Bonotto   [Espírito Santo 100%]         │
│ Discípulo  Nv1    [Fé             100%]         │
│                                                 │
│ PERMANENTE                      CONSUMÍVEIS     |
|   ♾︎   ♾︎                          ➎             |
│ [🅱] [♰] [ ]                    [♨︎] [ ] [ ]     │
│ [ ] [ ] [ ]                     [ ] [ ] [ ]     │
├─────────────────────────────────────────────────┤
│ Armadura Divina (Efésios)                       |
│ [⚔️]  [🛡️]  [🪖]                              |
| 0/100 0/100 0/100                               │
│ [🩴]  [🎽]  [🙏]    Efeitos ativos            |
|                             ♾︎  ♾︎               |
| 0/100 0/100 0/100    [⏱︎] [❄︎] [⛑︎] [⛓︎] [] [☹] |
|                      00:59        15:59         |      
|Frutos do Espírito│ Gl 5:22-23    Obras da carne │
│ Amor: 0                 imoralidadeImpureza: 0  │
│ Alegria: 0              idolatriaFeiticaria: 0  │
│ Paz: 0                  inimizadeOdio: 0        │
│ Paciência: 0            ciumesInveja: 0         │
│ Bondade: 0              ira: 0                  │
│ Benignidade: 0          dissensaoFaccao: 0      │
│ Fidelidade: 0           orgiasBebedices: 0      │
│ Mansidão: 0             ambicaoEgoista: 0       │
│ Domínio próprio: 0      orgulhoEgoismo: 0       │
└─────────────────────────────────────────────────┘
                  ▴ Ver menos
```
## Menu de Contexto

O menu de contexto é um painel interativo que aparece ao clicar ou tocar em qualquer slot de item (permanente, consumível ou armadura) na HUD. Ele facilita ações rápidas sobre os itens do jogador, adaptando as opções conforme o tipo de item selecionado.

### Aparência e Estrutura
- Surge sobre a área dos slots, com bordas arredondadas e sombra leve.
- Títulos "PERMANENTE", "CONSUMÍVEIS" ou "ARMADURA" indicam o grupo de itens.
- Ícones dos itens do grupo, com destaque para o selecionado.
- Opções de ação ao lado do item:
  - **Ver:** Exibe detalhes do item (descrição, atributos, histórico de uso).
  - **Trocar:** Permite substituir o item por outro disponível no inventário.
  - **Remover:** Remove o item do slot, devolvendo ao inventário ou descartando.
- Fecha ao clicar fora ou concluir uma ação.
- Navegação por teclado e labels/alt text para acessibilidade.

### Microinterações
- Animação suave ao abrir/fechar (fade/slide).
- Destaque visual no item selecionado.
- Tooltips explicativos nas opções.
- Feedback visual ao executar ação (pulso/brilho no slot afetado).

### Aplicação
O menu se aplica igualmente a itens permanentes, consumíveis e armadura divina, adaptando as opções conforme o contexto (ex: armadura pode ter "equipar" ou "reparar").

### Exemplo de fluxo
1. Usuário clica em um slot de item.
2. Menu de contexto aparece, mostrando opções "Ver", "Trocar", "Remover".
3. Usuário escolhe uma ação; o menu executa e fecha.

Esse menu torna a gestão de itens intuitiva, rápida e acessível, mantendo a experiência fluida e organizada.

```markdown
┌─────────────────────────────────────────────────┐
│ PERMANENTE                      CONSUMÍVEIS     |
|   ♾︎   ♾︎                          ➎             |
│ [🅱] [♰] [ ]                    [♨︎] [ ] [ ]     │
|   ▶(clique/toque)                               |
|   |Ver          |                               |
|   |trocar       |                               |
|   |remover      |                               |
└─────────────────────────────────────────────────┘
```

