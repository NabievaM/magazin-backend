import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { AdminModule } from './admin/admin.module';
import { Admin } from './admin/models/admin.model';
import { FilesModule } from './files/files.module';
import { CategoryModule } from './category/category.module';
import { Category } from './category/models/category.model';
import { ProductModule } from './product/product.module';
import { Product } from './product/models/product.model';
import { UserOrderModule } from './user_order/user_order.module';
import { UserOrder } from './user_order/models/user_order.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, '..', 'uploads'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [Admin, Category, Product, UserOrder],
      autoLoadModels: true,
      logging: false,
    }),
    AdminModule,
    FilesModule,
    CategoryModule,
    ProductModule,
    UserOrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
