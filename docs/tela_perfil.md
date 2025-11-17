# Tela Perfil do Usuário

## Estrutura Geral
- **Fundo:** Cor sólida (ex: branco ou tema escuro), preenchendo toda a tela.
- **Header:** Fixo no topo, título “Perfil”, botão de voltar à esquerda.
- **Espaçamento:** Margens laterais de 16-20px, espaçamento vertical generoso entre seções.

## Integração com Status e Gamificação
- **Bloqueio/Desbloqueio de Funções:**
  - Funções do perfil (ex: editar avatar, alterar dados, acessar reputação) podem ser bloqueadas conforme faixas negativas de status (obras da carne ≥ 75).
  - Buffs do Espírito Santo liberam funcionalidades extras ou temporárias (ex: personalização avançada, acesso a temas exclusivos).
  - Funções bloqueadas exibem overlay escuro, ícone de cadeado e tooltip explicativo ao passar/tocar.
- **Alertas Visuais e Motivacionais:**
  - Banner no topo do perfil quando há bloqueio: “Algumas funções estão bloqueadas devido ao seu status atual. Que tal buscar confissão ou arrependimento?”
  - Ícones de buff/cura ao lado das funções liberadas por status positivo.
  - Feedback motivacional ao tentar acessar função bloqueada: “Você pode desbloquear esta função ao melhorar seu status espiritual!”
- **Atalhos de Recuperação:**
  - Botão/atalho para ação de confissão/arrependimento aparece quando há bloqueio, levando direto à tela/ação correspondente.
- **Auditoria e Log:**
  - Modal de detalhes do perfil exibe histórico de alterações, bloqueios/desbloqueios, e ações de recuperação realizadas.
- **Acessibilidade:**
  - Tooltips detalhados em todos os ícones de status/bloqueio.
  - Descrições alternativas para imagens e ícones.
  - Navegação por teclado e contraste reforçado.

## Dados do Usuário
- **Avatar grande:** Centralizado, com opção de editar (ícone de lápis ou botão “Editar Avatar”)
- **Nome do usuário:** Fonte grande, bold, centralizado
- **Email:** Fonte menor, cor secundária
- **Nível, XP e moedas:** Badges coloridos, barra de XP
- **Reputação:** Badge ou label destacado
- **Status do Usuário:**
  - Overlay escuro + ícone de cadeado + tooltip explicativo se função bloqueada.
  - Ícone de buff/cura se liberado por status positivo.
  - Tooltip ao passar/tocar: “Esta função está bloqueada devido ao seu status. Use confissão/arrependimento para desbloquear.”

## Estatísticas
- Blocos para:
  - Missões completas
  - Dias consecutivos
  - Conquistas desbloqueadas
  - Livros estudados
- Cada bloco: ícone, valor, label
- **Histórico/Auditoria:**
  - Exibe log de alterações, bloqueios/desbloqueios, e ações de recuperação.
- **Status do Usuário:**
  - Mostra se a função está bloqueada/desbloqueada, motivo e ação sugerida.
  - Botão de confissão/arrependimento se aplicável.

## Preferências e Configurações
- Lista de opções:
  - Editar dados pessoais
  - Notificações (push/email)
  - Privacidade do perfil
  - Idioma
  - Tema (claro/escuro)
  - Acessibilidade (alto contraste, TTS, etc.)
- Overlay escuro + ícone de cadeado + tooltip explicativo se opção bloqueada.
- Ícone de buff/cura se liberado por status positivo.
- Banner motivacional se houver bloqueio.
- Atalho para confissão/arrependimento.

## Botão de Sair
- Botão grande, cor de alerta, ao final da tela
- Overlay escuro + ícone de cadeado + tooltip explicativo se bloqueado.
- Feedback motivacional ao tentar sair se status negativo alto.

## Microinterações e Acessibilidade
- Feedback visual ao editar avatar ou dados
- Texto alternativo para ícones
- Contraste alto
- Navegação por teclado e leitor de tela
- Tooltips detalhados em todos os ícones de status/bloqueio.
- Feedback motivacional ao tentar acessar função bloqueada.
- Navegação por teclado e contraste reforçado.

## Exemplo de Hierarquia Visual

```
--------------------------------------
| < Voltar |        Perfil           |
--------------------------------------
|     [Avatar] (Editar)              |
| Nome do usuário                    |
| Email                              |
| [Nível] [XP] [Moedas] [Reputação]  |
--------------------------------------
| [Bloco] Missões completas          |
| [Bloco] Dias consecutivos          |
| [Bloco] Conquistas desbloqueadas   |
| [Bloco] Livros estudados           |
--------------------------------------
| [Opção] Editar dados pessoais      |
| [Opção] Notificações               |
| [Opção] Privacidade                |
| [Opção] Idioma                     |
| [Opção] Tema                       |
| [Opção] Acessibilidade             |
--------------------------------------
| [Botão] Sair                       |
--------------------------------------
- [Banner de bloqueio/motivacional no topo, se aplicável]
- [Ícones de buff/cura ao lado das funções liberadas]
- [Overlay + cadeado + tooltip nas funções bloqueadas]
- [Botão de confissão/arrependimento quando há bloqueio]
- [Histórico/auditoria no modal de detalhes]
```
