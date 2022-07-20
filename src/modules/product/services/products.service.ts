import { Injectable } from '@nestjs/common';
import { ProductCreateRequest } from '../dtos/requests/product-create.request';
import { ProductFilterRequest } from '../dtos/requests/product-filter.request';
import { ProductUpdateRequest } from '../dtos/requests/product-update.request';
import { Product } from '../entities/product.entity';
import { ProductRepository } from '../repositories/product.repository';

@Injectable()
export class ProductsService {
  async findById(id: string): Promise<Product> {
    return this.productRepository.getOrderById(id);
  }
   
  productRepository: any;

  productCreate(productCreateRequest: ProductCreateRequest) {
    const productData = Product.fromCreateRequest(productCreateRequest);
    return this.productRepository.createProduct(productData);
  }

  findAll(productCreateRequest: ProductCreateRequest) {
    const productData = Product.fromCreateRequest(productCreateRequest);
    return this.productRepository.createProduct(productData);
  }


 async updateProduct(productUpdateRequest: ProductUpdateRequest, id: string):Promise<Product> {
    const productData = Product.fromUpdateRequest(productUpdateRequest);
    return await this.productRepository.updateProduct (id, productData);
  }
  

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  async deletecById(id: string) {
    return this.productRepository.deleteById(id);
  }

}
