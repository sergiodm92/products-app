import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { corsOptions } from './constants/cors';
import { CategoriesService } from './modules/categories/categories.service';
import { ProductsService } from './modules/products/products.service';

async function bootstrap() {
  // Create a NestJS application instance
  const app = await NestFactory.create(AppModule);

  // Set global prefix for all API routes
  app.setGlobalPrefix('api');

  // Apply global validation pipe to enforce DTO validation
  app.useGlobalPipes(new ValidationPipe());

  // Enable CORS
  app.enableCors(corsOptions);

  // Disable 'X-Powered-By' header
  app.getHttpAdapter().getInstance().disable('x-powered-by');

  // Swagger API documentation configuration
  const config = new DocumentBuilder()
    .setTitle('Products API')
    .setDescription('API documentation for managing products')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Access configuration service to retrieve application port
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');

  // Add Categories to the database
  const CategoriesServiceInstance = app.get(CategoriesService);
  await CategoriesServiceInstance.initializeDefaultCategories();

  // Add Products to the database
  const productsServiceInstance = app.get(ProductsService);
  await productsServiceInstance.initializeDefaultProducts();

  // Default port fallback if PORT environment variable is not set
  const defaultPort = 7000;

  // Start NestJS application and listen on specified port or default port
  await app.listen(port || defaultPort);

  // Log server's running status with port information
  console.log(`Server is running on port ${port} --> http://localhost:${port}`);
}

bootstrap();
