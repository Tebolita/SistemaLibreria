import { IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
    @IsString()
    @MinLength(3)
    @ApiProperty()
    NombreRol: string;

}
