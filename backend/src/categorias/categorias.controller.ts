import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post('crear')
  create(@Body() createClienteDto: CreateCategoriaDto) {
    return this.categoriasService.create(createClienteDto);
  }

  @Get('todos')
  findAll() {
    return this.categoriasService.findAll();
  }

  @Get('categoriasActivas')
  getProductsActive(){
    return this.categoriasService.obtenerTodasLasCategoriasActivas()
  }



  @Get('buscar/:text')
  searchByText(@Param('text') text: string){  
    return this.categoriasService.searchByText(text)
  }  

  @Get('unico/:id')
  findOne(@Param('id') id: string) {
    return this.categoriasService.findOne(+id);
  }

  @Patch('actualizar/:id')
  update(@Param('id') id: number, @Body() updateCategoriaDto: UpdateCategoriaDto) {
    return this.categoriasService.update(id, updateCategoriaDto);
  }

  @Patch('cambiarEstado/:id')
  remove(@Param('id') id: number) {
    return this.categoriasService.changeState(id);
  }
}
