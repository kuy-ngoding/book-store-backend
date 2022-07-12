import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

/**
 * a DTO class for User Login
 * @class LoginDto
 * @export
 */
export class LoginRequest {
  /**
   * the username
   * @type {string}
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string; // the username

  /**
   * the password
   * @type {string}
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string; // the password
}
