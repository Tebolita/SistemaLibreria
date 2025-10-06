import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MovimientosEstanteriaService } from './movimientos-estanteria.service';
import { CreateMovimientosEstanteriaDto } from './dto/create-movimientos-estanteria.dto';
import { UpdateMovimientosEstanteriaDto } from './dto/update-movimientos-estanteria.dto';

@Controller('movimientos-estanteria')
export class MovimientosEstanteriaController {
  constructor(private readonly movimientosEstanteriaService: MovimientosEstanteriaService) {}

  @Post('crear')
  create(@Body() createMovimientosEstanteriaDto: CreateMovimientosEstanteriaDto) {
    return this.movimientosEstanteriaService.create(createMovimientosEstanteriaDto);
  }

  @Get('todos')
  findAll() {
    return this.movimientosEstanteriaService.findAll();
  } 

  @Get('unico/:id')
  findOne(@Param('id') id: string) {
    return this.movimientosEstanteriaService.findOne(+id);
  }

  @Patch('actualizar/:id')
  update(@Param('id') id: number, @Body() updateMovimientosEstanteriaDto: UpdateMovimientosEstanteriaDto) {
    return this.movimientosEstanteriaService.update(id, updateMovimientosEstanteriaDto);
  }
}
