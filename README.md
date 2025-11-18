# Bíblia GamePray

Aplicativo PWA gamificado para práticas espirituais diárias, com missões, estudos bíblicos, quizzes e ações devocionais.

## 🚀 Como Executar

### Opção 1: Servidor Local Simples

1. Abra o terminal na pasta do projeto
2. Execute um dos comandos abaixo:

**Python 3:**
```bash
python -m http.server 8000
```

**Node.js (com http-server):**
```bash
npx http-server -p 8000
```

**PHP:**
```bash
php -S localhost:8000
```

3. Acesse no navegador: `http://localhost:8000`

### Opção 2: VS Code Live Server

1. Instale a extensão "Live Server" no VS Code
2. Clique com botão direito em `index.html`
3. Selecione "Open with Live Server"

## 👤 Login Padrão

- **Usuário:** `admin`
- **Senha:** `admin`

Você também pode criar uma nova conta através do botão "Criar Conta".

## 📱 Funcionalidades

- ✅ Sistema de autenticação (login/cadastro)
- ✅ HUD fixa com status do jogador
- ✅ Tela inicial com perfil e progresso
- ✅ Sistema de missões
- ✅ Estudos bíblicos
- ✅ Conquistas
- ✅ Loja de itens
- ✅ Inventário
- ✅ Perfil do usuário
- ✅ PWA (instalável)
- ✅ Modo offline
- ✅ Integração com APIs externas (Bíblia, Avataaars)

## 🛠️ Tecnologias

- HTML5
- CSS3 (Mobile-first)
- JavaScript (Vanilla)
- Alpine.js (CDN)
- Bootstrap Icons
- Service Worker (PWA)

## 📁 Estrutura do Projeto

```
/
├── index.html              # Página principal
├── manifest.json           # Manifest PWA
├── service-worker.js       # Service Worker
├── css/
│   ├── globais.css         # Estilos globais e tokens
│   └── mobile/
│       ├── base.css        # Estilos base mobile-first
│       └── components.css # Componentes
├── js/
│   ├── globais.js          # Utilitários globais
│   ├── data-manager.js     # Gerenciador de dados
│   ├── auth.js             # Autenticação
│   ├── components.js       # Componentes Alpine.js
│   ├── screens.js          # Telas do app
│   └── integrations.js    # Integrações com APIs
├── dados/                  # JSONs com dados do jogo
├── assets/                 # Imagens, sons, logos
└── docs/                   # Documentação

```

## 📝 Notas

- Os dados são armazenados localmente no `localStorage` do navegador
- O projeto usa JSONs locais em `/dados/` como fonte de dados
- As APIs externas não requerem chaves de autenticação
- O app funciona offline após o primeiro carregamento

## 🎮 Como Usar

1. **Login:** Use `admin` / `admin` ou crie uma conta
2. **Explorar:** Navegue pelas telas usando os atalhos na tela inicial
3. **Missões:** Aceite e complete missões para ganhar XP e moedas
4. **Loja:** Compre itens com as moedas ganhas
5. **Inventário:** Use os itens adquiridos
6. **HUD:** Clique na HUD para expandir e ver atributos detalhados

## 🔧 Desenvolvimento

O projeto está preparado para migração futura para Supabase/Postgres, mas atualmente funciona com JSONs locais e localStorage.

## 📄 Licença

Este projeto é um protótipo educacional.

