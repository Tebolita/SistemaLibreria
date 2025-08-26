import { IsNumber, IsString, Min, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Productos } from "@prisma/client";

export type CreateProductoDto = Omit <Productos, 'IdProducto' | 'createdAt' | 'updatedAt'>;


export class ValidateProductoDto {
    
    @IsString()
    @MinLength(1)
    @ApiProperty()
    Nombre: string;

    @IsString()
    @MinLength(1)
    @ApiProperty()
    Descripcion: string;

    @IsNumber({ allowInfinity: false, allowNaN: false }, { message: 'Precio debe ser un número decimal válido' })
    @Min(0.01, { message: 'Precio debe ser mayor a 0' })
    @ApiProperty()
    Precio: number;

    @IsNumber()
    @Min(1)
    @ApiProperty()
    Stock: number;

    @IsNumber()
    @Min(1)
    @ApiProperty()
    IdCategoria: number;

    @IsNumber()
    @Min(1)
    @ApiProperty()
    IdProveedor: number;
}

