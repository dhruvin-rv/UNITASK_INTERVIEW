import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Min } from 'class-validator';

export class LoginDTO {
  /**
   * The email address of the user.
   * @example dhruvin@example.com
   */
  @ApiProperty({
    example: 'dhruvin@example.com',
    description: 'The email address of the user',
  })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
  /**
   * The password for the user.
   * @example secret_password
   */
  @ApiProperty({
    example: 'secret_password',
    description: 'The password for the user',
  })
  @IsNotEmpty()
  @IsString()
  @Min(8)
  readonly password: string;
}
