import { Injectable } from '@nestjs/common';
import { CreateStudentRequest } from './dto/requests/create-student.request';
import { UpdateStudentRequest } from './dto/requests/update-student.request';
import { Student } from './entities/student.entity';
import { StudentRepository } from './repositories/student.repository';

@Injectable()
export class StudentService {

  constructor(private studentRepository: StudentRepository) {}

  createStudent(
    createRequest: CreateStudentRequest,
  ): Promise<Student> {
    const profile = Student.fromCreateRequest(createRequest);
    return this.studentRepository.create(profile);
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
