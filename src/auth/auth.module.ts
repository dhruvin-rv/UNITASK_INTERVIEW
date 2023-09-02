import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { JWT } from 'src/common/enums/global.enum';
import { CryptoService } from 'src/common/services/encryption.service';

@Module({
  providers: [AuthService, UsersService, CryptoService],
  controllers: [AuthController],
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: JWT.SECRET,
      signOptions: { expiresIn: '12h' },
    }),
  ],
})
export class AuthModule {}
