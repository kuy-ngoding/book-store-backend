import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TeacherController } from "./controllers/teachers.controller";
import { Teacher, TeacherSchema } from "./entities/teacher.entity";
import { TeacherRepository } from "./repositories/teacher.repository";
import { TeacherService } from "./service/teachers.service";


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Teacher.name, schema: TeacherSchema }]),
  ],
  controllers: [TeacherController],
  providers: [TeacherService, TeacherRepository]
})
export class TeachersModule {}

