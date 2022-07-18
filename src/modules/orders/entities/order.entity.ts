import { Prop, Schema } from "@nestjs/mongoose";
import { Student } from "../../students/entities/student.entity";
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { User } from "src/modules/user/entities/user.entity";
import { OrderCreateRequest } from "../dto/requests/order-create.request";
import { OrderUpdateRequest } from "../dto/requests/order-update.request";

export type OrderDocument = Order & Document;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  id: false,
})

export class Order {
    readonly _id?: string;
    /**
     * Student Name
     * @example iyoy, kiru, umar
     */
    @Prop({ required: true })
    productName: string;

    @Prop({ required: true })
    productPrice: number;
    
    @Prop({ required: true })
    productTotal: number;




    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  creatorId?: Types.ObjectId | User;

  createdBy?: User;

   /**
   * Parse CreateStudentRequest to Student.
   */
    
    
    
}
