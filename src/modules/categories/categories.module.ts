import { Module } from '@nestjs/common';
import { CategoriesService } from './services/categories.service';
import { CategoriesController } from './controllers/categories.controller';
import { CategoryRepository } from './repositories/category.repository';
import { Category, CategorySchema } from './entities/category.entity';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]),
  ], 
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoryRepository]
})
export class CategoriesModule {}
