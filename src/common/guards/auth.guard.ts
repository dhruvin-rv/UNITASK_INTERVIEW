import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { HEADERS, JWT } from 'src/common/enums/global.enum';
import { CryptoService } from '../services/encryption.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly encryptionService: CryptoService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);
    if (!token) {
      throw new UnauthorizedException('User authorization token not found');
    }
    try {
      const payload = this.jwtService.verify(token, {
        secret: JWT.SECRET,
      });
      const decrypt = this.encryptionService.decrypt(payload.token);
      request[HEADERS.AUTH_USER_DETAILS] = JSON.parse(decrypt);
    } catch (e) {
      throw new UnauthorizedException(
        'Failed to verify the authorization token',
      );
    }
    return true;
  }

  private extractToken(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
