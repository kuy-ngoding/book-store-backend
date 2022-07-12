export class RajaOngkirCityModel {
  public city_id: number;
  public province_id: number;
  public province: string;
  public type: string;
  public city_name: string;
  public postal_code: string;

  constructor(
    city_id: number,
    province_id: number,
    province: string,
    type: string,
    city_name: string,
    postal_code: string,
  ) {
    this.city_id = city_id;
    this.province_id = province_id;
    this.province = province;
    this.type = type;
    this.city_name = city_name;
    this.postal_code = postal_code;
  }
}
