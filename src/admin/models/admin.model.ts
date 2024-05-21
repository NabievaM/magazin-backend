import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface AdminAttrs {
  full_name: string;
  phone: string;
  address: string;
  email: string;
  password: string;
  is_active: boolean;
  is_superAdmin: boolean;
  hashed_refresh_token: string;
}

@Table({ tableName: 'Admin' })
export class Admin extends Model<Admin, AdminAttrs> {
  @ApiProperty({ example: 1, description: 'Unikal Id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Nabiev Ali', description: 'Admin`s full name' })
  @Column({
    type: DataType.STRING,
  })
  full_name: string;

  @ApiProperty({
    example: '+998911234567',
    description: 'Admin`s phone number',
  })
  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @ApiProperty({ example: 'Chilanzar', description: 'Admin`s address' })
  @Column({
    type: DataType.STRING,
  })
  address: string;

  @ApiProperty({ example: 'nabieva@gmail.com', description: 'Admin`s email' })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  email: string;

  @ApiProperty({ example: 'Uzbek!$t0n', description: 'Admin`s password' })
  @Column({
    type: DataType.STRING,
  })
  password: string;

  @ApiProperty({ example: 'true', description: 'Admin`s activity' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  is_active: boolean;

  @ApiProperty({
    example: 'false',
    description: 'Admin superadmin?',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_superAdmin: boolean;

  @ApiProperty({
    example: 'dsf7787cvnc9s_kjsjfndf7',
    description: 'Admin`s hashed refresh token',
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;
}
