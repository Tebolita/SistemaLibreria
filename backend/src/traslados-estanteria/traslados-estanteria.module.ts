import { Module } from '@nestjs/common';
import { TrasladosEstanteriaService } from './traslados-estanteria.service';
import { TrasladosEstanteriaController } from './traslados-estanteria.controller';
import { PrismaService } from 'src/prisma/prisma.service';
@Module({
  controllers: [TrasladosEstanteriaController],
  providers: [TrasladosEstanteriaService, PrismaService],
})
export class TrasladosEstanteriaModule {}
