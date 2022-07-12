import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { SocmedLinks } from '../../interfaces/socmed-links.intefaces';

export class ProfileCreateRequest {
  /**
   * Profile Name
   * @example iyoy, budi, etc
   */
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  name: string;

  /**
   * Profile Picture (links)
   * @example https://khushbooyadavk007.medium.com/introducing-cli-resource-generators-nestjs-crudin-a-eye-blink-33a72b1a4e79
   */
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  profilePicture?: string;

  /**
   * Profile Biography
   * @example Iyoy, 22 Th, etc
   */
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  bio: string;

  /**
   * Profile Soscial Media Link
   * @example https://www.facebook.com/...
   */
  @ApiPropertyOptional()
  @IsOptional()
  socmedLinks?: SocmedLinks;

  /**
   * Profile Portfolio
   * @example https://about.gitlab.com/...
   */
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  portfolio: string;

  /**
   * Profile Email
   * @example umar.haitsam@gmail.com
   */
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  email: string;

  /**
   * Profile Phone
   * @example +62812341234, etc
   */
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  phone: string;

  /**
   * Profile Address
   * @example gang langgar 4, etc
   */
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  address: string;

  /**
   * Profile Description
   * @example 'Bind devices to your account', 'Send WA Blast to your contacts', etc..
   */
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  profileDescription?: string;

  /**
   * Created By (userId)
   */
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  userId?: string;
}
