import type { SwaggerDocumentOptions } from '@nestjs/swagger';
import { z } from 'zod';

export const swaggerDocumentOptions: SwaggerDocumentOptions = {
  standardSchemaConverter: (schema, { schemaType }) => {
    const vendor = (
      schema as { '~standard'?: { vendor?: string } } | null
    )?.['~standard']?.vendor;
    if (vendor !== 'zod') return undefined;

    const { $defs, ...converted } = z.toJSONSchema(schema as z.ZodType, {
      target: 'openapi-3.0',
      io: schemaType,
      // z.coerce.date() produce Date en runtime, pero en JSON Schema se
      // documenta como una cadena ISO 8601.
      unrepresentable: ({ message }) =>
        message.startsWith('Date ')
          ? { type: 'string', format: 'date-time' }
          : undefined,
    });

    return { schema: converted, components: $defs };
  },
};
