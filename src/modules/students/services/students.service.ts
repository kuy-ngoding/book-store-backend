import { Injectable } from '@nestjs/common';
import { CreateStudentRequest } from '../dto/requests/create-student.request';
import { UpdateStudentRequest } from '../dto/requests/update-student.request';

@Injectable()
export class StudentsService {
  create(createStudentDto: CreateStudentRequest) {
    return 'This action adds a new student';
  }

  findAll() {
    return `This action returns all students`;
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentDto: UpdateStudentRequest) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
