import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
// In production, this should be a strong 32-byte hex string in .env
// We'll use a hardcoded fallback ONLY if env is missing, for immediate development.
const SECRET_KEY_HEX = process.env.ENCRYPTION_KEY || crypto.randomBytes(32).toString('hex');

// Ensure the key is exactly 32 bytes (64 hex characters)
const getSecretKey = () => {
  if (SECRET_KEY_HEX.length !== 64) {
    // If someone provided a bad key, hash it to make it 32 bytes
    return crypto.createHash('sha256').update(String(SECRET_KEY_HEX)).digest();
  }
  return Buffer.from(SECRET_KEY_HEX, 'hex');
};

export function encrypt(text: string): string {
  if (!text) return text;
  try {
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv(ALGORITHM, getSecretKey(), iv);
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag().toString('hex');
    
    // Format: iv:authTag:encryptedText
    return `${iv.toString('hex')}:${authTag}:${encrypted}`;
  } catch (error) {
    console.error("Encryption failed:", error);
    return "";
  }
}

export function decrypt(encryptedText: string): string {
  if (!encryptedText) return encryptedText;
  try {
    const parts = encryptedText.split(':');
    if (parts.length !== 3) return "";
    
    const [ivHex, authTagHex, encryptedHex] = parts;
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    const encrypted = Buffer.from(encryptedHex, 'hex');
    
    const decipher = crypto.createDecipheriv(ALGORITHM, getSecretKey(), iv);
    decipher.setAuthTag(authTag);
    
    let decrypted = decipher.update(encrypted, undefined, 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  } catch (error) {
    console.error("Decryption failed:", error);
    return "";
  }
}
