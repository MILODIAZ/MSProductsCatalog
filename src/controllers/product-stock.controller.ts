import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';

import { StockItemMSG } from 'src/common/constants';
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

  @MessagePattern(StockItemMSG.FIND_ONE)
  async findOne(@Payload() id: number) {
    try {
      const foundProduct = await this.productStockService.findOne(id);
      return {
        success: true,
        message: 'Stock item found',
        data: foundProduct,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Stock item not found',
        error: error.message,
      };
    }
  }

  @MessagePattern(StockItemMSG.CREATE)
  async create(@Payload() payload: CreateProductStockDto) {
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

  @MessagePattern(StockItemMSG.UPDATE)
  async update(
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

  @MessagePattern(StockItemMSG.DELETE)
  async delete(@Payload() id: number) {
    try {
      const deletedStockItem = await this.productStockService.delete(id);
      return {
        success: true,
        message: 'Stock item deleted succesfully',
        data: deletedStockItem,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to delete stock item',
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

  @MessagePattern(StockItemMSG.GET_PRODUCT)
  async getProduct(@Payload() id: number) {
    try {
      const product = await this.productStockService.getProduct(id);
      return {
        success: true,
        message: 'Product found succesfully',
        data: product,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to get product',
        error: error.message,
      };
    }
  }
}
