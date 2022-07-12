import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
  Query,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { CompanyService } from '../services/company.service';
import { CompanyCreateRequest } from '../dtos/requests/company-create.request';
import { CompanyUpdateRequest } from '../dtos/requests/company-update.request';
import { ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Profile } from 'passport';
import { CurrentUser } from '../../../core/decorators/current-user.decorator';
import { BaseResponse } from '../../../core/dto/base-response';
import { baseResponseHelper } from '../../../core/helpers/base-response-helper';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ICurrentUser } from '../../user/interfaces/current-user.interface';
import { Response } from 'express';
import { Roles } from '../../../core/decorators/roles.decorator';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { UserFilterRequest } from '../../user/dtos/requests/user-filter.request';
import { User } from '../../user/entities/user.entity';
import { RoleEnum } from '../../user/enums/role.enum';
import { CompanyFilterRequest } from '../dtos/requests/company-filter.request';
import { PaginatedResponse } from '../../../core/dto/paginated-response.dto';
import { Company } from '../entities/company.entity';
import { paginationHelper } from '../../../core/helpers/pagination-helper';
import { validateObjectId } from '../../../core/utils/validateObjectId';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  /**
   * Create new company.
   * @param request company data to create.
   * @returns {Promise<Profile>}
   */
  @ApiOperation({ summary: 'Create new company.' })
  @ApiBearerAuth('JWT-Auth')
  @UseGuards(JwtAuthGuard)
  @Post('/')
  async createCompany(
    @CurrentUser() currentUser: ICurrentUser,
    @Body() request: CompanyCreateRequest,
    @Res() res: Response,
  ): Promise<BaseResponse<Profile>> {
    const result = await this.companyService.createCompany(
      request,
      currentUser.userId,
    );
    const response = baseResponseHelper(res, result);
    return response;
  }

  @Post('/create-company-request')
  @ApiOperation({ summary: 'Create new company request.' })
  async createCompanyRequest(
    @Body() request: CompanyCreateRequest,
    @Res() res: Response,
  ): Promise<Response<BaseResponse<Company>>> {
    const result = await this.companyService.createCompany(request);
    const response = baseResponseHelper(res, result);
    return response;
  }

  @Get('/get-user-company')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.SUPER_USER, RoleEnum.BUSINESS_OWNER, RoleEnum.SUPERVISOR)
  async getUserCompanyPaginated(
    @CurrentUser() user: ICurrentUser,
    @Query() filterRequest: CompanyFilterRequest,
    @Res() res: Response,
  ): Promise<Response<PaginatedResponse<Company[]>>> {
    const { limit, page } = filterRequest;
    // console.log(filterRequest);
    const userCompany = await this.companyService.getUserCompanyPaginated(
      user.userId,
      user.role,
      filterRequest,
    );
    const companyCount = await this.companyService.countCompany(filterRequest);
    const response = paginationHelper<Company[]>(
      res,
      userCompany,
      companyCount,
      page,
      limit,
    );
    return response;
  }

  //get Company details by id
  @ApiOperation({ summary: 'Get Company details by id.' })
  @ApiBearerAuth('JWT-Auth')
  @UseGuards(JwtAuthGuard)
  @Get(':companyId')
  async getCompanyById(
    @Param('companyId') companyId: string,
    @Res() res: Response,
  ): Promise<Response<BaseResponse<Company>>> {
    const company = await this.companyService.getCompanyById(companyId);
    return baseResponseHelper(res, company);
  }

  //update company by id with put
  // @ApiOperation({ summary: 'Update company by id.' })
  // @ApiBearerAuth('JWT-Auth')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth('JWT-Auth')
  // @Put(':companyId')
  // async updateCompany(
  //   @Param('companyId') companyId: string,
  //   @Body() request: CompanyUpdateRequest,
  //   @Res() res: Response,
  // ): Promise<Response<BaseResponse<Company>>> {
  //   const company = await this.companyService.updateCompany(companyId, request);
  //   return baseResponseHelper(res, company);
  // }

  @Put('/approve-company/:companyId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.SUPER_USER, RoleEnum.BUSINESS_OWNER, RoleEnum.SUPERVISOR)
  async approveUserCompany(
    @CurrentUser() user: ICurrentUser,
    @Param('companyId') companyId: string,
    @Body() request: CompanyUpdateRequest,
    @Res() res: Response,
  ): Promise<Response<BaseResponse<Company>>> {
    validateObjectId(companyId);
    const updatedCompany = await this.companyService.approveCompany(
      companyId,
      request,
      user.userId,
    );
    return baseResponseHelper(res, updatedCompany);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':companyId')
  deleteCompany(@Param('companyId') companyId: string): Promise<Company> {
    return this.companyService.deleteCompanyById(companyId);
  }
}
