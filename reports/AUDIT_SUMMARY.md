# Auditoria Rápida — Biblia GamePray

Data: 2025-11-18
Autor: assistant

Resumo executivo

- Escopo: revisão de `docs/`, `dados/`, `js/`, `index.html`, `manifest.json` e `service-worker.js` para mapear divergências entre a implementação atual e a especificação em `docs/BIBLIA_GAMEPRAY_SPEC.md`.
- Resultado: protótipo funcional com PWA básico e maioria das telas implementadas; faltam funcionalidades críticas (modal de evidência, tutorial interativo, HUD completo, fila de sincronização, validações, testes e polimento de A11Y).

Principais riscos identificados

- Falta de fila de sincronização idempotente para ações offline → risco de perda de evidência/ações do usuário.
- Service Worker: não há fallback de navegação (`offline.html`) — navegação pode falhar em offline.
- Validação de dados ausente → risco de crash ao carregar JSONs com campos ausentes/errados.
- Componentes UI parcialmente implementados (HUD, tutorial, modal de evidência). 
- Integrações que demandam credenciais (Push VAPID/FCM, EmailJS) não possuem stubs seguros e documentação clara para ativação.

Recomendações de prioridade (ordem sugerida)

1. Corrigir Service Worker: adicionar fallback de navegação e estratégia mais robusta para assets.
2. Implementar fila de sincronização mínima (IndexedDB) e enfileirar evidências/ações quando offline.
3. Implementar modal de evidência (texto/imagem/áudio) com persistência local e estado para revisão manual.
4. Adicionar validação (JSON Schema) ao carregar `dados/*.json` no `data-manager.js`.
5. Completar tutorial interativo e HUD (itens visuais, armadura, tooltips).
6. Documentar e fornecer stubs para Push/Email e instruções de migração para Supabase.
7. Adicionar testes smoke e lint básico.

Arquivos afetados (exemplo)

- `service-worker.js` — correções de caching e offline fallback.
- `js/data-manager.js` — validação de JSON ao carregar `dados/`.
- `js/missoes-modal.js` ou modal relevante — criar/acomodar evidências.
- `docs/*` — atualização de SPEC e tutorial.
- `dados/*` — adicionar `_meta` em JSONs (em andamento).

Próximo passo executado por mim: apliquei uma correção segura no `service-worker.js` para adicionar `offline.html` como fallback e melhorar o tratamento de navegação; os detalhes técnicos estão no arquivo `GAP_ANALYSIS.md`.
