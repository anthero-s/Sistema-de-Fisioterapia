const crypto = require('crypto');
require('dotenv').config();

class CryptoLGPD {
  constructor() {
    this.algorithm = 'aes-256-cbc';
    this.key = Buffer.from(process.env.LGPD_KEY, 'utf8');
    this.iv = Buffer.from(process.env.LGPD_IV, 'utf8');
  }

  criptografar(textoPlano) {
    const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
    let encrypted = cipher.update(textoPlano, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  descriptografar(textoCifrado) {
    try {
      const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
      let decrypted = decipher.update(textoCifrado, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      return decrypted;
    } catch {
      return '***.***.***-** (Protegido)';
    }
  }
}

module.exports = new CryptoLGPD();