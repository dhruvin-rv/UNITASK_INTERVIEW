import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { COLLECTION } from 'src/common/enums/collection.enum';
import { User } from './schema/user.schema';
import { CreateUserDTO } from './dto/user.dto';
import { HashingService } from 'src/common/services/hash.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(COLLECTION.USERS) private readonly userSchema: Model<User>,
    private readonly hashService: HashingService,
  ) {}

  /**
   * Retrieves a user by their email address from the database.
   * @param {string} email - The email address of the user to retrieve.
   * @returns {Promise<User | null>} A promise that resolves to the user object if found, or null if not found.
   * @throws {Error} Throws an error if there's an issue with the database query.
   */
  async getUser(email: string): Promise<User | null> {
    const user = await this.userSchema.findOne({ email: email });
    return user;
  }

  /**
   * Creates a new user in the database with the provided user data.
   *
   * @param {CreateUserDTO} data - The user data to be used for user creation.
   * @returns {Promise<boolean>} A promise that resolves to `true` if the user is successfully created, or `false` otherwise.
   * @throws {Error} Throws an error if there's an issue with hashing the password or creating the user.
   */
  async createUser(data: CreateUserDTO): Promise<boolean> {
    const hash = await this.hashService.hashPassword(data.password);
    const create = await this.userSchema.create({ ...data, password: hash });
    if (create) {
      return true;
    } else {
      return false;
    }
  }
}
