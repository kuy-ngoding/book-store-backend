import { Module } from '@nestjs/common';
import { StudentsService } from './services/students.service';
import { StudentsController } from './controllers/students.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './entities/student.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Student.name, schema: StudentSchema }]),
  ],
  controllers: [StudentsController],
  providers: [StudentsService]
})
export class StudentsModule {}
