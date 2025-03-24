import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { dtoValidationPipe } from './app/base/validation/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 設定全域驗證管道
  app.useGlobalPipes(dtoValidationPipe)

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
