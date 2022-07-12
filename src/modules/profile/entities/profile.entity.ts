import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

import { User } from '../../user/entities/user.entity';
import { ProfileCreateRequest } from '../dtos/requests/create-profile.request';
import { ProfileUpdateRequest } from '../dtos/requests/update-profile.request';
import { SocmedLinks } from '../interfaces/socmed-links.intefaces';

export type ProfileDocument = Profile & Document;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Profile {
  public readonly _id: string;

  /**
   * Profile Name
   * @example iyoy, budi, etc
   */
  @Prop()
  name: string;

  /**
   * Profile Picture (links)
   * @example https://khushbooyadavk007.medium.com/introducing-cli-resource-generators-nestjs-crudin-a-eye-blink-33a72b1a4e79
   */
  @Prop()
  profilePicture: string;

  /**
   * Profile Biography
   * @example Iyoy, 22 Th, etc
   */
  @Prop()
  bio: string;

  /**
   * Profile Soscial Media Link
   * @example https://www.facebook.com/...
   */
  // @Prop({})
  // socmedLinks?: ISocmedLinks;
  // create prop for socmedLinks with type of ISocmedLinks
  @Prop({ type: SocmedLinks })
  socmedLinks: SocmedLinks;

  /**
   * Profile Portfolio
   * @example https://about.gitlab.com/...
   */
  @Prop()
  portfolio: string;

  /**
   * Profile Email
   * @example umar.haitsam@gmail.com
   */
  @Prop({ required: true })
  email: string;

  /**
   * Profile Phone
   * @example +62812341234, etc
   */
  @Prop()
  phone: string;

  /**
   * Profile Address
   * @example gang langgar 4, etc
   */
  @Prop()
  address: string;

  /**
   * Profile Description
   * @example 'Bind devices to your account', 'Send WA Blast to your contacts', etc..
   */
  @Prop()
  profileDescription?: string;

  /**
   * Created By (userId)
   */
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  userId?: Types.ObjectId | User;

  createdBy: User;

  static fromCreateRequest(request: ProfileCreateRequest): Profile {
    const profile = new Profile();
    profile.name = request.name;
    profile.profilePicture = request.profilePicture;
    profile.bio = request.bio;
    profile.socmedLinks = request.socmedLinks;
    profile.portfolio = request.portfolio;
    profile.email = request.email;
    profile.phone = request.phone;
    profile.address = request.address;
    profile.profileDescription = request.profileDescription;
    profile.userId = new Types.ObjectId(request.userId);
    return profile;
  }

  static fromUpdateRequest(request: ProfileUpdateRequest): Profile {
    const profile = new Profile();
    profile.name = request.name;
    profile.profilePicture = request.profilePicture;
    profile.bio = request.bio;
    profile.socmedLinks = request.socmedLinks;
    profile.portfolio = request.portfolio;
    profile.email = request.email;
    profile.phone = request.phone;
    profile.address = request.address;
    profile.profileDescription = request.profileDescription;
    return profile;
  }
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);

ProfileSchema.virtual('createdBy', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});
