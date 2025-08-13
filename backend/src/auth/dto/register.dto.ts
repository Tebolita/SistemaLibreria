
import { IsEmail, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Usuarios } from "@prisma/client";
import { Transform } from 'class-transformer';

export type CreateRegisterDto = Omit<Usuarios, 'IdUsuario' | 'IdRol' | 'createdAt' | 'updatedAt'>;

export class ValidateRegisterDto {

    @IsString()
    @MinLength(4)
    @ApiProperty()
    Nombre: string;

    @IsEmail()
    @ApiProperty()
    Correo: string;

    @IsString()
    @MinLength(6)
    @Transform(({ value }) => value.trim())
    @ApiProperty()
    Contrasena: string;

    @IsString()
    @MinLength(4)
    @ApiProperty()
    Usuario: string;



}