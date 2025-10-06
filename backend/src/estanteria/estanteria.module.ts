import { Module } from '@nestjs/common';
import { EstanteriaService } from './estanteria.service';
import { EstanteriaController } from './estanteria.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [EstanteriaController],
  providers: [EstanteriaService, PrismaService],
})
export class EstanteriaModule {}
