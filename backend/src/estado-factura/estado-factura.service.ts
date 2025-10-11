import { Injectable } from '@nestjs/common';
import { CreateEstadoFacturaDto } from './dto/create-estado-factura.dto';
import { UpdateEstadoFacturaDto } from './dto/update-estado-factura.dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class EstadoFacturaService {
 constructor (private prismaService: PrismaService){}

  async create(createEstadoFacturaDto: CreateEstadoFacturaDto) {
    const factura = await this.prismaService.estadoFactura.create({
      data: { ...createEstadoFacturaDto }
    })

    return {message: "Estado de factura actualizado", data: factura}
  }

  async findAll() {
    return await this.prismaService.estadoFactura.findMany({
      select: {
        IdFactura: true,
        EstadoEnvio: true,
        Fecha: true
      }
    })
  }


  async findOne(id: number) {
    return await this.prismaService.estadoFactura.findMany({
      where: {
        IdFactura: id
      },
      select: {
        IdFactura: true,
        EstadoEnvio: true,
        Fecha: true
      },
      orderBy: {
        IdEstadoEnvio: 'desc'
      },
      take: 1
    });
  }


  async update(id: number, updateEstadoFacturaDto: UpdateEstadoFacturaDto) {
    const factura = await this.prismaService.estadoFactura.update({
      where: {
        IdEstadoFactura: id
      },
      data: updateEstadoFacturaDto
    })

    return {message: "Datos actualizados con exito", data: factura}
  }
}
