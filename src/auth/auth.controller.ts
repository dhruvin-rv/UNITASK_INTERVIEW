import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
  Req,
} from '@nestjs/common';
import { LoginDTO } from './dto/auth.dto';
import { UsersService } from 'src/users/users.service';
import { RESPONSE } from 'src/common/types/response.type';
import { HEADERS, RESPONSE_TYPE } from 'src/common/enums/global.enum';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Request } from 'express';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}
  @Post('login')
  async login(@Body() data: LoginDTO): Promise<RESPONSE> {
    try {
      const check = await this.userService.getUser(data.email);
      if (!check) {
        return { status: RESPONSE_TYPE.FAIL, message: 'User does not exist' };
      }
      const login = await this.authService.login(data);
      if (!login.status) {
        return {
          status: RESPONSE_TYPE.AUTH_FAIL,
          message: 'Email or password is wrong',
        };
      } else if (login.status && login.token) {
        return {
          status: RESPONSE_TYPE.SUCCESS,
          message: 'User LoggedIn successfully',
          data: { token: login.token },
        };
      }
    } catch (error) {
      console.log(error);
      if (error)
        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }

  @Post('logout')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async logout(@Req() request: Request): Promise<RESPONSE> {
    try {
      const user = request[HEADERS.AUTH_USER_DETAILS];
      await this.authService.logout(user.email);
      return {
        status: RESPONSE_TYPE.SUCCESS,
        message: 'User loggedOut successfully',
      };
    } catch (error) {
      if (error)
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }
}
