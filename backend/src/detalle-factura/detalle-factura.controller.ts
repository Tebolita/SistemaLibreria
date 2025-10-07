import { Controller, Get, Post, Body, Patch, Param, Delete, Optional } from '@nestjs/common';
import { DetalleFacturaService } from './detalle-factura.service';
import { CreateDetalleFacturaDto } from './dto/create-detalle-factura.dto';
import { UpdateDetalleFacturaDto } from './dto/update-detalle-factura.dto';

@Controller('detalle-factura')
export class DetalleFacturaController {
  constructor(private readonly detalleFacturaService: DetalleFacturaService) {}

  @Post('crear')
  create(@Body() createDetalleFacturaDto: CreateDetalleFacturaDto) {
    return this.detalleFacturaService.create(createDetalleFacturaDto);
  }

  @Get('todos')
  findAll() {
    return this.detalleFacturaService.findAll();
  }


  @Get('unico/:id')
  findOne(@Param('id') id: number) {
    return this.detalleFacturaService.findOne(id);
  }

  @Patch('actualizar/:id')
  update(@Param('id') id: number, @Body() updateDetalleFacturaDto: UpdateDetalleFacturaDto) {
    return this.detalleFacturaService.update(id, updateDetalleFacturaDto);
  }

}
