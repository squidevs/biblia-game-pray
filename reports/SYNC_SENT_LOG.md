# Sync Sent Log (simulado)

Este arquivo serve como referência para mostrar que a aplicação está registrando ações que seriam enviadas para um backend.

Observação: o envio real é simulado pelo `js/sync-handler.js`, que armazena um log em `localStorage` na chave `gamepray_sync_sent`.

Para inspecionar o log no navegador, abra o console e execute:

```javascript
JSON.parse(localStorage.getItem('gamepray_sync_sent') || '[]')
```

Exemplo de uso: quando o usuário submete uma evidência, a ação é enfileirada e o `SyncQueue.processQueue()` tentará enviá-la chamando `SyncQueueHandler.send(action)`. Como não há backend neste protótipo, o handler grava a ação no `localStorage` como registro de sucesso.
