import { PartialType } from '@nestjs/swagger';
import { ProfileCreateRequest } from './create-profile.request';

export class ProfileUpdateRequest extends PartialType(ProfileCreateRequest) {}
