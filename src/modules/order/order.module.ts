import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NestMidtransModule } from '../../lib/midtrans';
import { OrderController } from './api/controllers/order.controller';
import { Order, OrderSchema } from './domains/models/order.model';
import { OrderService } from './domains/services/order.service';
import { OrderRepository } from './infrastructure/repositories/order.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    NestMidtransModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
})
export class OrderModule {}
