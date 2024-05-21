import { PartialType } from '@nestjs/mapped-types';
import { SignUpAdminDto } from './signup-admin.dto';

export class UpdateAdminDto extends PartialType(SignUpAdminDto) {}
