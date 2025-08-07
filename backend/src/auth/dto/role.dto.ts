
import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Roles } from "@prisma/client";

export type CreateRoleDto = Omit<Roles, 'IdRol'>;

export class ValidateRoleDto {
    @IsString()
    @MinLength(4)
    @ApiProperty()
    NombreRol: string;
}