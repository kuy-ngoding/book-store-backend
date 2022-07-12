import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types, ClientSession } from 'mongoose';
import { CompanyFilterRequest } from '../dtos/requests/company-filter.request';

import { Company, CompanyDocument } from '../entities/company.entity';

// import { ProfileFilterDto } from '../dtos/profile/profile-filter.dto';
@Injectable()
export class CompanyRepository {
  /**
   * @param companyModel - The profile model.
   */
  constructor(
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
  ) {}

  //contoh paginated
  async filterCompany(
    filter: CompanyFilterRequest,
  ): Promise<FilterQuery<CompanyDocument>> {
    const filterQuery: FilterQuery<CompanyDocument> = {};
    const { findOnlyCreateRequest } = filter;
    if (findOnlyCreateRequest) {
      // filterQuery.userId = { $exists: false };
      // { userId : { $exists : false } }
      filterQuery.picId = { $exists: false };
    } else {
      /* equals to exist true */
      filterQuery.picId = { $ne: null };
    }
    // if (ownerId) {
    //   filterQuery.ownerId = new Types.ObjectId(ownerId);
    // }
    // if (businessName) {
    //   filterQuery.businessName = { $regex: businessName, $options: 'i' };
    // }
    return filterQuery;
  }

  /**
   * Save profile data to database
   * @param {Company} profile - The profile to be saved.
   * @returns {Promise<CompanyDocument>}
   */
  async create(
    profile: Company,
    session?: ClientSession,
  ): Promise<CompanyDocument> {
    const createdProfile = new this.companyModel(profile);
    // return createdProfile.save();
    return session ? createdProfile.save({ session }) : createdProfile.save();
  }

  async countCompany(filter?: CompanyFilterRequest): Promise<number> {
    const filterQuery = await this.filterCompany(filter);
    return this.companyModel.countDocuments(filterQuery);
  }

  async getUserCompanyPaginated(
    filter: CompanyFilterRequest,
  ): Promise<CompanyDocument[]> {
    const { page, limit } = filter;
    const filterQuery = await this.filterCompany(filter);
    const offset = (page - 1) * limit;
    const company = await this.companyModel
      .find(filterQuery)
      .skip(offset)
      .limit(limit)
      .populate('picData')
      .exec();
    return company;
  }

  async getCompanyById(id: string): Promise<Company> {
    return this.companyModel.findById(id).exec();
  }

  /**
   * find one profile by filter
   * @param {FilterQuery<CompanyDocument>} filter - The filter query.
   * @param projection
   * @returns {Promise<CompanyDocument>}
   */
  async findOne(
    filter: FilterQuery<CompanyDocument>,
    projection?: any,
  ): Promise<CompanyDocument> {
    return this.companyModel.findOne(filter, projection).exec();
  }

  async findUserProfile(userId: string): Promise<CompanyDocument> {
    return this.companyModel.findOne({ userId }).exec();
  }

  /**
   * find profile by id
   * @param {string} id - The id of the profile.
   * @returns {Promise<Company>}
   */
  async findById(id: string): Promise<Company> {
    const companyId = new Types.ObjectId(id);
    const getProfile = await this.companyModel.findById(companyId);
    return getProfile;
  }

  /**
   * update profile by id
   * @param id - The id of the profile.
   * @param profile - The profile to be updated.
   * @returns
   */
  async updateCompany(
    id: string,
    companyData: Company,
    session?: ClientSession,
  ): Promise<Company> {
    const companyId = new Types.ObjectId(id);
    return this.companyModel.findByIdAndUpdate(companyId, companyData, {
      session,
      new: true,
    });
  }

  /**
   * delete profile by id
   * @param id - The id of the profile.
   * @returns {Promise<Company>}
   */
  async deleteById(id: string): Promise<Company> {
    const companyId = new Types.ObjectId(id);
    return this.companyModel.findByIdAndDelete(companyId);
  }

  // // findProfileByPhoneNumber
  // async findProfileByPhoneNumber(phone: string): Promise<ProfileDocument> {
  //   const getProfile = await this.companyModel.findOne({ phone });
  //   return getProfile;
  // }

  // // findProfileByBusinessId
  // async findProfileByBusinessId(businessId: string): Promise<ProfileDocument> {
  //   const getProfile = await this.companyModel.findOne({ businessId });
  //   return getProfile;
  // }

  // // findProfileByPhoneNumberAndBusinessId
  // async findProfileByPhoneNumberAndBusinessId(
  //   phone: string,
  //   businessId: string,
  // ): Promise<ProfileDocument> {
  //   const getProfile = await this.companyModel.findOne({
  //     phone,
  //     businessId,
  //   });
  //   return getProfile;
  // }
}
