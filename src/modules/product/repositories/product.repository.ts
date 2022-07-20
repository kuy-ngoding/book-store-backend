import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Product, ProductDocument } from "../entities/product.entity";
import { Model, Types, ClientSession } from 'mongoose';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  
  async createProduct(productData: Product): Promise<Product> {
    return await this.productModel.create(productData);    
  }

  async updateProduct(
    id: string,
    productData: Product,
  ): Promise<Product> {
    const productId = new Types.ObjectId(id);
    return this.productModel.findByIdAndUpdate(productId, productData, {
      new: true,
    });
  }


}   