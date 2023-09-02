import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/user.dto';
import { HEADERS, RESPONSE_TYPE } from 'src/common/enums/global.enum';
import { RESPONSE } from 'src/common/types/response.type';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Request } from 'express';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async signUp(@Body() data: CreateUserDTO): Promise<RESPONSE> {
    try {
      const exist = await this.userService.getUser(data.email);
      if (exist) {
        return { status: RESPONSE_TYPE.FAIL, message: 'User already exist' };
      }
      const create = await this.userService.createUser(data);
      if (create) {
        return {
          status: RESPONSE_TYPE.SUCCESS,
          message: 'User created successfully',
        };
      } else {
        return { status: RESPONSE_TYPE.FAIL, message: 'Failed to create user' };
      }
    } catch (error) {
      if (error)
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('me')
  async profile(@Req() request: Request): Promise<RESPONSE> {
    try {
      const token = request[HEADERS.AUTH_USER_DETAILS];
      const user = await this.userService.getUser(token.email);
      if (user) {
        return {
          status: RESPONSE_TYPE.SUCCESS,
          message: 'Profile loaded',
          data: { email: user.email, name: user.name },
        };
      } else {
        return {
          status: RESPONSE_TYPE.FAIL,
          message: 'Failed to load profile',
        };
      }
    } catch (error) {
      if (error)
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }
}
