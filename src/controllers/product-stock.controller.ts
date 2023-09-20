import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';

import { ProductMSG, StockItemMSG } from 'src/common/constants';
import {
  CreateProductStockDto,
  UpdateProductStockDto,
} from 'src/dtos/product-stock.dto';
import { ProductStockService } from 'src/services/product-stock.service';

@ApiTags('Products Stock')
@Controller('product-stock')
export class ProductStockController {
  constructor(private productStockService: ProductStockService) {}

  @MessagePattern(StockItemMSG.FIND_ALL)
  async findAll() {
    try {
      const foundStockItems = await this.productStockService.findAll();
      return {
        success: true,
        message: 'Stock-Items found',
        data: foundStockItems,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to found stock-items',
        error: error.message,
      };
    }
  }

  //ADD PRODUCT TO BRANCH
  @Post()
  create(@Body() payload: CreateProductStockDto) {
    return this.productStockService.create(payload);
  }

  @MessagePattern(ProductMSG.CREATE_STOCK)
  async addProductStock(@Payload() payload: CreateProductStockDto) {
    try {
      const addedStock = await this.productStockService.create(payload);
      return {
        success: true,
        message: 'Branch succesfully related to product',
        data: addedStock,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to relate branch to product',
        error: error.message,
      };
    }
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductStockDto,
  ) {
    return this.productStockService.update(id, payload);
  }

  @MessagePattern(ProductMSG.UPDATE_STOCK)
  async updateStock(
    @Payload() message: { id: number; payload: UpdateProductStockDto },
  ) {
    try {
      const updateStock = await this.productStockService.update(
        message.id,
        message.payload,
      );
      return {
        success: true,
        message: 'Stock updated succesfully',
        data: updateStock,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update stock',
        error: error.message,
      };
    }
  }

  @MessagePattern(StockItemMSG.GET_BRANCH)
  async getBranch(@Payload() id: number) {
    try {
      const branch = await this.productStockService.getBranch(id);
      return {
        success: true,
        message: 'Branch found succesfully',
        data: branch,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to get branch',
        error: error.message,
      };
    }
  }
}
