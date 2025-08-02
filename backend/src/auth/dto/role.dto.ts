
import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { tb_roles } from "@prisma/client";

export type CreateRoleDto = Omit<tb_roles, 'id_rol'>;

export class ValidateRoleDto {
    @IsString()
    @MinLength(4)
    @ApiProperty()
    nombre: string;
}