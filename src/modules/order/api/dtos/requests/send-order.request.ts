import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { OrderStatus } from '../../../enums/order-status.enum';
import { Type } from 'class-transformer';

export class SendOrderRequest {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @ApiProperty()
  @IsEnum(OrderStatus)
  @IsNotEmpty()
  orderStatus: OrderStatus;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  @Min(1)
  trackingNumber: number;
}
