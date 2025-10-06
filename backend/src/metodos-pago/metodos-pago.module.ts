import { Module } from '@nestjs/common';
import { MetodosPagoService } from './metodos-pago.service';
import { MetodosPagoController } from './metodos-pago.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MetodosPagoController],
  providers: [MetodosPagoService, PrismaService],
})
export class MetodosPagoModule {}
