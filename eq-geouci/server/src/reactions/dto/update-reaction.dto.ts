import { z } from 'zod';
import { createReactionSchema } from './create-reaction.dto.js';

export const updateReactionSchema = createReactionSchema.partial();

export type UpdateReactionDto = z.infer<typeof updateReactionSchema>;
