import crypto from 'crypto';

export default class CryptoUtil {
  constructor(text) {
    this.algorithm = 'aes-256-ctr';
    this.password = process.env.CRYPTO_PASSWORD || 'abcdefghi';
    this.text = text;
  }
  
  encrypt() {
    let cipher = crypto.createCipher(this.algorithm, this.password);
    let c = cipher.update(this.text, 'utf8', 'hex');
    c += cipher.final('hex');
    return c;
  }
  
  decrypt() {
    let decipher = crypto.createDecipher(this.algorithm, this.password);
    let d = decipher.update(this.text, 'hex', 'utf8');
    d += decipher.final('utf8');
    return d;
  }
}