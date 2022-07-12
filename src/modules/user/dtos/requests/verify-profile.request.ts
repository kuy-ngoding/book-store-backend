import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';
import { User } from '../../entities/user.entity';
import { VerifyRejectReason } from '../../enums/verify-reject-reason.enum';

export class VerifyProfileDto {
  @ApiPropertyOptional()
  @IsOptional()
  user?: User;

  @ApiPropertyOptional()
  @Type(() => Number)
  verification_status: number;

  @IsOptional()
  @IsEnum(VerifyRejectReason)
  reason?: VerifyRejectReason;

  @ApiPropertyOptional()
  @IsOptional()
  description?: string;
}
