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
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(1)
  productPrice?: number;
  
  /**
   * product description for filterRequest
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  productDecsription?: string;

}
