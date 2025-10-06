import { Injectable } from '@nestjs/common';
import { CreateEstanteriaDto } from './dto/create-estanteria.dto';
import { UpdateEstanteriaDto } from './dto/update-estanteria.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EstanteriaService {

  constructor(private prismaService: PrismaService) {}

  async create(createEstanteriaDto: CreateEstanteriaDto) {
    await this.prismaService.estanteria.create({
      data: {
        ...createEstanteriaDto
      }
    })
    return {message: 'Estanteria creada exitosamente'}
  }

  async findAll() {
    return await this.prismaService.estanteria.findMany()
  }

  async searchByText(texto: string){
    return await this.prismaService.estanteria.findMany({
      where: {
        OR: [
          { Nombre: { contains: texto } },
          { Ubicacion: { contains: texto } },
          { Encargado: { contains: texto } },
        ]
      }
    })
  }


  async findOne(id: number) {
    return await this.prismaService.estanteria.findUnique({
      where: {
        idEstanteria: id
      }
    })
  }

  async update(id: number, updateEstanteriaDto: UpdateEstanteriaDto) {
    await this.prismaService.estanteria.update({
      where: {
        idEstanteria: id
      },
      data: {
        ...updateEstanteriaDto
      }
    })

    return {message: `Estanteria ${updateEstanteriaDto.Nombre} actualizada de manera correcta`}
  }


}
