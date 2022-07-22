import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Product, ProductDocument } from "../entities/product.entity";
import { Model, Types } from 'mongoose';

@Injectable()
export class ProductRepository {
 
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  // create a new Product 
  async createProduct(productData: Product): Promise<Product> {
    return await this.productModel.create(productData);    
  }

  // update a ProductRepository
  async updateProduct(
    id: string,
    productData: Product,
  ): Promise<Product> {
    const productId = new Types.ObjectId(id);
    return await this.productModel.findByIdAndUpdate(productId, productData, {
      new: true,
    });
  }

  // getProductById 
  async findProductById(id: string): Promise<Product> {
    return this.productModel.findById(id).exec();
  }

  async findAll(): Promise<ProductDocument[]> {
    return await this.productModel.find();
  }

  async deleteById(id: string): Promise<Product> {
    return await this.productModel.findByIdAndDelete(id);
    
  }

}   