import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';

async function bootstrap() {
  let appContext = await  NestFactory.createApplicationContext(AppModule);
  const service = appContext.get(UsersService);
  await service.seedUsers();
  await appContext.close();

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({}));
  await app.listen(3002);
}
bootstrap();
