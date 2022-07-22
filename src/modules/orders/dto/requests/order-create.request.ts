import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class OrderCreateRequest {

    @IsNotEmpty()
    @IsString()
    productId: string;
    
    @IsNotEmpty()
    @IsNumber()
    orderTotal: number;

    @IsOptional()
    orderNote:string;
}
