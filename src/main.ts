import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Ensure environment variables are available
  if (!process.env.JWT_SECRET) {
    console.warn('JWT_SECRET not found in environment variables, using default value');
  }
  
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(3535);
}

bootstrap().catch(console.error);
