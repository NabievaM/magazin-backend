import { Module } from '@nestjs/common';
import { CustomerService } from './user_order.service';
import { CustomerController } from './user_order.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserOrder } from './models/user_order.model';
import { JwtModule } from '@nestjs/jwt';
import { Product } from '../product/models/product.model';

@Module({
  imports: [SequelizeModule.forFeature([UserOrder, Product]), JwtModule],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class UserOrderModule {}
