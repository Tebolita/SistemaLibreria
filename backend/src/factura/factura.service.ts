import { Injectable } from '@nestjs/common';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { EstadoFacturaService } from 'src/estado-factura/estado-factura.service';

@Injectable()
export class FacturaService {
  constructor (private prismaService: PrismaService,
    private estadoFacturaService: EstadoFacturaService)  {}
    
  async create(createFacturaDto: CreateFacturaDto) {
    const factura = await this.prismaService.facturas.create({
      data: createFacturaDto
    })
    const fechaActual: Date = new Date();
    await this.estadoFacturaService.create({
      IdEstadoEnvio: 1,
      IdFactura: factura.IdFactura,
      Fecha: fechaActual
    })

    return {message: "Factura creada", data: factura}
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
    const factura = await this.prismaService.facturas.update({
      where: {
        IdFactura: id
      },
      data: updateFacturaDto
    })

    return {message: "Datos actualizados con exito", data: factura}
  }


  async devolverDetalleYProductos(idCliente: number){
    const facturaDetalle = await this.prismaService.facturas.findMany({
      where: {
        IdCliente: idCliente
      },
      select: {
        IdFactura: true,
        DetalleFactura: {
          select: {
            Productos: {select: {Nombre: true, Imagen: true}},
            Cantidad: true,
            PrecioUnitario: true,
            Subtotal: true
          }
        }
      }
    })

    return { facturaDetalle }
  }


}
