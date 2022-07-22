import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { CompanyCreateRequest } from "../../company/dtos/requests/company-create.request";
import { CompanyUpdateRequest } from "../../company/dtos/requests/company-update.request";
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { Company } from "../../company/entities/company.entity";
import { CompanyStatus } from "../../company/enums/company-status.enum";
import { User } from "../../user/entities/user.entity";
import { CategoryCreateRequest } from "../dto/request/category-create.request";
import { CategoryUpdateRequest } from "../dto/request/category-update.request";

export type CategoryDocument = Category & Document;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  id: false,
})
export class Category {
    readonly _id?: string;
  @Prop({
    required: true
  })
  categoryName: string; 


  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  creatorId?: Types.ObjectId | User;

  createdBy?: User;

  /**
   * Parse UserCreateDto to Business.
   */
  static fromCreateRequest(request: CategoryCreateRequest): Category {
    const category = new Category();
    category.categoryName = request.categoryName;
    return category;
  }

  /**
   * Parse BusinessUpdateDto to Business.
   */
static fromUpdateRequest(request: CategoryUpdateRequest): Category {
    const category = new Category();
    category.categoryName = request.categoryName;
    return category;
  }

static fromDeleteRequest(request: CategoryUpdateRequest): Category {
    const category = new Category();
    category.categoryName = request.categoryName;
    return category;
  }
}

export const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.virtual('createdBy', {
  ref: 'User',
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
});
