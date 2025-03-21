import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 設定全域驗證管道
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,  // 自動過濾掉 DTO 中沒有定義的屬性
    // forbidNonWhitelisted: true,  // 遇到未定義的屬性時拋出錯誤
    transform: true,  // 自動將 payload 轉換為 DTO 類別（等同於 `plainToClass()`）
    exceptionFactory: (errors) => {
      const formattedErrors = errors.reduce((acc, error) => {
        acc[error.property] = Object.values(error.constraints || {});
        return acc;
      }, {} as Record<string, string[]>);

      return new BadRequestException({
        statusCode: 400,
        message: 'Validation failed',
        errors: formattedErrors,
      });
  }}))

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
