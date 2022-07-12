import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types, ClientSession } from 'mongoose';
import { OrderFilterRequest } from '../../api/dtos/requests/order-filter.request';
import { OrderDocument, Order } from '../../domains/models/order.model';
import { OrderStatus } from '../../enums/order-status.enum';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
  ) {}

  async filterOrder(
    filter: OrderFilterRequest,
  ): Promise<FilterQuery<OrderDocument>> {
    const filterQuery: FilterQuery<OrderDocument> = {};
    const {
      orderStatus,
      paymentStatus,
      findPaidOrderOnly,
      findProcessingOrderOnly,
    } = filter;
    if (findPaidOrderOnly) {
      // filterQuery.orderStatus = {
      //   $nin: [
      //     OrderStatus.WAITING_FOR_PAYMENT,
      //     OrderStatus.EXPIRED,
      //     OrderStatus.PROCESSING,
      //   ],
      // };
      filterQuery.orderStatus = OrderStatus.PAID;
    }
    if (findProcessingOrderOnly) {
      // filterQuery.orderStatus = {
      //   $nin: [
      //     OrderStatus.WAITING_FOR_PAYMENT,
      //     OrderStatus.EXPIRED,
      //     OrderStatus.PAID,
      //   ],
      // };
      filterQuery.orderStatus = OrderStatus.PROCESSING;
    }
    // if (ownerId) {
    //   filterQuery.ownerId = new Types.ObjectId(ownerId);
    // }
    // if (businessName) {
    //   filterQuery.businessName = { $regex: businessName, $options: 'i' };
    // }
    return filterQuery;
  }

  async countOrder(filter: OrderFilterRequest): Promise<number> {
    const filterQuery = await this.filterOrder(filter);
    return await this.orderModel.countDocuments(filterQuery);
  }

  async getOrderById(id: string): Promise<Order> {
    const orderId = new Types.ObjectId(id);
    const order = await this.orderModel
      .findById(orderId)
      .populate('userDetails');
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return order;
  }

  async createOrder(orderData: Order, session?: ClientSession): Promise<Order> {
    const createdOrder = new this.orderModel(orderData);
    session ? createdOrder.save({ session }) : createdOrder.save();
    return createdOrder.populate('userDetails');
  }

  // updateOrderById
  async updateOrderById(
    orderId: string,
    orderData: Order,
    session?: ClientSession,
  ): Promise<Order> {
    const order = await this.orderModel.findById(orderId);
    if (!order) {
      throw new NotFoundException(`Order with id ${orderId} not found`);
    }
    const updatedOrder = await this.orderModel.findByIdAndUpdate(
      orderId,
      orderData,
      { new: true, session },
    );
    return updatedOrder.populate('userDetails');
  }

  async findManyOrders(filter: OrderFilterRequest): Promise<Order[]> {
    const filterQuery = await this.filterOrder(filter);
    const orders = await this.orderModel
      .find(filterQuery)
      .populate('userDetails');
    return orders;
  }

  async confirmOrder(
    orderId: string,
    orderStatus: OrderStatus,
    userId: string,
    session?: ClientSession,
  ): Promise<Order> {
    const order = await this.orderModel.findById(new Types.ObjectId(orderId));
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    order.orderStatus = orderStatus;
    order.updatedBy = new Types.ObjectId(userId);
    session ? order.save({ session }) : order.save();
    return order;
  }

  async sendOrder(
    orderId: string,
    orderStatus: OrderStatus,
    userId: string,
    trackingNumber: number,
    session?: ClientSession,
  ): Promise<Order> {
    const order = await this.orderModel.findById(new Types.ObjectId(orderId));
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    order.orderStatus = orderStatus;
    order.updatedBy = new Types.ObjectId(userId);
    order.trackingNumber = trackingNumber;
    session ? order.save({ session }) : order.save();
    return order;
  }

  async rejectOrder(
    orderId: string,
    userId: string,
    notes: string,
    session?: ClientSession,
  ): Promise<Order> {
    const order = await this.orderModel.findById(new Types.ObjectId(orderId));
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    order.orderStatus = OrderStatus.CANCELED;
    order.updatedBy = new Types.ObjectId(userId);
    order.notes = notes;
    session ? order.save({ session }) : order.save();
    return order;
  }
}
