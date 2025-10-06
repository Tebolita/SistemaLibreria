import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MetodosPagoService } from './metodos-pago.service';
import { CreateMetodosPagoDto } from './dto/create-metodos-pago.dto';
import { UpdateMetodosPagoDto } from './dto/update-metodos-pago.dto';

@Controller('metodos-pago')
export class MetodosPagoController {
  constructor(private readonly metodosPagoService: MetodosPagoService) {}

  @Post('crear')
  create(@Body() createMetodosPagoDto: CreateMetodosPagoDto) {
    return this.metodosPagoService.create(createMetodosPagoDto);
  }

  @Get('todos')
  findAll() {
    return this.metodosPagoService.findAll();
  }


  @Get('buscar/:text')
  searchByText(@Param('text') text: string){  
    return this.metodosPagoService.searchByText(text)
  }  

  @Get('unico/:id')
  findOne(@Param('id') id: string) {
    return this.metodosPagoService.findOne(+id);
  }

  @Patch('actualizar/:id')
  update(@Param('id') id: number, @Body() updateMetodosPagoDto: UpdateMetodosPagoDto) {
    return this.metodosPagoService.update(id, updateMetodosPagoDto);
  }

}
