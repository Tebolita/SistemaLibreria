import { Injectable } from '@nestjs/common';
import { CreateEstadoEnvioDto } from './dto/create-estado-envio.dto';
import { UpdateEstadoEnvioDto } from './dto/update-estado-envio.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class EstadoEnvioService {

  constructor (private prismaService: PrismaService) {}

  create(createEstadoEnvioDto: CreateEstadoEnvioDto) {
    return 'This action adds a new estadoEnvio';
  }

  async findAll() {
    return await this.prismaService.estadoEnvio.findMany()  ;
  }

  findOne(id: number) {
    return `This action returns a #${id} estadoEnvio`;
  }

  update(id: number, updateEstadoEnvioDto: UpdateEstadoEnvioDto) {
    return `This action updates a #${id} estadoEnvio`;
  }

  remove(id: number) {
    return `This action removes a #${id} estadoEnvio`;
  }
}
