import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';

import { Category } from 'src/entities/categories.entity';
import { Product } from 'src/entities/product.entity';
import { CategoryDto, FilterCategoriesDto } from 'src/dtos/categories.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async findAll(params?: FilterCategoriesDto) {
    if (params) {
      const { productId } = params;
      const product = await this.productRepo.findOne({
        where: { id: productId },
        relations: ['categories'],
      });
      if (!product) {
        throw new NotFoundException(`Product #${productId} not found`);
      }
      return product.categories;
    }
    return this.categoryRepo.find();
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.findOne({
      where: { id },
      relations: ['products'],
    });
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  async create(payload: CategoryDto) {
    const newCategory = this.categoryRepo.create(payload);
    return await this.categoryRepo.save(newCategory).catch((error) => {
      throw new ConflictException(error.detail);
    });
  }

  async update(id: number, payload: CategoryDto) {
    const category = await this.categoryRepo.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    this.categoryRepo.merge(category, payload);
    return await this.categoryRepo.save(category).catch((error) => {
      throw new ConflictException(error.detail);
    });
  }

  async remove(id: number) {
    const category = await this.categoryRepo.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return this.categoryRepo.delete({ id });
  }
}
