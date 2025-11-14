# Tela Ofensiva Diária (Estilo Duolingo)

## Estrutura Geral
- **Fundo:** Cor sólida (ex: tema escuro ou claro), preenchendo toda a tela.
- **Header:** Fixo no topo, com status do app (hora, bateria, notificações).

## Mensagem Motivacional
- Caixa de diálogo no topo, com mascote (ex: pomba, Bíblia, personagem cristão) e mensagem motivacional:
  - Exemplo: “Sua ofensiva começou! Pratique todos os dias para ela crescer.”
- Mascote animado, com livro ou elemento cristão.

## Progresso de Dias
- Número grande e destacado do dia atual da ofensiva (ex: “1”)
- Texto abaixo: “dia de ofensiva”
- Linha de dias da semana:
  - Bolinhas para cada dia (Sex, Sáb, Dom, Seg, Ter, Qua, Qui)
  - Dia atual marcado com cor de destaque e check
  - Dias futuros em cinza ou opacidade reduzida

## Recompensas Diárias
- Cards ou ícones para cada dia, mostrando o tipo de recompensa (baú, poção, cristais, etc.)
- Dia atual destacado, dias futuros bloqueados
- Mensagem: “Ganhe recompensas por voltar todos os dias!”
- Botão grande: “Me lembre amanhã”
- Botão secundário: “Agora não”

## Modal de Recompensa
- Ao ganhar uma recompensa, exibe baú aberto ou item animado
- Mensagem: “Você ganhou X bloqueios de ofensiva. Salve sua sequência se perder até X dias de prática!”
- Botão grande: “Continuar”

## Calendário de Ofensiva
- Calendário mensal mostrando os dias praticados
- Dias marcados com cor de destaque
- Mensagem de status: “Você está sem bloqueios de ofensiva! Obter mais”
- Abas para alternar entre ofensiva pessoal e de amigos

## Microinterações e Acessibilidade
- Animações ao marcar dias, abrir baús, mascote comemorando
- Feedback visual/tátil ao tocar nos elementos
- Texto alternativo para ícones
- Contraste alto

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
```
