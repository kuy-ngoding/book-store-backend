import { Controller, Get, Post, Body, Param, Delete, Res, Put, UseGuards, Query } from '@nestjs/common';
import {  ApiTags } from '@nestjs/swagger';
import { response, Response } from 'express';
import { BaseResponse } from '../../../core/dto/base-response';
import { baseResponseHelper } from '../../../core/helpers/base-response-helper';
import { ProductCreateRequest } from '../dtos/requests/product-create.request';
import { Product } from '../../product/entities/product.entity';
import { ProductsService } from '../../product/services/products.service';
import { ProductUpdateRequest } from '../dtos/requests/product-update.request';
import { ProductFilterRequest } from '../dtos/requests/product-filter.request';

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

  
  /**
   * Create Product
   */
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

  
  /**
   * Update Product 
   */
  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProduct: ProductUpdateRequest,
    @Res() res: Response,
  ): Promise<Response<BaseResponse<Product>>> {
    const result = await this.productsService.updateProduct(id, updateProduct);
    return baseResponseHelper(res, result);
    
  }
 
  
  /**
   * Get Product byId
   */
  @Get(':id')
  async findProductById( 
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response<BaseResponse<Product>>> {
    const product = await this.productsService.findProductById(id);
    return baseResponseHelper(res, product);
  }

  // Gett All Products 
  // @Get('/')
  // async findAll(
  //   @Param('getAll') getAll: string,
  //   @Res() res: Response,
  // ): Promise<Response<BaseResponse<Product>>> {
  //   const result = await this.productsService.findAll(getAll);
  //   return  baseResponseHelper(res, result);
    
  // }

  // findAll product  
  @Get()
  async findAll(
    @Res() res: Response,
  ): Promise<Response<BaseResponse<Product[]>>> {
    const product = await this.productsService.findAll();
    return baseResponseHelper(res, product);
  }

  


  // Delete Product
  @Delete(':id')
  async deleteProduct(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response<BaseResponse<Product>>> {
    const deletedProduct = await this.productsService.deleteProductById(id);
    return baseResponseHelper(res, deletedProduct);
  }

}
