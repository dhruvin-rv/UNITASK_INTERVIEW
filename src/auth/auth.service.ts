import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { COLLECTION } from 'src/common/enums/collection.enum';
import { User } from 'src/users/schema/user.schema';
import { LoginDTO } from './dto/auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { HashingService } from 'src/common/services/hash.service';
import { ILoginResponse } from './interface/auth.interface';
import { CryptoService } from 'src/common/services/encryption.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(COLLECTION.USERS) private readonly userSchema: Model<User>,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly hashService: HashingService,
    private readonly encryptionService: CryptoService,
  ) {}

  /**
   * Authenticates a user login using the provided login data.
   *
   * @param {LoginDTO} data - The login data containing email and password for authentication.
   * @returns {Promise<ILoginResponse>} A promise that resolves to an authentication response containing a status and a token if authentication is successful, or a status of 0 and a null token if authentication fails.
   * @throws {Error} Throws an error if there's an issue with user retrieval, password comparison, encryption, JWT signing, or database update.
   */
  async login(data: LoginDTO): Promise<ILoginResponse> {
    const user = await this.userService.getUser(data.email);
    const checkPassword = await this.hashService.comparePasswords({
      hashedPassword: user.password,
      plainPassword: data.password,
    });
    if (!checkPassword) return { status: 0, token: null };
    const encrypt = this.encryptionService.encrypt(
      JSON.stringify({
        _id: user._id,
        email: user.email,
        name: user.name,
      }),
    );
    const token = this.jwtService.sign({ token: encrypt });
    await this.userSchema.findOneAndUpdate(
      { email: data.email },
      { loggedIn: true, token: token },
    );
    return {
      status: 1,
      token: token,
    };
  }

  /**
   * Logs a user out by updating their token and login status in the database.
   *
   * @param {string} email - The email address of the user to log out.
   * @returns {Promise<void>} A promise that resolves once the user's logout status is updated in the database.
   * @throws {Error} Throws an error if there's an issue with updating the user's logout status in the database.
   */
  async logout(email: string): Promise<void> {
    await this.userSchema.findOneAndUpdate(
      { email: email },
      { token: null, loggedIn: false },
    );
  }
}
