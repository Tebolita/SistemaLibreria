import { IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Roles } from "@prisma/client";

export type CreateRoleDto = Omit <Roles, 'IdRol' | 'createdAt' | 'updatedAt'>;


export class ValidateRoleDto {
    @IsString()
    @MinLength(3)
    @ApiProperty()
    NombreRol: string;

}
