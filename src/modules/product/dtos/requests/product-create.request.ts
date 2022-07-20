import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class ProductCreateRequest {
      /**
   * product name for product creation requests
   */
    @IsString()
    @IsNotEmpty()
    productName: string;

      /**
   * product price for product creation requests
   */
    @IsNumber()
    @Min(1)
    productPrice: number;
    
      /**
   * Product description for product creation requests
   */
    @IsOptional()
    @IsString()
    productDecsription?: string;
}
