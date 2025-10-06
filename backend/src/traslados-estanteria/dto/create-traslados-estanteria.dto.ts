import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNumber, IsString } from "class-validator";


export class CreateTrasladosEstanteriaDto {
    @ApiProperty()
    @IsNumber()
    IdProducto: number

    @ApiProperty()
    @IsNumber()
    IdEstanteriaOrigen: number
    
    @ApiProperty()
    @IsNumber()
    IdEstanteriaDestino: number

    @ApiProperty()
    @IsNumber()
    Cantidad: number
    
    @ApiProperty()
    @Type(() => Date)
    @IsDate()
    Fecha: Date

    @ApiProperty()
    @IsString()
    Comentario: string
    
}
