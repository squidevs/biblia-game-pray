# RESUMO DA REESCRITA DO ZERO - Bíblia GamePray

**Data**: 2025-01-27  
**Status**: 🟡 EM PROGRESSO

---

## ✅ **O QUE SERÁ MANTIDO (APROVADO):**

1. **Splash Screen** - ✅ APROVADO
   - Logo centralizado
   - Animação fade-in/zoom
   - Som intro.wav
   - Botão "Pular"
   - Transição suave

2. **Tela Login** - ✅ APROVADO
   - Tabs (Entrar/Criar Conta)
   - Formulários funcionais
   - Botão "Explorar como visitante"
   - Layout responsivo

---

## 🔄 **O QUE SERÁ REESCRITO:**

### 1. **TUTORIAL** (Tela cheia, 7 páginas)
- **Problema atual**: Está dentro de `<main>`, deveria ser tela cheia
- **Solução**: Criar `<div class="tutorial-screen">` fora do `<main>`
- **Conteúdo**: 7 páginas conforme `docs/tutorial_primeiro_acesso.md`
- **Barra de progresso**: No topo, mostrando "Etapa X de 7"

### 2. **HUD** (Minimizada + Expandida)
- **Problema atual**: Não segue wireframe EXATO
- **Solução**: Reescrever completamente conforme `docs/tela_hud.md` linhas 159-207
- **Elementos EXATOS**:
  - Logo 32x32px à esquerda
  - Recursos (500● 5❤) à direita
  - Avatar 32-40px (não 64px!)
  - Nome + Título + Nível na mesma linha
  - 2 barras: Espírito Santo + Fé
  - 6 slots permanentes (grid 3x2)
  - 6 slots consumíveis (grid 3x2)
  - Expandida: Armadura (6 peças), Efeitos, 9 Frutos, 9 Obras

### 3. **TELA INÍCIO**
- **Problema atual**: Não segue wireframe EXATO
- **Solução**: Reescrever conforme `docs/tela_inicio.md`
- **Elementos EXATOS**:
  - Header: "Início" + botão Perfil
  - Avatar GRANDE (64-80px) centralizado
  - Nome + Nível + Moedas na mesma linha
  - 2 barras: XP + Espírito Santo
  - 3 cards de estatísticas
  - 3 atalhos rápidos
  - Botão confissão (condicional)

### 4. **NAVBAR** (Fixa no bottom)
- **Problema atual**: Não está fixa no bottom
- **Solução**: `position: fixed; bottom: 0;`
- **Elementos EXATOS**:
  - 6 ícones: Início, Missões, Inventário, Estudos, Conquistas, Mais
  - Labels abaixo dos ícones
  - Estado ativo destacado
  - Altura: 56-64px
  - Escondida em splash/login/tutorial

---

## 📋 **ESTRUTURA DO NOVO index.html:**

```html
<!DOCTYPE html>
<html>
<head>
  <!-- Meta tags, CSS, scripts -->
</head>
<body>
  <!-- 1. SPLASH (manter aprovado) -->
  <div class="splash" data-splash>...</div>

  <!-- 2. TUTORIAL (tela cheia, fora do main) -->
  <div class="tutorial-screen" data-screen="tutorial" hidden>...</div>

  <!-- 3. LOGIN (manter aprovado) -->
  <section id="screen-login" class="screen screen--fullscreen" hidden>...</section>

  <!-- 4. APP SHELL (só aparece após login) -->
  <div id="app" class="app-shell">
    <!-- 4.1. HUD (reescrever conforme wireframe) -->
    <section class="hud" x-data="hudStore()">...</section>

    <!-- 4.2. MAIN (conteúdo das telas) -->
    <main class="app-main">
      <!-- 4.2.1. Tela Início (reescrever) -->
      <section id="screen-inicio" class="screen">...</section>
      
      <!-- 4.2.2. Outras telas... -->
    </main>

    <!-- 4.3. NAVBAR (fixa no bottom) -->
    <nav class="app-navbar" role="tablist">...</nav>
  </div>

  <!-- 5. DRAWER (menu lateral) -->
  <div class="drawer" data-drawer>...</div>

  <!-- 6. SCRIPTS -->
  <script>...</script>
</body>
</html>
```

---

## 🎯 **ORDEM DE IMPLEMENTAÇÃO:**

1. ✅ Manter Splash (aprovado)
2. 🔄 Reescrever Tutorial (tela cheia)
3. ✅ Manter Login (aprovado)
4. 🔄 Reescrever HUD (minimizada + expandida EXATAS)
5. 🔄 Reescrever Tela Início (conforme wireframe)
6. 🔄 Criar Navbar (fixa no bottom)
7. 🔄 Atualizar CSS (app.css)
8. 🔄 Testar fluxo completo

---

## 🚨 **PROBLEMAS CRÍTICOS A CORRIGIR:**

1. ❌ **Tutorial está dentro de `<main>`** → Deve ser tela cheia
2. ❌ **HUD não segue wireframe EXATO** → Reescrever completamente
3. ❌ **Avatar HUD está 64px** → Deve ser 32-40px
4. ❌ **Tela Início não segue wireframe** → Reescrever
5. ❌ **Navbar não está fixa no bottom** → Adicionar `position: fixed`
6. ❌ **Layout geral não segue specs** → Reescrever CSS

---

## ✅ **PRÓXIMOS PASSOS:**

1. Reescrever `index.html` do ZERO
2. Manter apenas Splash e Login
3. Criar Tutorial tela cheia
4. Reescrever HUD conforme wireframe EXATO
5. Reescrever Tela Início conforme wireframe
6. Criar Navbar fixa no bottom
7. Atualizar CSS conforme novos componentes
8. Testar fluxo: Splash → Tutorial → Login → Início

---

**Status**: 🟡 PLANO COMPLETO - Iniciando reescrita

