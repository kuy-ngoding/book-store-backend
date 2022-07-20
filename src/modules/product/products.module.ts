import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from '../product/controllers/products.controller';
import { Product, ProductSchema } from './entities/product.entity';
import { ProductRepository } from './repositories/product.repository';
import { ProductsService } from './services/products.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductRepository]
  
})

export class ProductsModule {}
