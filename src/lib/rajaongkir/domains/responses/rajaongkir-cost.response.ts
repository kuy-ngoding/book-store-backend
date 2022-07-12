export class RajaOngkirCostResponse {
  rajaongkir?: RajaOngkir<RajaOngkirCost[]>;
}

export interface RajaOngkir<T> {
  query?: Query;
  status?: Status;
  origin_details?: OriginDetails;
  destination_details?: DestinationDetails;
  results?: T;
}

export interface DestinationDetails {
  subdistrict_id?: string;
  province_id?: string;
  province?: string;
  city_id?: string;
  city?: string;
  type?: string;
  subdistrict_name?: string;
}

export interface OriginDetails {
  city_id?: string;
  province_id?: string;
  province?: string;
  type?: string;
  city_name?: string;
  postal_code?: string;
}

export interface Query {
  id?: string;
  origin?: string;
  originType?: string;
  destination?: string;
  destinationType?: string;
  weight?: number;
  courier?: string;
}

export interface RajaOngkirCost {
  code?: string;
  name?: string;
  costs?: ResultCost[];
}

export interface ResultCost {
  service?: string;
  description?: string;
  cost?: CostCost[];
}

export interface CostCost {
  value?: number;
  etd?: string;
  note?: string;
}

export interface Status {
  code?: number;
  description?: string;
}
