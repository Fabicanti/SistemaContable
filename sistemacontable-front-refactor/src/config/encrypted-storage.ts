import { encryptData, decryptData } from '../lib/encryption';
import { StorageValue } from 'zustand/middleware';

/**
 * Storage personalizado para zustand que encripta/desencripta automáticamente
 */
export const createEncryptedStorage = () => ({
  getItem: (name: string) => {
    const item = localStorage.getItem(name);
    if (!item) return null;
    
    try {
      const parsed = JSON.parse(item);
      // Si state.accounts existe y está encriptado, desencriptarlo
      if (parsed.state?.accounts && typeof parsed.state.accounts === 'string') {
        parsed.state.accounts = decryptData(parsed.state.accounts);
      }
      return parsed as StorageValue<any>;
    } catch (error) {
      console.error('Error al desencriptar datos:', error);
      return null;
    }
  },

  setItem: (name: string, value: StorageValue<any>) => {
    try {
      const toStore = { ...value };
      // Si state.accounts existe, encriptarlo
      if (toStore.state?.accounts) {
        toStore.state.accounts = encryptData(toStore.state.accounts);
      }
      localStorage.setItem(name, JSON.stringify(toStore));
    } catch (error) {
      console.error('Error al encriptar datos:', error);
    }
  },

  removeItem: (name: string) => {
    localStorage.removeItem(name);
  },
});
