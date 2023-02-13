import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("/api/v1")
  app.enableCors({
    origin: '*'
  })
  await app.listen(port);
}
bootstrap().then(() => {
  console.log(`Server started on port ${port}`)
});
