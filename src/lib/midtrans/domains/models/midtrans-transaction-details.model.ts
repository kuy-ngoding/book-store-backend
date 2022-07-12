export class MidtransTransactionDetailsModel {
  public order_id: string;
  public gross_amount: number;

  constructor(order_id: string, gross_amount: number) {
    this.order_id = order_id;
    this.gross_amount = gross_amount;
  }
}
