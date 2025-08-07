
import { IsEmail, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class ValidateLoginDto {
    @IsString()
    @MinLength(4)
    @ApiProperty()
    Usuario: string;

    @IsEmail()
    @ApiProperty()
    Correo: string;

    @IsString()
    @MinLength(6)
    @Transform(({ value }) => value.trim())
    @ApiProperty()
    Contrasena: string;  
}