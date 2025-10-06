import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsString } from "class-validator";

export class CreateProveedoreDto {
    @ApiProperty()
    @IsString()
    NombreEmpresa: string

    @ApiProperty()
    @IsString()
    Contacto: string

    @ApiProperty()
    @IsString()
    Telefono: string

    @ApiProperty()
    @IsEmail()
    Correo: string

    @ApiProperty()
    @IsBoolean()
    Estado: boolean


}
