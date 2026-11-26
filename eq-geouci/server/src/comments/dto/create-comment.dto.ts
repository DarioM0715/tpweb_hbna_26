import { z } from 'zod';

export const createCommentSchema = z.object({
  eventId: z.string().trim().min(1).describe('The id of the event the comment belongs to'),
  userId: z.string().trim().min(1).describe('The id of the user that wrote the comment'),
  text: z.string().trim().min(1).describe('The text of the comment'),
});

export type CreateCommentDto = z.infer<typeof createCommentSchema>;
