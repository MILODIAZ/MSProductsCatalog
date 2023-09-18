import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Delete,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { CategoriesService } from 'src/services/categories.service';
import { CategoryDto } from 'src/dtos/categories.dto';
import { CategoryMSG } from 'src/common/constants';


@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) { }

  //FIND ALL CATEGORIES
  @Get()
  get() {
    return this.categoriesService.findAll();
  }

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

  //FIND ONE CATEGORY
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findOne(id);
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

  //CREATE CATEGORY
  @Post()
  create(@Body() payload: CategoryDto) {
    return this.categoriesService.create(payload);
  }

  @MessagePattern(CategoryMSG.CREATE)
  async createProduct(@Payload() payload: CategoryDto) {
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

  //UPDATE CATEGORY
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: CategoryDto) {
    return this.categoriesService.update(id, payload);
  }

  @MessagePattern(CategoryMSG.UPDATE)
  async updateProduct(
    @Payload() message: { id: number; payload: CategoryDto },
  ) {
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

  //DELETE CATEGORY
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.remove(id);
  }

  @MessagePattern(CategoryMSG.DELETE)
  async deleteProduct(@Payload() id: number) {
    try {
      const deletedCategory = await this.categoriesService.remove(id);
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
}
