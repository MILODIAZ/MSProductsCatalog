import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Any, Repository, Between, FindOptionsWhere, ILike } from 'typeorm';

import { Product } from './../entities/product.entity';
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductsDto,
} from 'src/dtos/products.dto';
import { Category } from 'src/entities/categories.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  async findAll(params?: FilterProductsDto) {
    if (params) {
      const where: FindOptionsWhere<Product> = {};
      const { limit, offset, maxPrice, minPrice, search, categoryId } = params;
      if (minPrice && maxPrice) {
        where.price = Between(minPrice, maxPrice);
      }
      if (search) {
        where.name = ILike(`%${search}%`);
      }
      if (categoryId) {
        where.categories = {
          id: categoryId,
        };
      }
      return this.productRepo.find({
        relations: ['categories', 'productStocks', 'productStocks.branch'],
        where,
        take: limit,
        skip: offset,
      });
    }
    return this.productRepo.find({
      relations: ['categories', 'productStocks', 'productStocks.branch'],
    });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['categories', 'productStocks', 'productStocks.branch'],
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(payload: CreateProductDto) {
    const newProduct = this.productRepo.create(payload);
    if (payload.categoriesIds) {
      //VER SI PUEDO CONTROLAR CATEGORIAS NO VALIDAS
      const categories = await this.categoryRepo.findBy({
        id: Any(payload.categoriesIds),
      });
      newProduct.categories = categories;
    }
    return await this.productRepo.save(newProduct).catch((error) => {
      throw new ConflictException(error.detail);
    });
  }

  async update(id: number, payload: UpdateProductDto) {
    const product = await this.productRepo.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    if (payload.categoriesIds) {
      const categories = await this.categoryRepo.findBy({
        id: Any(payload.categoriesIds),
      });
      product.categories = categories;
    }
    this.productRepo.merge(product, payload);
    return await this.productRepo.save(product).catch((error) => {
      throw new ConflictException(error.detail);
    });
  }

  async addCategoryToProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne({
      where: { id: productId },
      relations: ['categories'],
    });
    if (!product) {
      throw new NotFoundException(`Product #${productId} not found`);
    }
    const category = await this.categoryRepo.findOneBy({ id: categoryId });
    if (!category) {
      throw new NotFoundException(`Category #${categoryId} not found`);
    }
    const isCategoryAlreadyAdded = product.categories.some(
      (existingCategory) => existingCategory.id === categoryId,
    );

    if (isCategoryAlreadyAdded) {
      throw new ConflictException(
        `Category #${categoryId} is already added to the product`,
      );
    }
    product.categories.push(category);
    return this.productRepo.save(product);
  }

  async removeCategoryByProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne({
      where: { id: productId },
      relations: ['categories'],
    });
    if (!product) {
      throw new NotFoundException(`Product #${productId} not found`);
    }
    const categoryIndex = product.categories.findIndex(
      (item) => item.id === categoryId,
    );
    if (categoryIndex === -1) {
      throw new NotFoundException(
        `Category #${categoryId} not found in Product #${productId}`,
      );
    }
    product.categories.splice(categoryIndex, 1);
    return this.productRepo.save(product);
  }

  async remove(id: number) {
    const product = await this.productRepo.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return this.productRepo.delete({ id });
  }
}
