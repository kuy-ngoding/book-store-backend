import { Type } from "class-transformer";
import { IsEAN, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { BaseFilterRequest } from "../../../../core/dto/base-filter-request.dto";

export class StudentFilterRequest extends BaseFilterRequest {
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
