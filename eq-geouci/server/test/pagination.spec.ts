import { StandardSchemaValidationPipe } from '@nestjs/common';
import { describe, expect, it, vi } from 'vitest';
import { CategoriesService } from '../src/categories/categories.service.js';
import {
  paginationQuerySchema,
  type PaginationQueryDto,
} from '../src/common/dto/pagination.dto.js';
import {
  buildPagination,
  toPaginatedResult,
} from '../src/common/helpers/pagination.helpers.js';
import { buildOrderBy } from '../src/common/helpers/pagination.helpers.js';
import type { PrismaService } from '../src/prisma/prisma.service.js';

const pipe = new StandardSchemaValidationPipe();
const parseQuery = (value: unknown) =>
  pipe.transform(value, {
    type: 'query',
    metatype: Object,
    schema: paginationQuerySchema,
  } as never);

describe('paginationQuerySchema', () => {
  it('convierte los parámetros de query y aplica los valores por defecto', async () => {
    await expect(parseQuery({})).resolves.toEqual({
      page: 1,
      limit: 20,
      order: 'asc',
    });
    await expect(
      parseQuery({
        page: '3',
        limit: '10',
        sort: ' name ',
        order: 'desc',
        search: ' fútbol ',
      }),
    ).resolves.toEqual({
      page: 3,
      limit: 10,
      sort: 'name',
      order: 'desc',
      search: 'fútbol',
    });
  });

  it('rechaza valores fuera de rango y direcciones de orden inválidas', async () => {
    await expect(parseQuery({ page: '0' })).rejects.toMatchObject({
      status: 400,
    });
    await expect(parseQuery({ limit: '101' })).rejects.toMatchObject({
      status: 400,
    });
    await expect(parseQuery({ order: 'aleatorio' })).rejects.toMatchObject({
      status: 400,
    });
  });
});

describe('helpers de paginación', () => {
  it('calcula skip y take a partir de page y limit', () => {
    expect(buildPagination(3, 10)).toEqual({
      page: 3,
      limit: 10,
      skip: 20,
      take: 10,
    });
    expect(buildPagination(0, 200)).toEqual({
      page: 1,
      limit: 100,
      skip: 0,
      take: 100,
    });
  });

  it('construye la metadata de la respuesta', () => {
    expect(toPaginatedResult(['a', 'b'], 5, 1, 2)).toEqual({
      data: ['a', 'b'],
      meta: {
        total: 5,
        page: 1,
        limit: 2,
        totalPages: 3,
        hasNext: true,
        hasPrev: false,
      },
    });
  });

  it('descarta campos de ordenación no permitidos', () => {
    expect(
      buildOrderBy('password', 'desc', ['name', 'created_at'] as const, 'name'),
    ).toEqual({ name: 'desc' });
  });
});

describe('findAll paginado', () => {
  it('filtra, ordena y devuelve los datos con su metadata', async () => {
    const count = vi.fn().mockResolvedValue(42);
    const findMany = vi.fn().mockResolvedValue([
      { id: '1', name: 'Deportes', description: 'Categoría deportiva' },
    ]);
    const service = new CategoriesService({
      category: { count, findMany },
    } as unknown as PrismaService);

    const query: PaginationQueryDto = {
      page: 2,
      limit: 10,
      sort: 'name',
      order: 'desc',
      search: 'Deportes',
    };
    const result = await service.findAll(query);

    const where = {
      OR: [
        { name: { contains: 'Deportes', mode: 'insensitive' } },
        { description: { contains: 'Deportes', mode: 'insensitive' } },
      ],
    };
    expect(count).toHaveBeenCalledWith({ where });
    expect(findMany).toHaveBeenCalledWith({
      where,
      skip: 10,
      take: 10,
      orderBy: { name: 'desc' },
    });
    expect(result).toEqual({
      data: [{ id: '1', name: 'Deportes', description: 'Categoría deportiva' }],
      meta: {
        total: 42,
        page: 2,
        limit: 10,
        totalPages: 5,
        hasNext: true,
        hasPrev: true,
      },
    });
  });
});
