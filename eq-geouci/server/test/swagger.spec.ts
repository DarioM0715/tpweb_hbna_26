import { Body, Controller, Module, Post } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Test } from '@nestjs/testing';
import { describe, expect, it } from 'vitest';
import { createCategorySchema } from '../src/categories/dto/create-category.dto.js';

@Controller('validation')
class ValidationController {
  @Post()
  create(@Body({ schema: createCategorySchema }) body: unknown) {
    return body;
  }
}

@Module({ controllers: [ValidationController] })
class TestModule {}

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
    );
    const schema = document.paths['/validation']?.post?.requestBody?.content?.[
      'application/json'
    ]?.schema;

    expect(schema).toMatchObject({
      type: 'object',
      required: ['name', 'description'],
    });
    await app.close();
  });
});
