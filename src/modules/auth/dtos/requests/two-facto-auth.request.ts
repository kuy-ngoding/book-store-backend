import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

/**
 * a DTO class for 2FA
 */
export class TwoFactorAuthRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  code: string; // the code
}
