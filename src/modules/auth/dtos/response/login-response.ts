import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { User } from '../../../user/entities/user.entity';

export class LoginResponse {
  @ApiProperty()
  @IsString()
  accessToken?: string;

  @ApiProperty()
  user: User;
}
