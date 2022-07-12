import { OrderStatus } from '../../../enums/order-status.enum';
import { PaymentStatus } from '../../../enums/payment-status.enum';

export class OrderCreateRequest {
  userId?: string;

  customer: {
    name: string;
    phone: string;
    address: string;
  };

  adminFee?: number;

  packagingPrice?: number;

  subTotalPrice?: number;

  deliveryPrice?: number;

  totalPrice?: number; // subTotalPrice + deliveryPrice

  /**
   * Nomer Resi
   */
  trackingNumber?: number;

  public setTotalPrice(totalPrice: number): void {
    this.totalPrice = totalPrice;
  }

  public getTotalPrice(): number {
    return this.subTotalPrice + this.deliveryPrice;
  }

  public paymentStatus?: PaymentStatus;

  public orderStatus?: OrderStatus;

  public createdBy?: string;

  public updatedBy?: string;

  public processAt?: Date;

  public paidAt?: Date;

  public expiredAt?: string;
}
