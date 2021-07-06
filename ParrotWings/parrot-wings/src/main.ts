import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  let appContext = await  NestFactory.createApplicationContext(AppModule);
  const service = appContext.get(UsersService);
  await service.seedUsers();
  await appContext.close();

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('PW')
  .setVersion('1.0')
  .addBearerAuth(
    { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    'access-token',
  )
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe({}));
  await app.listen(3002);
}
bootstrap();
