import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = 3000
let app;
async function bootstrap() {
  app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("/api/v1")
  app.enableCors({
    origin: '*'
  })
  await app.listen(port);
}
bootstrap().then(() => {
  console.log(`Server started on address ${port}`)
});
