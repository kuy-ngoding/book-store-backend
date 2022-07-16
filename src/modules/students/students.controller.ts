import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseResponse } from '../../core/dto/base-response';
import { baseResponseHelper } from '../../core/helpers/base-response-helper';
import { CreateStudentRequest } from './dto/requests/create-student.request';
import { UpdateStudentRequest } from './dto/requests/update-student.request';
import { Student } from './entities/student.entity';
import { Response } from 'express';
import { StudentService } from './students.service';

@ApiTags('students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentService) {}

  // @Post()
  // create(@Body() createStudentDto: CreateStudentRequest) {
  //   return this.studentsService.create(createStudentDto);
  // }

  @Post()
  async create(
    @Body() request: CreateStudentRequest,
    @Res() res: Response,
  ): Promise<Response<BaseResponse<Student>>> {
    const result = await this.studentsService.createStudent(request);
    const response = baseResponseHelper(res, result);
    return response;
  }

  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentRequest) {
    return this.studentsService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }
}
