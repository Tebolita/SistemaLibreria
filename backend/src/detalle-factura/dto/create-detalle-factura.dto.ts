import { IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateDetalleFacturaDto {
    @ApiProperty()
    @IsNumber()
    IdFactura:number

    @ApiProperty()
    @IsNumber()
    IdProducto: number

    @ApiProperty()
    @IsNumber()
    Cantidad: number
    
    @ApiProperty()
    @IsNumber()
    PrecioUnitario: number    

    @ApiProperty()
    @IsNumber()
    Subtotal: number    
    
    @ApiProperty()
    @IsNumber()
    IdEstanteria: number   

}
