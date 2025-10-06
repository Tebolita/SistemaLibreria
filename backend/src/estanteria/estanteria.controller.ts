import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstanteriaService } from './estanteria.service';
import { CreateEstanteriaDto } from './dto/create-estanteria.dto';
import { UpdateEstanteriaDto } from './dto/update-estanteria.dto';


@Controller('estanteria')
export class EstanteriaController {
  constructor(private readonly estanteriaService: EstanteriaService) {}

  
    @Post('crear')
    create(@Body() createEstanteriaDto: CreateEstanteriaDto) {
      return this.estanteriaService.create(createEstanteriaDto);
    }
  
    @Get('todos')
    findAll() {
      return this.estanteriaService.findAll();
    }
  
  
    @Get('buscar/:text')
    searchByText(@Param('text') text: string){  
      return this.estanteriaService.searchByText(text)
    }  
  
    @Get('unico/:id')
    findOne(@Param('id') id: number) {
      return this.estanteriaService.findOne(id);
    }
  
    @Patch('actualizar/:id')
    update(@Param('id') id: number, @Body() updateEstanteriaDto: UpdateEstanteriaDto) {
      return this.estanteriaService.update(id, updateEstanteriaDto);
    }
  
  
}
