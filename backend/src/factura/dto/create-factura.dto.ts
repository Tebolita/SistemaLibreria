import { IsDate, IsNumber, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";


export class CreateFacturaDto {
    @ApiProperty()
    @IsNumber()
    Cliente: number

    @ApiProperty()
    @Type(() => Date)
    @IsDate()
    Fecha: Date

    @ApiProperty()
    @IsNumber()
    Total: number

    @ApiProperty()
    @IsNumber()
    Usuario: number

    @ApiProperty()
    @IsNumber()
    MetodoPago: number

}
