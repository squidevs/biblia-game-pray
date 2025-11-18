# Christ.On - O Caminho da Sabedoria

<div align="center">

![Christ.On Logo](https://img.shields.io/badge/Christ.On-O%20Caminho%20da%20Sabedoria-4979C8?style=for-the-badge)

**Progressive Web App de gamificação cristã que transforma o crescimento espiritual em uma jornada interativa**

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.5-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.0.0-646CFF?style=flat&logo=vite)](https://vitejs.dev/)

</div>

## 🌟 Visão Geral

Christ.On é um aplicativo PWA que gamifica a jornada espiritual cristã, inspirado na **Armadura de Deus** (Efésios 6:10-18). O jogador evolui de **Tolo** → **Sábio**, acumulando Sabedoria, resistindo ao Pecado e fortalecendo o Espírito Santo através de:

- **Missões espirituais** com timer em tempo real
- **Ações diárias** (Orar, Confessar, Arrepender, etc.)
- **Sistema de Ofensiva** (streak) inspirado no Duolingo
- **Inventário de itens sagrados** e equipáveis
- **66 conquistas** baseadas nos livros da Bíblia
- **Armadura de Deus** como HUD principal

## 🎮 Funcionalidades Principais

### ⚔️ Armadura de Deus (HUD)
- **Cinturão da Verdade** - Status de honestidade
- **Couraça da Justiça** - Integridade moral
- **Sandálias do Evangelho** - Prontidão para evangelizar
- **Escudo da Fé** - Proteção espiritual
- **Capacete da Salvação** - Proteção mental
- **Espada do Espírito** - Conhecimento bíblico
- **Manto da Sabedoria** - Sabedoria acumulada

### 🙏 Ações Espirituais
- **Orar** - Conectar-se com Deus (+3 Espírito, +5 Sabedoria)
- **Confessar** - Reduzir pecados (-1 Pecado, +10 Sabedoria)
- **Arrepender** - Purificação completa (Cooldown: 30 dias)
- **Justificar** - Corrigir falhas de missão
- **Glorificar** - Compartilhar bênçãos (+20 Sabedoria)
- **Perdoar** - Libertar rancores (+30 Sabedoria)
- **Adorar** - Manter ofensiva ativa
- **Santificar** - Desblocar conquistas especiais

### 🎨 Sistema de Avatar Personalizado
- **Editor Avançado** - Controles detalhados para cada aspecto
- **DiceBear API** - Geração gratuita de avatares únicos
- **Personalização Completa**:
  - 🫱 **Cabelo** - 30+ estilos + 10 cores
  - 👁️ **Olhos** - 12 expressões diferentes
  - 🎭 **Boca** - 12 emoções variadas
  - 👤 **Pele** - 7 tons de pele
  - 👕 **Roupas** - 9 tipos + 11 cores
  - 🕶️ **Acessórios** - Óculos, chapéus e mais
  - ✨ **Tempo Real** - Visualização instantânea
- **Sincronização Global** - Avatar aparece no Header e Perfil
- **Persistência Local** - Salvo automaticamente no navegador

### 📋 Sistema de Missões
- **Ação Diária** (24h) - Desafios rápidos
- **Batalha Espiritual** (7 dias) - Testes intermediários
- **Guerra Santa** (30 dias) - Missões épicas
- **Casal** - Exclusivas para usuários casados
- **Timer em tempo real** com penalidades por expiração

### 🎒 Inventário Sagrado
- **Bíblia Sagrada** - +5% XP permanente
- **Óleo de Unção** - Restaura armadura
- **Água da Vida** - 2x XP por 24h
- **Sangue de Cristo** - Remove todos os pecados
- **Corpo de Cristo** - Protege ofensiva por 1 dia
- **Cálice Sagrado** - Reduz 1 pecado

### 🏆 Sistema de Progressão
#### Níveis de Sabedoria:
1. **Tolo** (0 XP) - Começando a jornada
2. **Iniciante** (100 XP) - Primeiros passos
3. **Prudente** (300 XP) - Desenvolvendo discernimento
4. **Justo** (600 XP) - Vivendo retamente
5. **Fiel** (1000 XP) - Mantendo constância
6. **Discernido** (1500 XP) - Sabedoria aprofundada
7. **Sábio** (2500 XP) - Maturidade espiritual

#### Sistema de Ofensiva:
- **Streak diário** - Dias consecutivos com missão concluída
- **Bônus de +5%** XP por dia de ofensiva
- **Quebra de ofensiva** = -10% Sabedoria + -20% Espírito

## 🛠️ Tecnologias

- **React 18.2** - Interface reativa
- **TypeScript** - Tipagem estática
- **TailwindCSS** - Estilização utilitária
- **Vite** - Build tool rápida
- **Framer Motion** - Animações fluidas
- **React Icons** - Ícones Bootstrap + Material Design
- **DiceBear API** - Geração gratuita de avatares SVG
- **PWA** - Experiência nativa
- **Service Workers** - Cache offline
- **LocalStorage** - Persistência de dados local

## 📁 Estrutura do Projeto

```
christon-app/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Header.tsx       # Cabeçalho com stats
│   │   ├── ArmorHUD.tsx     # HUD da Armadura de Deus
│   │   └── BottomNavigation.tsx
│   ├── pages/              # Páginas principais
│   │   ├── ActionsPage.tsx # Tela de ações espirituais
│   │   ├── ItemsPage.tsx   # Inventário de itens
│   │   └── MissionsPage.tsx # Missões ativas
│   ├── data/               # Dados estruturados
│   │   ├── player.json     # Perfil do jogador
│   │   ├── missions.json   # Missões disponíveis
│   │   ├── actions.json    # Ações espirituais
│   │   ├── items.json      # Itens sagrados
│   │   ├── achievements.json # 66 conquistas bíblicas
│   │   ├── ranking.json    # Ranking global
│   │   └── rules.json      # Regras e configurações
│   └── App.tsx             # Componente principal
├── public/                 # Assets estáticos
└── package.json            # Dependências
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/christon-app.git

# Entre no diretório
cd christon-app

# Instale as dependências
npm install

# Execute em modo desenvolvimento
npm run dev

# Ou execute a build de produção
npm run build
npm run preview
```

### Deploy PWA
```bash
# Build otimizada para PWA
npm run build

# Deploy para Vercel/Netlify
# Os service workers serão configurados automaticamente
```

## 🎨 Design System

### 🎨 Paleta de Cores
```css
--primary: #F3F3F3      /* Fundo principal - pergaminho */
--dark: #1A1A1A         /* Áreas de destaque */
--text: #111111         /* Texto principal */
--victory: #3DA35D      /* Vitória, fé, esperança */
--sin: #C44536          /* Erro, pecado */
--spiritual: #4979C8    /* Espírito Santo */
--wisdom: #E0B142       /* Sabedoria, nível "Sábio" */
--neutral: #CFCFCF      /* Divisores, elementos neutros */
```

### 📝 Tipografia
- **Display**: Playfair Display (títulos, elementos nobres)
- **Body**: Inter (UI, texto corrido)

## 📱 Funcionalidades PWA

- **Instalável** - Adicionar à tela inicial
- **Offline First** - Funciona sem internet
- **Push Notifications** - Lembretes de missões e versículos
- **Background Sync** - Sincronização quando online
- **Responsive Design** - Mobile-first, adaptável

## 🛡️ Conquistas (66 Livros da Bíblia)

Algumas conquistas especiais:

- **Gênesis** - "Início da Jornada" (primeira oração)
- **Êxodo** - "Libertação do Pecado" (primeira confissão)  
- **Salmos** - "Louvor Constante" (7 dias adorando)
- **Provérbios** - "Sabedoria Crescente" (alcançar nível Sábio)
- **Mateus** - "Sermão do Monte" (completar 8 bem-aventuranças)
- **João** - "O Verbo se fez Vida" (ler evangelho completo)
- **Atos** - "Poder do Pentecostes" (50 dias de ofensiva)
- **Apocalipse** - "O Fim é o Recomeço" (todas as 65 conquistas)

## 🔮 Roadmap Futuro

### v2.0 - Comunidade
- [ ] Ranking global em tempo real
- [ ] Sistema de discipulado online
- [ ] Chat entre irmãos na fé
- [ ] Grupos de oração virtuais

### v3.0 - Recursos Avançados  
- [ ] Integração com APIs bíblicas
- [ ] Modo de eventos (Páscoa, Natal)
- [ ] Orações guiadas por voz
- [ ] IA para conselhos personalizados

### v4.0 - Expansão
- [ ] Versão para famílias
- [ ] Modo infantil
- [ ] Integração com igrejas locais
- [ ] Sistema de ofertas digitais

## 💡 Filosofia do Projeto

> "O Christ.On é mais que um jogo — é uma jornada espiritual interativa que une teologia prática, design envolvente e propósito divino, transformando o cotidiano do cristão em um campo de batalha simbólico onde cada ação tem peso eterno."

### Princípios Fundamentais:
1. **Santidade Lúdica** - Crescimento através da gamificação
2. **Comunidade Virtual** - Conectar irmãos na fé
3. **Disciplina Espiritual** - Hábitos cristãos consistentes  
4. **Palavra Central** - Bíblia como fonte primária
5. **Graça e Verdade** - Equilíbrio entre misericórdia e santidade

## 📜 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor, leia o [CONTRIBUTING.md](CONTRIBUTING.md) para detalhes sobre nosso código de conduta e o processo de submissão de pull requests.

## ✝️ Versículos de Inspiração

> *"Revesti-vos de toda a armadura de Deus, para que possais estar firmes contra as astutas ciladas do diabo."*
> **Efésios 6:11**

> *"O temor do Senhor é o princípio da sabedoria; bom entendimento têm todos os que lhe obedecem."*
> **Salmos 111:10**

---

<div align="center">

**Desenvolvido com ❤️ e fé para a glória de Deus**

[🌐 Website](https://christon-app.vercel.app) • [📱 Download PWA](#) • [📖 Documentação](#) • [🐛 Reportar Bug](#)

</div>