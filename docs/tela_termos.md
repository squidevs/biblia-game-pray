# Tela Termos de Uso

## Estrutura Geral
- **Fundo:** Cor sólida (ex: branco ou tema escuro), preenchendo toda a tela.
- **Header:** Fixo no topo, título “Termos de Uso”, botão de voltar à esquerda.
- **Espaçamento:** Margens laterais de 16-20px, espaçamento vertical generoso entre seções.

## Integração com Status e Gamificação
- **Bloqueio/Desbloqueio de Links e Seções:**
  - Certos links ou seções podem ser bloqueados conforme faixas negativas de status (ex: obras da carne ≥ 70 bloqueiam acesso à política, contato, etc).
  - Buffs do Espírito Santo liberam informações extras ou acesso antecipado a novidades.
  - Links/seções bloqueados exibem overlay escuro, ícone de cadeado e tooltip explicativo ao passar/tocar.
- **Alertas Visuais e Motivacionais:**
  - Banner no topo da tela quando há bloqueio: “Alguns links estão bloqueados devido ao seu status atual. Que tal buscar confissão ou arrependimento?”
  - Ícones de buff/cura ao lado dos links/seções liberados por status positivo.
  - Feedback motivacional ao tentar acessar link/seção bloqueada: “Você pode desbloquear este link ao melhorar seu status espiritual!”
- **Atalhos de Recuperação:**
  - Botão/atalho para ação de confissão/arrependimento aparece quando há bloqueio, levando direto à tela/ação correspondente.
- **Auditoria e Log:**
  - Modal de detalhes exibe histórico de acessos, bloqueios e ações de recuperação realizadas.
- **Acessibilidade:**
  - Tooltips detalhados em todos os ícones de status/bloqueio.
  - Descrições alternativas para imagens e ícones.
  - Navegação por teclado e contraste reforçado.

## Conteúdo
- Texto dos termos de uso, rolagem vertical
- Seções separadas por títulos
- Links para política de privacidade e contato
- **Status dos Links/Seções:**
  - Overlay escuro + ícone de cadeado + tooltip explicativo se bloqueado.
  - Ícone de buff/cura se liberado por status positivo.
  - Tooltip ao passar/tocar: “Este link está bloqueado devido ao seu status. Use confissão/arrependimento para desbloquear.”

## Microinterações e Acessibilidade
- Texto alternativo para links
- Contraste alto
- Navegação por teclado e leitor de tela
- Tooltips detalhados em todos os ícones de status/bloqueio.
- Feedback motivacional ao tentar acessar link/seção bloqueada.
- Navegação por teclado e contraste reforçado.

## Exemplo de Hierarquia Visual

```
--------------------------------------
| < Voltar |    Termos de Uso        |
--------------------------------------
| [Texto longo, rolagem vertical]    |
| [Link] Política de privacidade     |
| [Link] Contato                     |
--------------------------------------
- [Banner de bloqueio/motivacional no topo, se aplicável]
- [Ícones de buff/cura ao lado dos links/seções liberados]
- [Overlay + cadeado + tooltip nos links/seções bloqueados]
- [Botão de confissão/arrependimento quando há bloqueio]
- [Histórico/auditoria no modal de detalhes]
```
