import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class Generate2FAResponse {
  @ApiProperty()
  @IsString()
  otpUrl?: string;

  @ApiProperty()
  @IsString()
  otpSecret?: string;
}
