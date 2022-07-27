import { Injectable, NotFoundException } from '@nestjs/common';
import { StudentCreateRequest } from '../dto/requests/student-create.request';
import { StudentFilterRequest } from '../dto/requests/student-filter.request copy';
import { StudentUpdateRequest } from '../dto/requests/student-update.request';
import { Student } from '../entities/student.entity';
import { StudentRepository } from '../repositories/student.repository';

@Injectable()
export class StudentService {

  constructor(private studentRepository: StudentRepository) {}

  createStudent(
    createRequest: StudentCreateRequest,
  ): Promise<Student> {
    const profile = Student.fromCreateRequest(createRequest);
    return this.studentRepository.create(profile);
  }

  findAll() {
    return `This action returns all students`;
  }

  async getAllStudent(
  ): Promise<Student[]> {
    return await this.studentRepository.getAllStudent();
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  async findAllStudentPaginated(
    filterRequest: StudentFilterRequest,
  ): Promise<Student[]> {
    return await this.studentRepository.findAllStudentPaginated(filterRequest);
  }

  async countStudent(filterRequest: StudentFilterRequest): Promise<number> {
    return await this.studentRepository.countStudent(filterRequest);
  }
  // update(id: number, updateStudentDto: StudentUpdateRequest) {
  //   return `This action updates a #${id} student`;
  // }

  async findStudndtById(id: string): Promise<Student> {
    const findStudndById = await this.studentRepository.findById(id);

    if (!findStudndById) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return findStudndById;
  }

  async updateStudenById(
    id: string,
    updateRequest: StudentUpdateRequest,
  ): Promise<Student> {
    await this.findStudndtById(id);

    const updateStudentData = Student.fromUpdateRequest(updateRequest);
    return await this.studentRepository.updateById(id, updateStudentData);
  }

  async deleteStudent( id:string ):Promise<Student>{
    return this.studentRepository.deleteStudent(id);
  }
}
