import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderCreateRequest } from '../dto/requests/order-create.request';
import { OrderUpdateRequest } from '../dto/requests/order-update.request';
import { OrdersService } from '../dto/services/orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: OrderCreateRequest) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: OrderUpdateRequest) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
