import { Injectable } from '@nestjs/common';
import { CreateDetalleFacturaDto } from './dto/create-detalle-factura.dto';
import { UpdateDetalleFacturaDto } from './dto/update-detalle-factura.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DetalleFacturaService {
  constructor(private prismaService: PrismaService){}

  async create(createDetalleFacturaDto: CreateDetalleFacturaDto) {
    await this.prismaService.detalleFactura.create({
      data: {...createDetalleFacturaDto}  
    })

    return {  message: "Detalle factura creado con éxito"};
  }

  async findAll() {
    return await this.prismaService.detalleFactura.findMany()
  }

  async findOne(idDetalle: number) {
    return await this.prismaService.detalleFactura.findUnique({
      where: {
          IdDetalle: idDetalle
      }
    })
  }

  async update(id: number, updateDetalleFacturaDto: UpdateDetalleFacturaDto) {
    await this.prismaService.detalleFactura.update({
      where: {
        IdDetalle: id
      },
      data: {
        ...updateDetalleFacturaDto
      }
    })
  }

}
