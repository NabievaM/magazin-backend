import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomerService } from './user_order.service';
import { CreateUserOrderDto } from './dto/create-user_order.dto';
import { UserOrder } from './models/user_order.model';
import { UpdateUserOrderDto } from './dto/update-user_order.dto';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('User')
@Controller('user')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @ApiOperation({ summary: 'Order by user' })
  @ApiResponse({ status: 200, description: 'New Order', type: [UserOrder] })
  @Post('create')
  async createOrder(
    @Body() createUserOrderDto: CreateUserOrderDto,
  ): Promise<UserOrder> {
    return this.customerService.create(createUserOrderDto);
  }

  @ApiOperation({ summary: 'View all orders' })
  @ApiResponse({
    status: 200,
    description: 'List of orders',
    type: [UserOrder],
  })
  @Get('all')
  @UseGuards(AdminGuard)
  async findAll(): Promise<UserOrder[]> {
    return this.customerService.findAll();
  }

  @ApiOperation({ summary: 'Search order by name and by phone' })
  @Get('search')
  @UseGuards(AdminGuard)
  search(@Query('full_name') full_name: string, @Query('phone') phone: string) {
    return this.customerService.search({ full_name, phone });
  }

  @ApiOperation({ summary: 'View order by id' })
  @ApiResponse({
    status: 200,
    description: 'Customer`s order',
    type: UserOrder,
  })
  @Get(':id')
  @UseGuards(AdminGuard)
  async findById(@Param('id') id: string): Promise<UserOrder> {
    return this.customerService.GetById(+id);
  }

  @ApiOperation({ summary: 'Delete Order' })
  @ApiResponse({ status: 200, description: 'Deleted Order', type: [UserOrder] })
  @Delete(':id')
  @UseGuards(AdminGuard)
  async deleteById(@Param('id') id: string): Promise<number> {
    return this.customerService.deleteById(+id);
  }

  @ApiOperation({ summary: 'Order edit' })
  @ApiResponse({ status: 200, description: 'Update Order', type: [UserOrder] })
  @Put(':id')
  @UseGuards(AdminGuard)
  async updateById(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateUserOrderDto,
  ) {
    return this.customerService.updateById(+id, updateCustomerDto);
  }
}
