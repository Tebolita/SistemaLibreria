import { Injectable } from '@nestjs/common';
import { CreateProveedoreDto } from './dto/create-proveedore.dto';
import { UpdateProveedoreDto } from './dto/update-proveedore.dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class ProveedoresService {
  constructor(private prismaService: PrismaService){}

  async create(createProveedoreDto: CreateProveedoreDto) {
    const proveedor = await this.prismaService.proveedores.create({
      data: createProveedoreDto,
    })

    return {message: "Proveedor creado con éxito", data: proveedor}
  }

  async findAll() {
    return await this.prismaService.proveedores.findMany()
  }

  async searchByText(texto: string){
    return await this.prismaService.proveedores.findMany({
      where: {
        NombreEmpresa: {contains: texto}
      }
    })
  }


  async findOne(id: number) {
    return await this.prismaService.proveedores.findUnique({
      where: {
        IdProveedor: id
      }
    })
  }

  async update(id: number, updateProveedoreDto: UpdateProveedoreDto) {
    const proveedor = await this.prismaService.proveedores.update({
      where: {
        IdProveedor: id
      },
      data: updateProveedoreDto
    })

    return {message: "Datos actualizados con exito", data: proveedor}
  }


  async desactivarProveedor(id: number) {
    const estadoActual = await this.findOne(id) 
    await this.prismaService.proveedores.update({
      where: {
        IdProveedor: id
      },
      data: {
        Estado: !estadoActual?.Estado
      }
    })

    return {message: `Se cambio el estado del producto`, data: !estadoActual?.Estado}
  }

}
