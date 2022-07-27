import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseResponse } from '../../../core/dto/base-response';
import { baseResponseHelper } from '../../../core/helpers/base-response-helper';
import { Student } from '../entities/student.entity';
import { Response } from 'express';
import { StudentService } from '../services/students.service';
import { StudentCreateRequest } from '../dto/requests/student-create.request';
import { StudentUpdateRequest } from '../dto/requests/student-update.request';
import { UserFilterRequest } from '../../user/dtos/requests/user-filter.request';
import { StudentFilterRequest } from '../dto/requests/student-filter.request copy';
import { PaginatedResponse } from '../../../core/dto/paginated-response.dto';
import { paginationHelper } from '../../../core/helpers/pagination-helper';

@ApiTags('students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentService) {}

  @Post()
  async create(
    @Body() request: StudentCreateRequest,
    @Res() res: Response,
  ): Promise<Response<BaseResponse<Student>>> {
    const result = await this.studentsService.createStudent(request);
    const response = baseResponseHelper(res, result);
    return response;
  }

  // @Get()
  // findAll() {
  //   return this.studentsService.findAll();
  // }

  @Get('/students')
  async getAllUserPaginated(
    @Query() filterRequest: StudentFilterRequest,
    @Res() res: Response,
  ): Promise<Response<PaginatedResponse<Student[]>>> {
    const { limit, page } = filterRequest;
    const paginatedBot = await this.studentsService.findAllStudentPaginated(
      filterRequest,
    );
    const botCount = await this.studentsService.countStudent(filterRequest);
    const response = paginationHelper<Student[]>(
      res,
      paginatedBot,
      botCount,
      page,
      limit,
    );
    return response;
  }

  @Get()
  async getAll(
    @Res () res: Response,
  ): Promise<Response<BaseResponse<Student[]>>>
  {
    const result = await this.studentsService.getAllStudent();
    const response = baseResponseHelper(res, result);
    return response;
  }

  @Get('/:id')
  async findStudentById(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response<BaseResponse<Student>>> {
    const user = await this.studentsService.findStudndtById(id);
    return baseResponseHelper(res, user);
  }

  @Put('/:id')
  async updateStudent(
    @Param('id') id: string,
    @Body() updateRequest: StudentUpdateRequest,
    @Res() res: Response,
  ): Promise<Response<BaseResponse<Student>>> {
    const updatedUser = await this.studentsService.updateStudenById(
      id,
      updateRequest,
    );
    return baseResponseHelper(res, updatedUser);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateStudentDto: StudentUpdateRequest) {
  //   return this.studentsService.update(+id, updateStudentDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.studentsService.remove(+id);
  // }
  @Delete('/:id')
  async deleteStudent(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response<BaseResponse<Student>>> {
    const deletedUser = await this.studentsService.deleteStudent(id);
    return baseResponseHelper(res, deletedUser);
  }
}
