import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { DataInitializationService } from './products/data-initialization.service';

async function bootstrap() {
  // Create a NestJS application instance
  const app = await NestFactory.create(AppModule);

  // Set a global prefix for all API routes
  app.setGlobalPrefix('api');

  // Apply global validation pipe to enforce DTO validation
  app.useGlobalPipes(new ValidationPipe());


// Swagger
  const config = new DocumentBuilder()
    .setTitle('Products API')
    .setDescription("The Products API description")
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Access the configuration service to retrieve the application port
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');

  // Initialize DataInitializationService to handle data seeding
  const dataInitializationService = app.get(DataInitializationService);

  // Call the initialization method to insert default products if database is empty
  await dataInitializationService.initializeDefaultProducts();

  // Start the NestJS application and listen on the specified port
  await app.listen(port || 3000);

  // Log the server's running status with the port information
  console.log(`Server is running on port ${port} --> http://localhost:${port}`);
}

bootstrap();
