import { Injectable } from '@nestjs/common';
import { CreateKardexDto } from './dto/create-kardex.dto';
import { UpdateKardexDto } from './dto/update-kardex.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class KardexService {
  constructor(private prismaService: PrismaService){}

  async create(createKardexDto: CreateKardexDto) {
    await this.prismaService.kardex.create({
      data: createKardexDto
    })

    return {message: "Se genero el movimiento correctamente"}
  }

  async findAll() {
    return await this.prismaService.kardex.findMany({
      select: {
        Productos: {
          select: {
            Nombre: true
          }
        },
        Fecha: true,
        TipoMovimiento: true,
        Cantidad: true,
        PrecioUnitario: true,
        StockActual: true,
        StockAnterior: true,
        Descripcion: true
      }
    })
  }

  async searchByText(texto: string){
    return await this.prismaService.kardex.findMany({
      where: {
          Descripcion:  { contains: texto } 
      }
    })
  }


  async findOne(id: number) {
    return await this.prismaService.kardex.findUnique({
      where: {
        IdKardex: id
      },
      select: {
        Productos: {
          select: {
            Nombre: true
          }
        },
        Fecha: true,
        TipoMovimiento: true,
        Cantidad: true,
        PrecioUnitario: true,
        StockActual: true,
        StockAnterior: true,
        Descripcion: true
      }
    })
  }

  async update(id: number, updateKardexDto: UpdateKardexDto) {
    await this.prismaService.kardex.update({
      where: {
        IdKardex: id
      },
      data: {
        ...updateKardexDto
      }
    })

    return {message: "Datos actualizados con exito"}
  }
}
