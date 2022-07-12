import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { RajaOngkirMapper } from '../domains/mappers/rajaongkir.mapper';
import { RajaOngkirProvinceModel } from '../domains/models/rajaongkir-province.model';
import { RajaOngkirCostResponse } from '../domains/responses/rajaongkir-cost.response';
import { RajaOngkirRepository } from '../repository/rajaongkir.repository';

@Injectable()
export class RajaOngkirService {
  constructor(private rajaOngkirRepository: RajaOngkirRepository) {}

  // public async getCost(
  //   origin: string,
  //   destination: string,
  //   weight: number,
  // ): Promise<RajaOngkirCostResponse> {
  //   // const response = await this.rajaongkirRepository.getCost(
  //   //   origin,
  //   //   destination,
  //   //   weight,
  //   // );
  //   const response =
  //     await this.httpService.axiosRef.get<RajaOngkirCostResponse>(
  //       `https://pro.rajaongkir.com/api/cost`,
  //       {
  //         params: {
  //           origin,
  //           destination,
  //           weight,
  //           courier: 'jne',
  //         },
  //       },
  //     );

  //   return RajaOngkirMapper.toCostResponse(response);
  // }

  public async getProvince(): Promise<RajaOngkirProvinceModel[]> {
    const province = this.rajaOngkirRepository.getProvince();
    const result = lastValueFrom(province);

    return result;
  }

  //   public async getCity(provinceId: number): Promise<RajaongkirCityResponse> {
  //     const response = await this.rajaongkirRepository.getCity(provinceId);
  //     return this.rajaongkirMapper.toCityResponse(response);
  //   }

  //   public async getSubdistrict(
  //     cityId: number,
  //   ): Promise<RajaongkirSubdistrictResponse> {
  //     const response = await this.rajaongkirRepository.getSubdistrict(cityId);
  //     return this.rajaongkirMapper.toSubdistrictResponse(response);
  //   }

  //   public async getCostByCity(
  //     origin: string,
  //     destination: string,
  //     weight: number,
  //     cityId: number,
  //   ): Promise<RajaongkirCostResponse> {
  //     const response = await this.rajaongkirRepository.getCostByCity(
  //       origin,
  //       destination,
  //       weight,
  //       cityId,
  //     );
  //     return this.rajaongkirMapper.toCostResponse(response);
  //   }
}
