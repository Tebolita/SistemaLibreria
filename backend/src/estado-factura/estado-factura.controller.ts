import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstadoFacturaService } from './estado-factura.service';
import { CreateEstadoFacturaDto } from './dto/create-estado-factura.dto';
import { UpdateEstadoFacturaDto } from './dto/update-estado-factura.dto';

@Controller('estado-factura')
export class EstadoFacturaController {
  constructor(private readonly estadoFacturaService: EstadoFacturaService) {}

    @Post('crear')
    create(@Body() createEstadoFacturaDto: CreateEstadoFacturaDto) {
      return this.estadoFacturaService.create(createEstadoFacturaDto);
    }
  
    @Get('todos')
    findAll() {
      return this.estadoFacturaService.findAll();
    } 



    @Get('unico/:id')
    findOne(@Param('id') id: string) {
      return this.estadoFacturaService.findOne(+id);
    }
  
    @Patch('actualizar/:id')
    update(@Param('id') id: number, @Body() updateEstadoFacturaDto: UpdateEstadoFacturaDto) {
      return this.estadoFacturaService.update(id, updateEstadoFacturaDto);
    }

}
