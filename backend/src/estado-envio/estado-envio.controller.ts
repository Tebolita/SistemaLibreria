import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstadoEnvioService } from './estado-envio.service';
import { CreateEstadoEnvioDto } from './dto/create-estado-envio.dto';
import { UpdateEstadoEnvioDto } from './dto/update-estado-envio.dto';

@Controller('estado-envio')
export class EstadoEnvioController {
  constructor(private readonly estadoEnvioService: EstadoEnvioService) {}

  @Post()
  create(@Body() createEstadoEnvioDto: CreateEstadoEnvioDto) {
    return this.estadoEnvioService.create(createEstadoEnvioDto);
  }

  @Get('todos')
  findAll() {
    return this.estadoEnvioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estadoEnvioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstadoEnvioDto: UpdateEstadoEnvioDto) {
    return this.estadoEnvioService.update(+id, updateEstadoEnvioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estadoEnvioService.remove(+id);
  }
}
