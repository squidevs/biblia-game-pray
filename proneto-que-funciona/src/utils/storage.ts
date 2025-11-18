// Utilitário para localStorage com tratamento de erro
export const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return localStorage.getItem(key);
      }
    } catch (error) {
      // Silently fail in environments where localStorage is blocked
    }
    return null;
  },

  setItem: (key: string, value: string): boolean => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(key, value);
        return true;
      }
    } catch (error) {
      // Silently fail in environments where localStorage is blocked
    }
    return false;
  },

  removeItem: (key: string): boolean => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem(key);
        return true;
      }
    } catch (error) {
      // Silently fail in environments where localStorage is blocked
    }
    return false;
  },

  isAvailable: (): boolean => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        // Teste se podemos escrever/ler
        const testKey = '__test__';
        localStorage.setItem(testKey, 'test');
        localStorage.removeItem(testKey);
        return true;
      }
    } catch (error) {
      // localStorage not available - silent fail
    }
    return false;
  }
};