import { z } from 'zod';

export const createComplaintSchema = z.object({
  eventId: z.string().trim().min(1).describe('The id of the event the complaint belongs to'),
  userId: z.string().trim().min(1).describe('The id of the user that made the complaint'),
  reason: z.string().trim().min(1).describe('The reason of the complaint'),
});

export type CreateComplaintDto = z.infer<typeof createComplaintSchema>;
