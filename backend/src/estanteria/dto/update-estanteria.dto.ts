import { PartialType } from '@nestjs/swagger';
import { CreateEstanteriaDto } from './create-estanteria.dto';

export class UpdateEstanteriaDto extends PartialType(CreateEstanteriaDto) {}
