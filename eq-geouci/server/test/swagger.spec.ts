import { Body, Controller, Module, Post } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Test } from '@nestjs/testing';
import { describe, expect, it } from 'vitest';
import { createCategorySchema } from '../src/categories/dto/create-category.dto.js';
import { createEventSchema } from '../src/events/dto/create-event.dto.js';
import { swaggerDocumentOptions } from '../src/swagger.js';

@Controller('validation')
class ValidationController {
  @Post('categories')
  createCategory(@Body({ schema: createCategorySchema }) body: unknown) {
    return body;
  }

  @Post('events')
  createEvent(@Body({ schema: createEventSchema }) body: unknown) {
    return body;
  }
}

@Module({ controllers: [ValidationController] })
class TestModule {}

const requestBodySchema = (
  document: ReturnType<typeof SwaggerModule.createDocument>,
  path: string,
) =>
  document.paths[path]?.post?.requestBody?.content?.['application/json']
    ?.schema;

describe('Swagger con esquemas Zod', () => {
  it('documenta el cuerpo de la petición a partir del esquema', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TestModule],
    }).compile();
    const app = moduleRef.createNestApplication();
    await app.init();

    const document = SwaggerModule.createDocument(
      app,
      new DocumentBuilder().build(),
      swaggerDocumentOptions,
    );

    expect(requestBodySchema(document, '/validation/categories')).toMatchObject({
      type: 'object',
      required: ['name', 'description'],
    });
    expect(requestBodySchema(document, '/validation/events')).toMatchObject({
      type: 'object',
      properties: {
        start_date: { type: 'string', format: 'date-time' },
        end_date: { type: 'string', format: 'date-time' },
      },
    });
    await app.close();
  });
});
