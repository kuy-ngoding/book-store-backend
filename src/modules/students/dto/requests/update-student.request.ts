import { PartialType } from '@nestjs/swagger';
import { CreateStudentRequest } from './create-student.request';

export class UpdateStudentRequest extends PartialType(CreateStudentRequest) {}
