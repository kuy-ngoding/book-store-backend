import { Injectable } from '@nestjs/common';
import { OrderCreateRequest } from '../requests/order-create.request';
import { OrderUpdateRequest } from '../requests/order-update.request';

@Injectable()
export class OrdersService {
  create(createOrderDto: OrderCreateRequest) {
    return 'This action adds a new order';
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: OrderUpdateRequest) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
