# Tela Configurações

## Estrutura Geral
- **Fundo:** Cor sólida (ex: branco ou tema escuro), preenchendo toda a tela.
- **Header:** Fixo no topo, título “Configurações”, botão de voltar à esquerda.
- **Espaçamento:** Margens laterais de 16-20px, espaçamento vertical generoso entre seções.

## Integração com Status e Gamificação
- **Bloqueio/Desbloqueio de Opções:**
  - Certas opções podem ser bloqueadas conforme faixas negativas de status (ex: obras da carne ≥ 70 bloqueiam alteração de privacidade, notificações, etc).
  - Buffs do Espírito Santo liberam opções avançadas ou temporárias (ex: temas exclusivos, acessibilidade premium).
  - Opções bloqueadas exibem overlay escuro, ícone de cadeado e tooltip explicativo ao passar/tocar.
- **Alertas Visuais e Motivacionais:**
  - Banner no topo das configurações quando há bloqueio: “Algumas opções estão bloqueadas devido ao seu status atual. Que tal buscar confissão ou arrependimento?”
  - Ícones de buff/cura ao lado das opções liberadas por status positivo.
  - Feedback motivacional ao tentar acessar opção bloqueada: “Você pode desbloquear esta opção ao melhorar seu status espiritual!”
- **Atalhos de Recuperação:**
  - Botão/atalho para ação de confissão/arrependimento aparece quando há bloqueio, levando direto à tela/ação correspondente.
- **Auditoria e Log:**
  - Modal de detalhes exibe histórico de alterações, tentativas bloqueadas, e ações de recuperação realizadas.
- **Acessibilidade:**
  - Tooltips detalhados em todos os ícones de status/bloqueio.
  - Descrições alternativas para imagens e ícones.
  - Navegação por teclado e contraste reforçado.

## Opções de Configuração
- **Notificações:** Alternar push/email, configurar horários
- **Privacidade:** Perfil público/privado, controle de dados
- **Idioma:** Seleção de idioma
- **Tema:** Claro/escuro, alto contraste
- **Acessibilidade:** TTS, Libras, aumentar fonte, alto contraste
- **Sobre:** Versão do app, termos, políticas
- **Sair:** Botão grande, cor de alerta
- **Status da Opção:**
  - Overlay escuro + ícone de cadeado + tooltip explicativo se bloqueada.
  - Ícone de buff/cura se liberada por status positivo.
  - Tooltip ao passar/tocar: “Esta opção está bloqueada devido ao seu status. Use confissão/arrependimento para desbloquear.”

## Microinterações e Acessibilidade
- Feedback visual ao alternar opções
- Texto alternativo para ícones
- Contraste alto
- Navegação por teclado e leitor de tela
- Tooltips detalhados em todos os ícones de status/bloqueio.
- Feedback motivacional ao tentar acessar opção bloqueada.
- Navegação por teclado e contraste reforçado.

## Exemplo de Hierarquia Visual

```
--------------------------------------
| < Voltar |    Configurações        |
--------------------------------------
| [Opção] Notificações               |
| [Opção] Privacidade                |
| [Opção] Idioma                     |
| [Opção] Tema                       |
| [Opção] Acessibilidade             |
| [Opção] Sobre                      |
| [Botão] Sair                       |
--------------------------------------
- [Banner de bloqueio/motivacional no topo, se aplicável]
- [Ícones de buff/cura ao lado das opções liberadas]
- [Overlay + cadeado + tooltip nas opções bloqueadas]
- [Botão de confissão/arrependimento quando há bloqueio]
- [Histórico/auditoria no modal de detalhes]
```
