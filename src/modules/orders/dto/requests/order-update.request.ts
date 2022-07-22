import { PartialType } from '@nestjs/swagger';
import { OrderCreateRequest } from './order-create.request';

export class OrderUpdateRequest extends PartialType(OrderCreateRequest) {}
