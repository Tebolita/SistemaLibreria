
import { IsEmail, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { tb_usuarios } from "@prisma/client";
import { Transform } from 'class-transformer';

export type CreateRegisterDto = Omit<tb_usuarios, 'id_usuario' | 'createdAt' | 'updatedAt'>;

export class ValidateRegisterDto {

    @IsString()
    @MinLength(4)
    @ApiProperty()
    nombre: string;

    @IsEmail()
    @ApiProperty()
    correo: string;

    @IsString()
    @MinLength(6)
    @Transform(({ value }) => value.trim())
    @ApiProperty()
    password: string;

    @IsString()
    @MinLength(4)
    @ApiProperty()
    nickname: string;

    @IsString()
    @ApiProperty()
    telefono: string;

    @IsNumber()
    @ApiProperty()
    id_rol: number;

    @IsString()
    @ApiProperty()
    @IsOptional()
    avatar: string;      
}