import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { ObjectId } from 'mongodb';
import { defaultCategories } from './data/categories.data';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async count(): Promise<number> {
    return this.categoryRepository.count();
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async create(category: CreateCategoryDto): Promise<Category> {
    const existingCategory = await this.categoryRepository.findOne({
      where: { name: category.name.toLocaleLowerCase() },
    });

    if (existingCategory) {
      throw new ConflictException('Category with this name already exists');
    }

    const newCategory = this.categoryRepository.create(category);
    return this.categoryRepository.save(newCategory);
  }

  async findOne(idString: string): Promise<Category> {
    const options: FindOneOptions<Category> = {
      where: {
        _id: new ObjectId(idString),
      },
    };

    const category = await this.categoryRepository.findOne(options);

    if (!category) {
      throw new NotFoundException(`Category with id ${idString} not found`);
    }

    return category;
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.findOne(id);

    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    Object.assign(category, updateCategoryDto);
    return this.categoryRepository.save(category);
  }

  async remove(id: string): Promise<void> {
    const category = await this.findOne(id);

    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    await this.categoryRepository.remove(category);
  }

  // charge database with default categories
  async initializeDefaultCategories(): Promise<void> {
    const count = await this.count();
    if (count === 0) {
      for (const category of defaultCategories) {
        await this.create(category);
      }

      console.log('Default categories created successfully');
    }
  }
}
