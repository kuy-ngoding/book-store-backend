import { Injectable, NotFoundException } from "@nestjs/common";
import { TeacherCreateRequest } from "../dto/requests/teacher-create.request";
import { TeacherUpdateRequest } from "../dto/requests/teacher-update.request";
import { Teacher } from "../entities/teacher.entity";
import { TeacherRepository } from "../repositories/teacher.repository";

@Injectable()
export class TeacherService {
  

  constructor(private teacherRepository: TeacherRepository) {}

  createTeacher(
    createRequest: TeacherCreateRequest,
  ): Promise<Teacher> {
    const profile = Teacher.fromCreateRequest(createRequest);
    return this.teacherRepository.create(profile);
  }

  findAll() {
    return `This action returns all students`;
  }

  async getAllTeacher(
  ): Promise<Teacher[]> {
    return await this.teacherRepository.getAllTeacher();
  }

  findOne(id: number) {
    return `This action returns a #${id} teacher`;
  }

  // update(id: number, updateStudentDto: StudentUpdateRequest) {
  //   return `This action updates a #${id} student`;
  // }

  async findTechrById(id: string): Promise<Teacher> {
    const findTechrById = await this.teacherRepository.findById(id);

    if (!findTechrById) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return findTechrById;
  }

  async updateTechrById(
    id: string,
    updateRequest: TeacherUpdateRequest,
  ): Promise<Teacher> {
    await this.findTechrById(id);

    const updateTeacherData = Teacher.fromUpdateRequest(updateRequest);
    return await this.teacherRepository.updateById(id, updateTeacherData);
  }

  async deleteTeacher( id:string ):Promise<Teacher>{
    return this.teacherRepository.deleteTeacher(id);
  }
}
