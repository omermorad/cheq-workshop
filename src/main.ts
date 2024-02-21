import { UserApiModule } from '@app/app/user-api/user-api.module';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { drawMermaidGraph } from './tree';

async function bootstrap() {
  const app = await NestFactory.create(UserApiModule);

  const config = new DocumentBuilder().setTitle('Users API').setVersion('1.0').addTag('Users').build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  /**
   * Uncomment this to see the module graph.
   * Take the output and paste it into the mermaid live editor at https://mermaid-js.github.io/mermaid-live-editor/
   */
  console.log(drawMermaidGraph(app));

  await app.listen(parseInt(process.env.APP_PORT as string));
}

void bootstrap();
