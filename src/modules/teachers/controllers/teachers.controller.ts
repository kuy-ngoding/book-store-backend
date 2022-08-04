import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseResponse } from 'src/core/dto/base-response';
import { baseResponseHelper } from 'src/core/helpers/base-response-helper';
import { Response } from 'express';
import { TeacherCreateRequest } from '../dto/requests/teacher-create.request';
import { Teacher } from '../entities/teacher.entity';
import { TeacherService } from '../service/teachers.service';
import { TeacherUpdateRequest } from '../dto/requests/teacher-update.request';



@ApiTags('teacher')
@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post('/create')
  async create(
    @Body() request: TeacherCreateRequest,
    @Res() res: Response,
  ): Promise<Response<BaseResponse<Teacher>>> {
    const result = await this.teacherService.createTeacher(request);
    const response = baseResponseHelper(res, result);
    return response;
  }

  // @Get()
  // findAll() {
  //   return this.teacherService.findAll();
  // }

  @Get('/getall')
  async getAll(
    @Res () res: Response,
  ): Promise<Response<BaseResponse<Teacher[]>>>
  {
    const result = await this.teacherService.getAllTeacher();
    const response = baseResponseHelper(res, result);
    return response;
  }

  @Get('/:id')
  async findTeacherById(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response<BaseResponse<Teacher>>> {
    const user = await this.teacherService.findTechrById(id);
    return baseResponseHelper(res, user);
  }

  @Put('/:id')
  async updateTeachr(
    @Param('id') id: string,
    @Body() updateRequest: TeacherUpdateRequest,
    @Res() res: Response,
  ): Promise<Response<BaseResponse<Teacher>>> {
    const updatedUser = await this.teacherService.updateTechrById(
      id,
      updateRequest,
    );
    return baseResponseHelper(res, updatedUser);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teacherService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateStudentDto: StudentUpdateRequest) {
  //   return this.teacherService.update(+id, updateStudentDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.teacherService.remove(+id);
  // }
  @Delete('/:id')
  async delete(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response<BaseResponse<Teacher>>> {
    const deletedUser = await this.teacherService.deleteTeacher(id);
    return baseResponseHelper(res, deletedUser);
  }
}