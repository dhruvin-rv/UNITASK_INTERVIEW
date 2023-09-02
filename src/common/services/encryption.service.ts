import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class CryptoService {
  private readonly algorithm = 'aes-256-ctr';
  private readonly key: string;
  private readonly iv: string;
  constructor() {
    this.key = process.env.ENCRYPTION_PRIVATE_KEY;
    this.iv = process.env.ENCRYPTION_IV;
  }
  encrypt(text: string): string {
    const cipher = crypto.createCipheriv(
      this.algorithm,
      Buffer.from(this.key, 'hex'),
      Buffer.from(this.iv, 'hex'),
    );
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('hex');
  }

  decrypt(text: string): string {
    const decipher = crypto.createDecipheriv(
      this.algorithm,
      Buffer.from(this.key, 'hex'),
      Buffer.from(this.iv, 'hex'),
    );
    const encryptedText = Buffer.from(text, 'hex');
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }
}
