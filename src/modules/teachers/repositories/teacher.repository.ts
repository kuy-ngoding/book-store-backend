import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Teacher, TeacherDocument } from "../entities/teacher.entity";

@Injectable()
export class TeacherRepository{
    constructor(
        @InjectModel(Teacher.name) private teacherModel: Model<TeacherDocument>
    ){}
    
    async create(
        profile: Teacher,
      ): Promise<Teacher> {
        const createdProfile = new this.teacherModel(profile);
        // return createdProfile.save();
        return  createdProfile.save();
      }

      async findById(id: string): Promise<Teacher> {
        const getStudent = await this.teacherModel
          .findById(id)
          .populate('createdBy')
          .exec();
        return getStudent;
      }

      async updateById(id: string, user: Teacher): Promise<Teacher> {
        return await this.teacherModel.findByIdAndUpdate(
          id,
          { $set: user },
          { new: true },
        );
      }

      async getAllTeacher(
      ): Promise<Teacher[]> {
        return await this.teacherModel
          .find()
          .exec();
      }

      async deleteTeacher (id:string) : Promise<Teacher>{
        return await this.teacherModel.findByIdAndDelete(id);
      }

}