import { PartialType } from '@nestjs/swagger';
import { CreateInventarioEstanteriaDto } from './create-inventario-estanteria.dto';

export class UpdateInventarioEstanteriaDto extends PartialType(CreateInventarioEstanteriaDto) {}
