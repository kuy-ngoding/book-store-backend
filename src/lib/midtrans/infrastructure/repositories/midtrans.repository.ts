import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { MidtransSnapTransactionResponse } from '../../domains/dtos/responses/midtrans-snap-transaction.response';
import { MidtransSnapParamModel } from '../../domains/models/midtrans-snap-param.model';
import { MIDTRANS_MODULE_OPTIONS } from '../../midtrans.constant';
import { MidtransModuleOptions } from '../../midtrans.options';

@Injectable()
export class MidtransRepository {
  constructor(
    private httpService: HttpService,
    @Inject(MIDTRANS_MODULE_OPTIONS)
    private readonly options: MidtransModuleOptions,
  ) {}

  /**
   * create snap transaction
   * you have to add "basic" as a prefix, and ":" as suffix for Midtrans auth header, and encode the serverkey with base64,
   * Midtrans Snap Transaction Curl Refrence [Snap Transaction Curl]{@link https://docs.midtrans.com/en/snap/integration-guide}
   * @params params (required params for create snap transaction)
   */
  public async createSnapTransaction(
    params: MidtransSnapParamModel,
  ): Promise<MidtransSnapTransactionResponse> {
    console.log(params);
    // transform params to json
    // const jsonParams = JSON.stringify(params);
    // console.log(jsonParams);
    const serverKey = this.options.isProduction
      ? this.options.productionServerKey
      : this.options.sandboxServerKey;
    const response = await this.httpService.axiosRef.post<any>(
      this.options.isProduction
        ? this.options.productionUrl
        : this.options.sandboxUrl,
      // jsonParams,
      params,
      {
        headers: {
          accept: 'application/json',
          contentType: 'application/json',
          authorization: `Basic ${Buffer.from(`${serverKey}:`).toString(
            'base64',
          )}`,
        },
      },
    );
    // console.log('fetch result', response.data);
    return response.data;
  }
}
