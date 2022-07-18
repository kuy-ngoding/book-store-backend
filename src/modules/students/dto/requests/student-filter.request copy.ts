import { Type } from "class-transformer";
import { IsEAN, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class StudentFilterRequest {
      /**
   * Student Name
   * @example iyoy, kiru, umar
   */
  @IsString()
  @IsOptional()
  studentName: string;
  
  /**
   * address
   * @example pondok pinang, kedaung, dll
   */
  @IsString()
  @IsOptional()
  address: string;

  /**
   * phoneNumber
   * @example 085xxxx
   */
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  phoneNumber: number;

  /**
   * email
   * @example rifkiramadhan.dev@gmail.com
   */
  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;
}
