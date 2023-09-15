import {
  Controller,
  Get,
  //Query,
  Param,
  //DefaultValuePipe,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ProductsService } from 'src/services/products.service';
import { CreateProductDto, UpdateProductDto } from 'src/dtos/products.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  get() {
    //@Query('offset', new DefaultValuePipe(0)) offset: number, //@Query('limit', new DefaultValuePipe(100)) limit: number,
    return this.productsService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Get(':id/stock')
  getStock(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.getStock(id);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productsService.update(id, payload);
  }

  @Put(':id/category/:categoryId')
  addCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productsService.addCategoryToProduct(id, categoryId);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }

  @Delete(':id/category/:categoryId')
  deleteCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productsService.removeCategoryByProduct(id, categoryId);
  }
}
