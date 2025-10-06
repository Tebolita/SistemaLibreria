import { Module } from '@nestjs/common';
import { FacturaService } from './factura.service';
import { FacturaController } from './factura.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [FacturaController],
  providers: [FacturaService, PrismaService],
})
export class FacturaModule {}
