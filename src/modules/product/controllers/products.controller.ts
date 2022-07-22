import { Controller, Get, Post, Body, Param, Delete, Res, Put, UseGuards } from '@nestjs/common';
import {  ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { BaseResponse } from '../../../core/dto/base-response';
import { baseResponseHelper } from '../../../core/helpers/base-response-helper';
import { ProductCreateRequest } from '../dtos/requests/product-create.request';
import { Product } from '../../product/entities/product.entity';
import { ProductsService } from '../../product/services/products.service';
import { ProductUpdateRequest } from '../dtos/requests/product-update.request';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  // //!TODO: as user can order contag card and pay with midtrans
  // /**
  //  * Endpoint for user to create order.
  //  * @params request order data to create.
  //  * @returns {Promise<Response<BaseResponse<Product>>>}
  //  */
  @Post()
  async create(
    @Body() request: ProductCreateRequest,
    @Res() res: Response,
  ): Promise<Response<BaseResponse<Product>>> {
    const result = await this.productsService.productCreate(request);
    const response = baseResponseHelper(res, result);
    return response;
  }
  // @Post()
  // async create(
  //   @Body() request: ProductCreateRequest,
  // ): Promise<Product> {
  //   return await this.productsService.productCreate(request);
  // }

  // @Post()
  // create(@Body() productCreateRequest: ProductCreateRequest) {
  //   return this.productsService.create(productCreateRequest);
  // }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProduct: ProductUpdateRequest,
    @Res() res: Response,
  ): Promise<Response<BaseResponse<Product>>> {
    const result = await this.productsService.updateProduct(id, updateProduct);
    
    return baseResponseHelper(res, result);
    
  }


 


}
