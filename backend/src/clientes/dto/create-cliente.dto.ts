import { IsString, MinLength, IsEmail, IsBoolean, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateClienteDto {
    @ApiProperty()
    @IsString()
    @MinLength(1, { message: "El nombre debe de ser mayor a un caracter" })
    NombreCompleto: string

    @ApiProperty()
    @IsEmail()
    @MinLength(1, { message: "Debe de ser un correo valido" })
    Correo: string

    @ApiProperty()
    @IsString()
    @MinLength(8, { message: "El Telefono debe de ser mayor a ocho caracter" })
    Telefono: string

    @ApiProperty()
    @IsString()
    @MinLength(1, { message: "La Direccion debe de ser mayor a un caracter" })
    Direccion: string

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    Estado: boolean
}
