import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';

import {
  CreateProductStockDto,
  UpdateProductStockDto,
} from 'src/dtos/product-stock.dto';
import { ProductStock } from 'src/entities/product-stock.entity';
import { Branch } from 'src/entities/branches.entity';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class ProductStockService {
  constructor(
    @InjectRepository(ProductStock)
    private productStockRepo: Repository<ProductStock>,
    @InjectRepository(Branch) private branchRepo: Repository<Branch>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async findAll() {
    return this.productStockRepo.find();
  }

  async findOne(id: number) {
    const stockItem = await this.productStockRepo.findOne({
      where: { id },
    });
    if (!stockItem) {
      throw new NotFoundException(`Stock item #${id} not found`);
    }
    return stockItem;
  }

  async create(payload: CreateProductStockDto) {
    const branch = await this.branchRepo.findOneBy({ id: payload.branchId });
    if (!branch) {
      throw new NotFoundException(`Branch #${payload.branchId} not found`);
    }
    const product = await this.productRepo.findOneBy({ id: payload.productId });
    if (!product) {
      throw new NotFoundException(`Product #${payload.productId} not found`);
    }
    const productStock = new ProductStock();
    productStock.branch = branch;
    productStock.product = product;
    return this.productStockRepo.save(productStock).catch((error) => {
      throw new ConflictException(error.detail);
    });
  }

  async update(id: number, payload: UpdateProductStockDto) {
    const productStock = await this.productStockRepo.findOneBy({
      id,
    });
    if (!productStock) {
      throw new NotFoundException(`Stock item #${id} not found`);
    }
    const updatedStock = productStock.stock + payload.stock;
    if (updatedStock < 0) {
      throw new BadRequestException('Stock cannot be negative');
    }
    productStock.stock += payload.stock;
    return await this.productStockRepo.save(productStock).catch((error) => {
      throw new ConflictException(error.detail);
    });
  }

  async delete(id: number) {
    const stockItem = await this.productStockRepo.findOneBy({ id });
    if (!stockItem) {
      throw new NotFoundException(`Stock item ${id} not found`);
    }
    this.productStockRepo.delete({ id });
    return stockItem;
  }

  async getBranch(id: number) {
    const productStock = await this.productStockRepo.findOne({
      where: { id },
      relations: ['branch'],
    });
    if (!productStock) {
      throw new NotFoundException(`StockInfo #${id} not found`);
    }
    return productStock.branch;
  }

  async getProduct(id: number) {
    const productStock = await this.productStockRepo.findOne({
      where: { id },
      relations: ['product'],
    });
    if (!productStock) {
      throw new NotFoundException(`StockInfo #${id} not found`);
    }
    return productStock.product;
  }
}
