import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalGuards(new JwtAuthGuard(new Reflector()))
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
    allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization,authorization'
  })

  await app.listen(3001);
}

bootstrap();