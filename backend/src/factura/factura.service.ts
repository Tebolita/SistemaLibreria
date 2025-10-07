import { Injectable } from '@nestjs/common';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class FacturaService {
  constructor (private prismaService: PrismaService){}

  async create(createFacturaDto: CreateFacturaDto) {
    const facturaCreada = await this.prismaService.facturas.create({
      data: {
        ...createFacturaDto
      }

    })

    return {message: "Factura creada", id: facturaCreada.IdFactura}
  }

  async findAll() {
    return await this.prismaService.facturas.findMany({
      select: {
        IdFactura: true,
        Clientes: {
          select: {
            NombreCompleto: true
          }
        },
        Fecha: true,
        Total: true,
        MetodosPago: {
          select: {
            Metodo: true
          }
        }
      }
    })
  }


  async findOne(id: number) {
    return await this.prismaService.facturas.findUnique({
      where: {
        IdFactura: id
      },
      select: {
        IdFactura: true,
        Clientes: {
          select: {
            NombreCompleto: true
          }
        },
        Fecha: true,
        Total: true,
        MetodosPago: {
          select: {
            Metodo: true
          }
        }
      }      
    })
  }

  async update(id: number, updateFacturaDto: UpdateFacturaDto) {
    await this.prismaService.clientes.update({
      where: {
        IdCliente: id
      },
      data: updateFacturaDto
    })

    return {message: "Datos actualizados con exito"}
  }
}
