import { IsDate, IsDecimal, IsNumber, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class CreateFacturaDto {
    @ApiProperty()
    @IsNumber()
    @MinLength(1)
    IdCliente: number

    @ApiProperty()
    @IsDate()
    @MinLength(1)
    Fecha: Date

    @ApiProperty()
    @IsDecimal()
    @MinLength(1)
    Total: number

    @ApiProperty()
    @IsNumber()
    @MinLength(1)
    IdUsuario: number

    @ApiProperty()
    @IsNumber()
    @MinLength(1)
    IdMedioPago: number

}
