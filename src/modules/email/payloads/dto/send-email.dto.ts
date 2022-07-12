import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { User } from '../../../user/entities/user.entity';

export class SendEmailDto {
  @ApiProperty()
  @IsEmail()
  reciver: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  subject?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  message?: string;

  @ApiPropertyOptional()
  @IsOptional()
  // @IsEnum(TemplateTheme)
  template?: string;

  @ApiPropertyOptional()
  @IsOptional()
  context?: { [key: string]: string };

  @ApiPropertyOptional()
  @IsOptional()
  user?: User;
}
