import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';

import { Category } from 'src/entities/categories.entity';
import { CategoryDto } from 'src/dtos/categories.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  findAll() {
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
