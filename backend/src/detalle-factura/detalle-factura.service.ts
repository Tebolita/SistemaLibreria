import { Injectable } from '@nestjs/common';
import { CreateDetalleFacturaDto } from './dto/create-detalle-factura.dto';
import { UpdateDetalleFacturaDto } from './dto/update-detalle-factura.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DetalleFacturaService {
  constructor(private prismaService: PrismaService) {}

  async create(createDetalleFacturaDto: CreateDetalleFacturaDto) {
    try {
      const detalleFactura = await this.prismaService.detalleFactura.create({
        data: {
          IdFactura: createDetalleFacturaDto.IdFactura,
          IdProducto: createDetalleFacturaDto.IdProducto,
          Cantidad: createDetalleFacturaDto.Cantidad,
          PrecioUnitario: createDetalleFacturaDto.PrecioUnitario?.toString(), // 🔹 Convertimos a string para Decimal
          Subtotal: createDetalleFacturaDto.Subtotal?.toString(),             // 🔹 Igual aquí
          IdEstanteria: createDetalleFacturaDto.IdEstanteria,
        },
      });

      return { message: 'Detalle factura creado con éxito ✅', data: detalleFactura };
    } catch (error) {
      console.error('❌ Error al crear detalle factura:', error);
      throw error;
    }
  }

  async findAll() {
    return await this.prismaService.detalleFactura.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.detalleFactura.findUnique({
      where: {
        IdDetalle: id,
      },
    });
  }

  async update(id: number, updateDetalleFacturaDto: UpdateDetalleFacturaDto) {
    const detalleFactura = await this.prismaService.detalleFactura.update({
      where: {
        IdDetalle: id,
      },
      data: updateDetalleFacturaDto,
    });

    return { message: 'Detalle factura actualizado con éxito', data: detalleFactura };
  }
}
