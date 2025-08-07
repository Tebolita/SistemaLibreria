import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(private prismaService: PrismaService) {}

    async findOne(email: string, usuario: string) {
        const userEmailFound = await this.prismaService.usuarios.findFirst({
            where: {
                Correo: email,
                Usuario: usuario
            }
        })

        if (!userEmailFound) {
            throw new NotFoundException(`User ${email} not found`);
        }
        
        return userEmailFound;
    }

    async getOne(correo: string, usuario: string) {
        const userFound = await this.prismaService.usuarios.findFirst({
            where: { 
                Correo: correo,
                Usuario: usuario
            },
            select: {
                Nombre: true,
                Usuario: true,
                IdUsuario: true,
                Correo: true
            }
          })
          console.log("Email recibido:", correo, "Nickname recibido:", usuario);
          if (!userFound) {
            throw new NotFoundException(`User ${correo} not found`);
          }

          
      
          return {...userFound, idHasd : await bcryptjs.hash(userFound.IdUsuario.toString(), 10) };
    }

}

