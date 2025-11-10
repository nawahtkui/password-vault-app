import CryptoJS from 'crypto-js';
import { randomUUID } from 'crypto';

const MASTER_SALT = process.env.MASTER_ENCRYPTION_SALT || 'default_salt_change_me';

export function deriveKey(userPassword) {
  return CryptoJS.SHA256(userPassword + MASTER_SALT).toString();
}

export function encrypt(plainText, keyHex) {
  const iv = randomUUID().slice(0, 16);
  const ciphertext = CryptoJS.AES.encrypt(plainText, keyHex + iv).toString();
  return { ciphertext, iv };
}

export function decrypt(ciphertext, keyHex, iv) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, keyHex + iv);
  return bytes.toString(CryptoJS.enc.Utf8);
}
