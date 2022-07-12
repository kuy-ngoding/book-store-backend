import { Injectable } from '@nestjs/common';
import { MidtransRepository } from '../../infrastructure/repositories/midtrans.repository';
import { MidtransSnapTransactionResponse } from '../dtos/responses/midtrans-snap-transaction.response';
import { MidtransSnapParamModel } from '../models/midtrans-snap-param.model';

@Injectable()
export class MidtransService {
  constructor(private midtransRepository: MidtransRepository) {}

  // midtrans createSnapTransaction
  public async createSnapTransaction(
    params: MidtransSnapParamModel,
  ): Promise<MidtransSnapTransactionResponse> {
    const response = await this.midtransRepository.createSnapTransaction(
      params,
    );
    return response;
  }
}
