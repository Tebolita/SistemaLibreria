import { Module } from '@nestjs/common';
import { FacturaService } from './factura.service';
import { FacturaController } from './factura.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { EstadoFacturaService } from 'src/estado-factura/estado-factura.service';

@Module({
  controllers: [FacturaController],
  providers: [FacturaService, PrismaService, EstadoFacturaService],
})
export class FacturaModule {}
