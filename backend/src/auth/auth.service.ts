import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import {  CreateRegisterDto } from './dto/register.dto';
import { CreateRoleDto } from './dto/role.dto';
import { Injectable } from '@nestjs/common';
import { ValidateTokenDto } from './dto/validateToken.dto';
import { RolesService } from 'src/roles/roles.service';
import { ClientesService } from 'src/clientes/clientes.service';

import * as bcryptjs from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prismaService: PrismaService,
    private rolesService: RolesService,
    private clientesService: ClientesService,
  ) {}

  // Use to sign in a user
  async signIn(
    Correo: string,
    Usuario: string,
    Contrasena: string,
  ): Promise<{ access_token?: string; message?: string }> {
    try {
      const user = await this.usersService.findOne(Correo, Usuario);
      if (!user) {
        return { message: 'User not found' };
      }
      const rol = await this.rolesService.findOne(user.IdRol || 0);
      const isPasswordValid = await bcryptjs.compare(Contrasena, user.Contrasena || '');
      if (!isPasswordValid) {
        return { message: 'Password is incorrect' };
      }
  
      if (!Correo) {
        return { message: 'Email is required' };
      }
  
      const payload = { correo: user.Correo, username: user.Usuario, role: rol?.NombreRol, idUser: user.IdUsuario, nombreUsuario: user.Nombre };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
      
    } catch (error) {
      return { message: 'Incorrect credentials' };
    }
  }

  async Register({ Nombre, Correo, Usuario, Contrasena }: CreateRegisterDto) {
    try {
      if (!Nombre || !Correo || !Usuario || !Contrasena ) {
        return { error: `Complete the data` };
      }

      const usuarioExiste = await this.usersService.findOne(Correo, Usuario)
      if (usuarioExiste){
        return {message: "Correo o usuario ya registrado, por favor de utilizar otro"}
      }

      await this.prismaService.usuarios.create({
        data: {
            Nombre: Nombre,
            Usuario: Usuario,
            Contrasena: await bcryptjs.hash(Contrasena, 10),
            Correo: Correo,
            Estado: true,
            IdRol: 2,
        }
      });

      // Consultar el usuario recién insertado
      const user = await this.prismaService.usuarios.findUnique({
        where: { Usuario: Usuario },
      });
      
      this.clientesService.create({
        Correo: Correo,
        Estado: true,
        NombreCompleto: Nombre,
        Direccion: "",
        Telefono: "",
      })
      
      return {
        message: 'User created successfully',
        idt_usuarios: user?.IdUsuario,
        idHash: await bcryptjs.hash(user!.IdUsuario.toString(), 10),
      };
    } catch (error) {
      console.log(error)
      return { error: `Internal Server Error ${error}` };
    }
  }

  // Create role
  async CreateRole(CreateRoleDto: CreateRoleDto){
    return await this.prismaService.roles.create({
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
