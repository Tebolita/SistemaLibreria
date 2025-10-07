import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(private prismaService: PrismaService) {}

  async create(createRoleDto: CreateRoleDto) {
    const role = await this.prismaService.roles.create({
      data: createRoleDto
    });
    return {message: 'Rol creado correctamente', data: role};
  }

  async findAll() {
    return await this.prismaService.roles.findMany(); 
  }

  async findOne(id: number) {
    return await this.prismaService.roles.findUnique({
      where: { IdRol: id },
      select: {
        IdRol: true,
        NombreRol: true,
      },
    });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.prismaService.roles.update({
      where: { IdRol: id },
      data: updateRoleDto,
    });
    return {message: `Rol actualizado`, data: role}
  }

}
