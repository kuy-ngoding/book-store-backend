import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { User } from "src/modules/user/entities/user.entity";
import { productDetailInterface } from "../interfaces/product-detail.interface";
import { OrderCreateRequest } from "../dto/requests/order-create.request";

export type OrderDocument = Order & Document;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  id: false,
})

export class Order {
    
    /**
     * Student Name
     * @example iyoy, kiru, umar
     */
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product' })
    productId: string;
     
    @Prop({ required: true })
    orderTotal: number;

    @Prop()
    orderNote:string;


    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  creatorId?: Types.ObjectId | User;

  createdBy?: User;


}
export const OrderSchema = SchemaFactory.createForClass(Order);

OrderSchema.virtual('createdBy', {
  ref: 'User',
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
});