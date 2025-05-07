import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { join } from 'path';

export function setupSwagger(app: INestApplication) {

  const config = new DocumentBuilder()
    .setTitle('Pokemon API')
    .setDescription(
      '- ### This is Pokemon API        \n- ### [swagger.json](/swagger/swagger.json)         \n- ### Have Fun!!🚀'
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger-ui', app, document); // Swagger UI route path

  // **generate Swagger JSON as static file**
  const swaggerJsonPath = join(process.cwd(), 'swagger.json');
  writeFileSync(swaggerJsonPath, JSON.stringify(document, null, 2));
}