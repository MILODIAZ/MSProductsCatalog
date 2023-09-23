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
import { Exclude, Expose } from 'class-transformer';

import { Category } from './categories.entity';
import { ProductStock } from './product-stock.entity';

@Entity('products')
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

  @Column({ type: 'boolean', default: false })
  isFavourite: boolean;

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

  @Exclude()
  @ManyToMany(() => Category, (category) => category.products, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable({
    name: 'products_categories',
    joinColumn: {
      name: 'product_id',
    },
    inverseJoinColumn: {
      name: 'category_id',
    },
  })
  categories: Category[];

  @Exclude()
  @OneToMany(() => ProductStock, (productStock) => productStock.product, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  productStocks: ProductStock[];

  @Expose()
  get totalStock() {
    if (this.productStocks) {
      return this.productStocks
        .filter((item) => !!item)
        .reduce((total, item) => {
          const itemStock = item.stock;
          return total + itemStock;
        }, 0);
    }
    return 0;
  }
}
