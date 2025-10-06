import { IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class CreateEstanteriaDto {
    @ApiProperty()
    @IsString()
    @MinLength(1, { message: "El nombre debe de ser mayor a un caracter" })
    Nombre: string

    @ApiProperty()
    @IsString()
    @MinLength(1, { message: "La Ubicacion debe de ser mayor a un caracter" })
    Ubicacion: string


    @ApiProperty()
    @IsString()
    @MinLength(1, { message: "El Encargado debe de ser mayor a un caracter" })
    Encargado: string   
}
