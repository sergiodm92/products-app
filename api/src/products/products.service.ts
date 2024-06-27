import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} produc`;
  }

  update(id: number, updateProducDto: UpdateProductDto) {
    return `This action updates a #${id} produc`;
  }

  remove(id: number) {
    return `This action removes a #${id} produc`;
  }
}
