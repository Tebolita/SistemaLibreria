import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsDate } from "class-validator";


export class CreateEstadoFacturaDto {

    @ApiProperty()
    @IsNumber()
    IdEstadoEnvio: number

    @ApiProperty()
    @IsNumber()    
    IdFactura: number

    @ApiProperty()
    @Type(() => Date)
    @IsDate()
    Fecha: Date

}
