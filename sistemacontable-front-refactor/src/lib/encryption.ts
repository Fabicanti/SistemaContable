import CryptoJS from 'crypto-js';

/**
 * Obtengo el token JWT del navegador (desde las cookies)
 */
const getEncryptionKey = (): string => {
  if (typeof window === 'undefined') return '';
  
  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('access_token='))
    ?.split('=')[1];
  
  return token || 'default-key';
};

/**
 * Encripta datos usando el token JWT como clave
 */
export const encryptData = (data: any): string => {
  try {
    const key = getEncryptionKey();
    const jsonString = JSON.stringify(data);
    return CryptoJS.AES.encrypt(jsonString, key).toString();
  } catch (error) {
    console.error('Error encriptando datos:', error);
    return '';
  }
};

/**
 * Desencripta datos usando el token JWT como clave
 */
export const decryptData = (encryptedData: string): any => {
  try {
    const key = getEncryptionKey();
    const decrypted = CryptoJS.AES.decrypt(encryptedData, key).toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  } catch (error) {
    console.error('Error desencriptando datos:', error);
    return null;
  }
};
