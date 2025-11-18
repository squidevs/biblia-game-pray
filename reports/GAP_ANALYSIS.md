# Gap Analysis — Auditoria Detalhada

Data: 2025-11-18

1) Service Worker / PWA
- Observado: `service-worker.js` implementa cache e handlers de `push`/`notificationclick`.
- Gap: ausência de `offline.html` como fallback para navegação; fetch handler mistura estratégias sem especialização para requisições de navegação (página) e assets.
- Impacto: usuário navegando em offline pode obter erro em vez de conteúdo amigável; assets críticos podem não ser encontrados.
- Ação aplicada: adição de `offline.html` ao cache; alteração do handler de `fetch` para usar Network First em navegação com fallback para `/offline.html` e Cache First para assets listados.

2) Dados / Sincronização
- Observado: uso de JSON locais em `/dados/` e `localStorage` para persistência.
- Gap: falta fila de sincronização (IndexedDB) e processamento idempotente para replays offline.
- Impacto: operações realizadas em offline podem ser perdidas ou duplicadas ao sincronizar.
- Recomendação: implementar `sync-queue` simples usando IndexedDB (ex.: `idb` lib) e integrar com Background Sync (quando disponível) ou fallback via tentativas periódicas.

3) Missões — evidências
- Observado: modal de evidência listado como não implementado no `PROGRESSO_IMPLEMENTACAO.md`.
- Gap: sem suporte ao upload/record de áudio/imagem e sem modelagem de `evidencias[]` em `missoes.json`.
- Impacto: funcionalidades core de missões não completas.
- Recomendação: implementar modal com captura de mídia (getUserMedia), uploader local e enfileiramento.

4) Validação de dados
- Observado: `dados/*.json` carregados diretamente.
- Gap: ausência de JSON Schemas e validação.
- Impacto: alterações manuais em JSONs podem quebrar a aplicação.
- Recomendação: adicionar schemas (pasta `schemas/`) e validar no `data-manager.js` antes de usar os dados.

5) Acessibilidade (A11Y)
- Observado: preferências mencionadas, mas controles incompletos (TTS, Libras, alto contraste).
- Gap: falta de controles visíveis e rotinas de leitura (play/pause/velocidade).
- Recomendação: implementar componente TTS e preferências em `configuracoes-screen`.

6) Documentação
- Observado: documentação extensa mas com áreas que precisam de consolidação (`TECNOLOGIAS.md`, SPEC).
- Gap: falta de seção 'Tecnologias' em cada doc e instruções de como habilitar integrações.
- Recomendação: padronizar seção 'Tecnologias e Notas de Integração' em todos os `docs/*.md` e atualizar `BIBLIA_GAMEPRAY_SPEC.md`.

---

Os próximos passos realizados e pendentes estão descritos em `reports/AUDIT_SUMMARY.md` e no TODO do repositório.
