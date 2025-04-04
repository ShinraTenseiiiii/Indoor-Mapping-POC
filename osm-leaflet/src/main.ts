import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Set the view engine
  app.setViewEngine('ejs');

  // Fix view directory path
  app.setBaseViewsDir(join(__dirname, '..', 'src', 'views'));

  // Serve static assets (JS, CSS, images)
  app.useStaticAssets(join(__dirname, '..', 'public'));

  await app.listen(3000);
  console.log(`🚀 Server running at http://localhost:3000`);
}
bootstrap();
