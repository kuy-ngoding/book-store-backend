import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

/**
 * a DTO class for Reset Password Request
 */
export class ResetPasswordRequest {
  /**
   * User email
   * @type {string}
   * @memberof ResetPasswordDto
   * @property
   */
  @ApiProperty({
    description: 'User email',
    required: true,
    type: String,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /**
   * the password of the user
   * @type {string}
   * @memberof ResetPasswordDto
   * @property
   */
  @IsString()
  @IsNotEmpty()
  password: string;

  /**
   * the confirm password of the user
   * @type {string}
   * @memberof ResetPasswordDto
   * @property
   */
  @IsString()
  @IsNotEmpty()
  confirmPassword: string;
}
