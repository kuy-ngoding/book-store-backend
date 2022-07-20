import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class ProductRejectRequest {
  
  /**
   * product name for reject request
   */
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  productName?: string;

  /**
   * product price for reject request
   */
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  productPrice?:  number;

  /**
   * product description for reject request
   */
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  productDescription?: string;
}