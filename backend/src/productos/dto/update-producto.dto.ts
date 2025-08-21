import { PartialType } from '@nestjs/swagger';
import { ValidateProductoDto } from './create-producto.dto';

export class UpdateProductoDto extends PartialType(ValidateProductoDto) {}
