import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { response } from 'express';
import { Connection } from 'nodemailer/lib/mailer';
import { ProductCreateRequest } from '../dtos/requests/product-create.request';
import { ProductUpdateRequest } from '../dtos/requests/product-update.request';
import { Product } from '../entities/product.entity';
import { ProductRepository } from '../repositories/product.repository';

@Injectable()
export class ProductsService {
 
 
  constructor(
    @InjectConnection() private readonly connection: Connection,
    private productRepository: ProductRepository,
  ) {}

  // create a new product
  productCreate(productCreateRequest: ProductCreateRequest) {
    const productData = Product.fromCreateRequest(productCreateRequest);
    return this.productRepository.createProduct(productData);
  }

//  async updateProduct(productUpdateRequest: ProductUpdateRequest, id: string):Promise<Product> {
//     const productData = Product.fromUpdateRequest(productUpdateRequest);
//     return await this.productRepository.updateProduct (id, productData);
//   }

  // updateProduct from createProduct
  async updateProduct(
    id: string,
    productData: ProductUpdateRequest,
  ): Promise<Product> {
    const updateData = Product.fromUpdateRequest(productData);
    return await this.productRepository.updateProduct(id, updateData);
  }
  
  // find product from id
  async findProductById(id: string): Promise<Product> {
    const findProductById = await this.productRepository.findProductById(id);
   
    if (!findProductById) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return findProductById;
  
  }

  // find all products
  async findAll(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }
 
  // delete product by id 
  deleteProductById(id: string): Promise<Product>{
    return this.productRepository.deleteById(id);
  }
}
