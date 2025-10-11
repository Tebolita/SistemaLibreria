import { Module } from '@nestjs/common';
import { DetalleFacturaService } from './detalle-factura.service';
import { DetalleFacturaController } from './detalle-factura.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [DetalleFacturaController],
  providers: [DetalleFacturaService, PrismaService],
})
export class DetalleFacturaModule {}
