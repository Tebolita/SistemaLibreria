import { IsDecimal, IsNumber } from "class-validator";
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
    @IsDecimal()
    PrecioUnitario: number    

    @ApiProperty()
    @IsDecimal()
    SubTotal: number        
}
