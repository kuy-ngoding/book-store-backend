import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { User } from "src/modules/user/entities/user.entity";
import { CreateStudentRequest } from '../dto/requests/create-student.request';
import { UpdateStudentRequest } from '../dto/requests/update-student.request';

export type StudentDocument = Student & Document;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  id: false,
})
export class Student {
  readonly _id?: string;
  /**
   * Student Name
   * @example iyoy, kiru, umar
   */
  @Prop({ required: true })
  studentName: string;
  
  /**
   * address
   * @example pondok pinang, kedaung, dll
   */
  @Prop({ required: true })
  address: string;

  /**
   * phoneNumber
   * @example 085xxxx
   */
  @Prop({ required: true })
  phoneNumber: number;

  /**
   * email
   * @example rifkiramadhan.dev@gmail.com
   */
  @Prop({ required: true })
  email: string;


  
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  creatorId?: Types.ObjectId | User;

  createdBy?: User;

  /**
   * Parse CreateStudentRequest to Student.
   */
  static fromCreateRequest(request: CreateStudentRequest): Student {
    const student = new Student();
    student.studentName = request.studentName;
    student.address = request.address;
    student.phoneNumber = request.phoneNumber; 
    student.email = request.email;
    return student;
  }
  /**
   * Parse UpdateStudentRequest to Student.
   */
  static fromUpdateRequest(request: UpdateStudentRequest): Student {
    const student = new Student();
    student.studentName = request.studentName;
    student.address = request.address;
    student.phoneNumber = request.phoneNumber; 
    student.email = request.email;
    return student;
  }

 
}

export const StudentSchema = SchemaFactory.createForClass(Student);

StudentSchema.virtual('createdBy', {
  ref: 'User',
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
});
