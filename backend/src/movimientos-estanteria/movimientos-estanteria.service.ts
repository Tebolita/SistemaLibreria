import { Injectable } from '@nestjs/common';
import { CreateMovimientosEstanteriaDto } from './dto/create-movimientos-estanteria.dto';
import { UpdateMovimientosEstanteriaDto } from './dto/update-movimientos-estanteria.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MovimientosEstanteriaService {
  constructor(private prismaService: PrismaService){}

  async create(createMovimientosEstanteriaDto: CreateMovimientosEstanteriaDto) {
    await this.prismaService.movimientosEstanteria.create({
      data:  createMovimientosEstanteriaDto,
    })

    return {message: "Movimiento en estanteria creado con éxito"}
  }

  async findAll() {
    return await this.prismaService.movimientosEstanteria.findMany({
      select: {
        IdMovimiento: true,
        Fecha: true,
        TipoMovimiento: true,
        Cantidad: true,
        Productos: {
          select: {
            Nombre: true
          }
        },
        Estanteria: {
          select: {
            Nombre: true
          }
        },
        Observaciones: true

      }
    })
  }

  async findOne(id: number) {
    return await this.prismaService.movimientosEstanteria.findUnique({
      where: {
        IdMovimiento: id
      },
      select: {
        IdMovimiento: true,
        Fecha: true,
        TipoMovimiento: true,
        Cantidad: true,
        Productos: {
          select: {
            Nombre: true
          }
        },
        Estanteria: {
          select: {
            Nombre: true
          }
        },
        Observaciones: true

      }      
    })
  }

  async update(id: number, updateMovimientosEstanteriaDto: UpdateMovimientosEstanteriaDto) {
    await this.prismaService.movimientosEstanteria.update({
      where: {
        IdMovimiento: id
      },
      data: updateMovimientosEstanteriaDto
    })

    return {message: "Datos actualizados con exito"}
  }
}
