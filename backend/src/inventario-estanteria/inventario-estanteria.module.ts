import { Module } from '@nestjs/common';
import { InventarioEstanteriaService } from './inventario-estanteria.service';
import { InventarioEstanteriaController } from './inventario-estanteria.controller';
import { PrismaService } from 'src/prisma/prisma.service';


@Module({
  controllers: [InventarioEstanteriaController],
  providers: [InventarioEstanteriaService, PrismaService],
})
export class InventarioEstanteriaModule {}
