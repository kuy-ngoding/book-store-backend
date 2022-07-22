import { IsNotEmpty, IsString } from "class-validator";

export class CategoryCreateRequest {
    @IsString()
    @IsNotEmpty()
    categoryName: string; 
}
