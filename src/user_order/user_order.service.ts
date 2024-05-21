import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserOrderDto } from './dto/create-user_order.dto';
import { UpdateUserOrderDto } from './dto/update-user_order.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UserOrder } from './models/user_order.model';
import { Op } from 'sequelize';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(UserOrder) private CustomerRepository: typeof UserOrder,
  ) {}

  async create(createCustomerDto: CreateUserOrderDto) {
    const UserOrder = await this.CustomerRepository.create({
      ...createCustomerDto,
    });
    return UserOrder;
  }

  async findAll(): Promise<UserOrder[]> {
    return this.CustomerRepository.findAll({ include: { all: true } });
  }

  async GetById(id: number): Promise<UserOrder> {
    const UserOrder = await this.CustomerRepository.findByPk(id, {
      include: { all: true },
    });
    return UserOrder;
  }

  async deleteById(id: number): Promise<number> {
    const UserOrder = await this.CustomerRepository.destroy({ where: { id } });
    return UserOrder;
  }

  async updateById(
    id: number,
    updateCustomerDto: UpdateUserOrderDto,
  ): Promise<UserOrder> {
    const UserOrder = await this.CustomerRepository.update(updateCustomerDto, {
      where: { id },
      returning: true,
    });

    return UserOrder[1][0];
  }

  async remove(id: number) {
    const post = await this.CustomerRepository.findOne({ where: { id } });

    if (!post) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return this.CustomerRepository.destroy({ where: { id } });
  }

  async search({ full_name, phone }) {
    const where = {};

    if (full_name) {
      where['full_name'] = {
        [Op.like]: `%${full_name}%`,
      };
    }
    if (phone) {
      where['phone'] = {
        [Op.like]: `%${phone}%`,
      };
    }
    const product = await UserOrder.findAll({ where });
    if (!product) {
      throw new BadRequestException('product not found');
    }
    return product;
  }
}
