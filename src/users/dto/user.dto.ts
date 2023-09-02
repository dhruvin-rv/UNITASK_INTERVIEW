import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, Min } from 'class-validator';

/**
 * Data Transfer Object (DTO) for creating a new user.
 */
export class CreateUserDTO {
  /**
   * The name of the user.
   * @example dhruvin vaghasiya
   */
  @ApiProperty({
    example: 'Dhruvin Vaghasiya',
    description: 'The name of the user',
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  /**
   * The email address of the user.
   * @example dhruvin@example.com
   */
  @ApiProperty({
    example: 'dhruvin@example.com',
    description: 'The email address of the user',
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  /**
   * The password for the user.
   * @example secret_password
   */
  @ApiProperty({
    example: 'secret_password',
    description: 'The password for the user',
  })
  @IsString()
  @IsNotEmpty()
  @Min(8)
  readonly password: string;
}
