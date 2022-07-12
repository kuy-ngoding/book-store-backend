import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CompanyCreateRequest {
  /**
   * PIC Name
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  picName: string;

  /**
   * Company Name
   */
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  companyName: string;

  /**
   * Company E-Mail
   * @example gojekxcontag@gojek.com
   */
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  companyEmail: string;

  /**
   * Username
   */
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  companyAddress?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  @IsNotEmpty()
  totalEmployee?: number;

  /**
   * company phone number
   */
  @ApiProperty()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  @IsNotEmpty()
  companyPhone: number;
}
