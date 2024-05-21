import { PartialType } from '@nestjs/swagger';
import { CreateUserOrderDto } from './create-user_order.dto';

export class UpdateUserOrderDto extends PartialType(CreateUserOrderDto) {}
