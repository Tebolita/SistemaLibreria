import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ValidateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Decimal } from "@prisma/client/runtime/library";

@Injectable()
export class ProductosService {
  
  constructor(private prismaService: PrismaService) {}
  
  async create(createProductoDto: ValidateProductoDto) {
    await this.prismaService.productos.create({
      data: {
      ...createProductoDto,
      Precio: new Decimal(createProductoDto.Precio), // Conversión aquí
    },
    });
    return {message: 'Producto Creado'};
  }

  findAll() {
    return `This action returns all productos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} producto`;
  }

  update(id: number, updateProductoDto: UpdateProductoDto) {
    return `This action updates a #${id} producto`;
  }

  remove(id: number) {
    return `This action removes a #${id} producto`;
  }
}
