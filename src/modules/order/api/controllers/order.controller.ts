import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Response } from 'express';
import { CurrentUser } from '../../../../core/decorators/current-user.decorator';
import { Roles } from '../../../../core/decorators/roles.decorator';
import { BaseResponse } from '../../../../core/dto/base-response';
import { PaginatedResponse } from '../../../../core/dto/paginated-response.dto';
import { baseResponseHelper } from '../../../../core/helpers/base-response-helper';
import { paginationHelper } from '../../../../core/helpers/pagination-helper';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { RoleEnum } from '../../../user/enums/role.enum';
import { ICurrentUser } from '../../../user/interfaces/current-user.interface';
import { Order } from '../../domains/models/order.model';
import { OrderService } from '../../domains/services/order.service';
import { ConfirmOrderRequest } from '../dtos/requests/confrim-order.request';
import { OrderCreateRequest } from '../dtos/requests/order-create.request';
import { OrderFilterRequest } from '../dtos/requests/order-filter.request';
import { RejectOrderRequest } from '../dtos/requests/reject-order.request';
import { SendOrderRequest } from '../dtos/requests/send-order.request';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  //!TODO: as user can order contag card and pay with midtrans
  /**
   * Endpoint for user to create order.
   * @params request order data to create.
   * @returns {Promise<Response<BaseResponse<Order>>>}
   */
  @ApiOperation({
    summary: 'Create new order.',
  })
  @ApiBearerAuth('JWT-Auth')
  @UseGuards(JwtAuthGuard)
  @Post('/')
  async createOrder(
    @CurrentUser() user: ICurrentUser,
    @Body() request: OrderCreateRequest,
    @Res() res: Response,
  ): Promise<Response<BaseResponse<any>>> {
    const createdOrder = await this.orderService.createOrder(
      request,
      user.userId,
    );
    const response = baseResponseHelper(res, createdOrder);
    return response;
  }

  @Get('/order-list')
  @ApiOperation({
    summary: 'get all pending order',
  })
  @ApiBearerAuth('JWT-Auth')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    RoleEnum.SUPER_USER,
    RoleEnum.SUPERVISOR,
    RoleEnum.BUSINESS_OWNER,
    RoleEnum.PACKING_ADMIN,
    RoleEnum.SHIPPING_ADMIN,
  )
  async getPaidOrderPaginated(
    @CurrentUser() user: ICurrentUser,
    @Query() filterRequest: OrderFilterRequest,
    @Res() res: Response,
  ): Promise<Response<PaginatedResponse<Order[]>>> {
    const { limit, page } = filterRequest;
    if (user.role === RoleEnum.PACKING_ADMIN) {
      filterRequest.findPaidOrderOnly = true;
    }
    if (user.role === RoleEnum.SHIPPING_ADMIN) {
      filterRequest.findProcessingOrderOnly = true;
    }
    const userCompany = await this.orderService.getFilteredOrderList(
      filterRequest,
    );
    const companyCount = await this.orderService.countOrders(filterRequest);
    const response = paginationHelper<Order[]>(
      res,
      userCompany,
      companyCount,
      page,
      limit,
    );
    return response;
  }

  /* find by id */
  @ApiOperation({
    summary: 'find order by id',
  })
  @ApiBearerAuth('JWT-Auth')
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async findById(
    @Param() id: string,
    @Res() res: Response,
  ): Promise<Response<BaseResponse<Order>>> {
    const order = await this.orderService.findById(id);
    const response = baseResponseHelper(res, order);
    return response;
  }

  @ApiOperation({
    summary: 'confirm order.',
  })
  @ApiBearerAuth('JWT-Auth')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    RoleEnum.SUPER_USER,
    RoleEnum.SUPERVISOR,
    RoleEnum.BUSINESS_OWNER,
    RoleEnum.PACKING_ADMIN,
  )
  @Put('/confirm-order')
  async confirmOrder(
    @CurrentUser() user: ICurrentUser,
    @Body() request: ConfirmOrderRequest,
    @Res() res: Response,
  ): Promise<Response<BaseResponse<Order>>> {
    const updatedOrder = await this.orderService.updateOrderStatus(
      request.orderId,
      request.orderStatus,
      user.userId,
    );
    const response = baseResponseHelper(res, updatedOrder);
    return response;
  }

  @ApiOperation({
    summary: 'send order.',
  })
  @ApiBearerAuth('JWT-Auth')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    RoleEnum.SUPER_USER,
    RoleEnum.SUPERVISOR,
    RoleEnum.BUSINESS_OWNER,
    RoleEnum.SHIPPING_ADMIN,
  )
  @Put('/send-order')
  async sendOrder(
    @CurrentUser() user: ICurrentUser,
    @Body() request: SendOrderRequest,
    @Res() res: Response,
  ): Promise<Response<BaseResponse<Order>>> {
    const updatedOrder = await this.orderService.updateOrderStatus(
      request.orderId,
      request.orderStatus,
      user.userId,
      request.trackingNumber,
    );
    const response = baseResponseHelper(res, updatedOrder);
    return response;
  }

  @ApiOperation({
    summary: 'reject order.',
  })
  @ApiBearerAuth('JWT-Auth')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    RoleEnum.SUPER_USER,
    RoleEnum.SUPERVISOR,
    RoleEnum.BUSINESS_OWNER,
    RoleEnum.PACKING_ADMIN,
    RoleEnum.SHIPPING_ADMIN,
  )
  @Put('/reject-order')
  async rejectOrder(
    @CurrentUser() user: ICurrentUser,
    @Body() request: RejectOrderRequest,
    @Res() res: Response,
  ): Promise<Response<BaseResponse<Order>>> {
    const updatedOrder = await this.orderService.rejectOrder(
      request.orderId,
      user.userId,
      request.notes,
    );
    const response = baseResponseHelper(res, updatedOrder);
    return response;
  }
}
