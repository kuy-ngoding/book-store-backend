import { RajaOngkirCostResponse } from '../responses/rajaongkir-cost.response';
import { RajaOngkirProvinceResponse } from '../responses/rajaongkir-province.response';

export class RajaOngkirMapper {
  // public static toRajaongkir(order: Order): Rajaongkir {
  //   return {
  //     origin: order.shippingAddress.city.province.country.code,
  //     destination: order.shippingAddress.city.code,
  //     weight: order.totalWeight,
  //     courier: order.shippingMethod.code,
  //   };
  // }

  public static toCostResponse(response: any): RajaOngkirCostResponse {
    return {
      rajaongkir: {
        query: {
          origin: response.origin,
          destination: response.destination,
          weight: response.weight,
          courier: response.courier,
        },
        status: {
          code: response.status.code,
          description: response.status.description,
        },
        results: response.results,
      },
    };
  }

  public static toProvinceResponse<T>(
    response: any,
  ): RajaOngkirProvinceResponse<T> {
    return {
      rajaongkir: {
        query: {
          id: response.query.id,
        },
        status: {
          code: response.status.code,
          description: response.status.description,
        },
        results: response.results,
      },
    };
  }

  // public static toCityResponse(response: Rajaongkir): RajaongkirCityResponse {
  //   return {
  //     rajaongkir: {
  //       query: {
  //         id: response.query.id,
  //       },
  //       status: {
  //         code: response.status.code,
  //         description: response.status.description,
  //       },
  //       results: response.results,
  //     },
  //   };
  // }

  //   public static toCostResponse(response: Rajaongkir): RajaongkirCostResponse {
  //     return {
  //       rajaongkir: {
  //         query: {
  //           origin: response.origin,
  //           destination: response.destination,
  //           weight: response.weight,
  //           courier: response.courier,
  //         },
  //         status: {
  //           code: response.status.code,
  //           description: response.status.description,
  //         },
  //         results: response.results,
  //       },
  //     };
  //   }
}
