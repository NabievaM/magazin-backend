import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Apple',
    description: 'product name',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: '25.000',
    description: 'Product price',
  })
  @IsNotEmpty()
  @IsString()
  price: string;

  @ApiProperty({
    example: 'This is red apple',
    description: 'Product`s  description',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: '30',
    description: 'Amount product',
  })
  @IsNotEmpty()
  @IsString()
  value: string;
}
