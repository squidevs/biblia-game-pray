# Inventário de Arquivos (resumo)

Diretórios principais:

- `index.html` — shell do PWA e fonte principal das telas.
- `service-worker.js` — service worker (cache, push, notification click).
- `manifest.json` — web app manifest.
- `css/` — estilos (`globais.css`, `mobile/`)
- `js/` — scripts do app (autenticação, telas, sistemas de jogo, integrations)
- `dados/` — JSONs de domínio (usuarios, missoes, itens, etc.)
- `docs/` — documentação (SPEC, telas, TECNOLOGIAS, FLUXOGRAMA etc.)
- `assets/` — imagens e sons
- `reports/` — (adicionado) relatórios de auditoria

Contagem rápida (arquivos listados nas pastas principais):
- `docs/`: 26 arquivos (inclui SPEC, TECNOLOGIAS, FLUXOGRAMA)
- `dados/`: ~18 arquivos JSON/CSV
- `js/`: ~20 arquivos

Arquivos críticos para correções imediatas:
- `service-worker.js`
- `js/data-manager.js`
- `js/missoes-modal.js` (ou equivalente)
- `index.html` (incluir cadeias de inicialização / snippets de integração se necessário)

Observação: para um roteiro de correções, consulte `reports/AUDIT_SUMMARY.md`.
