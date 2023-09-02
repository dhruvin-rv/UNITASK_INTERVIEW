import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { COLLECTION } from 'src/common/enums/collection.enum';
import { UserSchema } from './schema/user.schema';
import { HashingService } from 'src/common/services/hash.service';
import { CryptoService } from 'src/common/services/encryption.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: COLLECTION.USERS, schema: UserSchema }]),
  ],
  providers: [UsersService, HashingService, CryptoService],
  controllers: [UsersController],
  exports: [MongooseModule, UsersService, HashingService],
})
export class UsersModule {}
