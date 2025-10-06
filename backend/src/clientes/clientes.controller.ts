import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post('crear')
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clientesService.create(createClienteDto);
  }

  @Get('todos')
  findAll() {
    return this.clientesService.findAll();
  }


  @Get('buscar/:text')
  searchByText(@Param('text') text: string){  
    return this.clientesService.searchByText(text)
  }  

  @Get('unico/:id')
  findOne(@Param('id') id: string) {
    return this.clientesService.findOne(+id);
  }

  @Patch('actualizar/:id')
  update(@Param('id') id: number, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clientesService.update(id, updateClienteDto);
  }

  @Patch('cambiarEstado/:id')
  remove(@Param('id') id: number) {
    return this.clientesService.changeState(id);
  }
}
