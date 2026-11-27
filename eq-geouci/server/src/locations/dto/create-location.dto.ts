import { z } from 'zod';

export const createLocationSchema = z.object({
  mapId: z.string().trim().min(1).describe('The id of the map the location belongs to'),
  categoryId: z.string().trim().min(1).describe('The id of the category of the location'),
  name: z.string().trim().min(1).describe('The name of the location'),
  description: z.string().trim().min(1).describe('The description of the location'),
  latitude: z.number().describe('The latitude of the location'),
  longitude: z.number().describe('The longitude of the location'),
  its_official: z.boolean().describe('Indicates if the location is official'),
});

export type CreateLocationDto = z.infer<typeof createLocationSchema>;
