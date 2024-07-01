import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ObjectId } from 'mongodb';
import { Category } from '../categories/entities/category.entity';
import { defaultProducts } from './data/products.data';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async count(): Promise<number> {
    return this.productRepository.count();
  }

  async create(newProduct: CreateProductDto): Promise<Product> {
    const { category, ...productData } = newProduct;

    // check if category exists
    const categoryExists = await this.categoryRepository.findOne({
      where: { name: category },
    });

    if (!categoryExists) {
      throw new BadRequestException(` '${category}' is not a valid category`);
    }
    // check if product with same name already exists
    const existingProduct = await this.categoryRepository.findOne({
      where: { name: newProduct.name.toLocaleLowerCase() },
    });

    if (existingProduct) {
      throw new ConflictException(
        `There is already a product with the name '${newProduct.name}'`,
      );
    }

    const product = this.productRepository.create({
      ...productData,
      category: categoryExists.name,
    });

    return this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(idString: string): Promise<Product> {
    const options: FindOneOptions<Product> = {
      where: {
        _id: new ObjectId(idString),
      },
    };

    const product = await this.productRepository.findOne(options);

    if (!product) {
      throw new NotFoundException(`Product with id ${idString} not found`);
    }

    return product;
  }
  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOne(id);

    const { name, description, price, category, image, ratings, stock } =
      updateProductDto;

    // check if category exists
    if (category !== undefined) {
      const categoryExists = await this.categoryRepository.findOne({
        where: { name: category },
      });

      if (!categoryExists) {
        throw new BadRequestException(` '${category}' is not a valid category`);
      }
      product.category = categoryExists.name;
    }

    product.name = name !== undefined ? name : product.name;
    product.description =
      description !== undefined ? description : product.description;
    product.price = price !== undefined ? price : product.price;
    product.image = image !== undefined ? image : product.image;
    product.ratings = ratings !== undefined ? ratings : product.ratings;
    product.stock = stock !== undefined ? stock : product.stock;

    return this.productRepository.save(product);
  }

  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }

  // charge database with default products
  async initializeDefaultProducts() {
    const count = await this.count();
    if (count === 0) {
      for (const product of defaultProducts) {
        await this.create(product);
      }

      console.log('Default products created successfully');
    }
  }
}
