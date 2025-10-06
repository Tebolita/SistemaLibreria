import { Module } from '@nestjs/common';
import { KardexService } from './kardex.service';
import { KardexController } from './kardex.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [KardexController],
  providers: [KardexService, PrismaService],
})
export class KardexModule {}
