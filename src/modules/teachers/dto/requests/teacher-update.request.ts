import { PartialType, ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsNumber, IsEmail } from "class-validator";
import { TeacherCreateRequest } from "./teacher-create.request";

export class TeacherUpdateRequest extends PartialType(TeacherCreateRequest) {
    /**
  * Teacher Name
  * @example iyoy, kiru, umar
  */
   
     @ApiProperty()
     @IsString()
     @IsNotEmpty()
     teacherName: string;
     
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

