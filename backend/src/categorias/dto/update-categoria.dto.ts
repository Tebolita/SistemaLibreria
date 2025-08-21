import { PartialType } from '@nestjs/swagger';
import { ValidateCategoriaDto } from './create-categoria.dto';

export class UpdateCategoriaDto extends PartialType(ValidateCategoriaDto) {}
