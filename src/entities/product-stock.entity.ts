import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Unique,
  Check,
} from 'typeorm';

import { Product } from './product.entity';
import { Branch } from './branches.entity';

@Entity('products_stock')
@Unique(['branch', 'product'])
export class ProductStock {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @Column({ type: 'int', default: 0, nullable: true })
  @Check('"stock">=0')
  stock: number;

  @ManyToOne(() => Product, (product) => product.productStocks, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  product: Product;

  @ManyToOne(() => Branch, (branch) => branch.productStocks, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  branch: Branch;
}
