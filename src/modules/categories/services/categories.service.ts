import { Injectable } from '@nestjs/common';
import { CategoryCreateRequest } from '../dto/request/category-create.request';
import { CategoryUpdateRequest } from '../dto/request/category-update.request';
import { Category } from '../entities/category.entity';
import { CategoryRepository } from '../repositories/category.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  
  createCategory(
    createRequest: CategoryCreateRequest,
  ): Promise<Category> {
    const profile = Category.fromCreateRequest(createRequest);
    return this.categoryRepository.create(profile);
  }
  
  // createCategory(categoryCreateRequest: CategoryCreateRequest) {
  //   return 'This action adds a new category';
  // }


  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  async updateCategory(
    id: string,
    updateRequest: CategoryUpdateRequest,
    ): Promise<Category> {
      const categoryUpdateData = Category.fromUpdateRequest(updateRequest);
      const updatedCategory = await this.categoryRepository.update(
        id,
        updateRequest,
      );
    return;
  }
  

  deleteCategory(
    id: string,
    ): Promise<Category> {
    return this.categoryRepository.delete(id);
  }
}
