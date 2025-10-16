import { Injectable } from '@nestjs/common';
// import { CreateInformeDto } from './dto/create-informe.dto';
// import { UpdateInformeDto } from './dto/update-informe.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InformesService {
  
  constructor(private prismaService: PrismaService) {}
  
  /*
  create(createInformeDto: CreateInformeDto) {
    return 'This action adds a new informe';
  }

  findAll() {
    return `This action returns all informes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} informe`;
  }

  update(id: number, updateInformeDto: UpdateInformeDto) {
    return `This action updates a #${id} informe`;
  }

  remove(id: number) {
    return `This action removes a #${id} informe`;
  }*/

  async obtenerTotales() {
   return await this.prismaService.Totales.findMany({
    select: {
      IdProducto: true,
      Nombre: true,
      Descripcion: true,
      Precio: true,
      Stock: true,
      Categorias: {
        select: {
          IdCategoria: true,
          Nombre: true,
        }
      },
      Proveedores: {
        select: {
          IdProveedor: true,
          NombreEmpresa: true
        }
      },
      Estado: true,
      Imagen: true
    }
   })
  }
}
