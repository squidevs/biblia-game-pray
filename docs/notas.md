1. Sistema de Status — Fruto do Espírito e Obras da Carne
Atributos Positivos (Fruto do Espírito)
Amor, Alegria, Paz, Paciência, Bondade, Benignidade, Fidelidade, Mansidão, Domínio próprio
Atributos Negativos (Obras da Carne)
Impureza (imoralidade sexual, sensualidade)
Idolatria (idolatria, feitiçaria)
Ódio (inimizade, hostilidade)
Inveja (ciúmes, inveja)
Ira (raiva, explosão de fúria)
Contenda (dissensão, facção, brigas)
Excessos (orgias, bebedices, vícios)
Egoísmo (egoísmo, busca por vantagem própria)
Orgulho (arrogância, soberba)
Contabilidade dos Status
Cada atributo tem valor de 0 a 100 (padrão RPG).
0 = sem efeito, 100 = efeito máximo.
Para status negativos, acima de 50 já começa a bloquear funcionalidades (ex: leaderboard, missões compartilhadas).
Para status positivos, acima de 50 desbloqueia bônus, recompensas e acesso a funcionalidades especiais.
2. Regras de Negócio e Gamificação
Geração e Redução de Status Negativos
Status negativos aumentam por:
Não cumprir missões (ex: preguiça, contenda)
Ficar em segundo lugar no ranking (inveja)
Falhar em estudos bíblicos (impureza, idolatria)
Ações específicas (ex: brigas, egoísmo em missões compartilhadas)
Status negativos podem ser reduzidos por:
Usar consumíveis específicos
Cumprir missões
Estudar a bíblia
Ação de confessar e arrepender-se (com sugestão de oração e tempo de oração)
Interações positivas com outros jogadores
Impacto dos Status no Jogo
Status negativos altos (>50) bloqueiam:
Participação no leaderboard (inveja)
Missões compartilhadas (egoísmo)
Acesso a recompensas especiais
Estudo bíblico (impureza, idolatria)
Status positivos altos (>50) desbloqueiam:
Bônus de XP, moedas, itens raros
Eventos especiais
Notificações motivacionais
Espírito Santo
Barra de Espírito Santo de 0 a 100.
Diminui automaticamente ao longo do tempo (ex: -1 a cada X horas).
A cada 15 pontos perdidos, exibe pop-up/notificação/push com mensagem motivacional.
Se "batizado" = true, trava em 50 (não pode cair abaixo disso).
Se "batizado" = false, trava em 15.
Recupera ao estudar a bíblia, cumprir missões, usar consumíveis, confessar e arrepender-se.
3. UX/UI e Experiência do Usuário
Feedback visual claro para status positivos/negativos (cores, ícones, barras).
Pop-ups e notificações motivacionais do Espírito Santo.
Tela de confissão com seleção da obra da carne, tempo de oração e sugestão de oração.
Bloqueios e desbloqueios de funcionalidades com explicação clara do motivo.
4. Arquivos a serem atualizados/criados
regras_status.md: Atualizar regras de status, contabilidade, impacto e recuperação.
BIBLIA_GAMEPRAY_SPEC.md: Atualizar regras de negócio, gamificação e lógica.
status_player_base.json: Garantir que os status estejam de 0 a 100 e regras de bloqueio/desbloqueio.
notificacoes.json: Adicionar mensagens do Espírito Santo.
acoes.json: Adicionar ação de confessar e arrepender-se.
config_global.json: Adicionar parâmetros de redução automática do Espírito Santo e travas de batismo.
Se necessário, criar arquivos auxiliares para regras ou lógica.
5. Melhorias e Mitigações
Balanceamento: Testar valores de bloqueio/desbloqueio para evitar frustração.
Recuperação fácil: Consumíveis acessíveis, missões frequentes, confissão simples.
Prevenção de abuso: Limitar uso de consumíveis, cooldown em confissão.
Clareza: Mensagens explicativas em todos os bloqueios/desbloqueios.