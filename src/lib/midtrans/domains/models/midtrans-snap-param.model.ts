import { MidtransPaymentMethod } from '../../enums/midtrans-payment-method.enum';
import { MidtransCallbacksModel } from './midtrans-callbacks.model';
import { MidtransCustomerDetailsModel } from './midtrans-customer-details.model';
import { MidtransExpiryModel } from './midtrans-expiry.model';
import { MidtransItemDetailsModel } from './midtrans-item-details.model';
import { MidtransTransactionDetailsModel } from './midtrans-transaction-details.model';

export class MidtransSnapParamModel {
  public transaction_details: MidtransTransactionDetailsModel;
  public customer_details?: MidtransCustomerDetailsModel;
  public item_details?: MidtransItemDetailsModel[];
  public payment_type?: string = 'bank_transfer';
  public enabled_payments?: MidtransPaymentMethod[] = [
    MidtransPaymentMethod.CREDIT_CARD,
    MidtransPaymentMethod.MANDIRI_CLICKPAY,
    MidtransPaymentMethod.CIMB_CLICKS,
    MidtransPaymentMethod.BCA_KLIKBCA,
    MidtransPaymentMethod.BCA_KLIKPAY,
    MidtransPaymentMethod.BRI_EPAY,
    MidtransPaymentMethod.ECHANNEL,
    MidtransPaymentMethod.MANDIRI_ECASH,
    MidtransPaymentMethod.PERMATA_VA,
    MidtransPaymentMethod.BCA_VA,
    MidtransPaymentMethod.BNI_VA,
    MidtransPaymentMethod.OTHER_VA,
    MidtransPaymentMethod.GOPAY,
    MidtransPaymentMethod.INDOMARET,
    MidtransPaymentMethod.ALFAMART,
    MidtransPaymentMethod.DANAMON_ONLINE,
    MidtransPaymentMethod.AKULAKU,
  ];
  public callbacks?: MidtransCallbacksModel;
  public expairy?: MidtransExpiryModel;

  constructor(
    transaction_details: MidtransTransactionDetailsModel,
    customer_details?: MidtransCustomerDetailsModel,
    item_details?: MidtransItemDetailsModel[],
    payment_type?: string,
    enabled_payments?: MidtransPaymentMethod[],
    callbacks?: MidtransCallbacksModel,
    expairy?: MidtransExpiryModel,
  ) {
    this.transaction_details = transaction_details;
    this.customer_details = customer_details;
    this.item_details = item_details;
    this.payment_type = payment_type;
    this.enabled_payments = enabled_payments;
    this.callbacks = callbacks;
    this.expairy = expairy;
  }
}
