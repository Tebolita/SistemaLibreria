import { Injectable } from '@nestjs/common';
import { CreateMetodosPagoDto } from './dto/create-metodos-pago.dto';
import { UpdateMetodosPagoDto } from './dto/update-metodos-pago.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MetodosPagoService {
  constructor(private prismaService: PrismaService){}

  async create(createMetodosPagoDto: CreateMetodosPagoDto) {
    await this.prismaService.metodosPago.create({
      data: createMetodosPagoDto,
    })

    return {message: "Metodo de pago creado con éxito"}
  }

  async findAll() {
    return await this.prismaService.metodosPago.findMany()
  }

  async searchByText(texto: string){
    return await this.prismaService.metodosPago.findMany({
      where: {
        Metodo: {contains: texto}
      }
    })
  }


  async findOne(id: number) {
    return await this.prismaService.metodosPago.findUnique({
      where: {
        IdMetodoPago: id
      }
    })
  }

  async update(id: number, updateMetodosPagoDto: UpdateMetodosPagoDto) {
    await this.prismaService.metodosPago.update({
      where: {
        IdMetodoPago: id
      },
      data: updateMetodosPagoDto
    })

    return {message: "Datos actualizados con exito"}
  }
}
