import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, Types, ClientSession } from 'mongoose';
import { User } from "../../user/entities/user.entity";
import { StudentFilterRequest } from "../dto/requests/student-filter.request copy";
import { Student, StudentDocument } from "../entities/student.entity";

@Injectable()
export class StudentRepository{
    constructor(
        @InjectModel(Student.name) private studentModel: Model<StudentDocument>
    ){}
    
    async create(
        profile: Student,
      ): Promise<Student> {
        const createdProfile = new this.studentModel(profile);
        // return createdProfile.save();
        return  createdProfile.save();
      }

      async findById(id: string): Promise<Student> {
        const getStudent = await this.studentModel
          .findById(id)
          .populate('createdBy')
          .exec();
        return getStudent;
      }

      async updateById(id: string, user: Student): Promise<Student> {
        return await this.studentModel.findByIdAndUpdate(
          id,
          { $set: user },
          { new: true },
        );
      }

      async getAllStudent(
      ): Promise<Student[]> {
        return await this.studentModel
          .find()
          .exec();
      }

      async deleteStudent (id:string) : Promise<Student>{
        return await this.studentModel.findByIdAndDelete(id);
      }

}