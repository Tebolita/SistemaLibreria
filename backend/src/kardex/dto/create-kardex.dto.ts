import { IsDate, IsNumber, IsString, } from "class-validator";
import { Type } from 'class-transformer';
import { ApiProperty } from "@nestjs/swagger";

export class CreateKardexDto {
    @ApiProperty()
    @IsNumber()
    IdProducto: number

    @ApiProperty()
    @Type(() => Date)
    @IsDate()
    Fecha: Date

    @ApiProperty({
        example: 'Salida | Entrada',
        description: 'Solo puedes ingresar',
    })
    @IsString()
    TipoMovimiento: string

    @ApiProperty()
    @IsNumber()
    Cantidad: number

    @ApiProperty()
    @IsNumber()
    PrecioUnitario: number

    @ApiProperty()
    @IsNumber()
    StockAnterior: number

    @ApiProperty()
    @IsNumber()
    StockActual: number

    @ApiProperty()
    @IsString()
    Descripcion: string

}
