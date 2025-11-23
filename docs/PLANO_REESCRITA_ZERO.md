# PLANO DE REESCRITA DO ZERO - Bíblia GamePray

**Data**: 2025-01-27  
**Objetivo**: Reescrever o projeto do ZERO, mantendo apenas o aprovado e seguindo EXATAMENTE os wireframes

---

## ✅ **O QUE ESTÁ APROVADO (MANTER):**

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

## 🔄 **O QUE PRECISA SER REESCRITO:**

### 1. **FLUXO DE NAVEGAÇÃO** (Ordem exata):
```
Splash (3s) 
  ↓
Tutorial (7 páginas, tela cheia)
  ↓
Login (tela cheia)
  ↓
HUD + Início + Navbar (fixa no bottom)
```

### 2. **HUD** - Reescrever conforme wireframe EXATO:

**Minimizada:**
```
┌─────────────────────────────────────────────────┐
| Logotipo 32x32px                    500● 5❤    |
| [Avatar 32-40px]                                |
| Matheus Bonotto   [Espírito Santo 100%]         |
| Discípulo  Nv1    [Fé             100%]         |
|                                                 |
| PERMANENTE                      CONSUMÍVEIS     |
|   ♾︎   ♾︎                          ➎             |
| [🅱] [♰] [ ]                    [♨︎] [ ] [ ]     |
| [ ] [ ] [ ]                     [ ] [ ] [ ]     |
└─────────────────────────────────────────────────┘
                   ▾ Ver mais
```

**Expandida:**
```
┌─────────────────────────────────────────────────┐
| Logotipo |                         🔔➋ 500● 5❤|
| [Avatar]                                        |
| Matheus Bonotto   [Espírito Santo 100%]         |
| Discípulo  Nv1    [Fé             100%]         |
|                                                 |
| PERMANENTE                      CONSUMÍVEIS     |
|   ♾︎   ♾︎                          ➎             |
| [🅱] [♰] [ ]                    [♨︎] [ ] [ ]     |
| [ ] [ ] [ ]                     [ ] [ ] [ ]     |
├─────────────────────────────────────────────────┤
| Armadura Divina (Efésios)                       |
| [⚔️]  [🛡️]  [🪖]                              |
| 0/100 0/100 0/100                               |
| [🩴]  [🎽]  [🙏]    Efeitos ativos            |
|                             ♾︎  ♾︎               |
| 0/100 0/100 0/100    [⏱︎] [❄︎] [⛑︎] [⛓︎] [] [☹] |
|                      00:59        15:59         |      
|Frutos do Espírito│ Gl 5:22-23    Obras da carne │
| Amor: 0                 imoralidadeImpureza: 0  |
| Alegria: 0              idolatriaFeiticaria: 0  |
| Paz: 0                  inimizadeOdio: 0        |
| Paciência: 0            ciumesInveja: 0         |
| Bondade: 0              ira: 0                  |
| Benignidade: 0          dissensaoFaccao: 0      |
| Fidelidade: 0           orgiasBebedices: 0      |
| Mansidão: 0             ambicaoEgoista: 0       |
| Domínio próprio: 0      orgulhoEgoismo: 0       |
└─────────────────────────────────────────────────┘
                  ▴ Ver menos
```

### 3. **TELA INÍCIO** - Conforme wireframe:
```
--------------------------------------
|        Início        | [Perfil]    |
--------------------------------------
|     [Avatar 64-80px GRANDE]       |
| Nome do usuário [Nível] [Moedas]  |
| [Barra de XP]                     |
| [Barra de Espírito Santo 100%]    |
| [Pontos + / -]                    |
--------------------------------------
| [Card] Missões completas          |
| [Card] Dias consecutivos          |
| [Card] Conquistas desbloqueadas   |
--------------------------------------
| [Atalho] Missões [Atalho] Estudos |
| [Atalho] Conquistas               |
| [Ação rápida] Confissão/Arrependimento |
--------------------------------------
```

### 4. **NAVBAR** - Fixa no bottom:
```
-------------------------------------------------
| 🏠  🗺️  🎒  📖  🏆  ☰ |
| Início Missões Inventário Estudos Conquistas Mais |
-------------------------------------------------
```

### 5. **TUTORIAL** - 7 páginas, tela cheia:
- Barra de progresso no topo
- Conteúdo centralizado
- Botões: Próximo, Voltar, Pular
- Indicador: "Etapa X de 7"

---

## 📋 **CHECKLIST DE IMPLEMENTAÇÃO:**

### Fase 1: Estrutura Base
- [ ] Reescrever `index.html` do ZERO
- [ ] Manter apenas Splash e Login aprovados
- [ ] Criar estrutura de telas (splash, tutorial, login, inicio)
- [ ] Implementar navegação por hash (#splash, #tutorial, #login, #inicio)

### Fase 2: Tutorial
- [ ] Criar tela tutorial tela cheia
- [ ] Implementar 7 páginas conforme docs
- [ ] Barra de progresso funcional
- [ ] Botões de navegação
- [ ] Persistência em localStorage

### Fase 3: HUD
- [ ] Reescrever HUD minimizada EXATA
- [ ] Reescrever HUD expandida EXATA
- [ ] Logo 32x32px à esquerda
- [ ] Avatar 32-40px
- [ ] Moeda com símbolo ●
- [ ] 6 slots permanentes + 6 consumíveis
- [ ] Armadura Divina (6 peças)
- [ ] 9 Frutos do Espírito
- [ ] 9 Obras da Carne
- [ ] Efeitos ativos com timer

### Fase 4: Tela Início
- [ ] Avatar grande 64-80px centralizado
- [ ] Barras de XP e Espírito Santo
- [ ] Cards de estatísticas
- [ ] Atalhos rápidos
- [ ] Alerta de confissão

### Fase 5: Navbar
- [ ] Fixa no bottom
- [ ] 6 ícones: Início, Missões, Inventário, Estudos, Conquistas, Mais
- [ ] Labels abaixo dos ícones
- [ ] Estado ativo destacado

### Fase 6: CSS
- [ ] Reescrever `css/app.css` do ZERO
- [ ] Estilos para cada componente conforme wireframe
- [ ] Mobile-first
- [ ] Cores oficiais da marca

### Fase 7: JavaScript
- [ ] Reescrever stores do ZERO
- [ ] Carregamento de dados JSON
- [ ] Navegação SPA funcional
- [ ] Integração HUD com dados

---

## 🎯 **PRIORIDADES:**

1. **CRÍTICO**: Fluxo Splash → Tutorial → Login → Início
2. **CRÍTICO**: HUD conforme wireframe EXATO
3. **ALTA**: Tela Início conforme wireframe
4. **ALTA**: Navbar fixa no bottom
5. **MÉDIA**: CSS profissional e limpo
6. **MÉDIA**: JavaScript modular

---

## 📝 **NOTAS:**

- Manter apenas código APROVADO
- Seguir wireframes como se fossem imagens
- Zero gambiarras
- Código limpo e profissional
- Mobile-first sempre
- Acessibilidade (ARIA, contraste, navegação por teclado)

---

**Status**: 🟡 EM ANÁLISE - Aguardando início da reescrita

