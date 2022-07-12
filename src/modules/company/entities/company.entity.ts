import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { User } from '../../user/entities/user.entity';
import { CompanyCreateRequest } from '../dtos/requests/company-create.request';
import { CompanyUpdateRequest } from '../dtos/requests/company-update.request';
import { CompanyStatus } from '../enums/company-status.enum';

export type CompanyDocument = Company & Document;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  id: false,
})
export class Company {
  readonly _id?: string;

  /**
   * pic id (userId)
   */
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  picId?: Types.ObjectId | User;

  picData?: User;

  /**
   * PIC Name
   */
  @Prop()
  picName: string;

  /**
   * Total Employee
   */
  @Prop()
  totalEmployee?: number;

  /**
   * company phone number
   */
  @Prop({ required: true })
  companyPhone: string;

  /**
   * Company Name
   */
  @Prop({ required: true })
  companyName: string;

  /**
   * Company E-Mail
   * @example gojekxcontag@gojek.com
   */
  @Prop({ required: true })
  companyEmail: string;

  /**
   * Company address
   */
  @Prop()
  companyAddress?: string;

  @Prop({ enum: CompanyStatus, default: CompanyStatus.PENDING })
  companyStatus?: CompanyStatus;

  @Prop({})
  rejectReason?: string;

  /**
   * Created By (userId)
   */
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  creatorId?: Types.ObjectId | User;

  createdBy?: User;

  /**
   * Parse UserCreateDto to Business.
   */
  static fromCreateRequest(request: CompanyCreateRequest): Company {
    const company = new Company();
    company.picName = request.picName;
    company.companyName = request.companyName;
    company.companyPhone = request.companyPhone.toString();
    company.companyEmail = request.companyEmail;
    if (request.totalEmployee) {
      company.totalEmployee = request.totalEmployee;
    }
    if (request.companyAddress) {
      company.companyAddress = request.companyAddress;
    }
    return company;
  }

  /**
   * Parse BusinessUpdateDto to Business.
   */
  static fromUpdateRequest(request: CompanyUpdateRequest): Company {
    const company = new Company();
    company.picName = request.picName;
    company.companyName = request.companyName;
    company.companyPhone = request.companyPhone.toString();
    company.companyEmail = request.companyEmail;
    company.rejectReason = request.rejectReason;
    if (request.totalEmployee) {
      company.totalEmployee = request.totalEmployee;
    }
    if (request.companyAddress) {
      company.companyAddress = request.companyAddress;
    }
    if (request.picId) {
      company.picId = new Types.ObjectId(request.picId);
    }
    if (request.creatorId) {
      company.creatorId = new Types.ObjectId(request.creatorId);
    }
    return company;
  }
}

export const CompanySchema = SchemaFactory.createForClass(Company);

CompanySchema.virtual('picData', {
  ref: 'User',
  localField: 'picId',
  foreignField: '_id',
  justOne: true,
});

CompanySchema.virtual('createdBy', {
  ref: 'User',
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
});
