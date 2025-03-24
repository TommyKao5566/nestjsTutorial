import { BadRequestException, ValidationPipe } from '@nestjs/common';

export const dtoValidationPipe = new ValidationPipe({
  whitelist: true, // 自動過濾掉 DTO 中沒有定義的屬性
  // forbidNonWhitelisted: true,  // 遇到未定義的屬性時拋出錯誤
  transform: true, // 自動將 payload 轉換為 DTO 類別（等同於 `plainToClass()`）
  exceptionFactory: (errors) => {
    const validationErrors = errors.reduce(
      (acc, error) => {
        acc[error.property] = Object.values(error.constraints || {});
        return acc;
      },
      {} as Record<string, string[]>,
    );

    return new BadRequestException({
      statusCode: 400,
      message: 'Validation failed',
      validationErrors,
    });
  },
});
