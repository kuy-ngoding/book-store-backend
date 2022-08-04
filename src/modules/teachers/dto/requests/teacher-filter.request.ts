import { Type } from "class-transformer";
import { IsString, IsOptional, IsNumber, IsEmail } from "class-validator";

export class TeacherFilterRequest {
    /**
 * Student Name
 * @example iyoy, kiru, umar
 */
@IsString()
@IsOptional()
teacherName: string;


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
