import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(private prismaService: PrismaService) {}

    async findOne(email: string, nickname: string) {
        const userEmailFound = await this.prismaService.tb_usuarios.findFirst({
            where: {
                correo: email,
                nickname: nickname
            }
        })

        if (!userEmailFound) {
            throw new NotFoundException(`User ${email} not found`);
        }
        
        return userEmailFound;
    }

    async getOne(correo: string, nickname: string) {
        const userFound = await this.prismaService.tb_usuarios.findFirst({
            where: { 
                correo: correo,
                nickname: nickname
            },
            select: {
                nombre: true,
                nickname: true,
                id_usuario: true,
                correo: true,
                telefono: true,
                avatar: true
            }
          })
          console.log("Email recibido:", correo, "Nickname recibido:", nickname);
          if (!userFound) {
            throw new NotFoundException(`User ${correo} not found`);
          }

          
      
          return {...userFound, idHasd : await bcryptjs.hash(userFound.id_usuario.toString(), 10) };
    }

}

