import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { Product } from './products/entities/product.entity';
import { DataInitializationService } from './products/data-initialization.service';

@Module({
  imports: [
    ProductsModule,
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mongodb',
        url: configService.get<string>('MONGODB'),
        entities: [Product],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [ AppController],
  providers: [ AppService, DataInitializationService],
})
export class AppModule {}
