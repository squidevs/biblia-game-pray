# Tela Ofensiva Diária (Estilo Duolingo)

## Estrutura Geral
- **Fundo:** Cor sólida (ex: tema escuro ou claro), preenchendo toda a tela.
- **Header:** Fixo no topo, com status do app (hora, bateria, notificações).

## Integração com Status e Gamificação
- **Bloqueio/Desbloqueio de Recompensas e Sequência:**
  - Certas recompensas ou sequência podem ser bloqueadas conforme faixas negativas de status (ex: obras da carne ≥ 70 bloqueiam baús, cristais, etc).
  - Buffs do Espírito Santo liberam recompensas extras ou proteções de sequência.
  - Elementos bloqueados exibem overlay escuro, ícone de cadeado e tooltip explicativo ao passar/tocar.
- **Alertas Visuais e Motivacionais:**
  - Banner no topo da tela quando há bloqueio: “Algumas recompensas estão bloqueadas devido ao seu status atual. Que tal buscar confissão ou arrependimento?”
  - Ícones de buff/cura ao lado das recompensas liberadas por status positivo.
  - Feedback motivacional ao tentar acessar recompensa bloqueada: “Você pode desbloquear esta recompensa ao melhorar seu status espiritual!”
- **Atalhos de Recuperação:**
  - Botão/atalho para ação de confissão/arrependimento aparece quando há bloqueio, levando direto à tela/ação correspondente.
- **Auditoria e Log:**
  - Modal de detalhes exibe histórico de sequência, recompensas, bloqueios e ações de recuperação realizadas.
- **Acessibilidade:**
  - Tooltips detalhados em todos os ícones de status/bloqueio.
  - Descrições alternativas para imagens e ícones.
  - Navegação por teclado e contraste reforçado.

## Mensagem Motivacional
- Caixa de diálogo no topo, com mascote (ex: pomba, Bíblia, personagem cristão) e mensagem motivacional:
  - Exemplo: “Sua ofensiva começou! Pratique todos os dias para ela crescer.”
- Mascote animado, com livro ou elemento cristão.
- Banner motivacional aparece quando há bloqueio ou status negativo.
- Tooltip explicativo ao passar/tocar no mascote ou mensagem.

## Progresso de Dias
- Número grande e destacado do dia atual da ofensiva (ex: “1”)
- Texto abaixo: “dia de ofensiva”
- Linha de dias da semana:
  - Bolinhas para cada dia (Sex, Sáb, Dom, Seg, Ter, Qua, Qui)
  - Dia atual marcado com cor de destaque e check
  - Dias futuros em cinza ou opacidade reduzida
- Dias bloqueados exibem overlay escuro, ícone de cadeado e tooltip explicativo.
- Dias liberados por buffs exibem ícone especial.

## Recompensas Diárias
- Cards ou ícones para cada dia, mostrando o tipo de recompensa (baú, poção, cristais, etc.)
- Dia atual destacado, dias futuros bloqueados
- Mensagem: “Ganhe recompensas por voltar todos os dias!”
- Botão grande: “Me lembre amanhã”
- Botão secundário: “Agora não”
- Recompensas bloqueadas exibem overlay escuro, ícone de cadeado e tooltip explicativo.
- Recompensas liberadas por buffs exibem ícone especial.
- Tooltip ao passar/tocar: “Esta recompensa está bloqueada devido ao seu status. Use confissão/arrependimento para desbloquear.”

## Modal de Recompensa
- Ao ganhar uma recompensa, exibe baú aberto ou item animado
- Mensagem: “Você ganhou X bloqueios de ofensiva. Salve sua sequência se perder até X dias de prática!”
- Botão grande: “Continuar”
- **Histórico/Auditoria:**
  - Exibe log de recompensas, bloqueios e ações de recuperação.
- **Status da Recompensa:**
  - Mostra se a recompensa está bloqueada/desbloqueada, motivo e ação sugerida.
  - Botão de confissão/arrependimento se aplicável.

## Calendário de Ofensiva
- Calendário mensal mostrando os dias praticados
- Dias marcados com cor de destaque
- Mensagem de status: “Você está sem bloqueios de ofensiva! Obter mais”
- Abas para alternar entre ofensiva pessoal e de amigos
- Dias bloqueados exibem overlay escuro, ícone de cadeado e tooltip explicativo.
- Dias liberados por buffs exibem ícone especial.
- Banner motivacional se houver bloqueio.
- Atalho para confissão/arrependimento.

## Microinterações e Acessibilidade
- Animações ao marcar dias, abrir baús, mascote comemorando
- Feedback visual/tátil ao tocar nos elementos
- Texto alternativo para ícones
- Contraste alto
- Tooltips detalhados em todos os ícones de status/bloqueio.
- Feedback motivacional ao tentar acessar recompensa bloqueada.
- Navegação por teclado e contraste reforçado.

## Exemplo de Hierarquia Visual

```
-------------------------------------------------
| [Status do app: hora, bateria, notificações]   |
-------------------------------------------------
| [Mascote] "Sua ofensiva começou! Pratique..." |
-------------------------------------------------
|                  [1]                          |
|           dia de ofensiva                     |
-------------------------------------------------
| Sex Sáb Dom Seg Ter Qua Qui                   |
| [✓] [ ] [ ] [ ] [ ] [ ] [ ]                   |
-------------------------------------------------
| [Card] Dia 1: Cristal (✓)                     |
| [Card] Dia 2: Baú                             |
| [Card] Dia 3: Cesta de cristais               |
| ...                                           |
-------------------------------------------------
| Ganhe recompensas por voltar todos os dias!   |
| [Botão] Me lembre amanhã                      |
| [Botão] Agora não                             |
-------------------------------------------------
| [Modal] Você ganhou X bloqueios de ofensiva   |
| [Baú animado]                                 |
| [Botão] Continuar                             |
-------------------------------------------------
| [Calendário mensal: dias marcados]            |
| [Mensagem de status: obter bloqueios]         |
| [Abas: Pessoal | Amigos]                      |
-------------------------------------------------
| [Banner de bloqueio/motivacional no topo, se aplicável]
| [Ícones de buff/cura ao lado das recompensas liberadas]
| [Overlay + cadeado + tooltip nas recompensas/dias bloqueados]
| [Botão de confissão/arrependimento quando há bloqueio]
| [Histórico/auditoria no modal de detalhes]
```
