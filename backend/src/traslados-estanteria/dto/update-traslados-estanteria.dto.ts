import { PartialType } from '@nestjs/swagger';
import { CreateTrasladosEstanteriaDto } from './create-traslados-estanteria.dto';

export class UpdateTrasladosEstanteriaDto extends PartialType(CreateTrasladosEstanteriaDto) {}
