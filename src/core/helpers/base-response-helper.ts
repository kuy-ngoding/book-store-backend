import { Response } from 'express';
import { BaseResponse } from '../dto/base-response';

export function baseResponseHelper<T>(
  res: Response,
  data?: T,
  statusCode = 200,
  message = 'Success',
): Response<BaseResponse<T>> {
  const baseResponse = new BaseResponse<T>();
  baseResponse.data = data;
  baseResponse.message = message;

  return res.status(statusCode).json(baseResponse);
}
