import { z } from 'zod';

export const createEventSchema = z.object({
  name: z.string().trim().min(1).describe('The name of the event'),
  description: z.string().optional().describe('The description of the event'),
  start_date: z.coerce.date().describe('The start date of the event'),
  end_date: z.coerce.date().describe('The end date of the event'),
  its_official: z.boolean().describe('Indicates if the event is official'),
  outstanding: z.boolean().describe('Indicates if the event is outstanding'),
  mapId: z.string().trim().min(1).describe('The id of the map where the event takes place'),
  categoryId: z.string().trim().min(1).describe('The id of the category of the event'),
  organizerId: z.string().trim().min(1).describe('The id of the user organizing the event'),
});

export type CreateEventDto = z.infer<typeof createEventSchema>;
