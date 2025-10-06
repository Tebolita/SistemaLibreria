import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post('crear')
  create(@Body() validateProductoDto: CreateProductoDto) {
    return this.productosService.create(validateProductoDto);
  }

  @Get('todos')
  findAll() {
    return this.productosService.obtenerTodosLosProductos();
  }

  @Get('buscar/:text')
  searchByText(@Param('text') text: string){
    return this.productosService.searchByText(text)
  }    

  @Get('unico/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productosService.obtenerUnProducto(+id);
  }

  @Patch('actualizar/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProductoDto: UpdateProductoDto) {
    try {
      this.productosService.actualizarProducto(id, updateProductoDto);
      return {message: `Producto actualizado exitosamente`}
    } catch (error) {
      return {error: "No se pudo actualizar el producto", message: `No se pudo actualizar el producto: ${error}`}
    }

  }

  @Patch('cambiarEstado/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productosService.desactivarProducto(id);
  }

  @Get('produtoPorCategori/:idCategoria')
  findAllCategories(@Param('idCategoria', ParseIntPipe) idCategoria: number){
    return this.productosService.productosPorCategoria(idCategoria)
  }

  @Get('productosActivos')
  getProductsActive(){
    return this.productosService.obtenerTodosLosProductosActivos()
  }

}
