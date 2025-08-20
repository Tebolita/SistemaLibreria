import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { RolesService } from 'src/roles/roles.service';
import { PrismaService } from 'src/prisma/prisma.service';
import {UserController } from './users.controller';

@Module({
  providers: [UsersService, PrismaService, RolesService],
  controllers: [UserController],
  exports: [UsersService, RolesService ],
})
export class UsersModule {}
