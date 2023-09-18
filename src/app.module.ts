import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './controllers/products.controller';
import { CategoriesController } from './controllers/categories.controller';
import { BranchesController } from './controllers/branches.controller';
import { ProductsService } from './services/products.service';
import { CategoriesService } from './services/categories.service';
import { BranchesService } from './services/branches.service';
import { Product } from './entities/product.entity';
import { Category } from './entities/categories.entity';
import { Branch } from './entities/branches.entity';
import config from './config';
import { ProductStock } from './entities/product-stock.entity';
import { ProductStockController } from './controllers/product-stock.controller';
import { ProductStockService } from './services/product-stock.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        POSTGRES_DB: Joi.string().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_HOST: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, dbName, password, port } = configService.postgres;
        return {
          type: 'postgres',
          host,
          port,
          username: user,
          password,
          database: dbName,
          synchronize: false,
          autoLoadEntities: true,
        };
      },
    }),
    TypeOrmModule.forFeature([Product, Category, Branch, ProductStock]),
  ],
  controllers: [
    AppController,
    ProductsController,
    CategoriesController,
    BranchesController,
    ProductStockController,
  ],
  providers: [
    AppService,
    ProductsService,
    CategoriesService,
    BranchesService,
    ProductStockService,
  ],
})
export class AppModule {}
