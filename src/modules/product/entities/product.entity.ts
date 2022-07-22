import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { User } from "../../user/entities/user.entity";
import { ProductCreateRequest } from "../dtos/requests/product-create.request";
import { ProductUpdateRequest } from "../dtos/requests/product-update.request";
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { ProductFilterRequest } from "../dtos/requests/product-filter.request";


export type ProductDocument = Product & Document;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  id: false,
})
export class Product {

  readonly _id?: string;
  /**
   * productName
   * 
   */
  @Prop({required : true})
  productName: string;
/**
   * productPrice
   */
  @Prop({required : true})
  productPrice: number;
/**
   * productDescription
   */
  @Prop({})
  productDecsription: string;
  

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  creatorId?: Types.ObjectId | User;

  createdBy?: User;

  /**
   * Parse UserCreateDto to Business.
   */
  static fromCreateRequest(request: ProductCreateRequest): Product {
    const product = new Product();
    product.productName = request.productName;
    product.productPrice = request.productPrice;
    product.productDecsription = request.productDecsription;    
    
    return product;
    // const product: Product = {
    //     productName: request.productName,
    //     productPrice: request.productPrice,
    //     productDecsription: request.productDecsription
    // }
    // return product;
  }

  /**
   * Parse BusinessUpdateDto to Business.
   */
  static fromUpdateRequest(request: ProductUpdateRequest): Product{
    const product = new Product();
    product.productName = request.productName;
    product.productPrice = request.productPrice;
    product.productDecsription  = request.productDecsription;
    
    return product;
  }
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.virtual('createdBy', {
  ref: 'User',
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
});
