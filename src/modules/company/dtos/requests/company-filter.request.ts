import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, TransformFnParams, Type } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ParseOptionalBoolean } from '../../../../core/decorators/parse-optional-boolean';
import { BaseFilterRequest } from '../../../../core/dto/base-filter-request.dto';
import { optionalBooleanMapper } from '../../../../core/mappers/optional-boolean-mapper';

export class CompanyFilterRequest extends BaseFilterRequest {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  picId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  companyName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  companyAddress?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  creatorId?: string;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  // @Transform((value: TransformFnParams) =>
  //   value.value === 'true' ? true : false,
  // )
  // @Transform(({ value }) => value === 'true')
  // @Transform(({ obj, key }) => obj[key] === 'true')
  // @ParseOptionalBoolean()
  @IsBoolean()
  // transform value to jsonString
  // @Transform((value: TransformFnParams) => JSON.stringify(value))
  @Transform(({ value }) => optionalBooleanMapper.get(value))
  // @Type(() => Boolean)
  // @Transform(({ value }) => {
  //   return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
  // })
  // @Transform(({ value }) =>
  //   value === 'true' ? true : value === 'false' ? false : value,
  // )
  findOnlyCreateRequest?: boolean;
}
