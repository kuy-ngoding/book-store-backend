import { Response } from 'express';
import { Controller, Get, Post, Body, Patch, Put, Param, Delete, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryCreateRequest } from '../dto/request/category-create.request';
import { CategoryUpdateRequest } from '../dto/request/category-update.request';
import { CategoriesService } from '../services/categories.service';
import { baseResponseHelper } from '../../../core/helpers/base-response-helper';
import { Category } from '../entities/category.entity';
import { BaseResponse } from '../../../core/dto/base-response';
import { request } from 'http';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // @Post()
  // create(@Body() categoryCreateRequest: CategoryCreateRequest) {
  //   return this.categoriesService.create(categoryCreateRequest);
  // }

  @Post('/create-category')
  async create(
    @Body() request: CategoryCreateRequest,
    @Res() res: Response,
  ): Promise<Response<BaseResponse<Category>>> {
    const result = await this.categoriesService.createCategory(request);
    const response = baseResponseHelper(res, result);
    return response;
  }

  @Get('/')
  async findAll(
    @Res() res: Response,
  ): Promise<Response<BaseResponse<Category[]>>> {
    const result = await this.categoriesService.findAll();
    const response = baseResponseHelper(res, result);
    return response;
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Put('/update-category/:id')
  async update(
    @Param('id') id: string,
    @Body() updateRequest: CategoryUpdateRequest,
    @Res() res: Response,
  ): Promise<Response<BaseResponse<Category>>> {
    const result = await this.categoriesService.updateCategory(id, updateRequest);
    const response = baseResponseHelper(res, result);
    return response;
  }

  @Delete('/delete-category/:id')
  async delete(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response<BaseResponse<Category>>> {
    const result = await this.categoriesService.deleteCategory(id);
    const response = baseResponseHelper(res, result);
    return response;
  }
}
