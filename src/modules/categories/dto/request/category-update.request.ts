import { PartialType } from '@nestjs/swagger';
import { CategoryCreateRequest } from './category-create.request';

export class CategoryUpdateRequest extends PartialType(CategoryCreateRequest) {}
