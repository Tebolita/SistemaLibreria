import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClientesService {
  constructor(private prismaService: PrismaService){}

  async create(createClienteDto: CreateClienteDto) {
    const cliente = await this.prismaService.clientes.create({
      data: createClienteDto
    })

    return {message: "Cliente creado con éxito", data: cliente}
  }

  async findAll() {
    return await this.prismaService.clientes.findMany()
  }

  async searchByText(texto: string){
    return await this.prismaService.clientes.findMany({
      where: {
        OR: [
          { NombreCompleto: { contains: texto } },
          { Correo: { contains: texto } },
          { Direccion: { contains: texto } },
        ]
      }
    })
  }


  async findOne(id: number) {
    return await this.prismaService.clientes.findUnique({
      where: {
        IdCliente: id
      }
    })
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    const cliente = await this.prismaService.clientes.update({
      where: {
        IdCliente: id
      },
      data: {
        ...updateClienteDto
      }
    })

    return {message: "Datos actualizados con exito", data: cliente}
  }

  async changeState(id: number) {
    const estadoActual = await this.findOne(id) 
    await this.prismaService.clientes.update({
      where: {
        IdCliente: id
      },
      data: {
        Estado: !estadoActual?.Estado
      }

    })
    return {message: 'Se cambio el estado del cliente', data: !estadoActual?.Estado}
  }
}
