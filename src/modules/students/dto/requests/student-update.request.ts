import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { StudentCreateRequest } from './student-create.request';

export class StudentUpdateRequest extends PartialType(StudentCreateRequest) {
     /**
   * Student Name
   * @example iyoy, kiru, umar
   */
    
      @ApiProperty()
      @IsString()
      @IsNotEmpty()
      studentName: string;
      
      /**
       * address
       * @example pondok pinang, kedaung, dll
       */
      @ApiProperty()
      @IsString()
      @IsNotEmpty()
      address: string;
    
      /**
       * phoneNumber
       * @example 085xxxx
       */
      @ApiProperty()
      @IsNumber()
      @IsNotEmpty()
      @Type(() => Number)
      phoneNumber: number;
    
      /**
       * email
       * @example rifkiramadhan.dev@gmail.com
       */
      @IsString()
      @ApiProperty()
      @IsEmail()
      @IsNotEmpty()    
      email: string;

}
