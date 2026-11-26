import { z } from 'zod';
import { createEventSchema } from './create-event.dto.js';

export const updateEventSchema = createEventSchema.partial();

export type UpdateEventDto = z.infer<typeof updateEventSchema>;
