import { PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { CategoryCreateRequest } from './category-create.request';

export class CategoryUpdateRequest extends PartialType(CategoryCreateRequest) {
    @IsString()
    @IsOptional()
    categoryName: string; 
}
