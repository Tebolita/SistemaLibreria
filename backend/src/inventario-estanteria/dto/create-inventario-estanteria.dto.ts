import { IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateInventarioEstanteriaDto {
    @ApiProperty()
    @IsNumber()
    IdProducto: number

    @ApiProperty()
    @IsNumber()
    IdEstanteria: number
    
    @ApiProperty()
    @IsNumber()
    Cantidad: number

}
