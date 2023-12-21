import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import {
  Repository,
  FindOptionsWhere,
  ILike,
  Between,
  MoreThanOrEqual,
  LessThanOrEqual,
} from 'typeorm';

import { Product } from './../entities/product.entity';
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductsDto,
} from 'src/dtos/products.dto';
import { Category } from 'src/entities/categories.entity';
import { ProductStock } from 'src/entities/product-stock.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(ProductStock)
    private productStockRepo: Repository<ProductStock>,
  ) {}

  async findAll(params?: FilterProductsDto) {
    if (params) {
      const where: FindOptionsWhere<Product> = {};
      const { limit, offset, maxPrice, minPrice, search, categoryId } = params;
      if (minPrice && maxPrice) {
        where.price = Between(minPrice, maxPrice);
      } else {
        if (minPrice) {
          where.price = MoreThanOrEqual(minPrice);
        } else {
          if (maxPrice) {
            where.price = LessThanOrEqual(maxPrice);
          }
        }
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
    return await this.productRepo.save(newProduct).catch((error) => {
      throw new ConflictException(error.detail);
    });
  }

  async update(id: number, payload: UpdateProductDto) {
    const product = await this.productRepo.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    this.productRepo.merge(product, payload);
    return await this.productRepo.save(product).catch((error) => {
      throw new ConflictException(error.detail);
    });
  }

  async delete(id: number) {
    const product = await this.productRepo.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    this.productRepo.delete({ id });
    return product;
  }

  async getCategories(id: number) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['categories'],
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product.categories;
  }

  async getStockItems(id: number) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['productStocks'],
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product.productStocks;
  }

  async addCategory(categoryId: number, productId: number) {
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
        `Category #${categoryId} is already added to the product #${productId}`,
      );
    }
    product.categories.push(category);
    this.productRepo.save(product);
    return category;
  }

  async removeCategory(categoryId: number, productId: number) {
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
    const categoryIndex = product.categories.findIndex(
      (item) => item.id === categoryId,
    );
    if (categoryIndex === -1) {
      throw new NotFoundException(
        `Category #${categoryId} not found in Product #${productId}`,
      );
    }
    product.categories.splice(categoryIndex, 1);
    this.productRepo.save(product);
    return category;
  }

  async purchase(productNames) {
    console.log(productNames);

    for (const prod of productNames) {
      const product = await this.productRepo.findOne({
        where: { name: prod.name },
        relations: ['categories', 'productStocks', 'productStocks.branch'],
      });

      console.log(product.productStocks);

      for (const productStock of product.productStocks) {
        const quantityToSubtract = Math.min(prod.quantity, productStock.stock);
        productStock.stock -= quantityToSubtract;
        this.productStockRepo.save(productStock);
        prod.quantity -= quantityToSubtract;

        if (prod.quantity === 0) {
          break;
        }
      }
    }

    return 'success';
  }

  async getPrices(productNames) {
    console.log(productNames);

    for (const prod of productNames) {
      const product = await this.productRepo.findOne({
        where: { name: prod.product },
      });
      if (product) {
        prod.total = product.price * prod.quantity;
      } else {
        console.log(`Producto no encontrado: ${prod.name}`);
      }
    }
    console.log(productNames);

    return productNames;
  }
}
