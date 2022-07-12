export class MidtransShippingAddressModel {
  public first_name: string;
  public last_name: string;
  public email: string;
  public phone: string;
  public address: string;
  public city: string;
  public postal_code: string;
  public country_code: string;

  constructor(
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    address: string,
    city: string,
    postal_code: string,
    country_code: string,
  ) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.city = city;
    this.postal_code = postal_code;
    this.country_code = country_code;
  }
}
