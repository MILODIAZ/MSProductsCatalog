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

@Entity()
@Unique(['branch', 'product'])
export class ProductStock {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @Column({ type: 'int', default: 0 })
  @Check('"stock">=0')
  stock: number;

  @ManyToOne(() => Product, (product) => product.productStocks)
  product: Product;

  @ManyToOne(() => Branch, (branch) => branch.productStocks)
  branch: Branch;
}
