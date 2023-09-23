import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Between, FindOptionsWhere, ILike, Repository } from 'typeorm';

import { Category } from 'src/entities/categories.entity';
import { Product } from 'src/entities/product.entity';
import { CategoryDto } from 'src/dtos/categories.dto';
import { FilterProductsDto } from 'src/dtos/products.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async findAll() {
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

  async delete(id: number) {
    const category = await this.categoryRepo.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    this.categoryRepo.delete({ id });
    return category;
  }

  async getProducts(id: number, params?: FilterProductsDto) {
    const category = await this.categoryRepo.findOne({
      where: { id },
      relations: ['products'],
    });
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    if (params) {
      const where: FindOptionsWhere<Product> = {};
      const { limit, offset, maxPrice, minPrice, search } = params;
      if (minPrice && maxPrice) {
        where.price = Between(minPrice, maxPrice);
      }
      if (search) {
        where.name = ILike(`%${search}%`);
      }
      if (id) {
        where.categories = {
          id,
        };
      }
      return this.productRepo.find({ where, take: limit, skip: offset });
    }
    return category.products;
  }

  async addProduct(categoryId: number, productId: number) {
    const category = await this.categoryRepo.findOne({
      where: { id: categoryId },
      relations: ['products'],
    });
    if (!category) {
      throw new NotFoundException(`Category #${categoryId} not found`);
    }
    const product = await this.productRepo.findOneBy({ id: productId });
    if (!product) {
      throw new NotFoundException(`Product #${productId} not found`);
    }
    const isProductAlreadyAdded = category.products.some(
      (existingProduct) => existingProduct.id === productId,
    );
    if (isProductAlreadyAdded) {
      throw new ConflictException(
        `Product #${productId} is already added to category #${categoryId}`,
      );
    }
    category.products.push(product);
    this.categoryRepo.save(category);
    return product;
  }

  async removeProduct(categoryId: number, productId: number) {
    const category = await this.categoryRepo.findOne({
      where: { id: categoryId },
      relations: ['products'],
    });
    if (!category) {
      throw new NotFoundException(`Category #${categoryId} not found`);
    }
    const product = await this.productRepo.findOneBy({ id: productId });
    if (!product) {
      throw new NotFoundException(`Product #${productId} not found`);
    }
    const productIndex = category.products.findIndex(
      (item) => item.id === productId,
    );
    if (productIndex === -1) {
      throw new NotFoundException(
        `Product #${productId} not found in category #${categoryId}`,
      );
    }
    category.products.splice(productIndex, 1);
    this.categoryRepo.save(category);
    return product;
  }
}
