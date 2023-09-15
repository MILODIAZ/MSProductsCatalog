import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  Check,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

import { Category } from './categories.entity';
import { ProductStock } from './product-stock.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @Column({ type: 'timestamptz', nullable: true })
  publicationDate: Date;

  @Column({ type: 'varchar', length: 100, nullable: true })
  author: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  description: string;

  @Column({ type: 'int' })
  @Check('"price">0')
  price: number;

  @Column({ type: 'varchar', nullable: true })
  image: string;

  @Column({ type: 'boolean', default: false })
  isBlocked: boolean;

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

  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable()
  categories: Category[];

  @OneToMany(() => ProductStock, (productStock) => productStock.product)
  productStocks: ProductStock[];
}
