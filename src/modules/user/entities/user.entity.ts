import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { UserCreateRequest } from '../dtos/requests/user-create.request';
import { UserUpdateRequest } from '../dtos/requests/user-update.request';

import { RoleEnum } from '../enums/role.enum';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  id: false,
})
export class User {
  readonly _id?: string;

  /**
   * Username
   */
  @Prop()
  username?: string;

  /**
   * User Email
   */
  @Prop()
  email: string;

  /**
   * User password
   */
  @Prop()
  password?: string;

  /**
   * Role
   */
  @Prop({ enum: RoleEnum, default: RoleEnum.CUSTOMER })
  role?: RoleEnum;

  /**
   * Name or CompanyName
   */
  @Prop()
  fullName?: string;

  /**
   * Phone Number
   */
  @Prop()
  phoneNumber?: string;

  @Prop()
  userAvatarUrl?: string;

  /**
   * Created By (userId)
   */
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  creatorId?: Types.ObjectId | User;

  createdBy?: User;

  @Prop()
  lastLogin?: Date;

  @Prop({ default: null, nullable: true })
  twoFactorAuthenticationSecret?: string;

  @Prop({ default: false })
  is2FAEnabled?: boolean;

  @Prop({ default: null, nullable: true })
  otpAuthUrl?: string;

  @Prop({ default: false })
  isLogined?: boolean;

  @Prop({ default: false })
  isPremium?: boolean;

  @Prop({ default: null })
  premiumExpiredAt?: Date;

  readonly createdAt?: Date;

  readonly updatedAt?: Date;

  /**
   * Parse UserCreateDto to Business.
   */
  static fromCreateDto(request: UserCreateRequest): User {
    const user = new User();
    user.username = request.username;
    user.fullName = request.fullName;
    user.email = request.email;
    user.password = request.password;
    user.phoneNumber = request.phoneNumber;
    user.role = request.role;
    return user;
  }

  /**
   * Parse BusinessUpdateDto to Business.
   */
  static fromUpdateDto(request: UserUpdateRequest): User {
    const user = new User();
    user.username = request.username;
    user.fullName = request.fullName;
    user.email = request.email;
    user.password = request.password;
    user.phoneNumber = request.phoneNumber;
    return user;
  }
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('createdBy', {
  ref: 'User',
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
});
