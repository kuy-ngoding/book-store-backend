import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { BaseFilterRequest } from '../../../../../core/dto/base-filter-request.dto';
import { OrderStatus } from '../../../enums/order-status.enum';
import { PaymentStatus } from '../../../enums/payment-status.enum';

export class OrderFilterRequest extends BaseFilterRequest {
  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(PaymentStatus)
  paymentStatus?: PaymentStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(OrderStatus)
  orderStatus?: OrderStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  findPaidOrderOnly?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  findProcessingOrderOnly?: boolean;
}
