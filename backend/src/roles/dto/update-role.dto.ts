import { PartialType } from '@nestjs/swagger';
import { ValidateRoleDto } from './create-role.dto';

export class UpdateRoleDto extends PartialType(ValidateRoleDto) {}
