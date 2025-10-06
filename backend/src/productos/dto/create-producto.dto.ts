import { IsNumber, IsString, Min, MinLength, IsBoolean } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProductoDto {
    @ApiProperty()
    @IsString()
    @MinLength(1, { message: "El nombre debe de ser mayor a un caracter" })
    Nombre: string;

    @ApiProperty()
    @IsString()
    @MinLength(1)
    Descripcion: string;

    @ApiProperty()
    @IsNumber({ allowInfinity: false, allowNaN: false }, { message: 'Precio debe ser un número decimal válido' })
    @Min(0.01, { message: 'Precio debe ser mayor a 0' })
    Precio: number;

    @ApiProperty()
    @IsNumber()
    @Min(1)
    Stock: number;

    @ApiProperty()
    @IsNumber()
    @Min(1)
    IdCategoria: number;

    @ApiProperty()
    @IsNumber()
    @Min(1)
    IdProveedor: number;

    @ApiProperty()
    @IsBoolean()
    Estado: boolean 

    @ApiProperty()
    @IsString()
    Imagen: string
}