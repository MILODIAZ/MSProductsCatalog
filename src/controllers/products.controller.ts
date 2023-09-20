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
  Query,
} from '@nestjs/common';
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

  //FIND ALL PRODUCTS
  @Get()
  get(@Query() params: FilterProductsDto) {
    return this.productsService.findAll(params);
  }

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

  //FIND ONE PRODUCT
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
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

  //CREATE PRODUCT
  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @MessagePattern(ProductMSG.CREATE)
  async createProduct(@Payload() payload: CreateProductDto) {
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

  //UPDATE PRODUCT
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productsService.update(id, payload);
  }

  @MessagePattern(ProductMSG.UPDATE)
  async updateProduct(
    @Payload() message: { id: number; payload: UpdateProductDto },
  ) {
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

  //ADD CATEGORY TO PRODUCT
  @Put(':id/category/:categoryId')
  addCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productsService.addCategoryToProduct(id, categoryId);
  }

  @MessagePattern(ProductMSG.ADD_CAT_PROD)
  async addCategoryToProduct(
    @Payload() message: { id: number; categoryId: number },
  ) {
    try {
      const addedCategory = await this.productsService.addCategoryToProduct(
        message.id,
        message.categoryId,
      );
      return {
        success: true,
        message: 'Category succesfully added to product',
        data: addedCategory,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to add category to product',
        error: error.message,
      };
    }
  }

  //DELETE PRODUCT
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }

  @MessagePattern(ProductMSG.DELETE)
  async deleteProduct(@Payload() id: number) {
    try {
      const deletedProduct = await this.productsService.remove(id);
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

  //REMOVE CATEGORY FROM PRODUCT
  @Delete(':id/category/:categoryId')
  deleteCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productsService.removeCategoryByProduct(id, categoryId);
  }

  @MessagePattern(ProductMSG.DELETE_CAT_PROD)
  async deleteCategoryFromProduct(
    @Payload() message: { id: number; categoryId: number },
  ) {
    try {
      const deletedCategory =
        await this.productsService.removeCategoryByProduct(
          message.id,
          message.categoryId,
        );
      return {
        success: true,
        message: 'Category succesfully deleted from product',
        data: deletedCategory,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to delete category from product',
        error: error.message,
      };
    }
  }
}
