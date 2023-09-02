import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

interface comparePassword {
  plainPassword: string;
  hashedPassword: string;
}
@Injectable()
export class HashingService {
  /**
   * Hashes a plaintext password using bcrypt.
   *
   * @param {string} password - The plaintext password to hash.
   * @returns {Promise<string>} - A Promise that resolves to the hashed password.
   */
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 5;
    return bcrypt.hash(password, saltRounds);
  }

  /**
   * Compares a plaintext password with a hashed password to verify if they match.
   *
   * @param {Object} data - An object containing the plain password and the hashed password.
   * @param {string} data.plainPassword - The plaintext password to compare.
   * @param {string} data.hashedPassword - The hashed password to compare.
   * @returns {Promise<boolean>} - A Promise that resolves to `true` if the passwords match, `false` otherwise.
   */
  async comparePasswords(data: comparePassword): Promise<boolean> {
    return bcrypt.compare(data.plainPassword, data.hashedPassword);
  }
}
