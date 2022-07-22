import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { BaseFilterRequest } from '../../../../core/dto/base-filter-request.dto';

export class ProductFilterRequest extends BaseFilterRequest {
   
  /**
   * product name for filterRequest
   */
  @ApiPropertyOptional() 
  @IsOptional()
  @IsString()
  productName?: string;

  /**
   * product price for filterRequest
   */
 
  @IsOptional()
  @IsNumber()
  @Min(1)
  productPrice?: number;
  
  /**
   * product description for filterRequest
   */
  
  @IsOptional()
  @IsString()
  productDecsription?: string;

  // export class UserFilterRequest extends BaseFilterRequest {
  //   @IsOptional()
  //   @IsString()
  //   username?: string;
  
  //   @IsOptional()
  //   @IsString()
  //   fullName?: string;
  
  //   @IsOptional()
  //   @IsString()
  //   email?: string;
  
  //   @IsOptional()
  //   role?: RoleEnum;
  
  //   @IsOptional()
  //   phoneNumber?: string;
  
  //   @IsOptional()
  //   @IsString()
  //   creatorId?: string;
  // }
}
