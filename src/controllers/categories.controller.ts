import {
  Controller,
  /*Get,
  Param,
  Body,
  Post,
  Delete,
  Put,
  ParseIntPipe,
  Query,*/
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { CategoriesService } from 'src/services/categories.service';
import { CategoryDto } from 'src/dtos/categories.dto';
import { CategoryMSG } from 'src/common/constants';
import { FilterProductsDto } from 'src/dtos/products.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @MessagePattern(CategoryMSG.FIND_ALL)
  async findAll() {
    try {
      const foundCategories = await this.categoriesService.findAll();
      return {
        success: true,
        message: 'Categories found',
        data: foundCategories,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to found products',
        error: error.message,
      };
    }
  }

  @MessagePattern(CategoryMSG.FIND_ONE)
  async findOne(@Payload() id: number) {
    try {
      const foundCategory = await this.categoriesService.findOne(id);
      return {
        success: true,
        message: 'Product found',
        data: foundCategory,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Category not found',
        error: error.message,
      };
    }
  }

  @MessagePattern(CategoryMSG.CREATE)
  async create(@Payload() payload: CategoryDto) {
    try {
      const createdCategory = await this.categoriesService.create(payload);
      return {
        success: true,
        message: 'Category created succesfully',
        data: createdCategory,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Category to create product',
        error: error.message,
      };
    }
  }

  @MessagePattern(CategoryMSG.UPDATE)
  async update(@Payload() message: { id: number; payload: CategoryDto }) {
    try {
      const updateCategory = await this.categoriesService.update(
        message.id,
        message.payload,
      );
      return {
        success: true,
        message: 'Category updated succesfully',
        data: updateCategory,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update category',
        error: error.message,
      };
    }
  }

  @MessagePattern(CategoryMSG.DELETE)
  async delete(@Payload() id: number) {
    try {
      const deletedCategory = await this.categoriesService.delete(id);
      return {
        success: true,
        message: 'Category deleted succesfully',
        data: deletedCategory,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to delete category',
        error: error.message,
      };
    }
  }

  @MessagePattern(CategoryMSG.GET_PRODUCTS)
  async getProducts(
    @Payload() message: { id: number; payload: FilterProductsDto },
  ) {
    try {
      const products = await this.categoriesService.getProducts(
        message.id,
        message.payload,
      );
      return {
        success: true,
        message: 'Products found succesfully',
        data: products,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to get products',
        error: error.message,
      };
    }
  }

  @MessagePattern(CategoryMSG.ADD_PRODUCT)
  async addProduct(
    @Payload() message: { categoryId: number; productId: number },
  ) {
    try {
      const product = await this.categoriesService.addProduct(
        message.categoryId,
        message.productId,
      );
      return {
        success: true,
        message: 'Product added succesfully',
        data: product,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to add product',
        error: error.message,
      };
    }
  }

  @MessagePattern(CategoryMSG.REMOVE_PRODUCT)
  async removeProduct(
    @Payload() message: { categoryId: number; productId: number },
  ) {
    try {
      const product = await this.categoriesService.removeProduct(
        message.categoryId,
        message.productId,
      );
      return {
        success: true,
        message: 'Product removed succesfully',
        data: product,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to remove product',
        error: error.message,
      };
    }
  }
}
