# Drawer (Menu Lateral)

## Estrutura Geral
- **Fundo:** Sólido (ex: branco ou tema escuro), sombra no lado direito.
- **Menu:** Desliza da esquerda, ocupa 70-80% da largura da tela.
- **Overlay:** Fundo escurecido sobre o restante da tela.
- **Espaçamento:** Margens internas amplas, opções bem separadas.

## Integração com Status e Gamificação
- **Bloqueio/Desbloqueio de Opções:**
  - Certas opções do menu podem ser bloqueadas conforme faixas negativas de status (ex: obras da carne ≥ 70 bloqueiam acesso a perfil, configurações, etc).
  - Buffs do Espírito Santo liberam opções extras ou temporárias (ex: acesso a temas exclusivos, personalização avançada).
  - Opções bloqueadas exibem overlay escuro, ícone de cadeado e tooltip explicativo ao passar/tocar.
- **Alertas Visuais e Motivacionais:**
  - Banner no topo do menu quando há bloqueio: “Algumas opções estão bloqueadas devido ao seu status atual. Que tal buscar confissão ou arrependimento?”
  - Ícones de buff/cura ao lado das opções liberadas por status positivo.
  - Feedback motivacional ao tentar acessar opção bloqueada: “Você pode desbloquear esta opção ao melhorar seu status espiritual!”
- **Atalhos de Recuperação:**
  - Botão/atalho para ação de confissão/arrependimento aparece quando há bloqueio, levando direto à tela/ação correspondente.
- **Auditoria e Log:**
  - Modal de detalhes exibe histórico de acessos, bloqueios e ações de recuperação realizadas.
- **Acessibilidade:**
  - Tooltips detalhados em todos os ícones de status/bloqueio.
  - Descrições alternativas para imagens e ícones.
  - Navegação por teclado e contraste reforçado.

## Opções do Menu
- Lista vertical, cada item com:
  - **Ícone grande** à esquerda (32-40px)
  - **Label** em fonte média/grande
  - **Opção “Sair”** em vermelho ou cor de alerta
- Ordem sugerida: Perfil, Configurações, Sobre, Termos, Políticas, Sair
- Feedback visual ao tocar (cor de fundo, leve aumento de escala)
- **Status da Opção:**
  - Overlay escuro + ícone de cadeado + tooltip explicativo se bloqueada.
  - Ícone de buff/cura se liberada por status positivo.
  - Tooltip ao passar/tocar: “Esta opção está bloqueada devido ao seu status. Use confissão/arrependimento para desbloquear.”

## Interações
- Abre ao tocar em “Mais” na navbar
- Fecha ao deslizar para o lado ou tocar fora do menu
- Animação suave ao abrir/fechar
- Banner motivacional aparece quando há bloqueio ou status negativo.
- Atalho para confissão/arrependimento.

## Acessibilidade
- Ícones com texto alternativo
- Contraste alto
- Navegação por teclado e leitor de tela
- Tooltips detalhados em todos os ícones de status/bloqueio.
- Feedback motivacional ao tentar acessar opção bloqueada.
- Navegação por teclado e contraste reforçado.

## Exemplo de Hierarquia Visual

```
-----------------------------
|           | Perfil        |
|  [Ícone]  | Configurações |
|           | Sobre         |
|           | Termos        |
|           | Políticas     |
|           | Sair          |
-----------------------------
- [Banner de bloqueio/motivacional no topo, se aplicável]
- [Ícones de buff/cura ao lado das opções liberadas]
- [Overlay + cadeado + tooltip nas opções bloqueadas]
- [Botão de confissão/arrependimento quando há bloqueio]
- [Histórico/auditoria no modal de detalhes]
```