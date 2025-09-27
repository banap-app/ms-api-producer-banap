import { NestFactory } from '@nestjs/core';
import { AppModule } from './nest/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NotFoundFilter } from './nest/exceptionsFilters/not-found-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Producer API')
    .setVersion('1.0')
    .addApiKey(
      {
        type: 'apiKey',
        name: 'Authorization', // ou "x-token", se preferir um nome diferente
        in: 'header',
      },
      'token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalFilters(new NotFoundFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
