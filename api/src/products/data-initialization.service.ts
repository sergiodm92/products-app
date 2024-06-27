import { Injectable } from '@nestjs/common';
import { ProductsService } from './products.service';
import { defaultProducts } from './data/products.data';

@Injectable()
export class DataInitializationService {
  constructor(private readonly productService: ProductsService) {}

  async initializeDefaultProducts() {
    const count = await this.productService.count();
    if (count === 0) {
      for (const product of defaultProducts) {
        await this.productService.create(product);
      }

      console.log('Productos por defecto insertados correctamente.');
    }
  }
}
