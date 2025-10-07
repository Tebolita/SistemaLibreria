import { Injectable } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriasService {
  constructor(private prismaService: PrismaService) {}

  async create(createCategoriaDto: CreateCategoriaDto) {
    const categoria = await this.prismaService.categorias.create({
      data: createCategoriaDto
    })
    return {message: 'Categoria creada de manera correcta', data: categoria}
  }

  findAll() {
    const categorias = this.prismaService.categorias.findMany();
    return categorias;
  }

  async searchByText(texto: string){
    return await this.prismaService.categorias.findMany({
      where: {
        OR: [
          { Nombre: { contains: texto } }
        ]
      }
    })
  }  

  async findOne(id: number) {
    return await this.prismaService.categorias.findUnique({
      where: {
        IdCategoria: id
      }
    })
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    const categoria = await this.prismaService.categorias.update({
      where: {
        IdCategoria: id
      },
      data: {
        ...updateCategoriaDto
      }
    })
    return {message: 'Se actualizo la categoria de manera correcta', data: categoria}
  }

  async changeState(id: number) {
    const estadoActual = await this.findOne(id)

    await this.prismaService.categorias.update({
      where: {
        IdCategoria: id
      },
      data: {
        Estado: !estadoActual?.Estado
      }
    })
    return {message: 'Se cambio de estado la categoria', data: !estadoActual?.Estado}
  }
}
