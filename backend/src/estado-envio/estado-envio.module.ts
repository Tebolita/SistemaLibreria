import { Module } from '@nestjs/common';
import { EstadoEnvioService } from './estado-envio.service';
import { EstadoEnvioController } from './estado-envio.controller';
import { PrismaService } from 'src/prisma/prisma.service';


@Module({
  controllers: [EstadoEnvioController],
  providers: [EstadoEnvioService, PrismaService],
})
export class EstadoEnvioModule {}
