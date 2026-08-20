import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NotFoundExceptionFilter } from '@controller/common/not-found.exception-filter';

export function setupApp(app: INestApplication) {
  app.enableCors({
    origin: process.env.CLIENT_URL || 'http://localhost:3001',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.useGlobalFilters(new NotFoundExceptionFilter());

  app.setGlobalPrefix('api');

  return app;
}
