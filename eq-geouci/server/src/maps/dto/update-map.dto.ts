import { z } from 'zod';
import { createMapSchema } from './create-map.dto.js';

export const updateMapSchema = createMapSchema.partial();

export type UpdateMapDto = z.infer<typeof updateMapSchema>;
