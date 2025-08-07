import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ValidateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(private prismaService: PrismaService) {}

  async CreateRoles(ValidateRoleDto: ValidateRoleDto) {
    await this.prismaService.roles.create({
      data: ValidateRoleDto,
    });
    return {message: 'Rol Creado'};
  }

  findAll() {
    const roles = this.prismaService.roles.findMany(); 
    return roles;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  async  update(id: number, updateRoleDto: UpdateRoleDto) {
    await this.prismaService.roles.update({
      where: { IdRol: id },
      data: updateRoleDto,
    });
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
