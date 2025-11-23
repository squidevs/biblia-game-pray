/**
 * Integração com Avataaars API
 * Gera avatares personalizados baseados em configurações
 */

const AVATAAARS_API = "https://avataaars.io/";

/**
 * Gera URL do avatar baseado em configurações
 * @param {Object} config - Configurações do avatar
 * @returns {string} URL do avatar
 */
export function generateAvatarURL(config = {}) {
  const params = new URLSearchParams();
  
  // Valores padrão
  const defaults = {
    topType: "ShortHairShortCurly",
    accessoriesType: "Blank",
    hairColor: "BrownDark",
    facialHairType: "Blank",
    clotheType: "Hoodie",
    clotheColor: "Black",
    eyeType: "Default",
    eyebrowType: "Default",
    mouthType: "Default",
    skinColor: "Light"
  };
  
  const finalConfig = { ...defaults, ...config };
  
  Object.entries(finalConfig).forEach(([key, value]) => {
    params.append(key, value);
  });
  
  return `${AVATAAARS_API}?${params.toString()}`;
}

/**
 * Gera SID (Seed ID) baseado nas configurações
 * @param {Object} config - Configurações do avatar
 * @returns {string} SID único
 */
export function generateSID(config) {
  const str = JSON.stringify(config, Object.keys(config).sort());
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return `avatar_${Math.abs(hash).toString(36)}`;
}

/**
 * Salva configuração do avatar no localStorage
 * @param {Object} config - Configurações do avatar
 * @param {string} sid - SID do avatar
 */
export function saveAvatarConfig(config, sid) {
  const avatarData = {
    sid,
    config,
    url: generateAvatarURL(config),
    updatedAt: new Date().toISOString()
  };
  
  localStorage.setItem('bgp-avatar-config', JSON.stringify(avatarData));
  return avatarData;
}

/**
 * Carrega configuração do avatar do localStorage
 * @returns {Object|null} Configuração do avatar ou null
 */
export function loadAvatarConfig() {
  const stored = localStorage.getItem('bgp-avatar-config');
  if (!stored) return null;
  
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

/**
 * Atualiza avatar no perfil do usuário
 * @param {string} sid - SID do avatar
 * @param {string} url - URL do avatar
 */
export async function updateProfileAvatar(sid, url) {
  // Atualiza no status do jogador
  try {
    const status = await window.BGP.fetchJSON('dados/status_player_base.json').catch(() => window.BGP.fetchJSON('status_player_base.json'));
    if (status && status.perfil) {
      status.perfil.avatar = url;
      status.perfil.avatarSid = sid;
      
      // Salva no localStorage (simulação de backend)
      localStorage.setItem('bgp-status-cache', JSON.stringify(status));
      
      console.log('[Avatar] Perfil atualizado:', { sid, url });
      return true;
    }
  } catch (error) {
    console.error('[Avatar] Erro ao atualizar perfil:', error);
  }
  
  return false;
}

