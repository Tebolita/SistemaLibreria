import { Module } from '@nestjs/common';
import { InformesService } from './informes.service';
import { InformesController } from './informes.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [InformesController],
  providers: [InformesService, PrismaService],
})
export class InformesModule {}
