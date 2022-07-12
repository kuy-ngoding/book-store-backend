import { IsOptional, IsString } from 'class-validator';
import { BaseFilterRequest } from '../../../../core/dto/base-filter-request.dto';

export class ProfileFilterRequest extends BaseFilterRequest {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  businessId?: string;
}
