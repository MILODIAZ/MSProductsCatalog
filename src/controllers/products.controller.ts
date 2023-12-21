import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MessagePattern, Payload } from '@nestjs/microservices/decorators';

import { ProductsService } from 'src/services/products.service';
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductsDto,
} from 'src/dtos/products.dto';
import { ProductMSG } from 'src/common/constants';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @MessagePattern(ProductMSG.FIND_ALL)
  async findAll(@Payload() params: FilterProductsDto) {
    try {
      const foundProducts = await this.productsService.findAll(params);
      return {
        success: true,
        message: 'Products found',
        data: foundProducts,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to found products',
        error: error.message,
      };
    }
  }

  @MessagePattern(ProductMSG.FIND_ONE)
  async findOne(@Payload() id: number) {
    try {
      const foundProduct = await this.productsService.findOne(id);
      return {
        success: true,
        message: 'Product found',
        data: foundProduct,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Product not found',
        error: error.message,
      };
    }
  }

  @MessagePattern(ProductMSG.CREATE)
  async create(@Payload() payload: CreateProductDto) {
    try {
      const createdProduct = await this.productsService.create(payload);
      return {
        success: true,
        message: 'Product created succesfully',
        data: createdProduct,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to create product',
        error: error.message,
      };
    }
  }

  @MessagePattern(ProductMSG.UPDATE)
  async update(@Payload() message: { id: number; payload: UpdateProductDto }) {
    try {
      const updateProduct = await this.productsService.update(
        message.id,
        message.payload,
      );
      return {
        success: true,
        message: 'Product updated succesfully',
        data: updateProduct,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update product',
        error: error.message,
      };
    }
  }

  @MessagePattern(ProductMSG.DELETE)
  async delete(@Payload() id: number) {
    try {
      const deletedProduct = await this.productsService.delete(id);
      return {
        success: true,
        message: 'Product deleted succesfully',
        data: deletedProduct,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to delete product',
        error: error.message,
      };
    }
  }

  @MessagePattern(ProductMSG.GET_CATEGORIES)
  async getCategories(@Payload() id: number) {
    try {
      const categories = await this.productsService.getCategories(id);
      return {
        success: true,
        message: 'Categories found succesfully',
        data: categories,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to get categories',
        error: error.message,
      };
    }
  }

  @MessagePattern(ProductMSG.GET_STOCK_ITEMS)
  async getStockItems(@Payload() id: number) {
    try {
      const stockItems = await this.productsService.getStockItems(id);
      return {
        success: true,
        message: 'Stock items found succesfully',
        data: stockItems,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to get stock items',
        error: error.message,
      };
    }
  }

  @MessagePattern(ProductMSG.ADD_CATEGORY)
  async addCategory(
    @Payload() message: { categoryId: number; productId: number },
  ) {
    try {
      const category = await this.productsService.addCategory(
        message.categoryId,
        message.productId,
      );
      return {
        success: true,
        message: 'Category added succesfully',
        data: category,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to add category',
        error: error.message,
      };
    }
  }

  @MessagePattern(ProductMSG.REMOVE_CATEGORY)
  async removeCategory(
    @Payload() message: { categoryId: number; productId: number },
  ) {
    try {
      const category = await this.productsService.removeCategory(
        message.categoryId,
        message.productId,
      );
      return {
        success: true,
        message: 'Category removed succesfully',
        data: category,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to remove category',
        error: error.message,
      };
    }
  }

  @MessagePattern(ProductMSG.PURCHASE)
  async purchase(@Payload() productNames) {
    try {
      const message = await this.productsService.purchase(productNames);
      return {
        success: true,
        message: 'Stock updated succesfully',
        data: message,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update Stock',
        error: error.message,
      };
    }
  }

  @MessagePattern(ProductMSG.GET_PRICES)
  async getPrices(@Payload() productNames) {
    try {
      const message = await this.productsService.getPrices(productNames);
      return {
        success: true,
        message: 'Product prices found',
        data: message,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to find products prices',
        error: error.message,
      };
    }
  }
}
