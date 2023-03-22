import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import { ValidationPipe } from './pipe/validation.pipe';
// import { useStaticAssets } from 'assert'
import { join } from 'path';
import {NestExpressApplication} from "@nestjs/platform-express";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
      cors: true
  });
  app.useGlobalPipes(
    ValidationPipe({
      whitelist: false,
      forbidNonWhitelisted: true,
      skipMissingProperties: false,
      // forbidUnknownValues: true,
      disableErrorMessages: true,
    }),
  );

    app.useStaticAssets(join(__dirname, '..', 'src/upload/images'), {prefix: '/api/public/image'});
  //Swagger
  const config = new DocumentBuilder()
    .setTitle('Rice Core')
    .setDescription('Rice Core API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
  app.enableCors();
}
bootstrap();
