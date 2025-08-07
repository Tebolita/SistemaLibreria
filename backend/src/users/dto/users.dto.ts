
import { IsEmail, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Usuarios } from "@prisma/client";
import { Transform } from 'class-transformer';

export type CreateRegisterDto = Omit<Usuarios, 'IdUsuario' | 'createdAt' | 'updatedAt'>;

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

    @IsNumber()
    @ApiProperty()
    phone: number;

    @IsNumber()
    @ApiProperty()
    id_role: number;

    @IsString()
    @ApiProperty()
    @IsOptional()
    avatar: string;    
      
}