import { IsDate, IsNumber, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";


export class CreateFacturaDto {
    @ApiProperty()
    @IsNumber()
    IdCliente: number

    @ApiProperty()
    @Type(() => Date)
    @IsDate()
    Fecha: Date

    @ApiProperty()
    @IsNumber()
    Total: number

    @ApiProperty()
    @IsNumber()
    IdUsuario: number

    @ApiProperty()
    @IsNumber()
    IdMetodoPago: number

}
