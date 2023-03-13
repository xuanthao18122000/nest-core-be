import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class LoginPostDTO {
  @ApiProperty({ example: 'Email' })
  @Expose()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'MD5 Hash' })
  @Expose()
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class RegisterPostDTO {
  // @Expose()
  @ApiProperty({ example: 'email' })
  @Expose()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  // @Expose()
  @ApiProperty({ example: 'MD5 hash' })
  @Expose()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'fullName' })
  @Expose()
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({ example: 'phone' })
  @Expose()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  phone: number;

  @ApiProperty({ example: 'code (6 numbers)' })
  @Expose()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  code: number;

  address: string;

  balance: number;

}

export class ChangePasswordDTO {

  @ApiProperty({ example: 'MD5 Hash' })
  @Expose()
  @IsString()
  @IsNotEmpty()
  currentPassword: string;

  @ApiProperty({ example: 'MD5 Hash' })
  @Expose()
  @IsString()
  @IsNotEmpty()
  password: string;

}

export class ForgotPasswordDTO {
  @ApiProperty({ example: 'email' })
  @Expose()
  @IsEmail()
  @IsNotEmpty()
  email: string;

}
