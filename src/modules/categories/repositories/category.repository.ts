import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, Types, ClientSession } from 'mongoose';
import { Category, CategoryDocument } from "../entities/category.entity";

@Injectable()
export class CategoryRepository {
    constructor(
        @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
      ) {}
      async create(
        profile: Category,
      ): Promise<CategoryDocument> {
        const createdProfile = new this.categoryModel(profile);
        // return createdProfile.save();
        return createdProfile.save();
      }
      async update(
        profile: Category,
      ): Promise<CategoryDocument> {
        const updatedProfile = new this.categoryModel(profile);
        return updatedProfile.save();
      }
      async delete(
        profile: Category,
      ): Promise<CategoryDocument> {
        const deletedProfile = new this.categoryModel(profile);
        return deletedProfile.save();
      }
    }
