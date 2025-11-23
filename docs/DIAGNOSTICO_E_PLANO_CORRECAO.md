# DIAGNÓSTICO E PLANO DE CORREÇÃO

**Data**: 2025-01-27  
**Problema**: index.html e arquivos JS aparentemente quebrados  
**Status**: 🔴 EM ANÁLISE

---

## 📋 **ANÁLISE DO ESTADO ATUAL:**

### Arquivos Verificados:
- ✅ `js/splash.js` - Funcional
- ✅ `js/login.js` - Funcional  
- ✅ `js/tutorial.js` - Funcional
- ✅ `js/hud.js` - Funcional
- ✅ `js/inicio.js` - Funcional
- ✅ `js/globais.js` - Funcional
- ✅ `js/utils.js` - Funcional
- ⚠️ `index.html` - Muito grande (2294 linhas), pode ter problemas de estrutura

---

## 🎯 **PLANO DE CORREÇÃO (REESCRITA DO ZERO):**

### Fase 1: Estrutura Base (CRÍTICO)
1. ✅ Manter Splash Screen (aprovado)
2. ✅ Manter Login Screen (aprovado)
3. 🔄 Criar Tutorial tela cheia (fora do `<main>`)
4. 🔄 Criar estrutura de navegação SPA simples

### Fase 2: HUD (Conforme Wireframe EXATO)
1. 🔄 Reescrever HUD minimizada:
   - Logo 32x32px à esquerda
   - Recursos (500● 5❤) à direita
   - Avatar 32-40px
   - Nome + Título + Nível na mesma linha
   - 2 barras: Espírito Santo + Fé
   - 6 slots permanentes (grid 3x2)
   - 6 slots consumíveis (grid 3x2)
   - Botão "Ver mais" centralizado

2. 🔄 Reescrever HUD expandida:
   - Tudo da minimizada +
   - Armadura Divina (6 peças Efésios)
   - Efeitos ativos com timer
   - 9 Frutos do Espírito
   - 9 Obras da Carne
   - Botão "Ver menos"

### Fase 3: Tela Início (Conforme Wireframe)
1. 🔄 Header: "Início" + botão Perfil
2. 🔄 Avatar 64-80px centralizado
3. 🔄 Nome + Nível + Moedas na mesma linha
4. 🔄 2 barras: XP + Espírito Santo
5. 🔄 3 cards de estatísticas
6. 🔄 3 atalhos rápidos
7. 🔄 Alerta de confissão (condicional)

### Fase 4: Navbar (Fixa no Bottom)
1. 🔄 `position: fixed; bottom: 0;`
2. 🔄 6 ícones: Início, Missões, Inventário, Estudos, Conquistas, Mais
3. 🔄 Labels abaixo dos ícones
4. 🔄 Estado ativo destacado
5. 🔄 Escondida em splash/login/tutorial

### Fase 5: Outras Telas (Simplificadas)
1. 🔄 Placeholders funcionais para:
   - Missões
   - Estudos
   - Inventário
   - Loja
   - Conquistas
   - Ranking
   - Perfil
   - Configurações

---

## 🚨 **PROBLEMAS IDENTIFICADOS:**

1. ❌ **index.html muito grande** (2294 linhas) - difícil de manter
2. ❌ **Estrutura complexa** - muitos elementos aninhados
3. ❌ **Possíveis conflitos** - múltiplos `x-init` e `x-show`
4. ❌ **Navegação SPA** - pode não estar funcionando corretamente

---

## ✅ **SOLUÇÃO PROPOSTA:**

### Opção 1: Correção Incremental (RECOMENDADO)
- Manter estrutura atual
- Corrigir problemas específicos identificados
- Simplificar onde possível
- Testar cada correção

### Opção 2: Reescrita Completa
- Criar novo `index.html` limpo do zero
- Manter apenas Splash e Login aprovados
- Construir tudo de forma simples e funcional
- Migrar funcionalidades gradualmente

---

## 📝 **PRÓXIMOS PASSOS:**

1. **Identificar problema específico:**
   - O que exatamente não está funcionando?
   - Há erros no console?
   - Qual tela não carrega?

2. **Testar funcionalidades básicas:**
   - Splash → Tutorial → Login → Início
   - Navegação entre telas
   - Carregamento de dados JSON

3. **Corrigir problemas identificados:**
   - Ajustar estrutura HTML
   - Corrigir stores JS
   - Simplificar navegação

---

## 🔧 **COMANDOS PARA TESTE:**

```bash
# Servir o projeto
npx serve

# Abrir no navegador
http://localhost:3000

# Verificar console (F12)
# Procurar por erros em vermelho
```

---

**Status**: 🟡 Aguardando feedback do usuário sobre problemas específicos

