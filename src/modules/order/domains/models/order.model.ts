// Language: typescript
// Path: src/modules/order/domain/models/order.model.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { OrderStatus } from '../../enums/order-status.enum';
import { PaymentStatus } from '../../enums/payment-status.enum';
import { Types } from 'mongoose';
import { OrderCreateRequest } from '../../api/dtos/requests/order-create.request';
import { OrderUpdateRequest } from '../../api/dtos/requests/order-update.request';
import { User } from '../../../user/entities/user.entity';

export type OrderDocument = Order & Document;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  id: false,
})
export class Order {
  readonly _id?: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId?: Types.ObjectId;

  userDetails?: User;

  customer?: {
    name: string;
    phone: string;
    address: string;
  };

  @Prop({ default: 0 })
  adminFee?: number;

  @Prop({ default: 0 })
  packagingPrice?: number;

  @Prop({ default: 0 })
  subTotalPrice?: number;

  @Prop({ default: 0 })
  deliveryPrice?: number;

  @Prop({ default: 0 })
  totalPrice?: number; // subTotalPrice + deliveryPrice

  /**
   * Nomer Resi
   */
  @Prop({ default: null })
  trackingNumber?: number;

  @Prop({ default: null })
  notes?: string;

  public setTotalPrice(totalPrice: number): void {
    this.totalPrice = totalPrice;
  }

  public getTotalPrice(): number {
    return this.subTotalPrice + this.deliveryPrice;
  }

  @Prop({ enum: PaymentStatus, default: PaymentStatus.UNPAID })
  public paymentStatus?: PaymentStatus;

  @Prop({ enum: OrderStatus, default: OrderStatus.WAITING_FOR_PAYMENT })
  public orderStatus?: OrderStatus;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  public createdBy?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  public updatedBy?: Types.ObjectId;

  @Prop()
  public processAt?: Date;

  @Prop()
  public paidAt?: Date;

  @Prop()
  public expiredAt?: string;

  @Prop()
  public createdAt?: Date;

  @Prop()
  public updatedAt?: Date;

  @Prop()
  public callback_token?: string;

  @Prop()
  public redirect_url?: string;

  /**
   * Parse Create DTO to model.
   */
  static fromCreateRequest(request: OrderCreateRequest): Order {
    const order = new Order();
    order.userId = new Types.ObjectId(request.userId);
    order.customer = request.customer;
    order.adminFee = request.adminFee;
    order.packagingPrice = request.packagingPrice;
    order.subTotalPrice = request.subTotalPrice;
    order.deliveryPrice = request.deliveryPrice;
    order.totalPrice = request.totalPrice;
    order.trackingNumber = request.trackingNumber;
    order.paymentStatus = request.paymentStatus;
    order.orderStatus = request.orderStatus;
    order.processAt = request.processAt;
    order.paidAt = request.paidAt;
    order.expiredAt = request.expiredAt;
    return order;
  }

  /**
   * Parse Update DTO to model.
   */
  static fromUpdateRequest(request: OrderUpdateRequest): Order {
    const order = new Order();
    order.userId = new Types.ObjectId(request.userId);
    order.customer = request.customer;
    order.adminFee = request.adminFee;
    order.packagingPrice = request.packagingPrice;
    order.subTotalPrice = request.subTotalPrice;
    order.deliveryPrice = request.deliveryPrice;
    order.totalPrice = request.totalPrice;
    order.trackingNumber = request.trackingNumber;
    order.paymentStatus = request.paymentStatus;
    order.orderStatus = request.orderStatus;
    order.processAt = request.processAt;
    order.paidAt = request.paidAt;
    order.expiredAt = request.expiredAt;
    order.createdBy = new Types.ObjectId(request.createdBy);
    order.updatedBy = new Types.ObjectId(request.updatedBy);
    order.callback_token = request.callback_token;
    order.redirect_url = request.redirect_url;
    return order;
  }
}

export const OrderSchema = SchemaFactory.createForClass(Order);

OrderSchema.virtual('userDetails', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});
