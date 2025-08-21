import { ApiProperty } from "@nestjs/swagger"
import { Categorias } from "@prisma/client"
import { IsString } from "class-validator";

export type CreateCategoriaDto = Omit<Categorias, 'IdCategoria' | 'createdAt' | 'updatedAt'>;


export class ValidateCategoriaDto {
    @IsString()
    @ApiProperty()
    Nombre: string;

    @IsString()
    @ApiProperty()
    Descripcion: string;
}
