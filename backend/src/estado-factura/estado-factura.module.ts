import { Module } from '@nestjs/common';
import { EstadoFacturaService } from './estado-factura.service';
import { EstadoFacturaController } from './estado-factura.controller';
import { PrismaService } from 'src/prisma/prisma.service';
@Module({
  controllers: [EstadoFacturaController],
  providers: [EstadoFacturaService,PrismaService],
})
export class EstadoFacturaModule {}
