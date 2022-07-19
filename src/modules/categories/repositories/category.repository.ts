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
        id: string,
        updateRequest: Category,
      ): Promise<CategoryDocument> {
        const categoryId = new Types.ObjectId(id);
        return this.categoryModel.findByIdAndUpdate(categoryId, updateRequest, {
          new: true,
        });
      }
      async delete(
        id: string,
      ): Promise<CategoryDocument> {
        return await this.categoryModel.findByIdAndDelete(id);
      }
      async findAll(): Promise<CategoryDocument[]> {
        return await this.categoryModel.find();
      }
    }
