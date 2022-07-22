import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types, ClientSession } from 'mongoose';
import { UserFilterRequest } from '../dtos/requests/user-filter.request';

import { User, UserDocument } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(user: User, session?: ClientSession): Promise<User> {
    const createdUser = new this.userModel(user);
    return session ? createdUser.save({ session }) : createdUser.save();
  }

  async filterProfile(
    filter: UserFilterRequest,
  ): Promise<FilterQuery<UserDocument>> {
    const filterQuery: FilterQuery<UserDocument> = {};
    const { username, email, fullName, role, phoneNumber, creatorId } = filter;
    if (username) {
      filterQuery.username = { $regex: username, $options: 'i' };
    }
    if (email) {
      filterQuery.email = { $regex: email, $options: 'i' };
    }
    if (fullName) {
      filterQuery.fullName = { $regex: fullName, $options: 'i' };
    }
    if (phoneNumber) {
      filterQuery.phoneNumber = { $regex: phoneNumber, $options: 'i' };
    }
    if (role) {
      filterQuery.role = { $regex: role, $options: 'i' };
    }
    if (creatorId) {
      filterQuery.creatorId = new Types.ObjectId(creatorId);
    }
    return filterQuery;
  }

  async findAllUserPaginated(
    request: UserFilterRequest,
  ): Promise<UserDocument[]> {
    const { page, limit } = request;
    const filterQuery = await this.filterProfile(request);
    const offset = (page - 1) * limit;
    return await this.userModel
      .find(filterQuery)
      .skip(offset)
      .limit(limit)
      .exec();
  }

  // async findAllUserPaginated(
  //   request: UserFilterRequest,
  // ): Promise<UserDocument[]> {
  //   const { page, limit } = request;
  //   const offset = (page - 1) * limit;
  //   return await this.userModel
  //     .find()
  //     .skip(offset)
  //     .limit(limit)
  //     .exec();
  // }

  async findPaginate() {
    return this.userModel.find().exec();
  }

  async countUser(request?: UserFilterRequest): Promise<number> {
    const filter = await this.filterProfile(request);
    return this.userModel.countDocuments(filter);
  }

  async findOne(
    filter: FilterQuery<UserDocument>,
    projection?: any,
  ): Promise<User> {
    return await this.userModel.findOne(filter, projection);
  }

  async findByUsernameOrEmail(username: string) {
    const getUser = await this.userModel.findOne({
      $or: [{ email: username }, { username }],
    });
    return getUser;
  }

  async findByEmail(email: string): Promise<User> {
    const getUser = await this.userModel.findOne(
      { email },
      { password: false },
    );
    return getUser;
  }

  async findById(id: string): Promise<User> {
    const getUser = await this.userModel
      .findById(id)
      .populate('createdBy')
      .exec();
    return getUser;
  }

  async updateById(id: string, user: User): Promise<User> {
    return await this.userModel.findByIdAndUpdate(
      id,
      { $set: user },
      { new: true },
    );
  }

  // update last login and is logined to true
  async updateLastLogin(id: string): Promise<User> {
    return this.userModel.findByIdAndUpdate(
      id,
      { lastLogin: new Date(), isLogined: true },
      { new: true },
    );
  }

  async deleteById(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }

  // reset password
  async resetPassword(email: string, password: string): Promise<User> {
    return this.userModel.findOneAndUpdate(
      { email },
      { password },
      { new: true },
    );
  }

  async changePasswordById(
    userId: string,
    password: string,
  ): Promise<UserDocument> {
    return await this.userModel.findByIdAndUpdate(
      userId,
      { password: password },
      { new: true },
    );
  }

  // async set2FASecret(secret: string, id: string): Promise<UserDocument> {
  //   return this.userModel.findByIdAndUpdate(
  //     id,
  //     { twoFactorAuthenticationSecret: secret },
  //     { new: true },
  //   );
  // }

  // async setOtpAndSecret(otpAuthUrl: string, secret: string, id: string): Promise<UserDocument> {
  async setOtpAndSecret(
    otpAuthUrl: string,
    secret: string,
    id: string,
  ): Promise<UserDocument> {
    return this.userModel.findByIdAndUpdate(
      id,
      { otpAuthUrl, twoFactorAuthenticationSecret: secret },
      { new: true },
    );
  }

  //turn on is2FAEnabled
  async enable2FA(id: string): Promise<UserDocument> {
    return this.userModel.findByIdAndUpdate(
      id,
      { is2FAEnabled: true },
      { new: true },
    );
  }

  async findPicList(request: UserFilterRequest): Promise<UserDocument[]> {
    const filter = await this.filterProfile(request);
    return await this.userModel.find(filter);
  }
}
