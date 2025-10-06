import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsBoolean, MinLength } from "class-validator";

export class CreateCategoriaDto {
    @IsString()
    @ApiProperty()
    Nombre: string;

    @IsString()
    @ApiProperty()
    Descripcion: string;

    @ApiProperty()
    @IsBoolean()
    Estado: boolean 
}
