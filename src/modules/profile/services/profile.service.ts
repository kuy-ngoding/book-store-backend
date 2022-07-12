import { Injectable } from '@nestjs/common';
import { User } from '../../user/entities/user.entity';

import { ProfileCreateRequest } from '../dtos/requests/create-profile.request';
import { ProfileFilterRequest } from '../dtos/requests/profile-filter.request';
import { ProfileUpdateRequest } from '../dtos/requests/update-profile.request';
import { Profile } from '../entities/profile.entity';
import { ProfileRepository } from '../repositories/profile.repository';

@Injectable()
export class ProfileService {
  constructor(private profileRepository: ProfileRepository) {}

  /**
   * Create new profile
   * @param {ProfileCreateDto} profileCreateDto - Profile object
   * @returns {Promise<Profile>}
   */
  createProfile(
    userId: string,
    createRequest: ProfileCreateRequest,
  ): Promise<Profile> {
    createRequest.userId = userId;
    const profile = Profile.fromCreateRequest(createRequest);
    return this.profileRepository.create(profile);
  }

  // contoh service get dan count
  async getAllPaginatedProfile(
    profileFilterRequest: ProfileFilterRequest,
  ): Promise<Profile[]> {
    return await this.profileRepository.findPaginate(profileFilterRequest);
  }

  async countProfile(
    profileFilterRequest: ProfileFilterRequest,
  ): Promise<number> {
    return await this.profileRepository.countProfiles(profileFilterRequest);
  }

  async createManyProfile(createRequests: ProfileCreateRequest[]) {
    const profiles = createRequests.map((profileCreateDto) => {
      return Profile.fromCreateRequest(profileCreateDto);
    });

    const insertMany = await this.profileRepository.createMany(profiles);
    return insertMany;
  }

  async findUserProfile(userId: string): Promise<Profile> {
    return await this.profileRepository.findUserProfile(userId);
  }

  /**
   * Get profile by id
   * @param id - id of profile
   * @returns {Promise<Profile>}
   */
  findProfileById(id: string): Promise<Profile> {
    return this.profileRepository.findById(id);
  }

  /**
   * Update profile by id
   * @param id - id of profile
   * @param {ProfileUpdateDto} profileUpdateDto - ProfileUpdateDto object
   * @returns {Promise<Profile>}
   */
  updateProfileById(
    id: string,
    updateRequest: ProfileUpdateRequest,
  ): Promise<Profile> {
    const profile = Profile.fromUpdateRequest(updateRequest);
    return this.profileRepository.updateById(id, profile);
  }

  /**
   * Delete profile by id
   * @param id - id of profile
   * @returns {Promise<Profile>}
   */
  deleteProfileById(id: string) {
    return this.profileRepository.deleteById(id);
  }
}
