import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { OrderStatus } from '../../../enums/order-status.enum';

export class ConfirmOrderRequest {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @ApiProperty()
  @IsEnum(OrderStatus)
  @IsNotEmpty()
  orderStatus: OrderStatus;
}
