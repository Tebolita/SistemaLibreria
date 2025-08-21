import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { ProductosModule } from './productos/productos.module';


@Module({
  imports: [AuthModule, FilesModule, UsersModule, RolesModule, ProductosModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
