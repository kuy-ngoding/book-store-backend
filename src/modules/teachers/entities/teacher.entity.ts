import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { User } from "src/modules/user/entities/user.entity";
import { TeacherCreateRequest } from '../dto/requests/teacher-create.request';
import { TeacherUpdateRequest } from '../dto/requests/teacher-update.request';

export type TeacherDocument = Teacher & Document;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  id: false,
})
export class Teacher {
  readonly _id?: string;
  /**
   * Teacher Name
   * @example iyoy, kiru, umar
   */
  @Prop({ required: true })
 teacherName: string;
  
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
  name: any;

  /**
   * Parse Creat TeacherRequest to Teacher.
   */
  static fromCreateRequest(request: TeacherCreateRequest): Teacher {
    const teacher = new Teacher();
 teacher.teacherName = request.teacherName;
 teacher.address = request.address;
 teacher.phoneNumber = request.phoneNumber; 
 teacher.email = request.email;
    return teacher;
  }
  /**
   * Parse Updat TeacherRequest to Teacher.
   */
  static fromUpdateRequest(request: TeacherUpdateRequest): Teacher {
    const teacher = new Teacher();
 teacher.teacherName = request.teacherName;
 teacher.address = request.address;
 teacher.phoneNumber = request.phoneNumber; 
 teacher.email = request.email;
    return teacher;
  }

 
}

export const TeacherSchema = SchemaFactory.createForClass (Teacher);
 TeacherSchema.virtual('createdBy', {
  ref: 'User',
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
});
