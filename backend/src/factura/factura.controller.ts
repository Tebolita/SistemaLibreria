import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FacturaService } from './factura.service';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';

@Controller('factura')
export class FacturaController {
  constructor(private readonly facturaService: FacturaService) {}

    @Post('crear')
    create(@Body() createFacturaDto: CreateFacturaDto) {
      return this.facturaService.create(createFacturaDto);
    }
  
    @Get('todos')
    findAll() {
      return this.facturaService.findAll();
    } 
  
    @Get('unico/:id')
    findOne(@Param('id') id: string) {
      return this.facturaService.findOne(+id);
    }
  
    @Patch('actualizar/:id')
    update(@Param('id') id: number, @Body() updateFacturaDto: UpdateFacturaDto) {
      return this.facturaService.update(id, updateFacturaDto);
    }

}
