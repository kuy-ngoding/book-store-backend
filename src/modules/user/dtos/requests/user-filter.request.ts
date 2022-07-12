import { IsOptional, IsString } from 'class-validator';
import { BaseFilterRequest } from '../../../../core/dto/base-filter-request.dto';
import { RoleEnum } from '../../enums/role.enum';

export class UserFilterRequest extends BaseFilterRequest {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  role?: RoleEnum;

  @IsOptional()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  creatorId?: string;
}
