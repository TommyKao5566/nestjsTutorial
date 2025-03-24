import { BadRequestException, ValidationPipe } from '@nestjs/common';

export const dtoValidationPipe = new ValidationPipe({
  whitelist: true, // Automatically filters out properties not defined in the DTO.
  // forbidNonWhitelisted: true, // Throws an error when encountering properties that are not defined.
  transform: true, // Automatically transforms the payload into the DTO class (equivalent to plainToClass()).
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
