import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import {  CreateRegisterDto } from './dto/register.dto';
import { CreateRoleDto } from './dto/role.dto';
import { Injectable } from '@nestjs/common';
import { ValidateTokenDto } from './dto/validateToken.dto';

import * as bcryptjs from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prismaService: PrismaService
  ) {}

  // Use to sign in a user
  async signIn(
    correo: string,
    nickname: string,
    pass: string,
  ): Promise<{ access_token?: string; message?: string }> {
    try {
      const user = await this.usersService.findOne(correo, nickname);
      if (!user) {
        return { message: 'User not found' };
      }
  
      const isPasswordValid = await bcryptjs.compare(pass, user.password);
      if (!isPasswordValid) {
        return { message: 'Password is incorrect' };
      }
  
      if (!correo) {
        return { message: 'Email is required' };
      }
  
      const payload = { sub: user.correo, username: user.nickname };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
      
    } catch (error) {
      return { message: 'Incorrect credentials' };
    }
  }

  async Register({ nombre, correo, nickname, password, telefono, avatar }: CreateRegisterDto) {
    try {
      if (!nombre || !correo || !nickname || !password || !telefono) {
        return { error: `Complete the data` };
      }
  
      // Ejecutar el procedimiento almacenado
      const affectedRows = await this.prismaService.$executeRawUnsafe(
        `CALL insertar_usuario(
        '${nombre}',
        '${nickname}',
        '${await bcryptjs.hash(password, 10)}',
        '${avatar}',
       '${correo}',
        '${telefono}' ,
        @resultado);` 
      );
  
        // Consultar el usuario recién insertado
        const user = await this.prismaService.tb_usuarios.findUnique({
          where: { nickname: nickname },
        });
  
        return {
          message: 'User created successfully',
          idt_usuarios: user?.id_usuario,
          idHash: await bcryptjs.hash(user!.id_usuario.toString(), 10),
        };
    } catch (error) {
      return { error: `Internal Server Error ${error}` };
    }
  }

  // Create role
  async CreateRole(CreateRoleDto: CreateRoleDto){
    return await this.prismaService.tb_roles.create({
      data: CreateRoleDto
    });
  }

  async ValidateToken(ValidateTokenDto: ValidateTokenDto): Promise<boolean> {
    try {
      await this.jwtService.verifyAsync(ValidateTokenDto.access_token);
      return true; 
    } catch (error) {
      return false; 
    }
  }


}
