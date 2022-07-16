import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, Types, ClientSession } from 'mongoose';
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
}