import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { BaseResponse } from '../../../core/dto/base-response';
import { baseResponseHelper } from '../../../core/helpers/base-response-helper';
import { User } from '../entities/user.entity';
import { ICurrentUser } from '../interfaces/current-user.interface';
import { ChangePasswordRequest } from '../dtos/requests/change-password.request';
import { UserService } from '../services/user.service';
import { UserCreateRequest } from '../dtos/requests/user-create.request';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../../core/decorators/current-user.decorator';
import { UserUpdateRequest } from '../dtos/requests/user-update.request';
import { PaginatedResponse } from '../../../core/dto/paginated-response.dto';
import { paginationHelper } from '../../../core/helpers/pagination-helper';
import { UserFilterRequest } from '../dtos/requests/user-filter.request';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../../core/decorators/roles.decorator';
import { RoleEnum } from '../enums/role.enum';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({
    summary: 'Find All User With Pagination.',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-Auth')
  @Get('/users')
  async getAllUserPaginated(
    @Query() filterRequest: UserFilterRequest,
    @Res() res: Response,
  ): Promise<Response<PaginatedResponse<User[]>>> {
    const { limit, page } = filterRequest;
    const paginatedBot = await this.userService.findAllUserPaginated(
      filterRequest,
    );
    const botCount = await this.userService.countUser(filterRequest);
    const response = paginationHelper<User[]>(
      res,
      paginatedBot,
      botCount,
      page,
      limit,
    );
    return response;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.SUPER_USER, RoleEnum.ADMIN, RoleEnum.MARKETING, RoleEnum.HRD)
  @ApiBearerAuth('JWT-Auth')
  @Post('/')
  async createUser(
    @CurrentUser() user: ICurrentUser,
    @Body() createRequest: UserCreateRequest,
    @Res() res: Response,
  ): Promise<Response<BaseResponse<User>>> {
    const createdUser = await this.userService.createUser(
      user.userId,
      createRequest,
    );
    return baseResponseHelper(res, createdUser);
  }

  @Get('/current-user')
  @UseGuards(JwtAuthGuard)
  async getCurrentAuthenticatedUser(
    @CurrentUser() user: ICurrentUser,
    @Res() res: Response,
  ): Promise<Response<BaseResponse<User>>> {
    const getCurrentUser = await this.userService.findUserById(user.userId);
    return baseResponseHelper(res, getCurrentUser);
  }

  @Get('/get-pic-list')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.SUPER_USER, RoleEnum.ADMIN, RoleEnum.MARKETING, RoleEnum.HRD)
  async getPicList(
    @CurrentUser() user: ICurrentUser,
    @Query() filterRequest: UserFilterRequest,
    @Res() res: Response,
  ): Promise<Response<BaseResponse<User[]>>> {
    const picList = await this.userService.findPicList(
      user.userId,
      user.role,
      filterRequest,
    );
    return baseResponseHelper(res, picList);
  }

  @Get('/:id')
  async findUserById(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response<BaseResponse<User>>> {
    const user = await this.userService.findUserById(id);
    return baseResponseHelper(res, user);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/change-password')
  async changePassword(
    @CurrentUser() user: ICurrentUser,
    @Body() changePasswordRequest: ChangePasswordRequest,
    @Res() res: Response,
  ): Promise<Response<BaseResponse<string>>> {
    const resetUserResponse = await this.userService.changePassword(
      user.userId,
      changePasswordRequest,
    );
    const response = baseResponseHelper(
      res,
      resetUserResponse.message,
      resetUserResponse.statusCode,
    );
    return response;
  }

  @Put('/current-user/update')
  @UseGuards(JwtAuthGuard)
  async updateCurrentUser(
    @CurrentUser() user: ICurrentUser,
    @Body() updateRequest: UserUpdateRequest,
    @Res() res: Response,
  ): Promise<Response<BaseResponse<User>>> {
    const updatedCurrentUser = await this.userService.updateCurrentUser(
      user.userId,
      updateRequest,
      user.email,
    );
    return baseResponseHelper(res, updatedCurrentUser);
  }

  @Put('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateRequest: UserUpdateRequest,
    @Res() res: Response,
  ): Promise<Response<BaseResponse<User>>> {
    const updatedUser = await this.userService.updateUserById(
      id,
      updateRequest,
    );
    return baseResponseHelper(res, updatedUser);
  }

  @Delete('/:id')
  async deleteUser(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response<BaseResponse<User>>> {
    const deletedUser = await this.userService.deleteUserById(id);
    return baseResponseHelper(res, deletedUser);
  }
}
