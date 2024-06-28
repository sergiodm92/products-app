import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductCategory } from './enums/product-category.enum';
import { ObjectId } from 'mongodb';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async count(): Promise<number> {
    return this.productRepository.count();
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { name, description, price, category, image, ratings, stock } =
      createProductDto;

    const product = new Product();
    product.name = name;
    product.description = description;
    product.price = price;
    product.category = category as ProductCategory;
    product.image = image;
    product.ratings = ratings;
    product.stock = stock;

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

    product.name = name !== undefined ? name : product.name;
    product.description =
      description !== undefined ? description : product.description;
    product.price = price !== undefined ? price : product.price;
    product.category =
      category !== undefined ? (category as ProductCategory) : product.category;
    product.image = image !== undefined ? image : product.image;
    product.ratings = ratings !== undefined ? ratings : product.ratings;
    product.stock = stock !== undefined ? stock : product.stock;

    return this.productRepository.save(product);
  }

  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }
}
