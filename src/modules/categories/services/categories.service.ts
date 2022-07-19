import { Injectable } from '@nestjs/common';
import { profile } from 'console';
import { Profile } from '../../profile/entities/profile.entity';
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


  findAll() {
    return `This action returns all categories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  updateCategory(
    updateRequest: CategoryUpdateRequest,
    ): Promise<Category> {
      const profile = Category.fromUpdateRequest(updateRequest);
      return this.categoryRepository.update(profile);
    // return `This action updates a #${id} category`;
  }

  deleteCategory(
    deleteRequest: CategoryUpdateRequest,
    ): Promise<Category> {
      const profile = Category.fromUpdateRequest(deleteRequest);
    return this.categoryRepository.delete(profile);
  }
}
