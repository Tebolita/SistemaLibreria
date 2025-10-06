import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateMetodosPagoDto {
    @ApiProperty({
        example: "Efectivo",
        description: "Nombre del metodo de pago"
    })
    @IsString()
    Metodo: string
}
