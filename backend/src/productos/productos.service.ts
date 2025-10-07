import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Decimal } from "@prisma/client/runtime/library";

@Injectable()
export class ProductosService {
  
  constructor(private prismaService: PrismaService) {}
  
  async create(createProductoDto: CreateProductoDto) {
    await this.prismaService.productos.create({
      data: {
      ...createProductoDto,
      Precio: new Decimal(createProductoDto.Precio ? createProductoDto.Precio : 0),
      Estado: true
    },
    });
    return {message: 'Producto Creado'};
  }

  async obtenerTodosLosProductos() {
   return await this.prismaService.productos.findMany({
    select: {
      IdProducto: true,
      Nombre: true,
      Descripcion: true,
      Precio: true,
      Stock: true,
      Categorias: {
        select: {
          Nombre: true,
        }
      },
      Proveedores: {
        select: {
          NombreEmpresa: true
        }
      },
      Estado: true,
      Imagen: true
    }
   })
  }

  async obtenerUnProducto(id: number) {
    return await this.prismaService.productos.findUnique({
      where: {IdProducto: id}
    });
  }

  async actualizarProducto(id: number, updateProductoDto: UpdateProductoDto) {
    await this.prismaService.productos.update({
      where: {
        IdProducto: id
      },
      data: { 
        ...updateProductoDto
      }
    })

    return {message: `Producto ${updateProductoDto.Nombre} actualizado de manera correcta`}
  }

  async desactivarProducto(id: number) {
    const estadoActual = await this.obtenerUnProducto(id) 
    await this.prismaService.productos.update({
      where: {
        IdProducto: id
      },
      data: {
        Estado: !estadoActual?.Estado
      }
    })

    return {message: `Se cambio el estado del producto`}
  }

  async productosPorCategoria(idCategoria: number){
    return await this.prismaService.productos.findMany({
      where : {
        IdCategoria: idCategoria
      }
    })
  }

  async searchByText(texto: string){
    return await this.prismaService.productos.findMany({
      where: {
        OR: [
          { Nombre: { contains: texto } },
          { Descripcion: { contains: texto } },
        ]
      }
    })
  }

  async obtenerTodosLosProductosActivos() {
   return await this.prismaService.productos.findMany({
    where: {
      Estado: true
    }
   })
  }

}
