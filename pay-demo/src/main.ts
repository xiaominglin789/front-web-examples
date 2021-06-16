import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: true
  });

  const appPort = parseInt(process.env.APP_PORT) || 3000;
  await app.listen(appPort, () => {
    Logger.log("server run at " + appPort);
  });
}

bootstrap();
