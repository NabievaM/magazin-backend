import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
  HttpCode,
  HttpStatus,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product } from './models/product.model';
import { UpdateProductDto } from './dto/update-product.dto';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'Add Product' })
  @ApiResponse({ status: 200, description: 'New  Product', type: [Product] })
  @Post('create')
  @UseGuards(AdminGuard)
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() image: any,
  ) {
    return this.productService.create(createProductDto, image);
  }

  // @ApiOperation({ summary: 'View all product' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'List of products',
  //   type: [Product],
  // })
  // @Get('all')
  // findAll(@Query('limit') limit: number, @Query('skip') skip: number) {
  //   return this.productService.findAll(limit, skip);
  // }

  @ApiOperation({ summary: 'View all products' })
  @ApiResponse({
    status: 200,
    description: 'List of products',
    type: [Product],
  })
  @Get('all')
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @ApiOperation({ summary: 'Product  edit' })
  @ApiResponse({ status: 200, description: 'Product by Id', type: [Product] })
  @Put(':id')
  @UseGuards(AdminGuard)
  async updateById(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.updateById(+id, updateProductDto);
  }

  @ApiOperation({ summary: 'Image by id update ' })
  @ApiResponse({
    status: 201,
    description: 'update by id image',
    type: [Product],
  })
  @HttpCode(HttpStatus.OK)
  @Put('file/:id')
  @UseGuards(AdminGuard)
  @UseInterceptors(FileInterceptor('image'))
  updateFile(@Param('id') id: string, @UploadedFile() image: any) {
    return this.productService.updateImage(+id, image);
  }

  @ApiOperation({ summary: 'Search product' })
  @Get('search')
  Find(@Query('name') name: string, @Query('qr_code') qr_code: string) {
    return this.productService.search({ name, qr_code });
  }

  @ApiOperation({ summary: 'View Product by id' })
  @ApiResponse({ status: 200, description: 'Product', type: Product })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Product> {
    return this.productService.GetById(+id);
  }

  @ApiOperation({ summary: 'Delete Product' })
  @ApiResponse({
    status: 200,
    description: 'Deleted Product',
    type: [Product],
  })
  @Delete(':id')
  @UseGuards(AdminGuard)
  async deleteById(@Param('id') id: string): Promise<number> {
    return this.productService.deleteById(+id);
  }
}
