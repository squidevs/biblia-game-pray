# ESTADO ATUAL E VERIFICAÇÃO - Bíblia GamePray

**Data**: 2025-01-27  
**Status**: 🔴 Verificação necessária após reescrita

---

## 📋 **ESTRUTURA ATUAL DO index.html:**

### ✅ **Elementos Presentes (Verificados):**

1. **Splash Screen** ✅
   - Linha 60-76
   - Logo, título, tagline
   - Botão "Pular"
   - Script `js/splash.js` carregado

2. **Tutorial** ✅
   - Linha 78-157
   - Tela cheia (`screen--fullscreen`)
   - 7 páginas com barra de progresso
   - Botões: Próximo, Voltar, Pular
   - Script `js/tutorial.js` carregado

3. **Login** ✅
   - Linha 1896-2070
   - Tabs: Entrar / Criar Conta
   - Formulários funcionais
   - Botão "Explorar como visitante"
   - Script `js/login.js` carregado

4. **HUD** ✅
   - Linha 233-495
   - Minimizada: Logo 32x32px, Avatar 40px, Recursos, Barras, Slots
   - Expandida: Armadura, Efeitos, Frutos, Obras
   - Script `js/hud.js` carregado

5. **Tela Início** ✅
   - Linha 503-678
   - Avatar 80px, Cards, Atalhos, Alerta
   - Script `js/inicio.js` carregado

6. **Navbar** ✅
   - Linha 2096-2168
   - Fixa no bottom
   - 6 ícones: Início, Missões, Inventário, Estudos, Conquistas, Mais

7. **Drawer** ✅
   - Linha 159-228
   - Menu lateral com atalhos

8. **Scripts** ✅
   - Linha 2175-2194
   - Todos os módulos JS carregados
   - Alpine.js carregado dinamicamente

---

## 🔍 **VERIFICAÇÕES NECESSÁRIAS:**

### 1. **Navegação SPA**
- [ ] Splash → Tutorial funciona?
- [ ] Tutorial → Login funciona?
- [ ] Login → Início funciona?
- [ ] Navbar navega entre telas?
- [ ] Hash (#tutorial, #login, #inicio) funciona?

### 2. **Carregamento de Dados**
- [ ] HUD carrega `status_player_base.json`?
- [ ] HUD carrega `usuarios.json`?
- [ ] HUD carrega `itens.json`?
- [ ] Tela Início carrega `conquistas.json`?
- [ ] Logs aparecem no console (F12)?

### 3. **Funcionalidades**
- [ ] Botões do Tutorial funcionam?
- [ ] Formulários de Login funcionam?
- [ ] HUD expande/recolhe?
- [ ] Slots do HUD mostram itens?
- [ ] Navbar destaca tela ativa?

### 4. **CSS e Layout**
- [ ] HUD aparece apenas após login?
- [ ] Navbar fixa no bottom?
- [ ] Tutorial tela cheia?
- [ ] Modais funcionam?
- [ ] Responsivo mobile?

---

## 🚨 **PROBLEMAS COMUNS E SOLUÇÕES:**

### Problema 1: "Nada funciona"
**Causa**: Alpine.js não inicializou ou stores não carregaram  
**Solução**: 
1. Abrir console (F12)
2. Verificar erros em vermelho
3. Verificar se `[BGP] Alpine.js inicializado` aparece
4. Verificar se stores estão definidos: `typeof window.hudStore`

### Problema 2: "Dados não carregam"
**Causa**: JSONs não encontrados ou fetchJSON com erro  
**Solução**:
1. Verificar se pasta `dados/` existe
2. Verificar se arquivos JSON existem
3. Verificar logs: `[HUD] Dados carregados`
4. Verificar Network tab (F12) para requisições

### Problema 3: "Tela não aparece"
**Causa**: `x-show` ou `hidden` bloqueando  
**Solução**:
1. Verificar hash na URL: `#inicio`, `#login`, etc
2. Verificar `data-screen` nos elementos
3. Verificar `js/globais.js` - função `setScreen`
4. Verificar se Alpine.js inicializou

### Problema 4: "Botões não funcionam"
**Causa**: Alpine.js não inicializou ou eventos não vinculados  
**Solução**:
1. Verificar se `@click` está correto
2. Verificar se store tem o método
3. Verificar `onclick` fallback
4. Verificar console para erros

---

## ✅ **TESTE RÁPIDO:**

```bash
# 1. Servir o projeto
npx serve

# 2. Abrir no navegador
http://localhost:3000

# 3. Abrir console (F12)
# 4. Verificar logs:
#    - [BGP] Init
#    - [Splash] Autoplay bloqueado
#    - [BGP] SW registrado
#    - [BGP] Alpine.js inicializado

# 5. Testar fluxo:
#    - Splash aparece (3s)
#    - Tutorial aparece (se primeiro acesso)
#    - Login aparece
#    - Após login → Início aparece
#    - HUD aparece no topo
#    - Navbar aparece no bottom
```

---

## 📝 **PRÓXIMOS PASSOS:**

1. **Se tudo funciona**: ✅ Pronto!
2. **Se há erros**: 
   - Copiar mensagem de erro do console
   - Verificar qual tela não funciona
   - Verificar qual botão não funciona
   - Reportar problema específico

3. **Se dados não carregam**:
   - Verificar estrutura de `dados/`
   - Verificar `fetchJSON` em `js/utils.js`
   - Verificar logs de carregamento

---

**Status**: 🟡 Aguardando teste e feedback do usuário

