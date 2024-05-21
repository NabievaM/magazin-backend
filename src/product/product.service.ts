import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './models/product.model';
import { FilesService } from '../files/files.service';
import { Op } from 'sequelize';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product) private ProductRepository: typeof Product,
    private readonly fileService: FilesService,
  ) {}

  async create(createProductDto: CreateProductDto, image: any) {
    const fileName = await this.fileService.createFile(image);
    const Product = await this.ProductRepository.create({
      ...createProductDto,
      image: fileName,
    });
    return Product;
  }

  // async findAll(limit: number, skip: number): Promise<Object> {
  //   const products = await this.ProductRepository.findAll({
  //     include: { all: true },
  //     order: [['createdAt', 'DESC']],
  //   });
  //   if (products.length === 0)
  //     return {
  //       message: 'Products Not Found',
  //       status: HttpStatus.NOT_FOUND,
  //     };

  //   let product_limit = [];
  //   if (skip === 1 || skip < 1) {
  //     let num = 0;
  //     for (let index = num; index < num + limit; index++) {
  //       if (products[index] === undefined) break;

  //       product_limit.push(products[index]);
  //     }
  //   } else {
  //     let num = (skip - 1) * limit;
  //     for (let index = num; index < num + limit; index++) {
  //       if (products[index] === undefined) break;

  //       product_limit.push(products[index]);
  //     }
  //   }

  //   if (product_limit.length === 0)
  //     return {
  //       message: 'Product Not Found',
  //       status: HttpStatus.NOT_FOUND,
  //     };

  //   const total = Product.length;

  //   return {
  //     status: HttpStatus.OK,
  //     product_limit,
  //     total,
  //   };
  // }

  async findAll(): Promise<Product[]> {
    return this.ProductRepository.findAll({ include: { all: true } });
  }

  async GetById(id: number): Promise<Product> {
    const Product = await this.ProductRepository.findByPk(id, {
      include: { all: true },
    });
    return Product;
  }

  async deleteById(id: number): Promise<number> {
    const Product = await this.ProductRepository.destroy({ where: { id } });
    return Product;
  }

  async updateById(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const Product = await this.ProductRepository.update(updateProductDto, {
      where: { id },
      returning: true,
    });

    return Product[1][0];
  }

  async removeFile(id: number) {
    const Product = await this.ProductRepository.findOne({ where: { id } });

    if (!Product) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return this.fileService.removeFile(Product.image);
  }

  async updateImage(id: number, image: any) {
    const removeFile = await this.removeFile(id);

    if (!removeFile) {
      throw new BadRequestException("Don't remove image");
    }

    const createFile = await this.fileService.createFile(image);
    const updateFile = await this.ProductRepository.update(
      {
        image: createFile,
      },
      { where: { id }, returning: true },
    );
    return updateFile;
  }

  async remove(id: number) {
    const post = await this.ProductRepository.findOne({ where: { id } });

    if (!post) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return this.fileService.removeFile(post.image);
  }

  async search({ name, qr_code }) {
    const where = {};

    if (name) {
      where['name'] = {
        [Op.like]: `%${name}%`,
      };
    }
    if (qr_code) {
      where['qr_code'] = {
        [Op.like]: `%${qr_code}%`,
      };
    }
    const product = await Product.findAll({ where });
    if (!product) {
      throw new BadRequestException('product not found');
    }
    return product;
  }
}
