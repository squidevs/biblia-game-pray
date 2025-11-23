const CACHE_PREFIX = "bgp-cache:";
const DEFAULT_TTL_MS = 5 * 60 * 1000; // 5 minutos

// Configuração global do jogo
let globalConfig = null;

const storage = (() => {
  try {
    return window.localStorage;
  } catch {
    return {
      getItem: () => null,
      setItem: () => undefined,
      removeItem: () => undefined,
    };
  }
})();

function getCacheKey(resource) {
  return `${CACHE_PREFIX}${resource}`;
}

function readCache(key) {
  const raw = storage.getItem(key);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (Date.now() - parsed.timestamp > (parsed.ttl ?? DEFAULT_TTL_MS)) {
      storage.removeItem(key);
      return null;
    }
    return parsed.data;
  } catch {
    storage.removeItem(key);
    return null;
  }
}

function writeCache(key, data, ttl = DEFAULT_TTL_MS) {
  try {
    storage.setItem(
      key,
      JSON.stringify({
        timestamp: Date.now(),
        ttl,
        data,
      })
    );
  } catch {
    /* silencia storage cheio */
  }
}

/**
 * Lê um JSON local com cache simples em localStorage.
 * @param {string} path Caminho relativo do arquivo em /dados.
 * @param {Object} options Configurações opcionais.
 * @param {number} options.ttlMs Tempo de vida do cache em ms.
 * @param {boolean} options.forceRefresh Ignora o cache atual.
 */
export async function fetchJSON(path, options = {}) {
  // Se já começa com dados/, usa direto. Senão, adiciona dados/
  let resource = path.startsWith("dados/") ? path : `dados/${path}`;
  const cacheKey = getCacheKey(resource);

  if (!options.forceRefresh) {
    const cached = readCache(cacheKey);
    if (cached) {
      console.log(`[fetchJSON] Cache hit: ${resource}`);
      return cached;
    }
  }

  try {
    const response = await fetch(resource, {
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      // Fallback: tenta sem dados/ se falhar
      if (resource.startsWith("dados/")) {
        console.warn(`[fetchJSON] Falha ao carregar ${resource}, tentando sem dados/`);
        resource = path;
        const fallbackResponse = await fetch(resource, {
          headers: { "Content-Type": "application/json" },
        });
        if (!fallbackResponse.ok) {
          throw new Error(`Falha ao carregar ${resource}: ${fallbackResponse.status}`);
        }
        const data = await fallbackResponse.json();
        writeCache(cacheKey, data, options.ttlMs);
        return data;
      }
      throw new Error(`Falha ao carregar ${resource}: ${response.status}`);
    }

    const data = await response.json();
    writeCache(cacheKey, data, options.ttlMs);
    console.log(`[fetchJSON] Carregado: ${resource}`);
    return data;
  } catch (error) {
    console.error(`[fetchJSON] Erro ao carregar ${resource}:`, error);
    throw error;
  }
}

export function clearJSONCache(path) {
  if (path) {
    storage.removeItem(getCacheKey(path));
    return;
  }

  Object.keys(storage).forEach((key) => {
    if (key.startsWith(CACHE_PREFIX)) {
      storage.removeItem(key);
    }
  });
}

/**
 * Carrega configuração global do jogo conforme especificação
 */
export async function loadGlobalConfig() {
  if (globalConfig) return globalConfig;
  
  try {
    const config = await fetchJSON("config_global.json");
    globalConfig = config.config_global || config;
    console.log("[Config] Configuração global carregada");
    return globalConfig;
  } catch (error) {
    console.error("[Config] Falha ao carregar config_global.json", error);
    // Fallback conforme BIBLIA_GAMEPRAY_SPEC.md
    globalConfig = {
      economia: {
        moeda_nome: "Ouro da Fé",
        moeda_simbolo: "●"
      },
      parametrosJogo: {
        hearts_base: 5,
        heart_regen_minutes: 60,
        max_slots_per_tipo: {
          permanente: 6,
          consumivel: 6,
          armadura: 6
        }
      },
      espiritoSanto: {
        reduzPorHora: 1,
        travaBatizado: 50,
        travaNaoBatizado: 15,
        notificacoes: [85, 70, 55, 40, 25, 10]
      }
    };
    return globalConfig;
  }
}

/**
 * Retorna símbolo da moeda (●)
 */
export function getCurrencySymbol() {
  return globalConfig?.economia?.moeda_simbolo || "●";
}

/**
 * Retorna nome da moeda (Ouro da Fé)
 */
export function getCurrencyName() {
  return globalConfig?.economia?.moeda_nome || "Ouro da Fé";
}

/**
 * Retorna configuração global
 */
export function getGlobalConfig() {
  return globalConfig;
}

