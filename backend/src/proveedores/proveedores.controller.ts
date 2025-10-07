import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProveedoresService } from './proveedores.service';
import { CreateProveedoreDto } from './dto/create-proveedore.dto';
import { UpdateProveedoreDto } from './dto/update-proveedore.dto';

@Controller('proveedores')
export class ProveedoresController {
  constructor(private readonly proveedoresService: ProveedoresService) {}

  @Post('crear')
  create(@Body() createProveedoreDto: CreateProveedoreDto) {
    return this.proveedoresService.create(createProveedoreDto);
  }

  @Get('todos')
  findAll() {
    return this.proveedoresService.findAll();
  }


  @Get('buscar/:text')
  searchByText(@Param('text') text: string){  
    return this.proveedoresService.searchByText(text)
  }  

  @Get('unico/:id')
  findOne(@Param('id') id: string) {
    return this.proveedoresService.findOne(+id);
  }

  @Patch('cambiarEstado/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.proveedoresService.desactivarProveedor(id);
  }

  @Patch('actualizar/:id')
  update(@Param('id') id: number, @Body() updateProveedoreDto: UpdateProveedoreDto) {
    return this.proveedoresService.update(id, updateProveedoreDto);
  }
}
