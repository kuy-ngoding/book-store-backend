import { Type } from "class-transformer";
import { IsEAN, IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateStudentRequest {
      /**
   * Student Name
   * @example iyoy, kiru, umar
   */
  @IsString()
  @IsNotEmpty()
  studentName: string;
  
  /**
   * address
   * @example pondok pinang, kedaung, dll
   */
  @IsString()
  @IsNotEmpty()
  address: string;

  /**
   * phoneNumber
   * @example 085xxxx
   */
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  phoneNumber: number;

  /**
   * email
   * @example rifkiramadhan.dev@gmail.com
   */
  @IsString()
  @IsEmail()
  @IsNotEmpty()    
  email: string;
}
