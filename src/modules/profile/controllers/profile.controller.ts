import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CurrentUser } from '../../../core/decorators/current-user.decorator';

import { Roles } from '../../../core/decorators/roles.decorator';
import { BaseResponse } from '../../../core/dto/base-response';
import { PaginatedResponse } from '../../../core/dto/paginated-response.dto';
import { baseResponseHelper } from '../../../core/helpers/base-response-helper';
import { paginationHelper } from '../../../core/helpers/pagination-helper';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { ICurrentUser } from '../../user/interfaces/current-user.interface';
import { ProfileCreateRequest } from '../dtos/requests/create-profile.request';
import { ProfileFilterRequest } from '../dtos/requests/profile-filter.request';
import { ProfileUpdateRequest } from '../dtos/requests/update-profile.request';
import { Profile } from '../entities/profile.entity';
import { ProfileService } from '../services/profile.service';

@ApiTags('profiles')
@Controller('profiles')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  /**
   * Create new profile.
   * @param request profile data to create.
   * @returns {Promise<Profile>}
   */
  @ApiOperation({ summary: 'Post Request to Report User.' })
  @ApiBearerAuth('JWT-Auth')
  @UseGuards(JwtAuthGuard)
  @Post('/')
  async createProfile(
    @CurrentUser() currentUser: ICurrentUser,
    @Body() request: ProfileCreateRequest,
    @Res() res: Response,
  ): Promise<BaseResponse<Profile>> {
    const result = await this.profileService.createProfile(
      currentUser.userId,
      request,
    );

    const response = baseResponseHelper(res, result);
    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user-profile')
  async userProfile(
    @CurrentUser() currentUser: ICurrentUser,
    @Res() res: Response,
  ): Promise<Response<BaseResponse<Profile>>> {
    const result = await this.profileService.findUserProfile(
      currentUser.userId,
    );
    const response = baseResponseHelper(res, result, HttpStatus.OK);
    return response;
  }

  @ApiOperation({
    summary: 'Create new bot data.',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-Auth')
  @Get('/')
  async getAllPaginatedBot(
    @Query() filterRequest: ProfileFilterRequest,
    @Res() res: Response,
  ): Promise<Response<PaginatedResponse<Profile[]>>> {
    const { limit, page } = filterRequest;
    const paginatedBot = await this.profileService.getAllPaginatedProfile(
      filterRequest,
    );
    const botCount = await this.profileService.countProfile(filterRequest);
    const response = paginationHelper<Profile[]>(
      res,
      paginatedBot,
      botCount,
      page,
      limit,
    );
    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':profileId')
  async findProfileById(
    @Param('profileId') profileId: string,
    @Res() res: Response,
  ): Promise<Response<BaseResponse<Profile>>> {
    const result = await this.profileService.findProfileById(profileId);
    const response = baseResponseHelper(res, result, HttpStatus.OK);
    return response;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Put('/:profileId')
  async updateProfile(
    @Param('profileId') profileId: string,
    @Body() profileUpdateRequest: ProfileUpdateRequest,
    @Res() res: Response,
  ): Promise<Response<BaseResponse<Profile>>> {
    const result = await this.profileService.updateProfileById(
      profileId,
      profileUpdateRequest,
    );
    const response = baseResponseHelper(res, result, HttpStatus.OK);
    return response;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':profileId')
  deleteProfile(@Param('profileId') profileId: string): Promise<Profile> {
    return this.profileService.deleteProfileById(profileId);
  }
}
