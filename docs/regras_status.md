# Regras de Status — Biblia Gamepray

Este documento detalha todas as regras de status, faixas, mecânicas, exemplos práticos, auditoria e UX/UI do projeto.

## Faixas de Pontuação

| Faixa   | Fruto do Espírito (Positivo) | Obras da Carne (Negativo) |
|---------|------------------------------|---------------------------|
| 0–24    | Sem efeito especial          | Sem penalidade            |
| 25–49   | Bônus leve                   | Penalidade leve           |
| 50–74   | Bônus moderado               | Penalidade moderada       |
| 75–100  | Bônus máximo                 | Penalidade máxima         |

### Exemplos de Impacto
- **Leaderboard:** "ciúmes/inveja" ≥ 75 bloqueia ranking; 50–74 só pode ver, mas não aparece; 25–49 aviso e penalidade leve.
- **Missões colaborativas:** "egoísmo/orgulho" ≥ 75 não pode participar; 50–74 só missões solo; 25–49 penalidade leve.
- **Estudo bíblico:** "imoralidade/impureza" ≥ 75 bloqueia acesso; 50–74 acesso restrito; 25–49 aviso e penalidade leve.

## Recuperação de Status
- Consumíveis, missões específicas e ação de confissão/arrepender-se reduzem status negativos e aumentam positivos.
- Cooldown de 60min para confissão/arrependimento.
- Limite de 5 buffs/debuffs ativos por jogador.

## Auditoria e Rollback
- Logs de ações críticas (confissão, uso de itens raros, missões colaborativas) com timestamp e usuário.
- Sistema de rollback para restaurar progresso em caso de bug grave.

## Espírito Santo — Mecânica Dinâmica
- O atributo "espiritoSanto" diminui sozinho a cada ciclo de tempo (ex: 1 ponto por hora).
- A cada redução de 15% (85%, 70%, 55%, 40%, 25%, 10%), exibir pop-up, notificação e push com mensagem motivacional do Espírito Santo incentivando o usuário a aumentar o atributo.
- Mensagens sugeridas: "O Espírito Santo sente sua ausência. Que tal uma missão ou estudo bíblico?", "Sua luz está diminuindo, busque fortalecer seu espírito!".
- Para aumentar o atributo, o usuário deve realizar missões, estudar a bíblia ou usar itens específicos.
- A barra de Espírito Santo deve ser mantida cheia para garantir buffs e recompensas extras.
- Se o campo "batizado" for true, o atributo "espiritoSanto" nunca desce abaixo de 50%.
- Se não for batizado, nunca desce abaixo de 15%.
- Ao atingir o limite, exibir mensagem especial: "O Espírito Santo permanece com você!" (batizado) ou "Busque o batismo para fortalecer seu espírito!" (não batizado).

## Melhorias de UX/UI
- Tooltips dinâmicos e feedback visual para todos atributos.
- Filtros automáticos para destacar buffs/debuffs ativos e atributos mais relevantes.
- Contraste, navegação por teclado e labels revisados em todos menus e HUD.