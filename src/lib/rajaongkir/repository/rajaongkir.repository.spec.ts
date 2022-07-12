import { createMock } from '@golevelup/ts-jest';
import { HttpModule, HttpService } from '@nestjs/axios';
import { Test } from '@nestjs/testing';
import { AxiosResponse } from 'axios';
import { Observable, of, pipe } from 'rxjs';
import { RajaOngkirProvinceModel } from '../domains/models/rajaongkir-province.model';
import { RajaOngkirBaseResponse } from '../domains/responses/rajaongkir-base.response';
import { RajaOngkirCostResponse } from '../domains/responses/rajaongkir-cost.response';
import { RajaOngkirRepository } from './rajaongkir.repository';

// tests if the rajaongkir repository is defined with jest
describe('RajaOngkirRepository', () => {
  let rajaOngkirRepository: RajaOngkirRepository;
  let httpService: HttpService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        {
          provide: RajaOngkirRepository,
          useFactory: () => createMock<RajaOngkirRepository>(),
        },
        {
          provide: HttpService,
          useValue: {
            axiosRef: jest.fn(),
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    rajaOngkirRepository =
      moduleRef.get<RajaOngkirRepository>(RajaOngkirRepository);
    httpService = moduleRef.get<HttpService>(HttpService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(rajaOngkirRepository).toBeDefined();
  });

  describe('getCost', () => {
    it('should return a cost response', async () => {
      const origin = 'origin';
      const destination = 'destination';
      const weight = 1;

      const stubResponse: AxiosResponse<RajaOngkirCostResponse> =
        createMock<AxiosResponse<RajaOngkirCostResponse>>();

      jest
        .spyOn(httpService, 'get')
        .mockImplementationOnce(() => of(stubResponse));

      const response = await rajaOngkirRepository.getCost(
        origin,
        destination,
        weight,
      );
      expect(response).toBeDefined();
    });

    // it('should fail when origin is not defined', async () => {
    //   const destination = 'destination';
    //   const weight = 1;

    //   jest
    //     .spyOn(httpService, 'get')
    //     .mockImplementationOnce(() => of(stubResponse));

    //   await expect(
    //     rajaOngkirRepository.getCost(undefined, destination, weight),
    //   ).rejects.toThrow();
    // });
  });

  describe('getProvince', () => {
    it('should return a province response', async () => {
      const stubResponse: AxiosResponse<
        RajaOngkirBaseResponse<RajaOngkirProvinceModel[]>
      > = createMock<
        AxiosResponse<RajaOngkirBaseResponse<RajaOngkirProvinceModel[]>>
      >({
        data: {
          rajaongkir: {
            results: [
              {
                province_id: '1',
                province: 'province',
              },
            ],
          },
        },
      });

      jest.spyOn(httpService, 'get').mockReturnValueOnce(
        of({
          data: {
            rajaongkir: {
              results: [
                {
                  province_id: '1',
                  province: 'province',
                },
              ],
            },
          },
          headers: {},
          config: { url: 'http://localhost:3000/mockUrl/1' },
          status: 200,
          statusText: 'OK',
        }) as any,
      );

      rajaOngkirRepository.getProvince().subscribe((data) => {
        expect(data).toEqual(stubResponse.data.rajaongkir.results);
      });
    });
  });
});
