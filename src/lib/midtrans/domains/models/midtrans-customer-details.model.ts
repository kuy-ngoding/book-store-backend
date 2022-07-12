import { MidtransBillingAddressModel } from './midtrans-billing-address.model';
import { MidtransShippingAddressModel } from './midtrans-shipping-address.model';

export class MidtransCustomerDetailsModel {
  public first_name: string;
  public last_name?: string;
  public email?: string;
  public phone?: string;
  public billing_address?: MidtransBillingAddressModel;
  public shipping_address?: MidtransShippingAddressModel;

  constructor(
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    billing_address: MidtransBillingAddressModel,
    shipping_address: MidtransShippingAddressModel,
  ) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.billing_address = billing_address;
    this.shipping_address = shipping_address;
  }
}
