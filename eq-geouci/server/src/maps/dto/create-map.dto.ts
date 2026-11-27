import { z } from 'zod';

export const createMapSchema = z.object({
  name: z.string().trim().min(1).describe('The name of the map'),
  lat_min: z.number().describe('The minimum latitude of the map'),
  lat_max: z.number().describe('The maximum latitude of the map'),
  lon_min: z.number().describe('The minimum longitude of the map'),
  lon_max: z.number().describe('The maximum longitude of the map'),
});

export type CreateMapDto = z.infer<typeof createMapSchema>;
