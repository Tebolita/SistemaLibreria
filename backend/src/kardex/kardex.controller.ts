import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KardexService } from './kardex.service';
import { CreateKardexDto } from './dto/create-kardex.dto';
import { UpdateKardexDto } from './dto/update-kardex.dto';

@Controller('kardex')
export class KardexController {
  constructor(private readonly kardexService: KardexService) {}

  @Post('crear')
  create(@Body() createKardexDto: CreateKardexDto) {
    return this.kardexService.create(createKardexDto);
  }

  @Get('todos')
  findAll() {
    return this.kardexService.findAll();
  }


  @Get('buscar/:text')
  searchByText(@Param('text') text: string){  
    return this.kardexService.searchByText(text)
  }  

  @Get('unico/:id')
  findOne(@Param('id') id: string) {
    return this.kardexService.findOne(+id);
  }

  @Patch('actualizar/:id')
  update(@Param('id') id: number, @Body() updateKardexDto: UpdateKardexDto) {
    return this.kardexService.update(id, updateKardexDto);
  }

}
