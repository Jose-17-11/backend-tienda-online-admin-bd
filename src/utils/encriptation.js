import crypto from 'crypto';
import bcrypt from 'bcrypt';

// Configuración para bcrypt
const saltRounds = 10;

// Configuración para crypto (AES-256-CBC)
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'default-key-32-chars-123456789012'; // 32 caracteres
const IV_LENGTH = 16; // Para AES, siempre es 16

// Encriptar datos sensibles (como correo)
export function encrypt(text) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

// Desencriptar datos
export function decrypt(text) {
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

// Hash de contraseñas con bcrypt
export async function hashPassword(password) {
  return await bcrypt.hash(password, saltRounds);
}

// Comparar contraseña con hash
export async function comparePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}