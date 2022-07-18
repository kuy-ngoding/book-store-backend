import { Module } from '@nestjs/common';
import { StudentService } from './services/students.service';
import { StudentsController } from './controllers/students.controller';
import { StudentRepository } from './repositories/student.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './entities/student.entity';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
  ],
  controllers: [StudentsController],
  providers: [StudentService, StudentRepository]
})
export class StudentsModule {}
