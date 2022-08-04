import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsNumber, IsEmail } from "class-validator";

export class TeacherCreateRequest {
    /**
 * Student Name
 * @example iyoy, kiru, umar
 */
@IsString()
@IsNotEmpty()
teacherName: string;

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

