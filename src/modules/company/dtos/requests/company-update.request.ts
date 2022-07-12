import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CompanyStatus } from '../../enums/company-status.enum';
import { CompanyCreateRequest } from './company-create.request';

export class CompanyUpdateRequest extends PartialType(CompanyCreateRequest) {
  /**
   * Pic ID
   */
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  picId?: string;

  /**
   * Created By (userId)
   */
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  creatorId?: string;

  @ApiPropertyOptional()
  @IsEnum(CompanyStatus)
  @IsOptional()
  companyStatus?: CompanyStatus;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  rejectReason?: string;
}
