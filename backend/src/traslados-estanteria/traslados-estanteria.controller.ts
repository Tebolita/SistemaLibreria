import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrasladosEstanteriaService } from './traslados-estanteria.service';
import { CreateTrasladosEstanteriaDto } from './dto/create-traslados-estanteria.dto';
import { UpdateTrasladosEstanteriaDto } from './dto/update-traslados-estanteria.dto';

@Controller('traslados-estanteria')
export class TrasladosEstanteriaController {
  constructor(private readonly trasladosEstanteriaService: TrasladosEstanteriaService) {}

  @Post('crear')
  create(@Body() createTrasladosEstanteriaDto: CreateTrasladosEstanteriaDto) {
    return this.trasladosEstanteriaService.create(createTrasladosEstanteriaDto);
  }

  @Get('todos')
  findAll() {
    return this.trasladosEstanteriaService.findAll();
  }


  @Get('unico/:id')
  findOne(@Param('id') id: number) {
    return this.trasladosEstanteriaService.findOne(id);
  }

  @Patch('actualizar/:id')
  update(@Param('id') id: number, @Body() updateTrasladosEstanteriaDto: UpdateTrasladosEstanteriaDto) {
    return this.trasladosEstanteriaService.update(id, updateTrasladosEstanteriaDto);
  }
}
