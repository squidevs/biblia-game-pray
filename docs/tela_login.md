# Tela de Login

## Estrutura Geral
- **Fundo:** Cor sólida ou imagem temática suave (ex: textura bíblica, tons neutros).
- **Centralização:** Todos elementos centralizados vertical e horizontalmente.
- **Logo do jogo:** No topo, tamanho médio (64x64px).
- **Título:** "Bem-vindo ao Bíblia GamePray", fonte grande e amigável.

## Elementos do Formulário
- **Campo de usuário/email:** Input com ícone de usuário.
- **Campo de senha:** Input com ícone de cadeado, opção de mostrar/ocultar senha.
- **Botão de login:** Destaque visual, cor principal do projeto, texto "Entrar".
- **Botão de cadastro:** Link ou botão secundário "Criar conta".
- **Recuperar senha:** Link pequeno abaixo do campo de senha.
- **Login social:** (Opcional) Botões para login com Google, Facebook, etc.

## Microinterações e Acessibilidade
- Feedback visual ao digitar (borda azul/vermelha, ícone de validação).
- Mensagem de erro clara em caso de falha.
- Labels e alt text em todos elementos.
- Navegação por teclado e suporte a leitor de tela.
- Animação suave ao abrir tela e ao logar.

## Exemplo Visual
```markdown
┌───────────────────────────────┐
│      [Logo Bíblia GamePray]   │
│  Bem-vindo ao Bíblia GamePray │
│                               │
│  Usuário/email: [__________]  │
│  Senha:        [__________]   │
│  [Mostrar senha]              │
│                               │
│  [Entrar]   [Criar conta]     │
│  Esqueceu a senha?            │
│                               │
│  [Google] [Facebook]          │
└───────────────────────────────┘
```

## Fluxo de Uso
1. Usuário acessa a tela, digita usuário/email e senha.
2. Pode optar por mostrar/ocultar senha.
3. Clica em "Entrar" para logar ou "Criar conta" para registrar.
4. Se esquecer a senha, pode recuperar pelo link.
5. Login social disponível para facilitar acesso.

## Observações
- Garantir segurança dos dados (criptografia de senha).
- Mensagens de erro e sucesso devem ser claras e acessíveis.
- Layout responsivo para dispositivos móveis.
