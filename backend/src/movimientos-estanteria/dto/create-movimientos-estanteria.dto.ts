import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNumber, IsString } from "class-validator";


export class CreateMovimientosEstanteriaDto {
    @ApiProperty()
    @Type(() => Date)
    @IsDate()
    Fecha: Date

    @ApiProperty()
    @IsString()
    TipoMovimiento: string

    @ApiProperty() 
    @IsNumber()
    Cantidad: number

    @ApiProperty()
    @IsNumber()
    IdProducto: number

    @ApiProperty()
    @IsNumber()
    IdEstanteria: number

    @ApiProperty()
    @IsString()
    Observaciones: string

}
