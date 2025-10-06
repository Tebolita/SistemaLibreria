import { PartialType } from '@nestjs/swagger';
import { CreateMovimientosEstanteriaDto } from './create-movimientos-estanteria.dto';

export class UpdateMovimientosEstanteriaDto extends PartialType(CreateMovimientosEstanteriaDto) {}
