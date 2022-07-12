import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Types } from 'mongoose';
import { generateRandomString } from '../../../core/utils/generateRandomString';
import { hashPassword } from '../../../core/utils/passwordHash';
import { User } from '../../user/entities/user.entity';
import { RoleEnum } from '../../user/enums/role.enum';
import { UserRepository } from '../../user/repositories/user.repository';
import { CompanyCreateRequest } from '../dtos/requests/company-create.request';
import { CompanyFilterRequest } from '../dtos/requests/company-filter.request';
import { CompanyUpdateRequest } from '../dtos/requests/company-update.request';
import { Company } from '../entities/company.entity';
import { CompanyRepository } from '../repositories/company.repository';

@Injectable()
export class CompanyService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    private companyRepository: CompanyRepository,
    private UserRepository: UserRepository,
  ) {}
  /**
   * Create new profile
   * @param {ProfileCreateDto} profileCreateDto - Company object
   * @returns {Promise<Company>}
   */
  createCompany(
    createRequest: CompanyCreateRequest,
    userId?: string,
  ): Promise<Company> {
    const profile = Company.fromCreateRequest(createRequest);
    return this.companyRepository.create(profile);
  }

  async getUserCompanyPaginated(
    userId: string,
    userRole: string,
    filterRequest: CompanyFilterRequest,
  ): Promise<Company[]> {
    return await this.companyRepository.getUserCompanyPaginated(filterRequest);
  }

  async countCompany(filterRequest: CompanyFilterRequest): Promise<number> {
    return await this.companyRepository.countCompany(filterRequest);
  }

  async getCompanyById(id: string): Promise<Company> {
    return await this.companyRepository.getCompanyById(id);
  }

  // async approveCompany(
  //   companyId: string,
  //   request: CompanyUpdateRequest,
  //   userId: string,
  // ): Promise<Company> {
  //   const company = await this.companyRepository.getCompanyById(companyId);
  //   if (!company) {
  //     throw new NotFoundException('Company not found');
  //   }
  //   const userData: User = {
  //     username: request.picName
  //       ? request.picName.replace(' ', '').toLowerCase()
  //       : request.companyEmail.split('@')[0],
  //     email: request.companyEmail,
  //     phoneNumber: request.companyPhone.toString(),
  //   };
  //   const user = await this.UserRepository.create(userData, userId);
  //   request.picId = user._id;
  //   const companyUpdateData = Company.fromUpdateRequest(request);

  //   const updatedCompany = await this.companyRepository.updateCompany(
  //     companyId,
  //     request,
  //   );
  //   return company;
  // }
  async approveCompany(
    companyId: string,
    request: CompanyUpdateRequest,
    userId: string,
  ): Promise<Company> {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      const company = await this.companyRepository.getCompanyById(companyId);
      if (!company) {
        throw new NotFoundException('Company not found');
      }
      const password = generateRandomString(12);
      console.log('password', password, 'length', password.length);
      const userData: User = {
        username: request.picName
          ? request.picName.replace(' ', '').toLowerCase()
          : request.companyEmail.split('@')[0].toLocaleLowerCase(),
        email: request.companyEmail.toLocaleLowerCase(),
        phoneNumber: request.companyPhone.toString(),
        creatorId: new Types.ObjectId(userId),
        role: RoleEnum.HRD,
        password: await hashPassword(password),
      };

      const user = await this.UserRepository.create(userData, session);

      if (user) {
        request.picId = user._id;
      }

      const companyUpdateData = Company.fromUpdateRequest(request);

      const updatedCompany = await this.companyRepository.updateCompany(
        companyId,
        companyUpdateData,
        session,
      );

      await session.commitTransaction();
      session.endSession();
      return updatedCompany;
    } catch (error) {
      console.log(error);
    }
  }

  // async updateCompany(id: string, updateCompanyDto: CompanyUpdateRequest) {
  //   const updateData = Company.fromUpdateRequest(updateCompanyDto);
  //   return await this.companyRepository.updateCompany(id, updateData);
  // }

  async deleteCompanyById(id: string) {
    return this.companyRepository.deleteById(id);
  }
}
