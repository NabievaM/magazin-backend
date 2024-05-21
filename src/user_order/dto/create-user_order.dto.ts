import {ApiProperty} from '@nestjs/swagger';
import { IsNotEmpty,IsString,IsPhoneNumber } from 'class-validator';

export class CreateUserOrderDto {
    @ApiProperty({
        example:'Alieva Munisa',
        description:'Customer`s full name',
    })
    @IsNotEmpty()
    @IsString()
    full_name:string;

    @ApiProperty({
        example:'+998911234567',
        description:'Customer`s phone number',
    })
    @IsNotEmpty()
    @IsPhoneNumber()
    phone:string;
}
