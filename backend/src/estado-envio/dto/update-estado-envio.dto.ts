import { PartialType } from '@nestjs/swagger';
import { CreateEstadoEnvioDto } from './create-estado-envio.dto';

export class UpdateEstadoEnvioDto extends PartialType(CreateEstadoEnvioDto) {}
