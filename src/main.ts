import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { dtoValidationPipe } from './app/base/validation/validation.pipe';
import { setupSwagger } from './app/base/swagger/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('webapi');

  // 設定全域驗證管道
  app.useGlobalPipes(dtoValidationPipe)

  setupSwagger(app)

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
