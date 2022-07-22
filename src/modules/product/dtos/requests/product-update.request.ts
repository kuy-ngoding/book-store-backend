import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {  IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ProductCreateRequest} from './product-create.request';

export class ProductUpdateRequest extends PartialType(ProductCreateRequest) {
  
     /**
   * product name for product update requests
   */
  @ApiPropertyOptional()
  @IsString()
  productName: string;


  /**
   * product price for product update requests
   */
  @ApiPropertyOptional()
  @IsNumber()
  @Min(1)
  productPrice: number;
 
  /**
   * product description for product update requests
   */
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  productDecsription: string;
}


