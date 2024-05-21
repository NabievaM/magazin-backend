import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  Table,
  Model,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Category } from '../../category/models/category.model';
import { UserOrder } from '../../user_order/models/user_order.model';

interface ProductAttrs {
  name: string;
  image: string;
  price: string;
  reduced_price: string;
  description: string;
  value: string;
}

@Table({ tableName: 'Product' })
export class Product extends Model<Product, ProductAttrs> {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Apple', description: 'Product`s name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: 'image.jpg',
    description: 'Category`s image',
  })
  @Column({
    type: DataType.STRING,
  })
  image: string;

  @ApiProperty({
    example: '35.000',
    description: 'Product`s price',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  price: string;

  @ApiProperty({
    example: '25.000',
    description: 'Product`s reduced price',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  reduced_price: string;

  @ApiProperty({
    example: 'This is red apple',
    description: 'Product`s description',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @ApiProperty({
    example: '30',
    description: 'Product value',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  value: string;

  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  category_id: number;

  @BelongsTo(() => Category)
  category: Category;

  @HasMany(() => UserOrder)
  userOrder: UserOrder[];
}
