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

  @Post('/')
  async create(
    @Body() request: CategoryCreateRequest,
    @Res() res: Response,
  ): Promise<Response<BaseResponse<Category>>> {
    const result = await this.categoriesService.createCategory(request);
    const response = baseResponseHelper(res, result);
    return response;
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Put('/')
  async update(
    @Body() request: CategoryUpdateRequest,
    @Res() res: Response,
  ): Promise<Response<BaseResponse<Category>>> {
    const result = await this.categoriesService.updateCategory(request);
    const response = baseResponseHelper(res, result);
    return response;
  }

  @Delete('/')
  async delete(
    @Body() request: CategoryUpdateRequest,
    @Res() res: Response,
  ): Promise<Response<BaseResponse<Category>>> {
    const result = await this.categoriesService.deleteCategory(request);
    const response = baseResponseHelper(res, result);
    return response;
  }
}
