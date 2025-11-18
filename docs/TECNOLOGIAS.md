<!--
  Documento: Tecnologias do projeto Bíblia GamePray
  Local: docs/TECNOLOGIAS.md
  Idioma: pt-BR
-->
# Tecnologias do Projeto — Bíblia GamePray

> Proposta de pilha tecnológica e integrações para o protótipo. O projeto é mobile-first e 100% PWA; durante a prototipagem os dados serão servidos por JSONs locais em `/dados/` (Supabase ficará documentado, mas desabilitado por padrão).

## Resumo das tecnologias

- **HTML5** — estrutura semântica e acessível.
- **CSS3** — estilos responsivos; `css/globais.css` para tokens. Opcional: **Tailwind CSS** para prototipagem rápida.
- **Alpine.js** — microframework reativo para estados e interações leves (uso sem build).
- **Ícones**: **Bootstrap Icons** e **Material Icons**.

## Persistência e backend (protótipo)

- **JSON locais**: `/dados/*.json` (usuarios, missoes, itens, etc.) — fonte de verdade no protótipo.
- **Supabase**: arquitetura preparada para migrar, mas **desabilitada** enquanto o protótipo usa JSONs. Documentar migração em `docs/`.

## Integrações e APIs externas

- **API da Bíblia**: consulta de versículos e capítulos (busca, tradução, metadados).
- **API de Libras**: fornecer tradução/legendas em Libras (embed de vídeos ou integração com serviço que gere vídeo em Libras).
- **Avataaars / DiceBear (API de avatar)**: gerar avatar a partir de seed para personalização do perfil.
- **EmailJS**: envio de e-mails direto do front-end (contato, recuperar senha no protótipo).
- **Notificações Push**: Web Push API + Service Worker (assinar via UI; envio requer backend com VAPID/FCM ou serviço 3rd-party).

## Acessibilidade (A11Y)

- Padrões WCAG: contraste, tamanhos de toque, labels e roles ARIA, trap-focus em modais.
- Controles para ativar/desativar som, TTS e preferências de movimento (respeitar `prefers-reduced-motion`).
- Suporte a Libras e legendas/transcrições para conteúdo multimídia.

## Multimídia e áudio

- **Text-to-Speech (TTS)**: preferir Web Speech API (`speechSynthesis`) com fallback para serviço externo.
- **Sons locais** para feedback (em `assets/sounds/`), respeitando preferência do usuário por áudio.

## Dicionário (lookup de palavras)

- Integrar API de dicionário para pesquisar palavras clicadas no texto; exibir definição em modal/tooltip.
- Cache de definições local (IndexedDB) para reduzir chamadas e permitir offline.

## PWA e Service Worker

- `manifest.json` e `service-worker.js` já existem — ajustar para:
  - cache-first para assets estáticos e JSONs locais;
  - network-first para consultas a APIs externas (Bible API, dicionário) com fallback para cache;
  - handlers para `push` e `notificationclick` para suportar notificações push.

## Recomendações de implementação (rápido)

1. Incluir **Alpine.js** via CDN em `index.html`:

   ```html
   <script src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js" defer></script>
   ```

2. Adicionar UI em `tela_configuracoes` para inserir EmailJS userID, habilitar/desabilitar Push e alternar Supabase on/off (flag para o protótipo).

3. Implementar helpers JS em `js/integrations.js` para:
   - TTS (Web Speech API),
   - Dicionário (fetch + cache em IndexedDB),
   - Inscrição em Push (navigator.serviceWorker.ready -> pushManager.subscribe).

4. Avataaars: usar geração por URL a partir de seed; salvar `avatar-configs.json` com a seed e URL.

5. Documentar onde colocar chaves/API keys em `docs/keys.md` e **não** commitar chaves no repositório.

## Notas rápidas sobre segurança e privacidade

- Pedir consentimento explícito para notificações e gravação/uso de áudio (TTS/record).
- Evitar expor chaves sensíveis no cliente. Para produção, migrar chaves para backend/Secrets.