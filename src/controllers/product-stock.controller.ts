import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
  CreateProductStockDto,
  UpdateProductStockDto,
} from 'src/dtos/product-stock.dto';
import { ProductStockService } from 'src/services/product-stock.service';

@ApiTags('Products Stock')
@Controller('product-stock')
export class ProductStockController {
  constructor(private productStockService: ProductStockService) {}

  @Post()
  create(@Body() payload: CreateProductStockDto) {
    return this.productStockService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductStockDto,
  ) {
    return this.productStockService.update(id, payload);
  }
}
