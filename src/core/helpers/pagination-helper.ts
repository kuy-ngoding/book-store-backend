import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { PaginatedResponse } from '../dto/paginated-response.dto';

export function paginationHelper<T>(
  res: Response,
  data?: T,
  total = 0,
  page = 1,
  limit = 10,
  statusCode: number = HttpStatus.OK,
  message = 'Success',
): Response<PaginatedResponse<T>> {
  const lastPage = Math.ceil(total / limit);
  const nextPage = page + 1;
  const hasNextPage = nextPage < lastPage;
  const prevPage = page - 1;
  const hasPreviousPage = page > 1;

  const paginatedResponse = new PaginatedResponse<T>(
    data,
    total,
    page,
    limit,
    nextPage,
    hasNextPage,
    prevPage,
    hasPreviousPage,
    lastPage,
  );
  paginatedResponse.statusCode = statusCode;
  paginatedResponse.message = message;

  return res.status(statusCode).json(paginatedResponse);
}
