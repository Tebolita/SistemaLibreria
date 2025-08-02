import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import {UserController } from './users.controller';

@Module({
  providers: [UsersService, PrismaService],
  controllers: [UserController],
  exports: [UsersService],
})
export class UsersModule {}
