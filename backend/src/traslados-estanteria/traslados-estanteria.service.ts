import { Injectable } from '@nestjs/common';
import { CreateTrasladosEstanteriaDto } from './dto/create-traslados-estanteria.dto';
import { UpdateTrasladosEstanteriaDto } from './dto/update-traslados-estanteria.dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class TrasladosEstanteriaService {
  constructor(private prismaService: PrismaService){}

  async create(createTrasladosEstanteriaDto: CreateTrasladosEstanteriaDto) {
    const traslado = await this.prismaService.trasladosEstanteria.create({
      data: createTrasladosEstanteriaDto,
    })

    return {message: "Traslado de estanteria creada con éxito", data: traslado}
  }

  async findAll() {
    return await this.prismaService.trasladosEstanteria.findMany()
  }

  async findOne(id: number) {
    return await this.prismaService.trasladosEstanteria.findUnique({
      where: {
        IdTraslado: id
      }
    })
  }

  async update(id: number, updateTrasladosEstanteriaDto: UpdateTrasladosEstanteriaDto) {
    const traslado = await this.prismaService.trasladosEstanteria.update({
      where: {
        IdTraslado: id
      },
      data: updateTrasladosEstanteriaDto
    })

    return {message: "Datos actualizados con exito", data: traslado}
  }
}
