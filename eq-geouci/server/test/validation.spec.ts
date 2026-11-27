import { StandardSchemaValidationPipe } from '@nestjs/common';
import { describe, expect, it } from 'vitest';
import { createCategorySchema } from '../src/categories/dto/create-category.dto.js';
import { updateCategorySchema } from '../src/categories/dto/update-category.dto.js';
import { createEventSchema } from '../src/events/dto/create-event.dto.js';
import { createLocationsRequestSchema } from '../src/locations-request/dto/create-locations-request.dto.js';
import { createUserSchema } from '../src/users/dto/create-user.dto.js';

const pipe = new StandardSchemaValidationPipe();
const parseBody = (schema: unknown, value: unknown) =>
  pipe.transform(value, { type: 'body', metatype: Object, schema } as never);

describe('validación con Zod', () => {
  it('rechaza campos obligatorios vacíos y elimina propiedades desconocidas', async () => {
    await expect(
      parseBody(createCategorySchema, { name: '   ', description: 'Texto' }),
    ).rejects.toMatchObject({ status: 400 });
    await expect(
      parseBody(createCategorySchema, {
        name: 'Deportes',
        description: 'Texto',
        extra: 'ignorado',
      }),
    ).resolves.toEqual({ name: 'Deportes', description: 'Texto' });
  });

  it('acepta actualizaciones parciales, incluso con el cuerpo vacío', async () => {
    await expect(parseBody(updateCategorySchema, {})).resolves.toEqual({});
    await expect(
      parseBody(updateCategorySchema, { name: '' }),
    ).rejects.toMatchObject({ status: 400 });
  });

  it('convierte fechas válidas y rechaza las inválidas', async () => {
    const event = {
      name: 'Conferencia',
      description: 'Charla',
      start_date: '2026-11-01T09:00:00Z',
      end_date: '2026-11-01T10:00:00Z',
      its_official: true,
      outstanding: false,
      mapId: 'mapa-1',
      categoryId: 'categoria-1',
      organizerId: 'usuario-1',
    };
    const result = await parseBody(createEventSchema, event);
    expect(result.start_date).toBeInstanceOf(Date);
    expect(result.end_date).toBeInstanceOf(Date);
    await expect(
      parseBody(createEventSchema, { ...event, start_date: 'fecha invalida' }),
    ).rejects.toMatchObject({ status: 400 });
  });

  it('aplica los valores por defecto y valida los enum de Prisma', async () => {
    const request = await parseBody(createLocationsRequestSchema, {
      applicantId: 'usuario-1',
      categoryId: 'categoria-1',
      name: 'Biblioteca',
      reason: 'Falta de accesibilidad',
      latitude: 22.98,
      longitude: -82.46,
    });
    expect(request).toMatchObject({ status: 'pending' });
    await expect(
      parseBody(createLocationsRequestSchema, {
        applicantId: 'usuario-1',
        categoryId: 'categoria-1',
        name: 'Biblioteca',
        reason: 'Falta de accesibilidad',
        latitude: 22.98,
        longitude: -82.46,
        status: 'unknown',
      }),
    ).rejects.toMatchObject({ status: 400 });

    const user = await parseBody(createUserSchema, {
      name: 'Alain',
      email: 'alain@uci.cu',
      lapel: 'A123',
    });
    expect(user).toMatchObject({
      role: 'user',
      is_resident: false,
      suspended: false,
    });
  });
});
