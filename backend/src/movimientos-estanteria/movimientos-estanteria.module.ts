import { Module } from '@nestjs/common';
import { MovimientosEstanteriaService } from './movimientos-estanteria.service';
import { MovimientosEstanteriaController } from './movimientos-estanteria.controller';
import { PrismaService } from 'src/prisma/prisma.service';
@Module({
  controllers: [MovimientosEstanteriaController],
  providers: [MovimientosEstanteriaService,PrismaService],
})
export class MovimientosEstanteriaModule {}
