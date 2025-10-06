import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InventarioEstanteriaService } from './inventario-estanteria.service';
import { CreateInventarioEstanteriaDto } from './dto/create-inventario-estanteria.dto';
import { UpdateInventarioEstanteriaDto } from './dto/update-inventario-estanteria.dto';

@Controller('inventario-estanteria')
export class InventarioEstanteriaController {
  constructor(private readonly inventarioEstanteriaService: InventarioEstanteriaService) {}

  @Post('crear')
  create(@Body() createInventarioEstanteriaDto: CreateInventarioEstanteriaDto) {
    return this.inventarioEstanteriaService.create(createInventarioEstanteriaDto);
  }

  @Get('todos')
  findAll() {
    return this.inventarioEstanteriaService.findAll();
  }


  @Get('unico/:id')
  findOne(@Param('id') id: string) {
    return this.inventarioEstanteriaService.findOne(+id);
  }

  @Patch('actualizar/:id')
  update(@Param('id') id: number, @Body() updateInventarioEstanteriaDto: UpdateInventarioEstanteriaDto) {
    return this.inventarioEstanteriaService.update(id, updateInventarioEstanteriaDto);
  }

}
