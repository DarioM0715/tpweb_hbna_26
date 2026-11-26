import { z } from 'zod';
import { createLocationsRequestSchema } from './create-locations-request.dto.js';

export const updateLocationsRequestSchema = createLocationsRequestSchema
  .partial()
  .extend({
    done_at: z.coerce.date().optional(),
  });

export type UpdateLocationsRequestDto = z.infer<typeof updateLocationsRequestSchema>;
