import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ValidateTokenDto {
    @IsString()
    @MinLength(4)
    @ApiProperty()
    access_token: string;
}