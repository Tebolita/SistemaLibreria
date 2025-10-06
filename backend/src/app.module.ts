import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { CategoriasModule } from './categorias/categorias.module';
import { ProductosModule } from './productos/productos.module';
import { EstanteriaModule } from './estanteria/estanteria.module';
import { ClientesModule } from './clientes/clientes.module';
import { DetalleFacturaModule } from './detalle-factura/detalle-factura.module';
import { FacturaModule } from './factura/factura.module';
import { InventarioEstanteriaModule } from './inventario-estanteria/inventario-estanteria.module';
import { KardexModule } from './kardex/kardex.module';
import { MetodosPagoModule } from './metodos-pago/metodos-pago.module';
import { MovimientosEstanteriaModule } from './movimientos-estanteria/movimientos-estanteria.module';



@Module({
  imports: [AuthModule, FilesModule, UsersModule, RolesModule, ProductosModule, CategoriasModule, EstanteriaModule, ClientesModule, DetalleFacturaModule, FacturaModule, InventarioEstanteriaModule, KardexModule, MetodosPagoModule, MovimientosEstanteriaModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
