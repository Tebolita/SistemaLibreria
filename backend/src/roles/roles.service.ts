import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(private prismaService: PrismaService) {}

  async create(createRoleDto: CreateRoleDto) {
    await this.prismaService.roles.create({
      data: createRoleDto
    });
    return {message: 'Rol Creado'};
  }

  async findAll() {
    return await this.prismaService.roles.findMany(); 
  }

  async findOne(id: number) {
    return await this.prismaService.roles.findUnique({
      where: { IdRol: id },
      select: {
        NombreRol: true,
      },
    });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    await this.prismaService.roles.update({
      where: { IdRol: id },
      data: updateRoleDto,
    });
    return {message: `Rol actualizado`}
  }

  async changeState(id: number) {
    await this.prismaService.roles.update({
      where: {
        IdRol: id
      },
      data: {
        NombreRol: "0"
      }
    })

    return {message: `Rol desactivado de manera correcta`}
  }
}
