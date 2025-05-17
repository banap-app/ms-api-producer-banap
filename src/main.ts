import { NestFactory } from '@nestjs/core'
import { AppModule } from './nest/app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = new DocumentBuilder().setTitle("Producer API").setVersion("1.0").build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('ap i', app, document)
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
