import { z } from 'zod';
import { createLocationSchema } from './create-location.dto.js';

export const updateLocationSchema = createLocationSchema.partial();

export type UpdateLocationDto = z.infer<typeof updateLocationSchema>;
