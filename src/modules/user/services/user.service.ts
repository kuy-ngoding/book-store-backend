import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import {
  comparePassword,
  hashPassword,
} from '../../../core/utils/passwordHash';
import { SetNewPasswordRequest } from '../../auth/dtos/requests/set-new-password.request';
import { User } from '../entities/user.entity';
import { ChangePasswordRequest } from '../dtos/requests/change-password.request';
import { UserRepository } from '../repositories/user.repository';
import { UserCreateRequest } from '../dtos/requests/user-create.request';
import { UserUpdateRequest } from '../dtos/requests/user-update.request';
import { ChangePasswordResponse } from '../dtos/responses/change-password.responses';
import { formatPhoneNumber } from '../../../core/utils/formatPhoneNumber';
import { UserFilterRequest } from '../dtos/requests/user-filter.request';
import { RoleEnum } from '../enums/role.enum';
import { Types } from 'mongoose';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  private readonly logger = new Logger(UserService.name);

  async findAllUserPaginated(
    filterRequest: UserFilterRequest,
  ): Promise<User[]> {
    return await this.userRepository.findAllUserPaginated(filterRequest);
  }

  async countUser(filterRequest: UserFilterRequest): Promise<number> {
    return await this.userRepository.countUser(filterRequest);
  }

  async findPicList(
    userId: string,
    userRole: string,
    filterRequest: UserFilterRequest,
  ): Promise<User[]> {
    // if (userRole !== RoleEnum.SUPER_USER) {
    //   filterRequest.creatorId = userId;
    // }
    filterRequest.role = RoleEnum.HRD;
    return await this.userRepository.findPicList(filterRequest);
  }

  async createUser(
    creatorId: string,
    createRequest: UserCreateRequest,
  ): Promise<User> {
    const userData = User.fromCreateDto(createRequest);
    if (userData.password) {
      userData.password = await hashPassword(userData.password);
    }
    if (createRequest.phoneNumber) {
      userData.phoneNumber = formatPhoneNumber(
        createRequest.phoneNumber,
      ).substring(1);
    }
    if (creatorId) {
      userData.creatorId = new Types.ObjectId(creatorId);
    }
    return await this.userRepository.create(userData);
  }

  async findUserById(id: string): Promise<User> {
    const findUserById = await this.userRepository.findById(id);

    if (!findUserById) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return findUserById;
  }

  async updateUserById(
    id: string,
    updateRequest: UserUpdateRequest,
  ): Promise<User> {
    await this.findUserById(id);

    const updateUserData = User.fromUpdateDto(updateRequest);
    if (updateUserData.password) {
      updateUserData.password = await hashPassword(updateUserData.password);
    }
    if (updateRequest.phoneNumber) {
      updateUserData.phoneNumber = formatPhoneNumber(
        updateRequest.phoneNumber,
      ).substring(1);
    }
    return await this.userRepository.updateById(id, updateUserData);
  }

  async updateCurrentUser(
    userId: string,
    updateRequest: UserUpdateRequest,
    email?: string,
  ): Promise<User> {
    const updateUserData = User.fromUpdateDto(updateRequest);
    // if (updateRequest.is2FAEnabled) {
    //   const user = await this.userRepository.findById(userId);
    //   if (user.otpAuthUrl === null) {
    //     const twoFactorResponse = await this.twoFactorAuthService.generate2FA(
    //       email,
    //     );
    //     updateUserData.twoFactorAuthenticationSecret =
    //       twoFactorResponse.otpSecret;
    //     updateUserData.otpAuthUrl = twoFactorResponse.otpUrl;
    //   }
    //   updateUserData.is2FAEnabled = updateRequest.is2FAEnabled;
    // } else if (!updateRequest.is2FAEnabled) {
    //   updateUserData.is2FAEnabled = false;
    // }
    // if (updateRequest.phone) {
    //   updateUserData.formattedPhoneNumber = formatPhoneNumber(
    //     updateRequest.phone,
    //   ).substring(1);
    // }
    return await this.userRepository.updateById(userId, updateUserData);
  }

  // update last login
  async updateLastLogin(id: string): Promise<User> {
    return this.userRepository.updateLastLogin(id);
  }

  //set new password
  async setNewPassword(setNewPasswordRequest: SetNewPasswordRequest) {
    const hashedPassword = await hashPassword(
      setNewPasswordRequest.newPassword,
    );
    const updatedUser = await this.userRepository.changePasswordById(
      setNewPasswordRequest.sub,
      hashedPassword,
    );
    this.logger.debug(
      `Password changed success for user ${updatedUser.username} from forgot password`,
    );
    return updatedUser;
  }

  async changePassword(
    userId: string,
    changePasswordRequest: ChangePasswordRequest,
  ): Promise<ChangePasswordResponse> {
    const findUser = await this.userRepository.findById(userId);
    const checkPassword = await comparePassword(
      changePasswordRequest.currentPassword,
      findUser.password,
    );
    if (!checkPassword) {
      const response: ChangePasswordResponse = {
        message: 'Current password is incorrect',
        statusCode: 401,
      };
      return response;
    }
    if (checkPassword) {
      const isSame = await comparePassword(
        changePasswordRequest.newPassword,
        findUser.password,
      );
      if (isSame) {
        const response: ChangePasswordResponse = {
          message: 'New password should not be same as current password',
          statusCode: 400,
        };
        return response;
      }
      if (!isSame) {
        const hashedPassword = await hashPassword(
          changePasswordRequest.newPassword,
        );
        const updatedUser = await this.userRepository.changePasswordById(
          userId,
          hashedPassword,
        );
        this.logger.debug(
          `Password changed success for user ${updatedUser.username}`,
        );
        const response = {
          message: 'Password changed successfully',
          statusCode: 200,
        };
        return response;
      }
    }
  }

  async deleteUserById(id: string): Promise<User> {
    return this.userRepository.deleteById(id);
  }
}
