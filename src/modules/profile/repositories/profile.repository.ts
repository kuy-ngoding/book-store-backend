import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { ProfileFilterRequest } from '../dtos/requests/profile-filter.request';
import { Profile, ProfileDocument } from '../entities/profile.entity';

// import { ProfileFilterDto } from '../dtos/profile/profile-filter.dto';
@Injectable()
export class ProfileRepository {
  /**
   * @param profileModel - The profile model.
   */
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
  ) {}

  // /**
  //  * Find all businesses and paginate them.
  //  */
  // async findPaginate() {
  //   return this.businessModel.find().exec();
  // }

  // /**
  //  * Get all current user businesses data.
  //  * @param userId current user id. (owner of business)
  //  * @returns {Promise<Business[]>} returns all businesses that current user have.
  //  */
  // async findAllCurrentUserBusiness(userId: string): Promise<Business[]> {
  //   return await this.businessModel.find({
  //     ownerId: userId,
  //   });
  // }

  // /**
  //  * Get all current user businesses data.
  //  * @param userId current user id. (owner of business)
  //  * @returns {Promise<Business[]>} returns all businesses that current user have.
  //  */
  // async findAllCurrentUserBusinessPaginated(
  //   businessFilterRequest: BusinessFilterQueryRequest,
  // ): Promise<BusinessDocument[]> {
  //   const { page, limit } = businessFilterRequest;
  //   const filterQuery = await this.filterBusiness(businessFilterRequest);
  //   const offset = (page - 1) * limit;
  //   return await this.businessModel
  //     .find(filterQuery)
  //     .skip(offset)
  //     .limit(limit)
  //     .exec();
  // }

  //contoh paginated
  async filterProfile(
    filter: ProfileFilterRequest,
  ): Promise<FilterQuery<ProfileDocument>> {
    const filterQuery: FilterQuery<ProfileDocument> = {};
    // const { ownerId, businessName } = filter;
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
   * @param {Profile} profile - The profile to be saved.
   * @returns {Promise<ProfileDocument>}
   */
  async create(profile: Profile): Promise<ProfileDocument> {
    const createdProfile = new this.profileModel(profile);
    return createdProfile.save();
  }

  async createMany(profiles: Profile[]): Promise<ProfileDocument[]> {
    return this.profileModel.insertMany(profiles);
  }

  async countProfiles(
    profileFilterDto?: ProfileFilterRequest,
  ): Promise<number> {
    const filter = await this.filterProfile(profileFilterDto);

    // if (profileFilterDto) {
    // if (profileFilterDto.phone) {
    //   filter.phone = profileFilterDto.phone;
    // }
    // if (profileFilterDto.businessId) {
    //   filter.businessId = new Types.ObjectId(profileFilterDto.businessId);
    // }
    // if (profileFilterDto.contactId) {
    //   filter.contactId = profileFilterDto.contactId;
    // }
    // if (profileFilterDto.profileName) {
    //   filter.profileName = profileFilterDto.profileName;
    // }
    // }

    return this.profileModel.countDocuments(filter);
  }

  async findPaginate(
    businessFilterRequest: ProfileFilterRequest,
  ): Promise<ProfileDocument[]> {
    const { page, limit } = businessFilterRequest;
    const filterQuery = await this.filterProfile(businessFilterRequest);
    const offset = (page - 1) * limit;
    return await this.profileModel
      .find(filterQuery)
      .skip(offset)
      .limit(limit)
      .exec();
  }

  /**
   * find one profile by filter
   * @param {FilterQuery<ProfileDocument>} filter - The filter query.
   * @param projection
   * @returns {Promise<ProfileDocument>}
   */
  async findOne(
    filter: FilterQuery<ProfileDocument>,
    projection?: any,
  ): Promise<ProfileDocument> {
    return this.profileModel.findOne(filter, projection).exec();
  }

  async findUserProfile(userId: string): Promise<ProfileDocument> {
    return this.profileModel.findOne({ userId }).exec();
  }

  /**
   * find profile by id
   * @param {string} id - The id of the profile.
   * @returns {Promise<ProfileDocument>}
   */
  async findById(id: string): Promise<ProfileDocument> {
    const getProfile = await this.profileModel.findById(id);
    return getProfile;
  }

  /**
   * update profile by id
   * @param id - The id of the profile.
   * @param profile - The profile to be updated.
   * @returns
   */
  async updateById(id: string, profile: Profile): Promise<ProfileDocument> {
    return await this.profileModel.findByIdAndUpdate(id, profile, {
      new: true,
    });
  }

  /**
   * delete profile by id
   * @param id - The id of the profile.
   * @returns {Promise<ProfileDocument>}
   */
  async deleteById(id: string): Promise<ProfileDocument> {
    return this.profileModel.findByIdAndDelete(id);
  }

  // // findProfileByPhoneNumber
  // async findProfileByPhoneNumber(phone: string): Promise<ProfileDocument> {
  //   const getProfile = await this.profileModel.findOne({ phone });
  //   return getProfile;
  // }

  // // findProfileByBusinessId
  // async findProfileByBusinessId(businessId: string): Promise<ProfileDocument> {
  //   const getProfile = await this.profileModel.findOne({ businessId });
  //   return getProfile;
  // }

  // // findProfileByPhoneNumberAndBusinessId
  // async findProfileByPhoneNumberAndBusinessId(
  //   phone: string,
  //   businessId: string,
  // ): Promise<ProfileDocument> {
  //   const getProfile = await this.profileModel.findOne({
  //     phone,
  //     businessId,
  //   });
  //   return getProfile;
  // }
}
