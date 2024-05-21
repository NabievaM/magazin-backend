import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsEmail,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class SignUpAdminDto {
  @ApiProperty({ example: 'Nabieva Mukhlis', description: 'Admin`s full name' })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({
    example: '+998911234567',
    description: 'Admin`s phone number',
  })
  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 'Chilanzar 11', description: 'Admin`s address' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: 'nabieva@gmail.com', description: 'Admin`s email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Uzbek1$t0n', description: 'Admin`s password' })
  @IsNotEmpty()
  @IsStrongPassword()
  @MinLength(8)
  password: string;
}