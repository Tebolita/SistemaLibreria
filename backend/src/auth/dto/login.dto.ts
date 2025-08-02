
import { IsEmail, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class ValidateLoginDto {
    @IsString()
    @MinLength(4)
    @ApiProperty()
    nickname: string;

    @IsEmail()
    @ApiProperty()
    correo: string;

    @IsString()
    @MinLength(6)
    @Transform(({ value }) => value.trim())
    @ApiProperty()
    password: string;  
}