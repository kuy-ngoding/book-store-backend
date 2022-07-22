import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'nodemailer/lib/mailer';
import { ProductCreateRequest } from '../dtos/requests/product-create.request';
import { ProductFilterRequest } from '../dtos/requests/product-filter.request';
import { ProductUpdateRequest } from '../dtos/requests/product-update.request';
import { Product } from '../entities/product.entity';
import { ProductRepository } from '../repositories/product.repository';

@Injectable()
export class ProductsService {
 
  constructor(
    @InjectConnection() private readonly connection: Connection,
    private productRepository: ProductRepository,
  ) {}

  productCreate(productCreateRequest: ProductCreateRequest) {
    const productData = Product.fromCreateRequest(productCreateRequest);
    return this.productRepository.createProduct(productData);
  }

  findAll(productCreateRequest: ProductCreateRequest) {
    const productData = Product.fromCreateRequest(productCreateRequest);
    return this.productRepository.createProduct(productData);
  }


//  async updateProduct(productUpdateRequest: ProductUpdateRequest, id: string):Promise<Product> {
//     const productData = Product.fromUpdateRequest(productUpdateRequest);
//     return await this.productRepository.updateProduct (id, productData);
//   }

  async updateProduct(
    id: string,
    productData: ProductUpdateRequest,
  ): Promise<Product> {
    const updateData = Product.fromUpdateRequest(productData);
  
    return await this.productRepository.updateProduct(id, updateData);
  }
  


}
