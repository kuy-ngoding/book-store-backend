export class MidtransItemDetailsModel {
  public id: string;
  public name: string;
  public price: number;
  public quantity: number;
  public brand?: string;
  public category?: string;
  public merchant_name?: string;

  constructor(
    id: string,
    name: string,
    price: number,
    quantity: number,
    brand: string,
    category: string,
    merchant_name: string,
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.brand = brand;
    this.category = category;
    this.merchant_name = merchant_name;
  }
}
