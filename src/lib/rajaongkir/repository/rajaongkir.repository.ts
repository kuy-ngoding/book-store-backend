import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { lastValueFrom, map, Observable } from 'rxjs';
import { RajaOngkirMapper } from '../domains/mappers/rajaongkir.mapper';
import { RajaOngkirProvinceModel } from '../domains/models/rajaongkir-province.model';
import { RajaOngkirBaseResponse } from '../domains/responses/rajaongkir-base.response';
import { RajaOngkirCostResponse } from '../domains/responses/rajaongkir-cost.response';
import { RajaOngkirProvinceResponse } from '../domains/responses/rajaongkir-province.response';
import { RAJAONGKIR_MODULE_OPTIONS } from '../rajaongkir.constant';
import { RajaOngkirModuleOptions } from '../rajaongkir.options';

@Injectable()
export class RajaOngkirRepository {
  constructor(
    private httpService: HttpService,
    @Inject(RAJAONGKIR_MODULE_OPTIONS)
    private readonly options: RajaOngkirModuleOptions,
  ) {}

  public async getCost(
    origin: string,
    destination: string,
    weight: number,
  ): Promise<RajaOngkirCostResponse> {
    const response =
      await this.httpService.axiosRef.get<RajaOngkirCostResponse>(
        `https://pro.rajaongkir.com/api/cost`,
        {
          headers: {
            key: this.options.apiKey,
          },
          params: {
            origin,
            destination,
            weight,
            courier: 'jne',
          },
        },
      );

    return RajaOngkirMapper.toCostResponse(response);
  }

  public getProvince(): Observable<RajaOngkirProvinceModel[]> {
    const response = this.httpService
      .get<RajaOngkirBaseResponse<RajaOngkirProvinceModel[]>>(
        `https://pro.rajaongkir.com/api/province`,
        {
          headers: {
            key: this.options.apiKey,
          },
        },
      )
      .pipe(map((response) => response.data?.rajaongkir?.results ?? []));

    return response;
  }

  public async getProvinceById(
    id: string,
  ): Promise<RajaOngkirProvinceResponse<RajaOngkirProvinceModel>> {
    const response = await this.httpService.axiosRef.get<
      RajaOngkirProvinceResponse<RajaOngkirProvinceModel[]>
    >(`https://pro.rajaongkir.com/api/province`, {
      headers: {
        key: this.options.apiKey,
      },
      params: {
        id,
      },
    });

    return RajaOngkirMapper.toProvinceResponse(response);
  }
}
