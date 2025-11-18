// Integrações com APIs externas

const Integrations = {
  // API da Bíblia (Bible API)
  async getVersiculo(livro, capitulo, versiculo, traducao = 'nvi') {
    try {
      // Usar API pública da Bíblia
      const url = `https://www.abibliadigital.com.br/api/verses/${traducao}/${livro}/${capitulo}/${versiculo}`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar versículo:', error);
      return null;
    }
  },
  
  async buscarVersiculos(termo) {
    try {
      const url = `https://www.abibliadigital.com.br/api/verses/${traducao}/search/${encodeURIComponent(termo)}`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar versículos:', error);
      return null;
    }
  },
  
  // Text-to-Speech
  speak(text, lang = 'pt-BR') {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      speechSynthesis.speak(utterance);
      return true;
    }
    return false;
  },
  
  stopSpeaking() {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
  },
  
  // Avataaars (já usado nos componentes)
  getAvatarUrl(seed) {
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
  },
  
  // Dicionário (API pública)
  async buscarPalavra(palavra) {
    try {
      // Usar API de dicionário público
      const url = `https://api.dicionario-aberto.net/word/${encodeURIComponent(palavra)}`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar palavra:', error);
      return null;
    }
  },
  
  // Notificações Push
  async requestNotificationPermission() {
    if ('Notification' in window && 'serviceWorker' in navigator) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  },
  
  async subscribeToPush() {
    if (!('serviceWorker' in navigator)) {
      return null;
    }
    
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: null // Em produção, usar VAPID key
      });
      
      return subscription;
    } catch (error) {
      console.error('Erro ao inscrever em push:', error);
      return null;
    }
  }
};

// Exportar para uso global
window.Integrations = Integrations;

