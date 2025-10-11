import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";



export class CreateEstadoEnvioDto {
    @ApiProperty()
    @IsString()
    NombreEstado: string;

    @ApiProperty()
    @IsString()
    Descripcion: string

}
