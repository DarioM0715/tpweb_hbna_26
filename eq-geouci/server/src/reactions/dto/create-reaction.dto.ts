import { z } from 'zod';

export const createReactionSchema = z.object({
  eventId: z.string().min(1).describe('The id of the event the reaction belongs to'),
  userId: z.string().min(1).describe('The id of the user that reacted to the event'),
  validated: z.boolean().optional().default(false),
});

export type CreateReactionDto = z.infer<typeof createReactionSchema>;
