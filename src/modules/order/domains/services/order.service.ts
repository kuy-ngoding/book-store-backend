import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { OrderCreateRequest } from '../../api/dtos/requests/order-create.request';
import { OrderRepository } from '../../infrastructure/repositories/order.repository';
import { Order } from '../models/order.model';
import { Connection } from 'mongoose';
import { OrderStatus } from '../../enums/order-status.enum';
import { MidtransService } from '../../../../lib/midtrans/domains/services/midtrans.service';
import { MidtransSnapParamModel } from '../../../../lib/midtrans/domains/models/midtrans-snap-param.model';
import { OrderUpdateRequest } from '../../api/dtos/requests/order-update.request';
import { MidtransPaymentMethod } from '../../../../lib/midtrans/enums/midtrans-payment-method.enum';
import { OrderFilterRequest } from '../../api/dtos/requests/order-filter.request';

@Injectable()
export class OrderService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    private readonly midtransService: MidtransService,
    private readonly orderRepository: OrderRepository,
  ) {}

  /**
   * Create new order.
   * @params request order data to create.
   * @returns {Promise<Order>}
   */
  async createOrder(
    request: OrderCreateRequest,
    userId?: string,
  ): Promise<Order> {
    // const session = await this.connection.startSession();
    // session.startTransaction();
    // try {
    request.userId = userId;
    const orderData = Order.fromCreateRequest(request);
    const createdOrder = await this.orderRepository.createOrder(orderData);
    // console.log(createdOrder);
    // await session.commitTransaction();
    // session.endSession();

    // const order = await this.orderRepository.getOrderById(
    //   createdOrder._id.toString(),
    // );

    /* replace with real data later on */
    const item = [
      {
        id: 'crd-premium',
        name: 'contag premium card',
        price: 100000,
        quantity: 1,
      },
    ];
    const midtransParam: MidtransSnapParamModel = {
      transaction_details: {
        order_id: createdOrder._id.toString() + '-' + new Date().getTime(),
        gross_amount: item[0].price,
      },
      customer_details: {
        first_name: createdOrder.userDetails.username,
        email: createdOrder.userDetails.email,
        phone: createdOrder.userDetails.phoneNumber,
      },
      item_details: item,
      payment_type: 'bank_transfer',
      enabled_payments: [
        MidtransPaymentMethod.BANK_TRANSFER,
        MidtransPaymentMethod.CSTORE,
      ],
    };

    const createdTransaction = await this.midtransService.createSnapTransaction(
      midtransParam,
    );
    // console.log(createdTransaction);

    if (!createdTransaction) {
      throw new Error('Failed to create transaction');
    }

    const updateRequest: OrderUpdateRequest = {
      userId,
      callback_token: createdTransaction.token,
      redirect_url: createdTransaction.redirect_url,
      updatedBy: userId,
      createdBy: userId,
    };
    const updateOrder = Order.fromUpdateRequest(updateRequest);

    const udpatedTrans = await this.orderRepository.updateOrderById(
      createdOrder._id,
      updateOrder,
    );

    // console.log('udpatedTrans', udpatedTrans);

    return udpatedTrans;
    // } catch (error) {
    //   console.log(error);
    //   await session.abortTransaction();
    //   session.endSession();
    //   throw error;
    // }
  }

  async getFilteredOrderList(
    filterRequest: OrderFilterRequest,
  ): Promise<Order[]> {
    return await this.orderRepository.findManyOrders(filterRequest);
  }

  async countOrders(filterRequest: OrderFilterRequest): Promise<number> {
    return await this.orderRepository.countOrder(filterRequest);
  }

  async findById(id: string): Promise<Order> {
    return this.orderRepository.getOrderById(id);
  }

  // update by id with session
  async updateOrderById(
    id: string,
    updateRequest: OrderUpdateRequest,
  ): Promise<Order> {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      const orderData = Order.fromUpdateRequest(updateRequest);
      const updatedOrder = await this.orderRepository.updateOrderById(
        id,
        orderData,
        session,
      );
      await session.commitTransaction();
      session.endSession();
      return updatedOrder;
    } catch (error) {
      console.log(error);
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  /**
   * Update order status.
   * @params orderId order id to update.
   * @params orderStatus order status to update.
   * @params userId as updater (updateby)
   */
  async confirmOrder(
    orderId: string,
    orderStatus: OrderStatus,
    userId: string,
  ): Promise<Order> {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      const order = await this.orderRepository.confirmOrder(
        orderId,
        orderStatus,
        userId,
        session,
      );
      return order;
    } catch (error) {
      console.log(error);
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  /**
   * Update order status.
   * @params orderId order id to update.
   * @params orderStatus order status to update.
   * @params userId as updater (updateby)
   */
  async updateOrderStatus(
    orderId: string,
    orderStatus: OrderStatus,
    userId: string,
    trackingNumber?: number,
  ): Promise<Order> {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      let updatedOrder: Order;
      if (trackingNumber) {
        updatedOrder = await this.orderRepository.sendOrder(
          orderId,
          orderStatus,
          userId,
          trackingNumber,
          session,
        );
      } else {
        updatedOrder = await this.orderRepository.confirmOrder(
          orderId,
          orderStatus,
          userId,
          session,
        );
      }
      await session.commitTransaction();
      session.endSession();
      return updatedOrder;
    } catch (error) {
      console.log(error);
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  async rejectOrder(
    orderId: string,
    userId: string,
    notes: string,
  ): Promise<Order> {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      const updatedOrder = await this.orderRepository.rejectOrder(
        orderId,
        userId,
        notes,
        session,
      );
      await session.commitTransaction();
      session.endSession();
      return updatedOrder;
    } catch (error) {
      console.log(error);
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }
}
