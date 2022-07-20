import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateStudentRequest } from '../dto/requests/create-student.request';
import { UpdateStudentRequest } from '../dto/requests/update-student.request';
import { StudentsService } from '../services/students.service';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentRequest) {
    return this.studentsService.create(createStudentDto);
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
