# Fluxograma — Primeiro Acesso e Todos os Fluxos Possíveis

Este documento contém o fluxograma do fluxo de primeiro acesso ao app e todos os caminhos derivados (login/criação de conta, explorar demo, onboarding, permissões, missão inicial, inventário, configurações e fluxos de erro/offline). O diagrama está em Mermaid para fácil visualização em ferramentas que o suportem.

```mermaid
flowchart TD
  Start([Início]) --> Welcome["Tela: Boas-vindas / Splash"]

  Welcome --> |"Criar Conta"| Create["Criar Conta / Registro"]
  Welcome --> |"Entrar"| Login["Login / Autenticação"]
  Welcome --> |"Explorar (Demo)"| Demo["Modo Demo (dados fictícios)"]

  %% Criar Conta Flow
  Create --> CreateForm["Formulário: nome, email, senha"]
  CreateForm --> EmailVerify{"Verificação de e-mail requerida?"}
  EmailVerify -- Sim --> SendVerify["Enviar link/código"]
  SendVerify --> WaitVerify["Aguardar verificação"]
  WaitVerify --> Verified{"Verificado?"}
  Verified -- Sim --> NewAccountDone["Conta criada → Onboarding"]
  Verified -- Não --> ResendOption["Opção: reenviar / editar e-mail"]
  ResendOption --> WaitVerify
  EmailVerify -- Não --> NewAccountDone

  %% Login Flow
  Login --> LoginForm["Formulário: email, senha"]
  LoginForm --> AuthOk{"Credenciais OK?"}
  AuthOk -- Sim --> AfterLogin["Entrou → Checar perfil / Onboarding pendente?"]
  AuthOk -- Não --> LoginError["Mostrar erro / Esqueci senha"]
  LoginError --> |"Esqueci senha"| ForgotPass["Fluxo: recuperar senha (email)"]
  ForgotPass --> ForgotSent["Email enviado / instruções"]
  ForgotSent --> Login

  %% Após criação/login
  NewAccountDone --> Onboarding["Onboarding / Primeiro Tutorial"]
  AfterLogin --> CheckOnboarding{"Onboarding concluído?"}
  CheckOnboarding -- Não --> Onboarding
  CheckOnboarding -- Sim --> Home["Tela Inicial / HUD"]
  Demo --> Home

  %% Onboarding passos
  Onboarding --> ProfileSetup["Configurar perfil (nome, avatar) ou Pular"]
  ProfileSetup --> Avatar{"Criar avatar?"}
  Avatar -- Sim --> AvatarFlow["Gerar avatar (Avataaars/DiceBear) / salvar sid"]
  Avatar -- Não --> SkipAvatar
  AvatarFlow --> SaveAvatar["Salvar avatar → Continuar"]
  SkipAvatar --> ContinueOnboard
  SaveAvatar --> ContinueOnboard
  ContinueOnboard --> Permissions["Solicitar permissões: notificações, som"]

  %% Permissões
  Permissions --> NotifConsent{"Aceita notificações?"}
  NotifConsent -- Sim --> EnablePush["Registrar Push (pedido VAPID/FCM)"]
  NotifConsent -- Não --> DeclineNotif
  Permissions --> SoundConsent{"Aceita sons?"}
  SoundConsent -- Sim --> EnableSound
  SoundConsent -- Não --> DisableSound
  EnablePush --> Home
  DeclineNotif --> Home
  EnableSound --> Home
  DisableSound --> Home

  %% Fluxo Principal: Missão inicial
  Home --> SuggestMission["Sugerir primeira missão: 'Ler 1 capítulo'"]
  SuggestMission --> AcceptMission{"Aceitar missão?"}
  AcceptMission -- Sim --> MissionInProgress["Missão: em andamento → registrar evidência"]
  AcceptMission -- Não --> SkipMission["Pular missão → sugerir novamente depois"]

  MissionInProgress --> RegisterEvidence["Registrar evidência: texto/imagem/áudio"]
  RegisterEvidence --> SubmitEvidence["Submeter evidência"]
  SubmitEvidence --> MissionReview{"Verificação automática/manual?"}
  MissionReview -- Automática OK --> Reward["Conceder recompensas: XP, moeda, item"]
  MissionReview -- Requer revisão humana --> PendingReview["Aguardar revisão"]
  PendingReview --> ReviewDone["Revisão aprovada?"]
  ReviewDone -- Sim --> Reward
  ReviewDone -- Não --> MissionFailed["Missão marcada como não concluída"]
  Reward --> InventoryUpdate["Atualizar inventário / HUD / toasts"]
  InventoryUpdate --> Home
  MissionFailed --> Home

  %% Inventário / Loja / Perfil
  Home --> Inventory["Tela: Inventário"]
  Home --> Shop["Tela: Loja"]
  Home --> Profile["Tela: Perfil"]
  Inventory --> UseItem["Usar item?" ]
  UseItem --> ItemEffect["Aplicar efeito (ex.: restaurar corações)"]
  ItemEffect --> Inventory

  %% Erros / Offline
  Any["(qualquer ação)"] --> OfflineCheck{"Offline?"}
  OfflineCheck -- Sim --> LocalMode["Modo offline: usar dados locais / enfileirar ações"]
  OfflineCheck -- Não --> RemoteOps["Operação online: sincronia/serviços externos"]
  LocalMode --> EnqueueAction["Enfileirar operação para sync"]
  EnqueueAction --> Home
  RemoteOps --> Home

  %% Configurações e ajustes
  Home --> Settings["Tela: Configurações"]
  Settings --> Accessibility["Acessibilidade (contraste, TTS, Libras)"]
  Settings --> Notifications["Gerenciar notificações"]
  Settings --> DataExport["Exportar dados / Conta" ]

  %% Caminhos de término
  Home --> Logout["Sair / Logout"]
  Logout --> End([Fim])

  %% pequenas ligações para clareza
  Demo --> Onboarding
  SkipMission --> Home

  style Start fill:#f9f,stroke:#333,stroke-width:1px
  style End fill:#f9f,stroke:#333,stroke-width:1px
```

Resumo dos principais fluxos documentados:

- **Criar Conta:** formulário → (opcional) verificação por e-mail → onboarding → perfil/avatar → permissões → tela inicial.
- **Login:** formulário → autenticação → checagem de onboarding → tela inicial; inclui recuperação de senha.
- **Explorar (Demo):** modo rápido sem criar conta que leva ao onboarding simplificado e ao HUD com dados fictícios.
- **Onboarding:** configurações iniciais (perfil, avatar), preferências de acessibilidade e solicitações de permissão (notificações, som).
- **Missão Inicial:** sugestão de missão, aceitação, registro de evidência (texto/imagem/áudio), verificação (automática ou manual), recompensa e atualização do inventário/HUD.
- **Offline:** modo offline usa JSONs locais em `/dados/` e enfileira ações para sincronização posterior.
- **Configurações:** controle de acessibilidade (TTS, Libras, contraste), notificações e exportação de dados.

Observações e extensões possíveis

- Posso exportar este fluxograma para SVG/PNG (renderizando o Mermaid) se preferir uma imagem pronta para apresentação.
- Posso também inserir uma versão reduzida do fluxograma dentro de `docs/BIBLIA_GAMEPRAY_SPEC.md` ou criar uma arte no `docs/assets/`.

Deseja que eu: (responda com uma opção)

- `Aplicar em SPEC` — insiro o fluxograma (ou link) em `docs/BIBLIA_GAMEPRAY_SPEC.md`.
- `Exportar imagem` — tento gerar PNG/SVG do diagrama e salvo em `docs/assets/`.
- `Nada` — apenas manter o arquivo e continuar com as próximas tarefas do TODO.
