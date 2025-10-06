import { Injectable } from '@nestjs/common';
import { CreateInventarioEstanteriaDto } from './dto/create-inventario-estanteria.dto';
import { UpdateInventarioEstanteriaDto } from './dto/update-inventario-estanteria.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InventarioEstanteriaService {
  constructor (
    private prismaService: PrismaService) {}

  async create(createInventarioEstanteriaDto: CreateInventarioEstanteriaDto) {
    await this.prismaService.inventarioEstanteria.create({
      data: createInventarioEstanteriaDto,
    })

    return {message: "Producto agregado al inventario con éxito"}
  }

  async findAll() {
    return await this.prismaService.inventarioEstanteria.findMany({
      select: {
        IdInventario: true,
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
        Cantidad: true
      
      }
    })
  }


  async findOne(id: number) {
    return await this.prismaService.inventarioEstanteria.findUnique({
      where: {
        IdInventario: id
      },
      select: {
        IdInventario: true,
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
        Cantidad: true
      
      }      
    })
  }

  async update(id: number, updateInventarioEstanteriaDto: UpdateInventarioEstanteriaDto) {
    await this.prismaService.inventarioEstanteria.update({
      where: {
        IdInventario: id
      },
      data: {
        ...updateInventarioEstanteriaDto
      }
    })

    return {message: "Datos actualizados con exito"}
  }
}
