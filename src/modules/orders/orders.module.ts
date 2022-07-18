import { Module } from '@nestjs/common';
import { OrdersService } from './dto/services/orders.service';
import { OrdersController } from './controllers/orders.controller';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
